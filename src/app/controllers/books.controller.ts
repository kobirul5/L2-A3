import express from 'express'

export const booksRoutes = express.Router()

booksRoutes.get('/', (req,res)=>{
     res.status(201).json({
        success: true,
        message: "Book get successfully",
    })
})
