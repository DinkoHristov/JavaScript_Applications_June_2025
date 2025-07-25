import { user } from "../data/userData.js";
import { updateNav } from "../utils/navigation.js";

export async function showLogoutView(ctx) {
    try {
        await user.logout();
        ctx.redirect('/');
        updateNav();
    } catch (error) {
        alert(error.message);
    }
}