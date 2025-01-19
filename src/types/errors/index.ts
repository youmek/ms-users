export class UnauthorizedError extends Error {
    statusCode: number;
    errorCode?: string;
    details?: string;

    constructor(message: string, statusCode = 401, errorCode?: string, details?: string) {
        super(message); // Call the parent class (Error) constructor
        this.name = "UnauthorizedError"; // Set the error name
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;

        // Fix the prototype chain for ES5 environments
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
