import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

export async function showDeleteView(ctx) {
    const id = ctx.params.id;

    try {
        const isConfirmed = confirm('Are you sure you want to delete this fruit?');
        if (isConfirmed) {
            await request.deleteAsync(urlUtil.details + id);
            ctx.redirect('/dashboard');
        }
    } catch (error) {
        alert(error.message);
    }
}