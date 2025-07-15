import { request } from "../requester.js";
import { userUtils } from "../userData.js";
import { utils } from "../utils.js";
import { showDashboardView } from "./dashboard.js";


const main = document.querySelector('main');
const createView = document.querySelector('div[data-section="create"]');
const form = createView.querySelector('form');

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(form);

    let { title, description, imageURL } = Object.fromEntries(formData);

    if (title < 6 || description < 10 || imageURL < 5) {
        return;
    }

    try {      
        let userId = userUtils.getUserId();
        let data = await request.postAsync(utils.urls.createUrl, {
            title,
            description,
            img: imageURL,
            ownerId: userId
        });

        form.reset();
        showDashboardView();
    } catch (err) {
        alert(err);
    }
}

export function showCreateView() {
    main.replaceChildren(createView);

    form.addEventListener('submit', onSubmit);
}