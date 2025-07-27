import { html, nothing } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";
import { userUtil } from "../utils/userUtil.js";

const detailsTemplate = (item, isCreator) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" />
            <p id="details-title">${item.model}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="year">Year: ${item.year}</p>
                    <p class="mileage">Mileage: ${item.mileage} km.</p>
                    <p class="contact">Contact Number: ${item.contact}</p>
                    <p id="motorcycle-description">${item.about}</p>
                </div>
                ${isCreator 
                    ? html`
                        <div id="action-buttons">
                            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                            <a href="/delete/${item._id}" id="delete-btn">Delete</a>
                        </div>
                    `
                    : nothing
                }
            </div>
        </div>
    </section>
`;

export async function showDetailsView(ctx) {
    const id = ctx.params.id;
    const userId = userUtil.getUserId();

    try {
        let motorcycle = await request.getAsync(urlUtil.showDetails + id);
        let isCreator = userId === motorcycle._ownerId;
        ctx.render(detailsTemplate(motorcycle, isCreator));
    } catch (error) {
        alert(error.message);
    }
}