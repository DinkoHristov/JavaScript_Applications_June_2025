import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";


const dashboardTemplate = (motorcycles) => html`
    <h2>Available Motorcycles</h2>
    <section id="dashboard">
        ${motorcycles.length > 0 
            ? motorcycles.map(m => motorcycleTemplate(m))
            : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`
        }
    </section>
`;

const motorcycleTemplate = (item) => html`
    <div class="motorcycle">
        <img src="${item.imageUrl}" alt="example1" />
        <h3 class="model">${item.model}</h3>
        <p class="year">Year: ${item.year}</p>
        <p class="mileage">Mileage: ${item.mileage} km.</p>
        <p class="contact">Contact Number: ${item.contact}</p>
        <a class="details-btn" href="/details/${item._id}">More Info</a>
    </div>
`;

export async function showDashboardView(ctx) {
    try {
        let motorcycles = await request.getAsync(urlUtil.allGET);
        ctx.render(dashboardTemplate(motorcycles));
    } catch (error) {
        alert(error.message);
    }
}