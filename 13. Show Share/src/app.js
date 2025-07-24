import page from '../node_modules/page/page.mjs';
import { updateNav } from "./utils/navigation.js";
import { updateCtx } from './utils/render.js';

import { showHomeView } from './views/homeView.js';
import { showMoviesView } from './views/showsView.js';
import { showAddMovieView } from './views/addMovieView.js';
import { showDetailsView } from './views/detailsView.js';
import { showEditView } from './views/editView.js';
import { showDeleteView } from './views/deleteView.js';
import { showSearchView } from './views/searchView.js';
import { showLoginView } from './views/loginView.js';
import { showRegisterView } from './views/registerView.js';
import { showLogoutView } from './views/logoutView.js';

page(updateCtx);
page('/', showHomeView);
page('/index.html', showHomeView);
page('/shows', showMoviesView);
page('/details/:id', showDetailsView);
page('/edit/:id', showEditView);
page('/delete/:id', showDeleteView);
page('/search', showSearchView);
page('/add', showAddMovieView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/logout', showLogoutView);

page.start();

updateNav();