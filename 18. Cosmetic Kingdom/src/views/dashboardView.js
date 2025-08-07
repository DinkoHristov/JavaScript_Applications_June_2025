import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const dashboardTemplate = (products) => html`
    <h2>Products</h2>
    ${products.length > 0
        ? html`
            <section id="dashboard">
                ${products.map(p => productTemplate(p))}
            </section>
        `
        : html`<h2>No products yet.</h2>`
    }
`;

const productTemplate = (product) => html`
    <div class="product">
        <img src="${product.imageUrl}" />
        <p class="title">${product.name}</p>
        <p><strong>Price:</strong><span class="price">${Number(product.price)}</span>$</p>
        <a class="details-btn" href="/details/${product._id}">Details</a>
    </div>
`;

export async function showDashboardView(ctx) {
    try {
        const products = await request.getAsync(urlUtil.allGET);
        ctx.render(dashboardTemplate(products));
    } catch (error) {
        alert(error.message);
    }
}