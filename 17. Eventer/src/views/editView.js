import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const editTemplate = (event) => html`
    <section id="edit">
        <div class="form">
        <h2>Edit Event</h2>
        <form class="edit-form" @submit="${onSubmit}">
            <input type="text" name="name" id="name" placeholder="Event" .value="${event.name}" />
            <input type="text" name="imageUrl" id="event-image" placeholder="Event Image" .value="${event.imageUrl}" />
            <input type="text" name="category" id="event-category" placeholder="Category" .value="${event.category}" />
            <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50" .value="${event.description}"></textarea>
            <label for="date-and-time">Event Time:</label>
            <input type="text" name="date" id="date" placeholder="When?" .value="${event.date}" />
            <button type="submit">Edit</button>
        </form>
        </div>
    </section>
`;

let context = null;
export async function showEditView(ctx) {
    const id = ctx.params.id;

    try {
        const event = await request.getAsync(urlUtil.eventDetails + id);
        ctx.render(editTemplate(event));
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    const id = context.params.id;
    
    let formData = new FormData(e.target);
    let { name, imageUrl, category, description, date } = Object.fromEntries(formData);

    if (!name || !imageUrl || !category || !description || !date) {
        return alert('Input fields are required!');
    }

    try {
        await request.putAsync(urlUtil.eventDetails + id, { name, imageUrl, category, description, date });
        e.target.reset();
        context.redirect(`/details/${id}`);
    } catch (error) {
        alert(error.message);
    }
}