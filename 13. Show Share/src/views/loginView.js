import { html } from '../../node_modules/lit-html/lit-html.js';
import { request } from '../services/requestService.js';
import { updateNav } from '../utils/navigation.js';
import { url } from '../utils/urls.js';
import { userInfo } from '../utils/userData.js';

const loginTemplate = () => html`
<section id="login">
    <div class="form">
    <h2>Login</h2>
    <form class="login-form" @submit="${onSubmit}">
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">Not registered? <a href="/register">Create an account</a></p>
    </form>
    </div>
</section>
`;

let context = null;
export function showLoginView(ctx) {
    ctx.renderMain(loginTemplate());
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');

    if (!email || !password) {
        return alert('Input fields are invalid!');
    }

    try {
        let data = await request.postAsync(url.loginPOST, { email, password });
        userInfo.setUserData(data);
        e.target.reset();
        context.goTo('/');
        updateNav();
    } catch (error) {
        alert(error.message);
    }
}