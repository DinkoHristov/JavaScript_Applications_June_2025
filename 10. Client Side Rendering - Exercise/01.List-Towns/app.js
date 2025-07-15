import { html, render } from './node_modules/lit-html/lit-html.js'

const root = document.getElementById('root');
const input = document.getElementById('towns');

document.getElementById('btnLoadTowns').addEventListener('click', onLoad);

const townTemplate = () => {
    return html `
        <ul>
            ${input.value.split(', ').map(x => html`<li>${x}</li>`)}
        </ul>
    `;
}

function onLoad(e) {
    e.preventDefault();

    render(townTemplate(), root);
    input.value = '';
}