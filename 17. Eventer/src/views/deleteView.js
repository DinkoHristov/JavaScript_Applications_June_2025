import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

export async function showDeleteView(ctx) {
    const id = ctx.params.id;

    try {
        const isConfirmed = confirm('Are you sure you want to delete this event?');
        if (isConfirmed) {
            await request.deleteAsync(urlUtil.eventDetails + id);
            ctx.redirect('/events');
        }
    } catch (error) {
        alert(error.message);
    }
}