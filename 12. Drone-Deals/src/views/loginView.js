import { html } from "../../node_modules/lit-html/lit-html.js";
import { request } from "../services/requestService.js";
import { userService } from "../services/userService.js";
import { updateNav } from "../utils/nav.js";
import { url } from "../utils/url.js";

const loginTemp = () => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
            <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
            </form>
    </div>
</section>
`;

let context = null;
export function showLoginView(ctx) {
    ctx.renderMain(loginTemp());
    document.querySelector('.login-form').addEventListener('submit', onSubmit);
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
        return context.showNotification('All input fields are required');
    }

    try {
        let data = await request.postAsync(url.loginPOST, { email, password });
        userService.setUserData(data);
        context.hideNotification();
        e.target.reset();
        context.redirectTo('/');
        updateNav();
    } catch (error) {
        context.showNotification(error.message);
    }
}