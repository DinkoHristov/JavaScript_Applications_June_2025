const main = document.querySelector('main');
const homeSection = document.querySelector('div[data-section="/"]');

export function showHomeView() {
    main.replaceChildren(homeSection);
}