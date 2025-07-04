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

function deploy() {
  // Check build exists
  if (!fs.existsSync(DEPLOY_DIR)) {
    console.error('❌ Build folder not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Save current branch name
  const currentBranch = execSync('git branch --show-current').toString().trim();
  console.log(`📦 Current branch: ${currentBranch}`);

  // Clean up stale worktree if needed
  run(`git worktree prune`);

  // Remove folder if it exists (from previous broken cleanup)
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // Add the worktree for the target branch
  run(`git worktree add ${TEMP_DIR} ${TARGET_BRANCH}`);

  // Clean .deploy-tmp (but keep the .git file)
  fs.readdirSync(TEMP_DIR).forEach(file => {
    if (file === '.git') return;
    fs.rmSync(path.join(TEMP_DIR, file), { recursive: true, force: true });
  });

  // Copy contents of dist/ to .deploy-tmp/
  fs.cpSync(path.resolve(DEPLOY_DIR), path.resolve(TEMP_DIR), { recursive: true });

  // Commit and push changes to master
  run(`cd ${TEMP_DIR} && git add .`);
  try {
    run(`cd ${TEMP_DIR} && git commit -m "Deploy to master"`);
  } catch {
    console.log('✅ No changes to commit.');
  }
  run(`cd ${TEMP_DIR} && git push origin ${TARGET_BRANCH}`);

  // Clean up worktree safely (now that .git still exists)
  run(`git worktree remove ${TEMP_DIR} --force`);
}

deploy();
