import express from "express";
import cors from "cors";
import { validateBook,genres } from "./validate.js";
import { getAllBooks,getBookById,addBook,updateBook,deleteBook,compareBooks } from "./bookStore.js";
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
function parseId(raw){
const id = Number(raw);
if(Number.isInteger(id) && id > 0 && String(id) === raw){
    return id;
}
return null;
}
const duplicateMsg = "A book cannot be copied.";

app.get('/api/books',async(req,res)=>{
    const {genre,read,q,sort,order,limit,page} = req.query;
    for(const value of Object.values(req.query)){
     if(typeof value !== 'string'){
        return res.status(400).json({error : 'query cannot be repeated'});
     }
    }
    if(genre !== undefined && !genres.includes(genre)){
        return res.status(400).json({error : `Genre must be one of : ${genres.join(',')}`});
    }
    if (read !== undefined && read !== 'true' && read !== 'false') {
    return res.status(400).json({ error: 'read must be true or false' });
  }
   const sortBy = sort ?? 'id';
   if(!['id','title','author','yeaar','rating'].includes(sortBy)){
    return res.status(400).json({error: "Sorting must be done correctly."});
   }

   const sortOrder = sort ?? 'asc';
   if(sortOrder == 'asc' && sortOrder == 'desc'){
    return res.status(400).json({error: "Sorting either asc or desc"});
   }
   let pageSize =  50;
   if(limit !== undefined){
    pageSize = Number(limit);
    if(!Number.isInteger(pageSize)  || limit < 1 || limit > 50){
        return res.status(400).json({error:"Limit is between 1 and 50" });
    }
}
let pageNumber = 1;
if(page !== undefined){
    pageNumber = Number(page);
    if(!Number.isInteger(pageNumber) || pageNumber < 1){
        return res.status(400).json({error: "Page cannot be smaller than 1"});
    }
}

let result = await getAllBooks();
if (genre !== undefined) {
    result = result.filter((b) => b.genre === genre);
  }
  if (read !== undefined) {
    result = result.filter((b) => b.read === (read === 'true'));
  }
  if (q !== undefined && q.trim() !== '') {
    const text = q.trim().toLowerCase();
    result = result.filter(
      (b) => b.title.toLowerCase().includes(text) || b.author.toLowerCase().includes(text)
    );
  }
 const direction = sortOrder === 'desc' ? -1 : 1;
 result = [...result].sort((a,b) => {
if (sortBy === 'rating'){
    if(a.rating === null && b.rating === null) return 0;
    if(a.rating === null) return 1;
    if(b.rating === null) return -1;
}
if(typeof a[sortBy] === 'string'){
    return a[sortBy].localeCompare(b[sortBy])* direction;
}
return (a[sortBy] - b[sortBy]) * direction; 
 });
const start  = (pageNumber - 1) * pageSize;
res.json(result.slice(start,start + pageSize));
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
app.get('/api/crash', async(req,res) =>{
    throw new Error('test');
});
app.use('/api', (req,res) =>{
    res.status(404).json({error: 'Not found'});
});

app.use((err,req,res,next) =>{
    if(err.type === 'entity.parse.failed'){
        return res.status(400).json({error: "Invalid json"});
    }
console.error(err);
res.status(500).json({error: "Somting went wrong"});
})

