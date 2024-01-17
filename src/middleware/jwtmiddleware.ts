import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { success, fail } from "../utils/response";
import { TOKEN_SECRET } from "../config";

export const authorizeToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) throw new Error("Token Not found");

    jwt.verify(token, TOKEN_SECRET, (err: any, user: any) => {
      if (err) throw new Error("Token verification" + err);
      req.body.tokenData = user;
      next();
    });
  } catch (error: any) {
    return fail(res, 400, error.message);
  }
};
