import { html } from "../../node_modules/lit-html/lit-html.js"
import { request } from "../services/requestService.js";
import { url } from "../utils/url.js";


const editTemp = (drone) => html`
<section id="edit">
    <div class="form form-item">
        <h2>Edit Offer</h2>
        <form class="edit-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" .value="${drone.model}" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value="${drone.imageUrl}" />
            <input type="number" name="price" id="price" placeholder="Price" .value="${Number(drone.price)}" />
            <input type="number" name="weight" id="weight" placeholder="Weight" .value="${Number(drone.weight)}" />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" .value="${drone.phone}" />
            <input type="text" name="condition" id="condition" placeholder="Condition" .value="${drone.condition}" />
            <textarea name="description" id="description" placeholder="Description" .value="${drone.description}" ></textarea>
            <button type="submit">Edit</button>
        </form>
    </div>
</section>
`;

let context = null;
export async function showEditView(ctx) {
    try {
        let id = ctx.params.id;

        let drone = await request.getAsync(url.editDronePUT + id);
        ctx.renderMain(editTemp(drone));
        ctx.hideNotification();
        document.querySelector('.edit-form').addEventListener('submit', onSubmit);
        context = ctx;
    } catch (error) {
        ctx.showNotification(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    let id = context.params.id;
    let formData = new FormData(e.target);
    let { model, imageUrl, price, weight, phone, condition, description } = Object.fromEntries(formData);

    if (!model || !imageUrl || ! price || !weight ||
        !phone || !condition || !description) {
            return context.showNotification('Fill all input fields');
    }

    try {
        await request.putAsync(url.editDronePUT + id, { model, imageUrl, price, weight, phone, condition, description });
        e.target.reset();
        context.hideNotification();
        context.redirectTo(`/drones/${id}`);
    } catch (error) {
        context.showNotification(error.message);
    }
}