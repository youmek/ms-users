
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthentificationResponseDto:
 *       type: object
 *       properties:
 *         metadata:
 *           $ref: '#/components/schemas/UserAuthMetadataDto'
 *         properties:
 *           $ref: '#/components/schemas/UserPropertiesDto'
 *       required:
 *         - metadata
 *         - properties
 */

import { UserPropertiesDto, UserAuthMetadataDto } from "./User.dto";

export class AuthentificationResponseDto {
    metadata: UserAuthMetadataDto
    properties: UserPropertiesDto

    constructor(metadata: UserAuthMetadataDto, properties: UserPropertiesDto) {
        this.metadata = metadata;
        this.properties = properties;
    }
}