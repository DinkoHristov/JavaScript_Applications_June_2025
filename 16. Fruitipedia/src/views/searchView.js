import { html, nothing } from '../libs.js';
import { request } from '../services/requestService.js';
import { urlUtil } from '../utils/urlUtil.js';

const searchTemplate = (searchResultTemplate) => html`
    <section id="search">
        <div class="form">
            <h2>Search</h2>
            <form class="search-form" @submit="${onSubmit}">
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
        </div>
        <h4>Results:</h4>
        <div class="search-result">
            ${searchResultTemplate != undefined
                ? searchResultTemplate
                : nothing
            }
        </div>
    </section>
`;

const allFruisTemplate = (fruits) => html`
    ${fruits.map(f => fruitTemplate(f))}
`;

const fruitTemplate = (fruit) => html`
    <div class="fruit">
        <img src="${fruit.imageUrl}" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        <a class="details-btn" href="/details/${fruit._id}">More Info</a>
    </div>
`;

const emptyTemplate = () => html`
    <div class="search-result">
        <p class="no-result">No result.</p>
    </div>
`;

let context = null;
export async function showSearchView(ctx) {
    ctx.render(searchTemplate());
    context = ctx;
}

function searchResultTemplate(fruits) {
    if (fruits == undefined || fruits.length <= 0) {
        return emptyTemplate();
    }

    return allFruisTemplate(fruits);
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let search = formData.get('search');

    if (!search) {
        return alert('Please fill the search field with the desired title!');
    }

    try {
        let fruits = await request.getAsync(urlUtil.searchGET(search));
        let searchResultTemp = searchResultTemplate(fruits);
        context.render(searchTemplate(searchResultTemp));
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
}