
import { Author } from "../../../database/models/Author.model.js";
import { errorCatch } from "../../middleware/errorCatch.js";
import { AppError } from "../../utilts/appError.js";


const addAuthor = errorCatch(async (req, res) => {
    let author = await Author.insertMany(req.body);
    res.status(201).send({ message: " new author added successfully", author })
})

const allAuthors = errorCatch(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const startIndex = (page - 1) * limit;

    // skip ==> The number of documents to skip in the results set.
    // limit ==> The maximum number of documents to return in the results set.
    const totalAuthors = await Author.countDocuments();

    // add search level by name or bio
    if (Object.keys(req.query).length > 0) {
        const { name, bio } = req.query
        const author = await Author.findOne({ $or: [{ 'name': name }, { 'bio': bio }] })

        if (!author) return next(new AppError("This author doesn.t exist", 404))

        res.status(200).json({ message: " success", author });

    } else {
        // find all authors
        const authors = await Author.find().skip(startIndex).limit(limit)
        res.status(200).json({
            message: " success", authors,
            currentPage: page,
            totalPages: Math.ceil(totalAuthors / limit)
        });
    }
})


const specificAuthors = errorCatch(async (req, res, next) => {

    let author = await Author.findById(req.params.id).populate('books', '  -_id  -author  -__v')
    if (!author) next(new AppError(" there is no author with that id", 404))

    res.status(200).send({ message: " success", author })
})
const updateAuthor = errorCatch(async (req, res, next) => {
    let author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!author) return next(new AppError(" there is no author with that id", 404))

    res.status(200).send({ message: " updated successfully", author })
})

const deleteAuthor = errorCatch(async (req, res, next) => {
    let author = await Author.findByIdAndDelete(req.params.id)
    if (!author) return next(new AppError(" there is no author with that id", 404))

    res.status(200).send({ message: " deleted successfully", author })
})


export {
    addAuthor,
    allAuthors,
    specificAuthors,
    updateAuthor,
    deleteAuthor
}