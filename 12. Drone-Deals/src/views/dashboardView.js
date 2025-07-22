import { html } from "../../node_modules/lit-html/lit-html.js";
import { request } from "../services/requestService.js";
import { url } from "../utils/url.js";


const marketplaceTemp = (drones) => html`
<h3 class="heading">Marketplace</h3>
${drones.length > 0 
    ? html`
        <section id="dashboard">
            ${drones.map(d => droneTemp(d))}
        </section>
    ` 
    : html`
        <h3 class="no-drones">No Drones Available</h3>
    `
}
`;

const droneTemp = (drone) => html`
<div class="drone">
    <img src="${drone.imageUrl}" alt="example1" />
    <h3 class="model">${drone.model}</h3>
    <div class="drone-info">
    <p class="price">Price: €${Number(drone.price)}</p>
    <p class="condition">Condition: ${drone.condition}</p>
    <p class="weight">Weight: ${Number(drone.weight)}g</p>
    </div>
    <a class="details-btn" href="/drones/${drone._id}">Details</a>
</div>
`;

let context = null;
export async function showDashboard(ctx) {
    try {
        let drones = await request.getAsync(url.dashboardGET);
        ctx.renderMain(marketplaceTemp(drones));
        context = ctx;
    } catch (error) {
        ctx.showNotification(error.message);
    }
}