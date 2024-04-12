class ExpressError extends Error {
    constructor(message, statusCode){
        super();
        this.message = mesaage;
        this.statusCode = statusCode;

    }
}

module.exports = ExpressError;