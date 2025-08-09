import { page } from './libs.js';
import { updateNav } from "./utils/navigationUtil.js";
import { updateCtx } from './utils/renderUtil.js';

import { showHomeView } from './views/homeView.js';
import { showDashboardView } from './views/dashboardView.js';
import { showCreateView } from './views/createView.js';
import { showDetailsView } from './views/detailsView.js';
import { showEditView } from './views/editView.js';
import { showDeleteView } from './views/deleteView.js';
import { showLoginView } from './views/loginView.js';
import { showLogoutView } from './views/logoutView.js';
import { showRegisterView } from './views/registerView.js';

page(updateCtx);
page('/', showHomeView);
page('/index.html', showHomeView);
page('/dashboard', showDashboardView);
page('/create', showCreateView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', showDeleteView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', showLogoutView);

updateNav();

page.start();