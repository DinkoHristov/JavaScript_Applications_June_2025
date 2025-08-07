import { html, nothing } from "../libs.js";
import { request } from "../services/requestService.js";
import { urlUtil } from "../utils/urlUtil.js";
import { userUtil } from "../utils/userUtil.js";

const detailsTemplate = (product, isOwner, notCreator, totalBoughts, isBoughtBtnVisible) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${product.imageUrl}" />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
                Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
                Price: <span id="price-number">${Number(product.price)}</span>$
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                <h4>Bought: <span id="buys">${totalBoughts}</span> times.</h4>
                <span>${product.description}</span>
                </div>
            </div>

            <div id="action-buttons">
                ${isOwner
                    ? html`
                        <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                        <a href="/delete/${product._id}" id="delete-btn">Delete</a>
                    `
                    : nothing
                }

                ${notCreator && isBoughtBtnVisible
                    ? html`<a href="/buy/${product._id}" id="buy-btn">Buy</a>`
                    : nothing
                }
            </div>
        </div>
    </section>
`;

export async function showDetailsView(ctx) {
    const id = ctx.params.id;
    const userId = userUtil.getUserId();

    try {
        const product = await request.getAsync(urlUtil.productDetails + id);
        const isOwner = userId != null && userId === product._ownerId;
        const notAuthor = userId != null && userId !== product._ownerId;
        const totalBoughts = await request.getAsync(urlUtil.totalBoughtsGET(id));
        const isBoughtBtnVisible = await request.getAsync(urlUtil.userBoughtsGET(id, userId)) < 1;
        ctx.render(detailsTemplate(product, isOwner, notAuthor, totalBoughts, isBoughtBtnVisible));
    } catch (error) {
        alert(error.message);
    }
}