import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = typeof err === "object" && err && "status" in err ? Number((err as { status?: unknown }).status) : 500;
  if (status && status !== 500) {
    res.status(status).json({ message: (err as Error).message ?? "Error" });
    return;
  }
  res.status(500).json({ message: "Internal server error" });
};
