import { Router } from "express";
import { addAuthor, allAuthors, deleteAuthor, specificAuthors, updateAuthor } from "./author.controller.js";


const authorRoute = Router()


authorRoute.post('/', addAuthor)
authorRoute.get('/', allAuthors)
authorRoute.get('/:id', specificAuthors)
authorRoute.put('/:id', updateAuthor)
authorRoute.delete('/:id', deleteAuthor)


export default authorRoute