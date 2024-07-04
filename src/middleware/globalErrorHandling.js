


//error handling function which will work forcely with any error and print the error message
// only work if the function that has error has next(new AppError)
// El 3omda

export const globalError= (err, req, res, next) => {
    let errorCode = err.statusCode || 500
    res.status(errorCode).json({ error: "error", message: err.message, code: errorCode })
}