import { readFile } from "node:fs/promises";
import type { User } from "../types/index.js";
import { getUsersFilePath } from "../utils/paths.js";

export class UserRepository {
  async list(): Promise<User[]> {
    const raw = await readFile(getUsersFilePath(), "utf-8");
    return JSON.parse(raw) as User[];
  }

  async findById(id: string): Promise<User | undefined> {
    const users = await this.list();
    return users.find((u) => u.id === id);
  }
}
