import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";
import { MetadataDto } from "./Metadata.dto";

/**
 * @swagger
 * components:
 *   schemas:
 * 
 *     RegisterPayloadDto:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *           example: John
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *           example: Doe
 *         email:
 *           type: string
 *           description: Email address of the user
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: Password for the user account (minimum 8 characters)
 *           example: P@ssw0rd1
 * 
 *     LoginPayloadDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email address of the user
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           description: Password for the user account (minimum 8 characters)
 *           example: P@ssw0rd1
 * 
 *     UserPropertiesDto:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 * 
 *     UserAuthMetadataDto:
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
 *         accessToken:
 *           type: string
 *           description: JWT auth token for API access
 */

export class RegisterPayloadDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/\d/, { message: 'Password must contain at least one number' })
    @Matches(/[@$!%*?&]/, { message: 'Password must contain at least one special character' })
    password: string;

    constructor(firstName: string = '', lastName: string = '', email: string = '', password: string = '') {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

export class LoginPayloadDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    constructor(email: string = '', password: string = '') {
        this.email = email;
        this.password = password;
    }
}

export class UserPropertiesDto {
    firstName: string;
    lastName: string;
    email: string;

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

export class UserAuthMetadataDto extends MetadataDto {

    accessToken: string;

    constructor(createdAt: Date, updatedAt: Date, accessToken: string) {
        super(createdAt, updatedAt);
        this.accessToken = accessToken;
    }
}