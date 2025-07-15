import { userUtils } from "./userData.js";
import { showCreateView } from "./views/create.js";
import { showDashboardView } from "./views/dashboard.js";
import { showDetailsView } from "./views/details.js";
import { showHomeView } from "./views/home.js";
import { showLoginView } from "./views/login.js";
import { showLogoutView } from "./views/logout.js";
import { showRegisterView } from "./views/register.js";

const nav = document.querySelector('nav');

const routes = {
    '/': showHomeView,
    '/index.html': showHomeView,
    '/register': showRegisterView,
    '/login': showLoginView,
    '/logout': showLogoutView,
    '/dashboard': showDashboardView,
    '/details': showDetailsView,
    '/create': showCreateView,
};

function navigate(e) {
    e.preventDefault();

    let target = null;

    let tagName = e.target.tagName;
    if (tagName == 'IMG') {
        target = e.target.parentElement
    } else if (tagName == 'A') {
        target = e.target;
    } else {
        return;
    }

    let viewName = new URL(target.href).pathname;
    routes[viewName]();
}

export function updateNav() {
    let accessToken = userUtils.getUserAccessToken();

    if (accessToken) {
        document.querySelectorAll('a[data-nav="guest"]').forEach(a => a.style.display = 'none');
        document.querySelectorAll('a[data-nav="user"]').forEach(a => a.style.display = 'block');
    } else {
        document.querySelectorAll('a[data-nav="user"]').forEach(a => a.style.display = 'none');
        document.querySelectorAll('a[data-nav="guest"]').forEach(a => a.style.display = 'block');
    }
}

export function onNavBar() {
    nav.addEventListener('click', navigate);
}