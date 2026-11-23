const BASE_URL = import.meta.env.VITE_API_URL;
async function request(path,{method ='GET', bodt,signal} = {}) {
    const options = {method,signal};
    if (body !== undefined){
        options.headers = {'Content-Type' : 'application/json'};
        options.body = JSON.stringify(body);
    }
const response = await fetch(`${BASE_URL}${path}`, options);
if (!response.ok){
    let message = `${response.status}`;
    try{
        const data = await response.json();
        if(data.error) message = data.error;
    } catch{

    }
    throw new Error(message);
}
if(response.status === 204) return null;

return response.json();    
}
export function getBooks(filters,signal){
 const params = new URLSearchParams();
 for(const [key,value] of Object.entries(filters)){
    if(value !== '') params.set(key,value);
 }
const query = params.toString();
return request (`/api/books${query ?` ?${query}` : ''}`,{signal});
}
export function getStats(signal){
    return request('/api/stats', {signal});
}
export function createBooks(book){
    return request('/api/books', {method: 'POST', body:book});
}
export function replaceBooks(id,book){
    return request(`/api/books/${id}`,{method: 'PUT', body:'book'});
}
export function updateBook(id,changed){
    return request(`/api/books/${id}`, {method: 'PATCH', body: changed});
}
export function deleteBook(id){
    return request(`/api/books/${id}`, {method: 'DELETE'});
}