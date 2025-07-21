import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { updateNav } from './utils/nav.js';

import { showLoginView } from './views/loginView.js';
import { showRegisterView } from './views/registerView.js';
import { showLogoutView } from './views/logoutView.js';
import { showDashboardView } from './views/dashboardView.js';
import { showCreateView } from './views/createView.js';
import { showDetailsView } from './views/detailsView.js';
import { showEditView } from './views/editView.js';
import { showDeleteView } from './views/deleteView.js';
import { showMyFurnitureView } from './views/myFurnitureView.js';

const main = document.querySelector('.container');

page(updateCtx);
page('/', showDashboardView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', showDeleteView);
page('/my-furniture', showMyFurnitureView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', showLogoutView);

page.start();

updateNav();

function renderTemplate(template) {
    render(template, main);
}

function redirectToPage(url) {
    page.redirect(url);
}

function updateCtx(ctx, next) {
    ctx.renderMain = renderTemplate;
    ctx.redirectTo = redirectToPage;
    next();
}