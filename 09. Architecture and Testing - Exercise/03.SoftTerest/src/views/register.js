import { updateNav } from "../navigate.js";
import { request } from "../requester.js";
import { utils } from "../utils.js";
import { userUtils } from "../userData.js";
import { showHomeView } from "./home.js";

const main = document.querySelector('main');
const registerView = document.querySelector('div[data-section="register"]');
const form = registerView.querySelector('form');

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(form);
    let { email, password, repeatPassword } = Object.fromEntries(formData);

    if (email.length < 3 || password.length < 3 ||
        repeatPassword.length < 3 || password !== repeatPassword) {
            return;
    }

    try {
        let data = await request.postAsync(utils.urls.registerUrl, {
            email,
            password
        });

        userUtils.setUserData(data);
        showHomeView();
        updateNav();
    } catch(err) {
        alert(err);
    }
}

export function showRegisterView() {
    main.replaceChildren(registerView);

    form.addEventListener('submit', onSubmit);
}