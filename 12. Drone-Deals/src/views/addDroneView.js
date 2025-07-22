import { html } from "../../node_modules/lit-html/lit-html.js";
import { request } from "../services/requestService.js";
import { url } from "../utils/url.js";


const addTemp = () => html`
<section id="create">
    <div class="form form-item">
        <h2>Add Drone Offer</h2>
            <form class="create-form">
            <input type="text" name="model" id="model" placeholder="Drone Model" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="number" name="price" id="price" placeholder="Price" />
            <input type="number" name="weight" id="weight" placeholder="Weight" />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description"></textarea>
            <button type="submit">Add</button>
            </form>
    </div>
</section>
`;

let context = null;
export function showAddDroneView(ctx) {
    ctx.renderMain(addTemp());
    document.querySelector('.create-form').addEventListener('submit', onSubmit);
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let { model, imageUrl, price, weight, phone, condition, description } = Object.fromEntries(formData);

    if (!model || !imageUrl || ! price || !weight ||
        !phone || !condition || !description) {
            return context.showNotification('Fill all input fields');
    }

    try {
        await request.postAsync(url.addDronePOST, { model, imageUrl, price, weight, phone, condition, description });
        e.target.reset();
        context.hideNotification();
        context.redirectTo('/marketplace');
    } catch (error) {
        context.showNotification(error.message);
    }
}