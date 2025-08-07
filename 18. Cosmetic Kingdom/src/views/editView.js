import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const editTemplate = (product) => html`
    <section id="edit">
        <div class="form">
        <h2>Edit Product</h2>
        <form class="edit-form" @submit="${onSubmit}">
            <input type="text" name="name" id="name" placeholder="Product Name" .value="${product.name}" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value="${product.imageUrl}" />
            <input type="text" name="category" id="product-category" placeholder="Category" .value="${product.category}" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"cols="50" .value="${product.description}"></textarea>
            <input type="text" name="price" id="product-price" placeholder="Price" .value="${Number(product.price)}" />
            <button type="submit">post</button>
        </form>
        </div>
    </section>
`;

let context = null;
export async function showEditView(ctx) {
    const id = ctx.params.id;

    try {
        const product = await request.getAsync(urlUtil.productDetails + id);
        ctx.render(editTemplate(product));
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    const id = context.params.id;

    const formData = new FormData(e.target);
    let { name, imageUrl, category, description, price } = Object.fromEntries(formData);

    if (!name || !imageUrl || !category || !description || !price) {
        return alert('All fields are required!');
    }

    try {
        await request.putAsync(urlUtil.productDetails + id, { name, imageUrl, category, description, price });
        e.target.reset();
        context.redirect(`/details/${id}`);
    } catch (error) {
        alert(error.message);
    }
}