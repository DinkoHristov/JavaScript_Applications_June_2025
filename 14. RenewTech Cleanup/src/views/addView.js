import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { url } from "../utils/urls.js";

const addTemplate = () => html`
    <section id="create">
        <div class="form">
        <img class="border" src="./images/border.png" alt="" />
        <h2>Add Solution</h2>
        <form class="create-form" @submit="${onSubmit}">
            <input type="text" name="type" id="type" placeholder="Solution Type" />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
            <textarea id="more-info" name="more-info" placeholder="more Info" rows="2" cols="10"></textarea>
            <button type="submit">Add Solution</button>
        </form>
        </div>
    </section>
`;

let context = null;
export function showAddView(ctx) {
    ctx.render(addTemplate());
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let type = formData.get('type');
    let imageUrl = formData.get('image-url');
    let description = formData.get('description');
    let learnMore = formData.get('more-info');

    if (!type || !imageUrl || !description || !learnMore) {
        return alert('All fields are required!');
    }

    try {
        await request.postAsync(url.createSolutionPOST, { type, imageUrl, description, learnMore });
        e.target.reset();
        context.redirect('/solutions');
    } catch (error) {
        alert(error.message);
    }
}