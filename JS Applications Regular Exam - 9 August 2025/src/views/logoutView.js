import { hideNotification, showNotification, updateNav } from "../utils/navigationUtil.js";
import { user } from "../services/userService.js";

export async function showLogoutView(ctx) {
    try {
        await user.logout();
        ctx.redirect('/');
        hideNotification();
        updateNav();
    } catch (error) {
        showNotification(error.message);
    }
}