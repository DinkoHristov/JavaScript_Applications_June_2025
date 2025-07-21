import { html } from '../../node_modules/lit-html/lit-html.js';
import { request } from '../services/requestService.js';
import { userService } from '../services/userService.js';
import { urls } from '../utils/urls.js';
import { updateNav } from '../utils/nav.js';

const loginTemp = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
`;

let context = null;
export function showLoginView(ctx) {
    ctx.renderMain(loginTemp());
    document.querySelector('form').addEventListener('submit', onSubmit);
    context = ctx;
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
        return;
    }

    try {
        let data = await request.postAsync(urls.loginPOST, { email, password });
        userService.setUserData(data);
        e.target.reset();
        context.redirectTo('/dashboard');
        updateNav();
    } catch (error) {
        alert(error.message);
    }
}