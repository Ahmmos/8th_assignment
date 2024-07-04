

import { Book } from "../../../database/models/Book.model.js";
import { errorCatch } from "../../middleware/errorCatch.js";
import { AppError } from "../../utilts/appError.js";


const addBook = errorCatch(async (req, res) => {
    req.body.imgUrl = req.file.filename
    let book = await Book.insertMany(req.body);
    res.status(201).send({ message: " new book added successfully", book })
})



// get all book with pagination limit to only 5 per page

const allBooks = errorCatch(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;

    // skip ==> The number of documents to skip in the results set.
    // limit ==> The maximum number of documents to return in the results set.

    const totalBooks = await Book.countDocuments();
    // add search level by title or Author 

    if (Object.keys(req.query).length > 0) {
        const { title, Author } = req.query
        const books = await Book.find({ $or: [{ 'title': title }, { 'author': Author }] })

        if (books.length == 0) return next(new AppError("Can't find books with that search", 404))

        res.status(200).json({ message: " success", books });

    } else {
        // find all books
        const books = await Book.find().skip(startIndex).limit(limit)
        res.status(200).json({
            message: " success", books,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit)
        });
    }

})

const specificBook = errorCatch(async (req, res, next) => {
    let book = await Book.findById(req.params.id)
    if (!book) return next(new AppError("there no book with that id", 404))

    res.status(200).send({ message: " success", book })
})



const updateBook = errorCatch(async (req, res) => {
    let book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!book) return next(new AppError("there no book with that id", 404))
    res.status(200).send({ message: " updated successfully", book })
})

const deleteBook = errorCatch(async (req, res) => {
    let book = await Book.findByIdAndDelete(req.params.id)
    if (!book) return next(new AppError("there no book with that id", 404))
    res.status(200).send({ message: " deleted successfully", book })
})


export {
    addBook,
    allBooks,
    specificBook,
    updateBook,
    deleteBook
}