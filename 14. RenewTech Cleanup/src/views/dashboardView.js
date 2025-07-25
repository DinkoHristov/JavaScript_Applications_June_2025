import { html } from "../libs.js";
import { request } from "../services/requestService.js";
import { url } from "../utils/urls.js";


const dashboardTemplate = (solutions) => html`
    <h2>Solutions</h2>
    ${solutions.length > 0
        ? html`
            <section id="solutions">
                ${solutions.map(s => solutionTemplate(s))}
            </section>
        `
        : html `<h2 id="no-solution">No Solutions Added.</h2>`
    }
`;

const solutionTemplate = (item) => html`
    <div class="solution">
        <img src="${item.imageUrl}" alt="example1" />
        <div class="solution-info">
            <h3 class="type">${item.type}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/details/${item._id}">Learn More</a>
        </div>
    </div>
`;

export async function showDashboardView(ctx) {
    try {
        let solutions = await request.getAsync(url.allSolutionsGET);
        ctx.render(dashboardTemplate(solutions));
    } catch (error) {
        alert(error.message);
    }
}