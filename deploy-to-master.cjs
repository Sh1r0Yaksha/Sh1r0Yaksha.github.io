const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const TEMP_DIR = path.join(os.tmpdir(), "vite-deploy-temp"); // Temp dir outside git scope
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
