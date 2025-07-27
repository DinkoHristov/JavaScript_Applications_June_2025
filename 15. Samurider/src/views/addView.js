import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const addTemplate = () => html`
    <section id="create">
        <h2>Add Motorcycle</h2>
        <div class="form">
        <h2>Add Motorcycle</h2>
        <form class="create-form" @submit="${onSubmit}">
            <input type="text" name="model" id="model" placeholder="Model" />
            <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" />
            <input type="number" name="year" id="year" placeholder="Year" />
            <input type="number" name="mileage" id="mileage" placeholder="mileage" />
            <input type="number" name="contact" id="contact" placeholder="contact" />
            <textarea id="about" name="about" placeholder="about" rows="10" cols="50" ></textarea>
            <button type="submit">Add Motorcycle</button>
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
    let { model, imageUrl, year, mileage, contact, about } = Object.fromEntries(formData);

    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
        return alert('All input fields are required!');
    }

    try {
        await request.postAsync(urlUtil.addPOST, { model, imageUrl, year, mileage, contact, about });
        e.target.reset();
        context.redirect('/dashboard');
    } catch (error) {
        alert(error.message);
    }
}