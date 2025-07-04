const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DEPLOY_DIR = 'dist';
const TEMP_DIR = '.deploy-tmp';
const TARGET_BRANCH = 'master';

function run(command) {
  console.log(`$ ${command}`);
  execSync(command, { stdio: 'inherit' });
}

function cleanDirExceptGit(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    if (file === '.git') return;
    fs.rmSync(path.join(dir, file), { recursive: true, force: true });
  });
}

function deploy() {
  // Run build
  run('npm run build');

  if (!fs.existsSync(DEPLOY_DIR)) {
    console.error('❌ Build failed: dist/ folder not found.');
    process.exit(1);
  }

  const currentBranch = execSync('git branch --show-current').toString().trim();
  console.log(`📦 Current branch: ${currentBranch}`);

  run('git worktree prune');
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // Checkout master to temp worktree
  run(`git worktree add ${TEMP_DIR} ${TARGET_BRANCH}`);

  // Clean temp worktree (remove dist/node_modules/etc)
  cleanDirExceptGit(TEMP_DIR);

  // Copy dist/ into temp worktree
  fs.cpSync(path.resolve(DEPLOY_DIR), path.resolve(TEMP_DIR), { recursive: true });

  // Commit + push to master
  run(`cd ${TEMP_DIR} && git add .`);
  try {
    run(`cd ${TEMP_DIR} && git commit -m "Deploy to master"`);
  } catch {
    console.log('✅ No changes to commit.');
  }
  run(`cd ${TEMP_DIR} && git push origin ${TARGET_BRANCH}`);

  // Cleanup
  run(`git worktree remove ${TEMP_DIR} --force`);
}

deploy();
