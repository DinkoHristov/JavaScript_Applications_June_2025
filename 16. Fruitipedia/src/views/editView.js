import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const editTemplate = (fruit) => html`
    <section id="edit">
        <div class="form">
        <h2>Edit Fruit</h2>
        <form class="edit-form" @submit="${onSubmit}">
            <input type="text" name="name" id="name" placeholder="Fruit Name" .value="${fruit.name}" />
            <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image URL" .value="${fruit.imageUrl}" />
            <textarea id="fruit-description" name="description" placeholder="Description" rows="10" cols="50" .value="${fruit.description}"></textarea>
            <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50" .value="${fruit.nutrition}"></textarea>
            <button type="submit">post</button>
        </form>
        </div>
    </section>
`;

let context = null;
export async function showEditView(ctx) {
    const id = ctx.params.id;
    
    try {
        const fruit = await request.getAsync(urlUtil.details + id);
        ctx.render(editTemplate(fruit)); 
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    const id = context.params.id;

    const formData = new FormData(e.target);
    let { name, imageUrl, description, nutrition } = Object.fromEntries(formData);

    if (!name || !imageUrl || !description || !nutrition) {
        return alert('All fields are required!');
    }

    try {
        await request.putAsync(urlUtil.details + id, { name, imageUrl, description, nutrition });
        e.target.reset();
        context.redirect(`/details/${id}`);
    } catch (error) {
        alert(error.message);
    }
}