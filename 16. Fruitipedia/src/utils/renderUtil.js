import { page, render } from '../libs.js' 

const root = document.querySelector('main');

function renderRootTemplate(template) {
    render(template, root);
}

function redirectToPage(url) {
    page.redirect(url);
}

export function updateCtx(ctx, next) {
    ctx.render = renderRootTemplate;
    ctx.redirect = redirectToPage;
    next();
}