import { Request, Response, NextFunction } from "express";

export const corsOptions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedOrigins = "*";
  const origin: string | undefined = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Authorization"
  );
  next();
};
