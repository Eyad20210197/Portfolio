import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";


const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation failed",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      res.status(500).json({
        message: "Internal server error during validation",
      });
    }
  };

export default validate;
