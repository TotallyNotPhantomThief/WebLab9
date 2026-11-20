let books = [
    { id: 1 , title: "Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, genre: "Fantasy",read: true, rating: 5},
    { id: 2 , title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction",read: false, rating: 4},
     { id: 3 , title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian",read: true, rating: 5},
    { id: 4 , title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance",read: false, rating: 4},
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