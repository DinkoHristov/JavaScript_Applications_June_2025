import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { url } from "../utils/urls.js";


const editTemplate = (item) => html`
    <section id="edit">
        <div class="form">
        <img class="border" src="/images/border.png" alt="" />
        <h2>Edit Solution</h2>
        <form class="edit-form" @submit="${onSubmit}">
            <input type="text" name="type" id="type" placeholder="Solution Type" .value="${item.type}" />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value="${item.imageUrl}" />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10" .value="${item.description}"></textarea>
            <textarea id="more-info" name="more-info" placeholder="more Info" rows="2" cols="10" .value="${item.learnMore}"></textarea>
            <button type="submit">Edit</button>
        </form>
        </div>
    </section>
`;

let context = null;
export async function showEditView(ctx) {
    let id = ctx.params.id;

    try {
        let solution = await request.getAsync(url.showDetails + id);
        ctx.render(editTemplate(solution));
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    const id = context.params.id;

    let formData = new FormData(e.target);
    let type = formData.get('type');
    let imageUrl = formData.get('image-url');
    let description = formData.get('description');
    let learnMore = formData.get('more-info');

    if (!type || !imageUrl || !description || !learnMore) {
        return alert('All fields are required!');
    }

    try {
        await request.putAsync(url.showDetails + id, { type, imageUrl, description, learnMore });
        e.target.reset();
        context.redirect(`/details/${id}`);
    } catch (error) {
        alert(error.message);
    }
}