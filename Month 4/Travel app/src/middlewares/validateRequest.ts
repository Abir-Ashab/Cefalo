import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync.util";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = await schema.parseAsync({
      body: req.body,
    });

    req.body = parsedBody.body;

    next();
  });
};

export default validateRequest;
