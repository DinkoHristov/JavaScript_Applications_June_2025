import { request } from "../services/requestService.js";
import { urls } from "../utils/urls.js";

export async function showDeleteView(ctx) {
    let id = ctx.params.id;

    let isConfirmed = confirm('Do you want to delete this furniture?');
    if (isConfirmed) {
        try {
            await request.deleteAsync(urls.deleteFurnitureDELETE + id);
            ctx.redirectTo('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }
}