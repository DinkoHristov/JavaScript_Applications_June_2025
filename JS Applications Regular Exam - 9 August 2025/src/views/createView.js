import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { hideNotification, showNotification } from "../utils/navigationUtil.js";
import { urlUtil } from "../utils/urlUtil.js";

const createTemplate = () => html`
    <section id="create">
        <div class="form form-item">
            <h2>Share Your Tip</h2>
            <form class="create-form" @submit="${onSubmit}">
            <input type="text" name="title" id="title" placeholder="Title" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="text" name="type" id="type" placeholder="Type" />
            <select name="difficulty" id="difficulty">
                <option value="" disabled selected>Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="50"></textarea>
            <button type="submit">Add</button>
            </form>
        </div>
    </section>
`;

let context = null;
export function showCreateView(ctx) {
    ctx.render(createTemplate());
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let { title, imageUrl, type, difficulty, description } = Object.fromEntries(formData);

    if (!title || !imageUrl || !type || !difficulty || !description) {
        return showNotification('All input fields are required!');
    }

    try {
        await request.postAsync(urlUtil.createPOST, { title, imageUrl, type, difficulty, description });
        hideNotification();
        e.target.reset();
        context.redirect('/dashboard');
    } catch (error) {
        showNotification(error.message);
    }
}