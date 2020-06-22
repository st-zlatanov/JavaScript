import { get, post, put, del} from './requester.js';
const html = {
    'getAllBooks': () => document.getElementById('all-books')
};
const actions = {
'load-books': async function(){
    try{
        const books = await get('appdata', 'books');
        const booksContainer = html.getAllBooks();
        const fragment = document.createDocumentFragment();

        books.forEach(b => {
            const tr = document.createElement('tr');
            const titleTd = document.createElement('td');
            const authorTd = document.createElement('td');
            const isbnTd = document.createElement('td');
            const actionsTD = document.createElement('td');
            const editBtn = document.createElement('button');
            const delBtn = document.createElement('button');
            
            titleTd.textContent = b.title;
            authorTd.textContent = b.author;
            isbnTd.textContent = b.isbn;
            editBtn.textContent = 'Edit';
            editBtn.id = b._id;
            editBtn.addEventListener('click', this['edit-book']);
            
            delBtn.textContent = "Delete";
            delBtn.id = b._id;
            delBtn.addEventListener('click', this["delete-book"]);

            actionsTD.appendChild(editBtn);
            actionsTD.appendChild(delBtn);

            
            tr.append(titleTd, authorTd,isbnTd,actionsTD);
            fragment.appendChild(tr);

        });
        booksContainer.innerHTML = '';
        booksContainer.appendChild(fragment);
    }catch(err){
        alert(err);
    }
    
},
'create-book': async function(){},
'edit-book': async function(){
console.log(this);
},
'delete-book': async function(){}
};

function handleEvent(e){
    if(typeof actions[e.target.id]==='function'){
        actions[e.target.id]();
    }
}

(function attachEvents(){
    document.addEventListener('click', handleEvent);
}());
