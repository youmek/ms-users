
/**
 * @swagger
 * components:
 *   schemas:
 *     MetadataDto:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the user was last updated
 */

export class MetadataDto {
    createdAt: Date;
    updatedAt: Date;

    constructor(createdAt: Date, updatedAt: Date) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}