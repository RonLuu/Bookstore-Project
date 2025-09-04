import express, { json, request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js"
const app = express();

app.use(express.json())

app.get("/", (req, res) =>{
    console.log(req)
    return res.status(234).send("Wecome to MERN Stack Tutorial")
})


app.post("/books", async (req, res) => {
    try{
        if (!req.body.title || !req.body.author || !req.body.publishYear) 
        {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    }
    catch (error) {
        console.log(error.message)
        console.log(req.body)
        res.status(500).send({message: error.message})
    }
})
// Route for Get All Books from database
app.get("/books", async (req, res) => {
    try 
    {
        const books = await Book.find({})    
        return res.status(200).send({
            count: books.length,
            data: books
        })
    } 
    catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})
// Route for One Books from database by id
app.get("/books/:id", async (req, res) => {
    try 
    {
        const {id} = req.params
        const book = await Book.findById(id)    
        return res.status(200).send(book)
    } 
    catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})
// Route for Update a Book
app.put("/books/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) 
        {
            return res.status(400).send({message: "Send all the required field"})
        } 
        const {id} = req.params
        const book = await Book.findByIdAndUpdate(id, req.body)

        if (!book) 
        {
            return res.status(400).json({message: "Book not found"})
        }
        else 
        {
            return res.status(200).send({message: "Book updated successfully"})
        }

    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})
mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to database")
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})