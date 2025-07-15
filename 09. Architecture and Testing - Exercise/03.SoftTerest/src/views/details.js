import { request } from "../requester.js";
import { userUtils } from "../userData.js";
import { utils } from "../utils.js";
import { showDashboardView } from "./dashboard.js";


const main = document.querySelector('main');
const detailsView = document.querySelector('div[data-section="details"]');

async function loadIdea(id) {
    try {
        let accessToken = await userUtils.getUserAccessToken();
        let userId = await userUtils.getUserId();

        let idea = await request.getAsync(`${utils.urls.detailsUrl}${id}`);
        detailsView.innerHTML = createIdeaDetails(accessToken, userId, idea);

        if (idea) {
            detailsView.querySelector('a[class="btn detb"]')?.addEventListener('click', onDelete);
        } 
    } catch (err) {
        alert(err);
    }
}

function createIdeaDetails(accessToken, userId, data) {
    let idea = `
        <img class="det-img" src="${data.img}" />
        <div class="desc">
            <h2 class="display-5">${data.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${data.description}</p>
        </div>
        ${accessToken != null && data._ownerId === userId
            ? `
                <div class="text-center">
                    <a class="btn detb" href="/delete" data-id="${data._id}">Delete</a>
                </div>
            `
            : ``
        }
    `;

    return idea;
}

async function onDelete(e) {
    e.preventDefault();

    let ideaId = e.target.dataset.id;
    try {
        await request.deleteAsync(`${utils.urls.deleteUrl}${ideaId}`);
        
        showDashboardView();
    } catch (err) {
        alert(err);
    }
}

export async function showDetailsView(id) {
    await loadIdea(id);
    main.replaceChildren(detailsView);
}