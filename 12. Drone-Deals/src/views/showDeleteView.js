import { request } from "../services/requestService.js";
import { url } from "../utils/url.js";


export async function showDeleteView(ctx) {
    try {
        let id = ctx.params.id;

        let isConfirmed = confirm('Do you want to delete this drone?');
        if (isConfirmed) {
            await request.deleteAsync(url.deleteDroneDELETE + id);
            ctx.hideNotification();
            ctx.redirectTo('/marketplace');
        }
    } catch (error) {
        ctx.showNotification(error.message);
    }
}