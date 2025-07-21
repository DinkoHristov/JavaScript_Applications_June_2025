import { request } from "../services/requestService.js";
import { userService } from "../services/userService.js";
import { urls } from "../utils/urls.js";
import { updateNav } from "../utils/nav.js";

export async function showLogoutView(ctx) {
    await request.getAsync(urls.logoutGET);
    userService.clearUserData();
    ctx.redirectTo('/login');
    updateNav();
}