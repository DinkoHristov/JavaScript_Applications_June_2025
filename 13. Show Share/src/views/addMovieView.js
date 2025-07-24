import { html } from '../../node_modules/lit-html/lit-html.js';
import { request } from '../services/requestService.js';
import { url } from '../utils/urls.js';

const addMovieTemplate = () => html`
<section id="create">
    <div class="form">
    <h2>Add Show</h2>
    <form class="create-form" @submit="${onSubmit}">
        <input type="text" name="title" id="title"placeholder="TV Show title" />
        <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
        <input type="text" name="genre" id="genre" placeholder="Genre" />
        <input type="text" name="country" id="country" placeholder="Country" />
        <textarea id="details" name="details" placeholder="Details" rows="2" cols="10"></textarea>
        <button type="submit">Add Show</button>
    </form>
    </div>
</section>
`;

let context = null;
export function showAddMovieView(ctx) {
    ctx.renderMain(addMovieTemplate());
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

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
        await request.postAsync(url.createShowPOST, { title, imageUrl, genre, country, details });
        e.target.reset();
        context.goTo('/shows');
    } catch (error) {
        alert(error.message);
    }
}