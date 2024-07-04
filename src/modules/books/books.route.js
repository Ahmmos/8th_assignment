import { Router } from "express";
import { addBook, allBooks, deleteBook, specificBook, updateBook } from "./books.controller.js";


const bookRoute = Router()


bookRoute.post('/', addBook)
bookRoute.get('/', allBooks)
bookRoute.get('/:id', specificBook)
bookRoute.put('/:id', updateBook)
bookRoute.delete('/:id', deleteBook)


export default bookRoute