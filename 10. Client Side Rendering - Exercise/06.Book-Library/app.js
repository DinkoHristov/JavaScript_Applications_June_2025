import { html, render } from './node_modules/lit-html/lit-html.js'

const url = `http://localhost:3030/jsonstore/collections/books`;
const bookUrl = `http://localhost:3030/jsonstore/collections/books/`;

const tableRoot = document.getElementById('tableRoot');
const formRoot = document.getElementById('formRoot');

const tableTemplate = (books) => html `
    <button id="loadBooks" @click="${onLoad}">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>${books}</tbody>
    </table>
`;

const bookTemplate = (book) => html `
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button data-id="${book.id}" @click="${onEdit}">Edit</button>
            <button data-id="${book.id}" @click="${onDelete}">Delete</button>
        </td>
    </tr>
`;

const addFormTemplate = () => html `
    <form id="add-form" @submit="${onAddFormSubmit}">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
`;

const editFormTemplate = (book, bookId) => html `
    <form id="edit-form" @submit="${onEditFormSubmit}">
        <input type="hidden" name="id" value="${bookId}">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" value="${book.title}" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" value="${book.author}" placeholder="Author...">
        <input type="submit" value="Save">
    </form>
`;

onStartWithLoadBtn();

function onStartWithLoadBtn() {
    render(tableTemplate([]), tableRoot);
    loadAddForm();
}

async function onStart() {
    let booksTemp = await loadAllBooks();
    render(tableTemplate(booksTemp), tableRoot);
    loadAddForm();
}

async function onEdit(e) {
    e.preventDefault();

    let bookId = e.target.dataset.id;

    let response = await fetch(bookUrl + bookId);
    let book = await response.json();

    render(editFormTemplate(book, bookId), formRoot);
}

async function onDelete(e) {
    e.preventDefault();

    let bookId = e.target.dataset.id;

    await fetch(bookUrl + bookId, {
        method: 'DELETE'
    });

    await onStart();
}

async function onAddFormSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let { title, author } = Object.fromEntries(formData);

    if (!title || !author) {
        return;
    }

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author,
            title
        })
    });

    e.target.reset();
    await onStart();
}

async function onEditFormSubmit(e) {
    e.preventDefault();

    let input = document.querySelector('input[name="id"]');
    let bookId = input.value;

    let formData = new FormData(e.target);
    let { title, author } = Object.fromEntries(formData);

    if (!title || !author) {
        return;
    }

    await fetch(bookUrl + bookId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author,
            title
        })
    });

    e.target.reset();
    await onStart();
}

async function onLoad(e) {
    e.preventDefault();

    let booksTemp = await loadAllBooks();
    render(tableTemplate(booksTemp), tableRoot);
}

async function loadAllBooks() {
    let response = await fetch(url);
    let data = await response.json();

    let result = Object.keys(data).map(b => {
        let book = data[b];
        return bookTemplate({
            title: book.title,
            author: book.author,
            id: b
        });
    });
    return result;
}

function loadAddForm() {
    render(addFormTemplate(), formRoot);
}