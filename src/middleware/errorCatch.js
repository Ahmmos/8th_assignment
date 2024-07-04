


// role of it to catch any error and direct it to el 3moda (error handleing middleware)

export function errorCatch(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            next(err)
        })
    }
}