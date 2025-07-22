import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { updateNav } from './utils/nav.js';
import { notification } from './utils/notification.js';

import { showHomeView } from './views/homeView.js';
import { showDashboard } from './views/dashboardView.js';
import { showDetailsView } from './views/detailsView.js';
import { showAddDroneView } from './views/addDroneView.js';
import { showEditView } from './views/editDroneView.js';
import { showDeleteView } from './views/showDeleteView.js';
import { showLoginView } from './views/loginView.js';
import { showRegisterView } from './views/registerView.js';
import { showLogoutView } from './views/logoutView.js';

const main = document.getElementById('main-element');

page(updateCtx);
page('/', showHomeView);
page('/index.html', showHomeView);
page('/marketplace', showDashboard);
page('/drones/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', showDeleteView);
page('/sell', showAddDroneView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', showLogoutView);

page.start();

updateNav();

function renderTemplate(template) {
    render(template, main);
}

function goTo(url) {
    page.redirect(url);
}

function updateCtx(ctx, next) {
    ctx.renderMain = renderTemplate;
    ctx.redirectTo = goTo;
    ctx.showNotification = notification.show;
    ctx.hideNotification = notification.hide;

    next();
}