import express from "express";
import cors from "cors";
import { validateBook } from "./validate.js";
import { getAllBooks,getBookById,addBook,updateBook,deleteBook,compareBooks } from "./bookStore.js";
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());
const duplicateMsg = "A book cannot be copied.";

app.get('/api/books',async(req,res)=>{
    res.json(await getAllBooks());
});

app.get('/api/books/:id',async(req,res) =>{
    const id = parseId(req.params.id);
    if(id === null){
        return res.status(400).json({ error : "Id must be positive"});
    }
    const book = await getBookById(id);
    if(!book){
        return res.status(404).json({error : "No book with that id"});
    }
    res.json(book);
});

app.post('/api/books', async(req,res) =>{
    const {errors,book} = validateBook(req.body);
    if(errors.length > 0){
        return res.status(400).json({error: "No book"});
    }
    if(await compareBooks(book.title,book.author)){
        return res.status(409).json({error: duplicateMsg});
    }
    const create = await addBook(book);
    res.status(201).location(`/api/books/${created.id}`).json(create);
});
