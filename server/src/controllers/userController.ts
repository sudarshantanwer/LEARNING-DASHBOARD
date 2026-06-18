import type { Request, Response } from "express";
import type { UserRepository } from "../repositories/userRepository.js";

export function createUserController(users: UserRepository) {
  return {
    list: async (_req: Request, res: Response) => {
      const all = await users.list();
      res.json(all);
    }
  };
}
