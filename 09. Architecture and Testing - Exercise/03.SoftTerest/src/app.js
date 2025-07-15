import { onNavBar, updateNav } from "./navigate.js";
import { showHomeView } from "./views/home.js";

document.querySelectorAll('div[data-section]').forEach(d => d.remove());

onNavBar();
showHomeView();
updateNav();