import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

const dashboardTemplate = (events) => html`
    <h2>Current Events</h2>
    ${events.length > 0
        ? html`
            <section id="dashboard">
                ${events.map(e => eventTemplate(e))}
            </section>
        `
        : html `<h4>No Events yet.</h4>`
    }
`;

const eventTemplate = (event) => html`
    <div class="event">
        <img src="${event.imageUrl}" />
        <p class="title">${event.name}</p>
        <p class="date">${event.date}</p>
        <a class="details-btn" href="/details/${event._id}">Details</a>
    </div>
`;

export async function showDashboardView(ctx) {
    try {
        const events = await request.getAsync(urlUtil.allEventsGET);
        ctx.render(dashboardTemplate(events));
    } catch (error) {
        alert(error.message);
    }
}