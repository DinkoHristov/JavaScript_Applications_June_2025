import { request } from "../services/requestService.js";
import { userService } from "../services/userService.js";
import { updateNav } from "../utils/nav.js";
import { url } from "../utils/url.js";

export async function showLogoutView(ctx) {
    try {
        await request.getAsync(url.logoutGET);
        userService.clearUserData();
        updateNav();
        ctx.redirectTo('/');
        ctx.hideNotification();
    } catch (error) {
        ctx.showNotification(error.message);
    }
}