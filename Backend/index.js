import express from "express"
import { MONGO_DB_URL, PORT } from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"

const app = express()
app.use(express.json()) // Middleware to parse request body

app.get("/", (req,res) =>{
    console.log(req)
    return res.status(200).send("Welcome to MERN stack")
})
// Get all books
app.get("/books", async (req, res) =>{
    try
    {
        const books = await Book.find()
        return res.status(200).json({
            count : books.length,
            data: books
        })
    }
    catch (error)
    {
        console.log(error.message)
        return res.status(500).send({message: error.message})
    }
})

// Post a book to the database from the request
app.post("/books", async (req, res)=>{
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear)
        {
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
    catch (error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

mongoose
    .connect(MONGO_DB_URL)
    .then(()=>{
        console.log("Connected to the database")
        // Only listen if the connection to the database is successful
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`)
        })

    })
    .catch((error)=>{
        console.log(error)
    })
