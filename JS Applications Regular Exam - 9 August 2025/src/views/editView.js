import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { hideNotification, showNotification } from "../utils/navigationUtil.js";
import { urlUtil } from "../utils/urlUtil.js";

const editTemplate = (tip) => html`
    <section id="edit">
        <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form class="edit-form" @submit="${onSubmit}">
            <input type="text" name="title" id="title" placeholder="Title" .value="${tip.title}" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value="${tip.imageUrl}" />
            <input type="text" name="type" id="type" placeholder="Type" .value="${tip.type}" />
            <select name="difficulty" id="difficulty" .value="${tip.difficulty}">
                <option value="" disabled selected>Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="50" .value="${tip.description}"></textarea>
            <button type="submit">Edit</button>
            </form>
        </div>
    </section>
`;

let context = null;
export async function showEditView(ctx) {
    const id = ctx.params.id;

    try {
        const tip = await request.getAsync(urlUtil.details + id);
        ctx.render(editTemplate(tip));
        hideNotification();
        context = ctx;
    } catch (error) {
        showNotification(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();
    const id = context.params.id;

    const formData = new FormData(e.target);
    let { title, imageUrl, type, difficulty, description } = Object.fromEntries(formData);

    if (!title || !imageUrl || !type || !difficulty || !description) {
        return showNotification('All input fields are required!');
    }

    try {
        await request.putAsync(urlUtil.details + id, { title, imageUrl, type, difficulty, description });
        hideNotification();
        e.target.reset();
        context.redirect(`/details/${id}`);
    } catch (error) {
        showNotification(error.message);
    }
}