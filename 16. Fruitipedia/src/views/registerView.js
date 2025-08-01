import { html } from '../libs.js';
import { updateNav } from '../utils/navigationUtil.js';
import { user } from '../services/userService.js';

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
    ctx.render(registerTemplate());
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
        await user.register(email, password);
        e.target.reset();
        context.redirect('/');
        updateNav();
    } catch (error) {
        alert(error.message);
    }
}