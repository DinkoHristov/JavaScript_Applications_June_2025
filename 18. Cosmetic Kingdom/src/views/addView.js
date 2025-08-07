import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const addTemplate = () => html`
    <section id="create">
        <div class="form">
        <h2>Add Product</h2>
        <form class="create-form" @submit="${onSubmit}">
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>
            <input type="text" name="price" id="product-price" placeholder="Price" />
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

    const formData = new FormData(e.target);
    let { name, imageUrl, category, description, price } = Object.fromEntries(formData);

    if (!name || !imageUrl || !category || !description || !price || isNaN(price)) {
        return alert('All fields are required!');
    }

    try {
        await request.postAsync(urlUtil.createProductPOST, { name, imageUrl, category, description, price });
        e.target.reset();
        context.redirect('/products');
    } catch (error) {
        alert(error.message);
    }
}