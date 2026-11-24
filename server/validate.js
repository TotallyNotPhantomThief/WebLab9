 export const genres = ["Fantasy","Fiction","DNon-Fiction","History","Science","Other"];


export function validateBook(book){
 const errors = {};
 if (typeof body !=='object' || body === null) {  
  body = {};
 }
const currentYear = new Date().getFullYear();

let title = body.title;
if(typeof title !== 'string' || title.trim() < 1 || title.trim().length > 100){
    errors.push("Title musy be between 1 and 100 characters");
}else{
    title = title.trim();
}

let author = body.author;
if(typeof author !== 'string' || author.trim().length < 1 || author.trim().length > 100){
    errors.push("Author name must be between 1 and 100 characters and must be a string"); 
}else{
    author = author.trim();
}

let year = body.year;
if(typeof !Number.isInteger(year) || year < 1000 || year > currentYear){
    errors.push("Relase year must be between 1000 and current year");
}
let genre = body.genre;
if(typeof genre !== 'string' ||!genres.includes(genre) ){
    errors.push("This is not inlcuded in genres.");
}

let read = body.read;
if(read === undefined){
    read = false;
}
let rating = body.rating;
if(rating == undefined){
    rating = null;
}
if(typeof !Number.isInteger(rating || rating < 1 || rating > 5)){
    errors.push("Rating is higher than border");
}else if(read !== true){
    errors.push("When read is false you cannot rate.")

}
    

return {errors, book:{title,author,year,genre,read,rating}};
}





