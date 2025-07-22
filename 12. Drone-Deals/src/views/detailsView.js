import { html } from "../../node_modules/lit-html/lit-html.js";
import { request } from "../services/requestService.js";
import { userService } from "../services/userService.js";
import { url } from "../utils/url.js";

const detailsTemp = (drone) => html`
<section id="details">
    <div id="details-wrapper">
        <div>
            <img id="details-img" src="${drone.imageUrl}" alt="example1" />
            <p id="details-model">${drone.model}</p>
            </div>
            <div id="info-wrapper">
            <div id="details-description">
                <p class="details-price">Price: €${Number(drone.price)}</p>
                <p class="details-condition">Condition: ${drone.condition}</p>
                <p class="details-weight">Weight: ${Number(drone.weight)}g</p>
                <p class="drone-description">${drone.description}</p>
                <p class="phone-number">Phone: ${drone.phone}</p>
            </div>
            <div class="buttons" style="display: ${isOwner(drone._ownerId)}">
                <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
                <a href="/delete/${drone._id}" id="delete-btn">Delete</a>
            </div>
        </div>
    </div>
</section>
`;

export async function showDetailsView(ctx) {
    const id = ctx.params.id;

    try {
        let drone = await request.getAsync(url.droneDetailsGET + id);
        ctx.renderMain(detailsTemp(drone));
    } catch (error) {
        ctx.showNotification(error.message);
    }
}

function isOwner(ownerId) {
    let userId = userService.getUserId();

    return ownerId === userId ? 'block' : 'none';
}