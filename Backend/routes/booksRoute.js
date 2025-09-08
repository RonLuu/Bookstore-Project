import express from "express"
import {Book} from "../models/bookModel.js"
const router = express.Router()

// Get all books
router.get("", async (req, res) => {
    try 
    {
        const books = await Book.find()
        return res.status(200).json({
            count: books.length,
            data: books
        })
    }
    catch (error) 
    {
        console.log(error.message)
        return res.status(500).send({ message: error.message })
    }
})

// Get a book by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)

        return res.status(200).json(book)
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send({ message: error.message })
    }
})

// Post a book to the database from the request
router.post("", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            })
        }
        // Book object in js
        const js_book = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const mongo_book = await Book.create(js_book)
        console.log(mongo_book)
        return res.status(200).send(mongo_book)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Update a book by id in the database
router.put("/:id", async (req, res) => {
    try {
        // If the infomation for updating the book is not enough!
        if (!req.body.author || !req.body.title || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            })
        }
        const { id } = req.params
        const book = await Book.findByIdAndUpdate(id, req.body)
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        return res.status(200).send({ message: "Book updated successfully" })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send({ message: error.message })
    }
})

// Delete a book by id in the database
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findByIdAndDelete(id)
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }
        return res.status(200).send({ message: "Book deleted successfully" })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).send({ message: error.message })
    }
})

export default router