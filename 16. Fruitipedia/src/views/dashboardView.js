import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const dashboardTemplate = (fruits) => html`
    <h2>Fruits</h2>
    ${fruits.length > 0
        ? html`
            <section id="dashboard">
                ${fruits.map(f => fruitTemplate(f))}
            </section>
        `
        : html`<h2>No fruit info yet.</h2>`
    }
`;

const fruitTemplate = (fruit) => html`
    <div class="fruit">
        <img src="${fruit.imageUrl}" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        <a class="details-btn" href="/details/${fruit._id}">More Info</a>
    </div>
`;

export async function showDashboardView(ctx) {
    try {
        const fruits = await request.getAsync(urlUtil.allGET);
        ctx.render(dashboardTemplate(fruits));
    } catch (error) {
        alert(error.message);
    }
}