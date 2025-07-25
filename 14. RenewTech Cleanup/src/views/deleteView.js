import { request } from "../services/requestService.js";
import { url } from "../utils/urls.js";

export async function showDeleteView(ctx) {
    const id = ctx.params.id;

    try {
        let isConfirmed = confirm('Are you sure you want to delete this solution?');
        if (isConfirmed) {
            await request.deleteAsync(url.showDetails + id);
            ctx.redirect('/solutions');
        }
    } catch (error) {
        alert(error.message);
    }
}