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
    if(value !== '') params
 }



}