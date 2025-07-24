import { request } from "../services/requestService.js";
import { updateNav } from "../utils/navigation.js";
import { url } from "../utils/urls.js";
import { userInfo } from "../utils/userData.js";

export async function showLogoutView(ctx) {
    try {
        await request.getAsync(url.logoutGET);
        userInfo.clearUserData();
        ctx.goTo('/');
        updateNav();
    } catch (error) {
        alert(error.message);
    }
}