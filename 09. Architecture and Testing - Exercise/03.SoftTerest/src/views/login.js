import { updateNav } from "../navigate.js";
import { request } from "../requester.js";
import { userUtils } from "../userData.js";
import { utils } from "../utils.js";
import { showHomeView } from "./home.js";

const main = document.querySelector('main');
const loginView = document.querySelector('div[data-section="login"]');
const form = loginView.querySelector('form');

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(form);

    let { email, password } = Object.fromEntries(formData);

    try {
        let data = await request.postAsync(utils.urls.loginUrl, {
            email,
            password
        });

        if (data) {
            userUtils.setUserData(data);
            form.reset();
            showHomeView();
            updateNav();
        }
    } catch(err) {
        alert(err);
    }
}

export function showLoginView() {
    main.replaceChildren(loginView);

    form.addEventListener('submit', onSubmit);
}
