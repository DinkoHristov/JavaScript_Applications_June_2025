import { html } from '../../node_modules/lit-html/lit-html.js';
import { request } from '../services/requestService.js';
import { updateNav } from '../utils/navigation.js';
import { url } from '../utils/urls.js';
import { userInfo } from '../utils/userData.js';

const registerTemplate = () => html`
<section id="register">
    <div class="form">
    <h2>Register</h2>
    <form class="register-form" @submit="${onSubmit}">
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
    ctx.renderMain(registerTemplate());
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('re-password');

    if (!email || !password || !rePass || password !== rePass) {
        return alert('Input fields are invalid!');
    }

    try {
        let data = await request.postAsync(url.registerPOST, { email, password });
        userInfo.setUserData(data);
        e.target.reset();
        context.goTo('/');
        updateNav();
    } catch (error) {
        alert(error.message);
    }
}