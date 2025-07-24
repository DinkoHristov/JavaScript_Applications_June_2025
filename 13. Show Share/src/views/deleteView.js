import { request } from "../services/requestService.js";
import { url } from "../utils/urls.js";

export async function showDeleteView(ctx) {
    let id = ctx.params.id;

    try {
        let isConfirmed = confirm('Are you sure you want to delete the selected show?');
        if (isConfirmed) {
            await request.deleteAsync(url.showDetails + id);
            ctx.goTo('/shows');
        }
    } catch (error) {
        alert(error.message);
    }
}