import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

export const validateDto = <T extends object>(dtoClass: new () => T) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors: ValidationError[] = await validate(dtoObject);

        if (errors.length > 0) {
            const errorMessages: string[] = errors.map((error: ValidationError) =>
                Object.values(error.constraints ?? {}).join(',')
            );
            res.status(400).json({ errors: errorMessages, message: "Invalid payload" });
            return;
        }

        next();
    };
};
