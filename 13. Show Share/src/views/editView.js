import { html } from '../../node_modules/lit-html/lit-html.js';
import { request } from '../services/requestService.js';
import { url } from '../utils/urls.js';

const editTemplate = (show) => html`
<section id="edit">
    <div class="form">
    <h2>Edit Show</h2>
    <form class="edit-form" @submit="${onSubmit}">
        <input type="text" name="title" id="title" placeholder="TV Show title" .value="${show.title}" />
        <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value="${show.imageUrl}" />
        <input type="text" name="genre" id="genre" placeholder="Genre" .value="${show.genre}" />
        <input type="text" name="country" id="country" placeholder="Country" .value="${show.country}" />
        <textarea id="details" name="details" placeholder="Details" rows="2" cols="10" .value="${show.details}" ></textarea>
        <button type="submit">Edit Show</button>
    </form>
    </div>
</section>
`;

let context = null;
export async function showEditView(ctx) {
    let id = ctx.params.id;
    context = ctx;

    try {
        let show = await request.getAsync(url.showDetails + id);
        ctx.renderMain(editTemplate(show));
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    let id = context.params.id;

    let formData = new FormData(e.currentTarget);
    let title = formData.get('title');
    let imageUrl = formData.get('image-url');
    let genre = formData.get('genre');
    let country = formData.get('country');
    let details = formData.get('details');

    if (!title || !imageUrl || !genre || !country || !details) {
        return alert('All input fields are required!');
    }

    try {
        await request.putAsync(url.showDetails + id, { title, imageUrl, genre, country, details });
        e.target.reset();
        context.goTo(`/details/${id}`);
    } catch (error) {
        alert(error.message);
    }
}