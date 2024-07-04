
// new custome class of error to add staus code to it 
// because Error class take only one argument (message only)

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}