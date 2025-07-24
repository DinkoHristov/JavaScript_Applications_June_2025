import { html } from '../../node_modules/lit-html/lit-html.js';
import { request } from '../services/requestService.js';
import { url } from '../utils/urls.js';

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
            : ``
        }
    </div>
</section>
`;

const allShowsTemplate = (shows) => html`
    ${shows.map(s => showTemplate(s))}
`;

const showTemplate = (show) => html`
<div class="show">
    <img src="${show.imageUrl}" />
    <div class="show">
    <h3 class="title">${show.title}</h3>
    <p class="genre">Genre: ${show.genre}</p>
    <p class="country-of-origin">Country of Origin: ${show.country}</p>
    <a class="details-btn" href="/details/${show._id}">Details</a>
</div>
`;

const emptyTemplate = () => html`
<div class="search-result">
    <p class="no-result">There is no TV show with this title</p>
</div>
`;

let context = null;
export async function showSearchView(ctx) {
    ctx.renderMain(searchTemplate());
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let search = formData.get('search');

    if (!search) {
        return alert('Please fill the search field with the desired title!');
    }

    const searchUrl = url.baseUrl + `/data/shows?where=title%20LIKE%20%22${search}%22`;

    try {
        let shows = await request.getAsync(searchUrl);
        let searchResultTemp = searchResultTemplate(shows);
        context.renderMain(searchTemplate(searchResultTemp));
        e.target.reset();
    } catch (error) {
        alert(error.message);
    }
}

function searchResultTemplate(shows) {
    if (shows == undefined || shows.length <= 0) {
        return emptyTemplate();
    }

    return allShowsTemplate(shows);
}