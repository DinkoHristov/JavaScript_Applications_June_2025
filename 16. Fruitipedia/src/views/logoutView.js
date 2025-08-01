import { updateNav } from "../utils/navigationUtil.js";
import { user } from "../services/userService.js";

export async function showLogoutView(ctx) {
    try {
        await user.logout();
        ctx.redirect('/');
        updateNav();
    } catch (error) {
        alert(error.message);
    }
}