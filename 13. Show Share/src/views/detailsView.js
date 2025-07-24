import { html } from '../../node_modules/lit-html/lit-html.js';
import { request } from '../services/requestService.js';
import { url } from '../utils/urls.js';
import { userInfo } from '../utils/userData.js';

const detailsTemplate = (show, isCreator) => html`
<section id="details">
    <div id="details-wrapper">
    <img id="details-img" src="${show.imageUrl}" />
    <div id="details-text">
        <p id="details-title">${show.title}</p>
        <div id="info-wrapper">
        <div id="description">
            <p id="details-description">${show.details}</p>
        </div>
        </div>
        ${isCreator
            ? html`
                <div id="action-buttons">
                    <a href="/edit/${show._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${show._id}" id="delete-btn">Delete</a>
                </div>
            `
            : ``
        }
    </div>
    </div>
</section>
`;

export async function showDetailsView(ctx) {
    let id = ctx.params.id;
    let userId = userInfo.getUserId();

    try {
        let show = await request.getAsync(url.showDetails + id);
        let isCreator = userId != null && userId === show._ownerId;

        ctx.renderMain(detailsTemplate(show, isCreator));
    } catch (error) {
        alert(error.message);
    }
}