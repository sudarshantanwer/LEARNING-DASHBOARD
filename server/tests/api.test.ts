import { mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

const usersFixture = [
  { id: "u1", name: "Test User", email: "t@example.com", role: "Engineer" }
];

async function writeJson(dir: string, name: string, data: unknown) {
  await writeFile(path.join(dir, name), JSON.stringify(data, null, 2), "utf-8");
}

describe("API", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await mkdtemp(path.join(os.tmpdir(), "ld-test-"));
    process.env.TEST_DATA_DIR = tmpDir;
    await writeJson(tmpDir, "users.json", usersFixture);
    await writeJson(tmpDir, "tasks.json", []);
  });

  afterEach(async () => {
    delete process.env.TEST_DATA_DIR;
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("creates a task", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Learn Vitest",
        priority: "HIGH",
        ownerId: "u1",
        dueDate: "2026-12-31T00:00:00.000Z"
      });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Learn Vitest");
    expect(res.body.id).toBeTruthy();
  });

  it("returns validation failures", async () => {
    const app = createApp();
    const res = await request(app).post("/api/tasks").send({ title: "" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed");
  });

  it("rejects unknown owner on create", async () => {
    const app = createApp();
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "X",
        priority: "LOW",
        ownerId: "unknown",
        dueDate: "2026-12-31T00:00:00.000Z"
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Owner/i);
  });

  it("returns 404 for missing task", async () => {
    const app = createApp();
    const res = await request(app).get("/api/tasks/does-not-exist");
    expect(res.status).toBe(404);
  });

  it("gets a task", async () => {
    await writeJson(tmpDir, "tasks.json", [
      {
        id: "t1",
        title: "A",
        description: "",
        category: "General",
        priority: "LOW",
        status: "TODO",
        ownerId: "u1",
        dueDate: "2026-12-31T00:00:00.000Z",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z"
      }
    ]);
    const app = createApp();
    const res = await request(app).get("/api/tasks/t1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("t1");
  });

  it("updates a task", async () => {
    await writeJson(tmpDir, "tasks.json", [
      {
        id: "t1",
        title: "A",
        description: "d",
        category: "General",
        priority: "LOW",
        status: "TODO",
        ownerId: "u1",
        dueDate: "2026-12-31T00:00:00.000Z",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z"
      }
    ]);
    const app = createApp();
    const res = await request(app).put("/api/tasks/t1").send({ title: "B", status: "IN_PROGRESS" });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("B");
    expect(res.body.status).toBe("IN_PROGRESS");
  });

  it("patches task status", async () => {
    await writeJson(tmpDir, "tasks.json", [
      {
        id: "t1",
        title: "A",
        description: "",
        category: "General",
        priority: "LOW",
        status: "TODO",
        ownerId: "u1",
        dueDate: "2026-12-31T00:00:00.000Z",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z"
      }
    ]);
    const app = createApp();
    const res = await request(app).patch("/api/tasks/t1/status").send({ status: "COMPLETED" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("COMPLETED");
  });

  it("returns dashboard counts", async () => {
    const past = "2020-01-01T00:00:00.000Z";
    const future = "2030-01-01T00:00:00.000Z";
    await writeJson(tmpDir, "tasks.json", [
      {
        id: "t1",
        title: "Done",
        description: "",
        category: "General",
        priority: "HIGH",
        status: "COMPLETED",
        ownerId: "u1",
        dueDate: past,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z"
      },
      {
        id: "t2",
        title: "Doing",
        description: "",
        category: "General",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        ownerId: "u1",
        dueDate: future,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z"
      },
      {
        id: "t3",
        title: "Late",
        description: "",
        category: "General",
        priority: "HIGH",
        status: "TODO",
        ownerId: "u1",
        dueDate: past,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z"
      }
    ]);
    const app = createApp();
    const res = await request(app).get("/api/dashboard");
    expect(res.status).toBe(200);
    expect(res.body.totalItems).toBe(3);
    expect(res.body.completedItems).toBe(1);
    expect(res.body.inProgressItems).toBe(1);
    expect(res.body.overdueItems).toBe(1);
    expect(res.body.highPriorityItems).toBe(2);
  });

  it("lists users", async () => {
    const app = createApp();
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].email).toBeTruthy();
  });
});
