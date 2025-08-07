import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";

export async function showDeleteView(ctx) {
    const id = ctx.params.id;

    try {
        const isConfirmed = confirm('Are you sure you want to delete this product?');
        if (isConfirmed) {
            await request.deleteAsync(urlUtil.productDetails + id);
            ctx.redirect('/products');
        }
    } catch (error) {
        alert(error.message);
    }
}