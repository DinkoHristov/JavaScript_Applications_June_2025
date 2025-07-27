import { html, nothing } from '../libs.js';
import { request } from '../services/requestService.js';
import { urlUtil } from '../utils/urlUtil.js';

const searchTemplate = (searchResultTemplate) => html`
    <section id="search">
        <div class="form">
        <h4>Search</h4>
        <form class="search-form" @submit="${onSubmit}">
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
        </form>
        </div>
        <h4 id="result-heading">Results:</h4>
        <div class="search-result">
            ${searchResultTemplate != undefined
                ? searchResultTemplate
                : nothing
            }
        </div>
    </section>
`;

const allMotorcyclesTemplate = (motorcycles) => html`
    ${motorcycles.map(m => motorcycleTemplate(m))}
`;

const motorcycleTemplate = (item) => html`
    <div class="motorcycle">
        <img src="${item.imageUrl}" />
        <h3 class="model">${item.model}</h3>
        <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
`;

const emptyTemplate = () => html`
    <div class="search-result">
        <h2 class="no-avaliable">No result.</h2>
    </div>
`;

let context = null;
export async function showSearchView(ctx) {
    ctx.render(searchTemplate());
    context = ctx;
}

function searchResultTemplate(motorcycles) {
    if (motorcycles == undefined || motorcycles.length <= 0) {
        return emptyTemplate();
    }

    return allMotorcyclesTemplate(motorcycles);
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let search = formData.get('search');

    if (!search) {
        return alert('Please fill the search field with the desired title!');
    }

    try {
        let motorcycles = await request.getAsync(urlUtil.searchGET(search));
        let searchResultTemp = searchResultTemplate(motorcycles);
        context.render(searchTemplate(searchResultTemp));
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
}