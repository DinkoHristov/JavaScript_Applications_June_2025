import { html, nothing } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";
import { userUtil } from "../utils/userUtil.js";

const detailsTemplate = (fruit, isOwner) => html`
    <section id="details">
        <div id="details-wrapper">
        <img id="details-img" src="${fruit.imageUrl}" />
        <p id="details-title">${fruit.name}</p>
        <div id="info-wrapper">
            <div id="details-description">
            <p>${fruit.description}</p>
            <p id="nutrition">Nutrition</p>
            <p id="details-nutrition">${fruit.nutrition}</p>
            </div>
            ${isOwner 
                ? html`
                    <div id="action-buttons">
                        <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                        <a href="/delete/${fruit._id}" id="delete-btn">Delete</a>
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
        const fruit = await request.getAsync(urlUtil.details + id);
        const isOwner = userId !== null && userId === fruit._ownerId;
        ctx.render(detailsTemplate(fruit, isOwner));
    } catch (error) {
        alert(error.message);
    }
}