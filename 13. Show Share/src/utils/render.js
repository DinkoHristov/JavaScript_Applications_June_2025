import { render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const root = document.querySelector('main');

function renderRootTemplate(template) {
    render(template, root);
}

function redirectToPage(url) {
    page.redirect(url);
}

export function updateCtx(ctx, next) {
    ctx.renderMain = renderRootTemplate;
    ctx.goTo = redirectToPage;
    next();
}