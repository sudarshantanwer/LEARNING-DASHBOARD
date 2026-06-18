import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Project root (monorepo) — resolves from server/src/utils */
export function getProjectRoot(): string {
  return path.resolve(__dirname, "..", "..", "..");
}

export function getDatabaseDir(): string {
  if (process.env.TEST_DATA_DIR) {
    return process.env.TEST_DATA_DIR;
  }
  return path.join(getProjectRoot(), "database");
}

export function getTasksFilePath(): string {
  return path.join(getDatabaseDir(), "tasks.json");
}

export function getUsersFilePath(): string {
  return path.join(getDatabaseDir(), "users.json");
}
