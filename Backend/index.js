import express from "express"
import { MONGO_DB_URL, PORT } from "./config.js"
import mongoose from "mongoose"

const app = express()

app.get("/", (req,res) =>{
    console.log(req)
    return res.status(200).send("Welcome to MERN stack")
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
