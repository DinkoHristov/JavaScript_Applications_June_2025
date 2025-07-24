import { html } from '../../node_modules/lit-html/lit-html.js';
import { request } from '../services/requestService.js';
import { url } from '../utils/urls.js';

const showTemplate = (movies) => html`
<h2>Users Recommendations</h2>
<section id="shows">
    ${movies.length > 0 
        ? movies.map(m => movieTemplate(m))
        : html`<h2 id="no-show">No shows Added.</h2>`
    }
`;

const movieTemplate = (movie) => html`
<div class="show">
    <img src="${movie.imageUrl}" />
    <div class="show-info">
        <h3 class="title">${movie.title}</h3>
        <p class="genre">Genre: ${movie.genre}</p>
        <p class="country-of-origin">Country of Origin: ${movie.country}</p>
        <a class="details-btn" href="/details/${movie._id}">Details</a>
    </div>
</div>
`;

export async function showMoviesView(ctx) {
    try {
        let movies = await request.getAsync(url.allShowsGET);
        ctx.renderMain(showTemplate(movies));
    } catch (error) {
        alert(error.message);
    }
}