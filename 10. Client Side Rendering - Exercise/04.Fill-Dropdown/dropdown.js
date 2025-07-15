import { html, render } from './node_modules/lit-html/lit-html.js'

const url = `http://localhost:3030/jsonstore/advanced/dropdown `;

const select = document.getElementById('menu');
const input = document.getElementById('itemText');
document.querySelector('input[type="submit"]').addEventListener('click', onSubmit);

const dropDownTemplate = (item) => html `
    <option value="${item._id}">${item.text}</option>
`;

addItem();

async function addItem() {
    let template = await loadTemplate();

    render(template, select);
}

async function loadItems() {
    let response = await fetch(url);
    let data = await response.json();

    return data;
}

async function loadTemplate() {
    let data = await loadItems();

    let result = Object.keys(data).map(x => dropDownTemplate(data[x]));
    return result;
}

async function onSubmit(e) {
    e.preventDefault();

    if (input.value.trim() == '') {
        return;
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: input.value
        })
    })

    input.value = '';

    if (response.ok) {
        await addItem();
    }
}