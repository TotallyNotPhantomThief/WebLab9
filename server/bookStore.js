let books = [
    { id: 1 , title: "Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, genre: "Fantasy",read: true, rating: 5},
    {id: 2, title: "Nutuk", author: "M.K. Atatürk", year: 1927, genre: "Non-Fiction", read: true, rating: 5},
    {id: 3, title: "Çankaya", author: "F.R. Atay", year: 1968, genre: "History", read: false, rating: 3 },
    { id: 4 , title: "Cosmos", author: "Carl Sagan", year: 1980, genre: "Science",read: false, rating: 4},
    { id: 5 , title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction",read: true, rating: 5},
    { id: 6 , title: "Blood Meridian", author: "Cormac McCarthy", year: 1985, genre: "Western",read: false, rating: 4}
];
let nextId = 7;
const delay = (ms= 20) => new Promise((resolve)=> setTimeout(resolve, ms));
export async function getAllBooks() {
    await delay();
    return [...books];
}

export async function getBookById(id) {
    await delay();
    return books.find((b) => b.id === id) ?? null;
}

export async function addBook(book){
    await delay();
    const newBook = {...book, id: nextId++};
    books = [...books, newBook];
    return newBook;
}

export async function updateBook(id,updatedBook){
    await delay();
    const existingBook = books.find((b) => b.id === id);
    if(!existingBook) return null;
    const updated = {...updatedBook, id};
    books = books.map((b)=> b.id === id ? updated : b);
    return updated;
}

export async function deleteBook(id){
    await delay();
    const existingBook = books.find((b)=> b.id === id);
    if(!existingBook) return false;
    books = books.filter((b)=> b.id !== id);
    return true;
}

export async function compareBooks(title,author,exludedId = null){
    await delay();
    const t = title.trim().toLowerCase();
    const a = author.trim().toLowerCase();
    return (books.find((b)=> b.id !== exludedId &&
    b.title.trim().toLowerCase() === t &&
    b.author.trim().toLowerCase() === a) ?? null );
    
}




