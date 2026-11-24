import {GENRES} from './BookForm.jsx';
export default function Filters({filters,onChange}){
function handleChange(e){
onChange({...filters,[e.target.name]: e.target.value});
}
return(
<div>
<input
name="q"
placeholder='Search title or author'
value={filters.q}
onChange={handleChange}
/>
<select name='genre' value={filters.genre} onChange={handleChange}>
<option value={""}>All genres</option>
{GENRES.map((g)=>(
    <option key = {g} value={g}>{g}</option>
))}
</select>
<select name='read' value={filters.read} onChange={handleChange}>
<option value= ""> Read and unread</option>
<option value="true">Read</option>
<option value="false">Unread</option>
</select>
<select name = "sort" value={filters.sort} onChange={handleChange}>
<option value="">Sort by id</option>
<option value="title">Title</option>
<option value="author">Author</option>
<option value="year">Year</option>
<option value="rating">Rating</option>
</select>
 <select name="order" value={filters.order} onChange={handleChange}>
<option value="asc">Ascending</option>
<option value="desc">Descending</option>
</select>
</div>

);
}