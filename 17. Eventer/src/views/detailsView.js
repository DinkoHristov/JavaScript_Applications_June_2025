import { html, nothing } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";
import { userUtil } from "../utils/userUtil.js";

const detailsTemplate = (event, isCreator, notAuthor, goingCount, isGoingToEvent) => html`
    <section id="details">
        <div id="details-wrapper">
        <img id="details-img" src="${event.imageUrl}" />
        <p id="details-title">${event.name}</p>
        <p id="details-category">
            Category: <span id="categories">${event.category}</span>
        </p>
        <p id="details-date">
            Date:<span id="date">${event.date}</span></p>
        <div id="info-wrapper">
            <div id="details-description">
            <span>${event.description}</span>
            </div>
        </div>

        <h3>Going: <span id="go">${goingCount}</span> times.</h3>

            <div id="action-buttons">
            ${isCreator
                ? html`
                    <a href="/edit/${event._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${event._id}" id="delete-btn">Delete</a>
                `
                : nothing
            }

            ${notAuthor && !isGoingToEvent
                ? html`<a href="/like/${event._id}" id="go-btn">Going</a>`
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
        const event = await request.getAsync(urlUtil.eventDetails + id);
        const goingCount = await request.getAsync(urlUtil.getGoingCount(id));
        const isGoingToEvent = await request.getAsync(urlUtil.getUserGoingCount(id, userId)) != 0;
        const isCreator = userId != null && userId === event._ownerId;
        const notAuthor = userId != null && userId !== event._ownerId;
        ctx.render(detailsTemplate(event, isCreator, notAuthor, Number(goingCount), isGoingToEvent));
    } catch (error) {
        alert(error.message);
    }
}