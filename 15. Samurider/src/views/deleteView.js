import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

export async function showDeleteView(ctx) {
    const id = ctx.params.id;

    try {
        let isConfirmed = confirm('Are you sure you want to delete this motorcycle?');
        if (isConfirmed) {
            await request.deleteAsync(urlUtil.showDetails + id);
            ctx.redirect('/dashboard');
        }
    } catch (error) {
        alert(error.message);
    }
}