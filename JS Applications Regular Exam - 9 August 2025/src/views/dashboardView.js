import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { hideNotification, showNotification } from "../utils/navigationUtil.js";
import { urlUtil } from "../utils/urlUtil.js";

const dashboardTemplate = (tips) => html`
    <h3 class="heading">Mindful Tips</h3>
    <section id="tips-dashboard">
        ${tips.length > 0
            ? html`${tips.map(t => tipTemplate(t))}`
            : html`<h3 class="empty">No Mindful Tips Added Yet.</h3>`
        }
    </section>
`;

const tipTemplate = (tip) => html`
    <div class="tip">
        <img src="${tip.imageUrl}" />
        <h3 class="title">${tip.title}</h3>
        <div class="tip-info">
            <p class="type">Type: ${tip.type}</p>
            <p class="difficulty">Difficulty: ${tip.difficulty}</p>
        </div>
        <a class="details-btn" href="/details/${tip._id}">View Tip</a>
    </div>
`;

export async function showDashboardView(ctx) {
    try {
        const tips = await request.getAsync(urlUtil.allGET);
        ctx.render(dashboardTemplate(tips));
        hideNotification();
    } catch (error) {
        showNotification(error.message);
    }
}