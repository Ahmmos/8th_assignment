// use dto handel in error in the code 
process.on("uncaughtException", (err)=>{
    console.log("error in code", err)
}) 
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import booksRoute from './src/modules/books/books.route.js'
import authorRoute from './src/modules/authors/author.routes.js'
import { AppError } from './src/utilts/appError.js'
import { globalError } from './src/middleware/globalErrorHandling.js'


const app = express()
const port = 3000

app.use(express.json())
app.use(express.static("uploads"))

app.use("/books", booksRoute)
app.use("/authors", authorRoute)

// handle unhandled routes
app.use('*', (req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404))
})
app.use(globalError)

// used to handel errors outside the express app like (db Connection)
process.on("unhandeledRejection", (err)=>{
    console.log("internal error", err)
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))