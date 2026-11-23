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

app.put('/api/books/:id', async(req,res) => {
    const id = parseId(req.params.id);
    if(id === null){
        return res.status(400).json({error : "Id must be positive"});
    }
    const exist = await getBookById(id);
    if(!exist){
        return res.status(404).json({error: "No book with that id"});
    }

    const  {errors,book} = validateBook(req.body);
    if(errors.length > 0){
        return res.status(400).json({error: errors.join(';')});
    }
    if(await compareBooks(book.title,book.author, id)){
       return res.status(409).json({error: "It already exists"});
    }
    res.json(await updateBook(id,book));
});

app.patch('/api/books/:id', async(req,res)=>{
const id = parseId(req.params.id);
if( id === null){
    return res.status(400).json({error: "Id must be positive"});
}
const exist = await getBookById(id);
if(!exist){
    return res.status(404).json({error: "No book with that id exists"});
}
const {errors,book} = validateBook({...exist,...req.body});
if(errors.length > 0){
    return res.status(400).json({error : errors.join(';')});
}
if (await compareBooks(book.title, book.author, id)){
    return res.status(409).json({error : duplicateMsg});
}
 res.json(await updateBook(id,book))
});

app.delete('/api/books/:id', async(req,res)=>{
const id = parseId(req.params.id);
if(id === null){
    return res.status(400).json({error: "Id must be postitive"});
}

const deleted = await deleteBook(id);
if(!deleted){
    return res.status(404).json({error: "No book like that here"});
}
res.status(204).end();
});

app.get('/api/stats', async (req,res)=>{
const booklist = await getAllBooks();
const readOnes = booklist.filter((b) => b.read).length;
const ratings = bookslist.filter((b)=>b.rating !== null);
const avarageRate = ratings.lenght === 0 
? null :  (ratings.reduce((sum,b)=> sum + b.rating,0)) / ratings.lenght;
const genre = books.reduce(
    (acc,b) => ({...acc, [b.genre]: (acc[b.genre] || 0) + 1}),
    {}   
);
res.json(
    {total : booklist.length,
    read: readOnes,
    unread: bookslist.lenght - readOnes,
    avarageRating: avarageRate,
    byGenre: genre
    }
);
});


