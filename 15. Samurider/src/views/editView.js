import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";


const editTemplate = (item) => html`
    <section id="edit">
        <h2>Edit Motorcycle</h2>
        <div class="form">
            <h2>Edit Motorcycle</h2>
            <form class="edit-form" @submit="${onSubmit}">
                <input type="text" name="model" id="model" placeholder="Model" .value="${item.model}" />
                <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" .value="${item.imageUrl}" />
                <input type="number" name="year" id="year" placeholder="Year" .value="${item.year}" />
                <input type="number" name="mileage" id="mileage" placeholder="mileage" .value="${item.mileage}" />
                <input type="number" name="contact" id="contact" placeholder="contact" .value="${item.contact}" />
                <textarea id="about" name="about" placeholder="about" rows="10" cols="50" .value="${item.about}"></textarea>
                <button type="submit">Edit Motorcycle</button>
            </form>
        </div>
    </section>
`;

let context = null;
export async function showEditView(ctx) {
    const id = ctx.params.id;

    try {
        let motorcycle = await request.getAsync(urlUtil.showDetails + id);
        ctx.render(editTemplate(motorcycle));
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    const id = context.params.id;

    let formData = new FormData(e.target);
    let { model, imageUrl, year, mileage, contact, about } = Object.fromEntries(formData);

    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
        return alert('All input fields are required!');
    }

    try {
        await request.putAsync(urlUtil.showDetails + id, { model, imageUrl, year, mileage, contact, about });
        e.target.reset();
        context.redirect(`/details/${id}`);
    } catch (error) {
        alert(error.message);
    }
}