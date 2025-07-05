const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

// CONFIGURATION
const TEMP_DIR = path.join(os.tmpdir(), "vite-deploy-temp");
const BUILD_DIR = "dist";
const DEPLOY_BRANCH = "master";
const SOURCE_BRANCH = "source";
const COMMIT_MSG = "Deploying latest build";

// preserve these files and folders while deploying branch
const preserve = new Set([
    ".git",
    ".gitignore",
    "README.md",
    "readme.md",     
    "LICENSE",
    "license",
    "node_modules"
  ]);

function run(cmd) {
  return execSync(cmd, { stdio: "inherit" });
}

function ensureCleanWorkingTree() {
  const status = execSync("git status --porcelain").toString().trim();
  if (status) {
    console.error("❌ Your working tree is not clean. Please commit or stash your changes before deploying.");
    process.exit(1);
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
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
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function cleanMasterBranch() {
  console.log("🧹 Cleaning old files from master branch (except .git and .gitignore)...");
  fs.readdirSync(".", { withFileTypes: true }).forEach((entry) => {
    const name = entry.name;
    if (preserve.has(name)) return;

    const filePath = path.join(".", name);
    try {
      if (entry.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.warn(`⚠️ Failed to delete ${filePath}:`, err.message);
    }
  });
}

function main() {
  ensureCleanWorkingTree();

  console.log("🏗️ Building the app...");
  run("npm run build");

  console.log("📦 Copying dist/ to external temp folder...");
  deleteDir(TEMP_DIR);
  copyDir(BUILD_DIR, TEMP_DIR);

  console.log(`🔁 Switching to '${DEPLOY_BRANCH}' branch...`);
  run(`git checkout ${DEPLOY_BRANCH}`);

  cleanMasterBranch();

  console.log("📥 Copying built files into master branch...");
  copyDir(TEMP_DIR, ".");

  console.log("📝 Staging and committing changes...");
  run("git add .");
  try {
    run(`git commit -m "${COMMIT_MSG}"`);
  } catch (err) {
    console.log("ℹ️ No changes to commit.");
  }

  run("git push");

  console.log(`🔙 Switching back to '${SOURCE_BRANCH}' branch...`);
  run(`git checkout ${SOURCE_BRANCH}`);

  console.log("🧽 Cleaning up temp folder...");
  deleteDir(TEMP_DIR);

  console.log("✅ Deployment complete!");
}

main();
