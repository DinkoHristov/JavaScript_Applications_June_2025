import { cats } from './catSeeder.js'
import { html, render } from './node_modules/lit-html/lit-html.js'

const root = document.getElementById('allCats');

const ulTemplate = () => html `
    <ul>
        ${cats.map(c => catTemplate(c))}
    </ul>
`;

const catTemplate = (cat) => html `
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onClick}>Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
`;

render(ulTemplate(), root);

function onClick(e) {
    e.preventDefault();

    let div = e.target.parentElement.querySelector('div');
    
    let currentStyle = div.style.display;

    e.target.textContent = currentStyle == 'block' ? 'Show status code' : 'Hide status code';
    div.style.display = currentStyle == 'none' ? 'block' : 'none';
}