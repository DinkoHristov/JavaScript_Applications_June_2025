import { request } from "../services/requestService.js";
import { hideNotification, showNotification } from "../utils/navigationUtil.js";
import { urlUtil } from "../utils/urlUtil.js";

export async function showDeleteView(ctx) {
    const id = ctx.params.id;

    try {
        const isConfirmed = confirm('Are you sure you want to delete this tip?');
        if (isConfirmed) {
            await request.deleteAsync(urlUtil.details + id);
            hideNotification();
            ctx.redirect('/dashboard');
        }
    } catch (error) {
        showNotification(error.message);
    }
}