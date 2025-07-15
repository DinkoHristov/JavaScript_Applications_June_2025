import { request } from "../requester.js";
import { utils } from "../utils.js";
import { showDetailsView } from "./details.js";

const main = document.querySelector('main');
const dashboardView = document.querySelector('div[data-section="dashboard"]');

async function loadIdeas() {
    try {
        let data = await request.getAsync(utils.urls.dashboardUrl);

        let allIdeas = '';
        if (data.length > 0) {
            allIdeas = data.map(i => createIdea(i)).join('\n').trim();
        }

        return allIdeas;
    } catch (err) {
        alert(err);
    }
}

function createIdea(data) {
    let idea = `
        <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
            <div class="card-body">
                <p class="card-text">${data.title}</p>
            </div>
            <img class="card-image" src="${data.img}" alt="Card image cap">
            <a class="btn" href="/details" data-id="${data._id}">Details</a>
        </div>
    `;

    return idea;
}

async function onDetails(e) {
    e.preventDefault();
    
    let ideaId = e.target.dataset.id;
    await showDetailsView(ideaId);
}
export async function showDashboardView() {
    let allIdeas = await loadIdeas();

    dashboardView.innerHTML = allIdeas;
    if (allIdeas != '') {
        dashboardView.querySelectorAll('a[class="btn"]').forEach(a => a.addEventListener('click', onDetails));
    } else {
        dashboardView.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
    }

    main.replaceChildren(dashboardView);
}