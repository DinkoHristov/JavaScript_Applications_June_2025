import { html } from "../../node_modules/lit-html/lit-html.js";
import { request } from "../services/requestService.js";
import { userService } from "../services/userService.js";
import { updateNav } from "../utils/nav.js";
import { url } from "../utils/url.js";

const registerTemp = () => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`;

let context = null;
export function showRegisterView(ctx) {
    ctx.renderMain(registerTemp());
    document.querySelector('.register-form').addEventListener('submit', onSubmit);
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let { email, password } = Object.fromEntries(formData);
    let rePassword = formData.get('re-password');

    if (!email) {
        return context.showNotification(`Email is required`);
    }

    if (!password || !rePassword || password !== rePassword) {
        return context.showNotification(`Passwords don't match`);
    }

    try {
        let data = await request.postAsync(url.registerPOST, { email, password });
        userService.setUserData(data);
        context.hideNotification();
        e.target.reset();
        context.redirectTo('/');
        updateNav();
    } catch (error) {
        context.showNotification(error.message);
    }
}