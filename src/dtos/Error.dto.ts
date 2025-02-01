
/**
 * @swagger
 * components:
 *   schemas:
 *     UnauthoriedErrorDto:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           format: string
 *           description: Action Unauthorized
 *           example: You are not authorized to perform this action.
 */

export class ErrorDto {
    status: number
    message: string

    constructor(status: number = 400, message: string) {
        this.status = status;
        this.message = message;
    }
}