const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// CONFIG
const TEMP_DIR = ".deploy-temp";
const BUILD_DIR = "dist";
const DEPLOY_BRANCH = "master";
const SOURCE_BRANCH = "source";
const COMMIT_MSG = "Deploying latest build";

function run(cmd) {
  return execSync(cmd, { stdio: "inherit" });
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function deleteDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function ensureCleanWorkingTree() {
  const status = execSync("git status --porcelain").toString().trim();
  if (status) {
    console.error("❌ Your working tree is not clean. Please commit or stash your changes before deploying.");
    process.exit(1);
  }
}

function main() {
  ensureCleanWorkingTree();
  console.log("🏗️ Building the app...");
  run("npm run build");

  console.log("📦 Copying dist/ to temp folder...");
  deleteDir(TEMP_DIR);
  copyDir(BUILD_DIR, TEMP_DIR);

  console.log(`🔁 Switching to ${DEPLOY_BRANCH} branch...`);
  run(`git checkout ${DEPLOY_BRANCH}`);

  console.log("🧹 Cleaning old files...");
  fs.readdirSync(".").forEach((file) => {
    if (file !== ".git" && file !== ".gitignore") {
      deleteDir(file);
    }
  });

  console.log("📥 Copying new files from temp folder...");
  copyDir(TEMP_DIR, ".");

  console.log("📝 Committing changes...");
  run("git add .");
  run(`git commit -m "${COMMIT_MSG}"`);
  run("git push");

  console.log(`🔙 Switching back to ${SOURCE_BRANCH}...`);
  run(`git checkout ${SOURCE_BRANCH}`);

  console.log("🧽 Cleaning up temp folder...");
  deleteDir(TEMP_DIR);

  console.log("✅ Deployment complete!");
}

main();
