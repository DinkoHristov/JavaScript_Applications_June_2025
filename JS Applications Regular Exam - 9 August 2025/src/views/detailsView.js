import { html, nothing } from "../libs.js";
import { request } from "../services/requestService.js";
import { hideNotification, showNotification } from "../utils/navigationUtil.js";
import { urlUtil } from "../utils/urlUtil.js";
import { userUtil } from "../utils/userUtil.js";

const detailsTemplate = (tip, isOwner) => html`
    <section id="details">
        <div id="details-wrapper">
            <div>
                <img id="details-img" src="${tip.imageUrl}" />
                <p id="details-title">${tip.title}</p>
            </div>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="details-type">Type: ${tip.type}</p>
                    <p class="details-difficulty">
                    Difficulty: ${tip.difficulty}
                    </p>
                    <p id="tip-description">${tip.description}</p>
                </div>
                ${isOwner
                    ? html`
                        <div id="action-buttons">
                            <a href="/edit/${tip._id}" id="edit-btn">Edit</a>
                            <a href="/delete/${tip._id}" id="delete-btn">Delete</a>
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
        const tip = await request.getAsync(urlUtil.details + id);
        const isOwner = userId != null && userId === tip._ownerId;
        ctx.render(detailsTemplate(tip, isOwner));
        hideNotification();
    } catch (error) {
        showNotification(error.message);
    }
}