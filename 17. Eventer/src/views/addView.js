import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const addTemplate = () => html`
    <section id="create">
        <div class="form">
        <h2>Add Event</h2>
        <form class="create-form" @submit="${onSubmit}">
            <input type="text" name="name" id="name" placeholder="Event" />
            <input type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" />
            <input type="text" name="category" id="event-category" placeholder="Category" />
            <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>
            <input type="text" name="date" id="date" placeholder="When?" />
        <button type="submit">Add</button>
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
    let { name, imageUrl, category, description, date } = Object.fromEntries(formData);

    if (!name || !imageUrl || !category || !description || !date) {
        return alert('Input fields are required!');
    }

    try {
        await request.postAsync(urlUtil.createEventPOST, { name, imageUrl, category, description, date });
        e.target.reset();
        context.redirect('/events');
    } catch (error) {
        alert(error.message);
    }
}