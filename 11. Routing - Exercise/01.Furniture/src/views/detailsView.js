import { html } from "../../node_modules/lit-html/lit-html.js";
import { request } from "../services/requestService.js";
import { userService } from "../services/userService.js";
import { urls } from "../utils/urls.js";

const detailsTemp = (furniture) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="/${furniture.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        <div style="display: ${isOwner(furniture._ownerId)};">
            <a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>
            <a href="/delete/${furniture._id}" class="btn btn-red">Delete</a>
        </div>
    </div>
</div>
`;

let context = null;
export async function showDetailsView(ctx) {
    try {
        let id = ctx.params.id;
        let furniture = await request.getAsync(urls.furnitureDetailsGET + id);
        ctx.renderMain(detailsTemp(furniture));
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
}

function isOwner(ownerId) {
    let userId = userService.getUserId();

    return ownerId === userId ? 'inline-block' : 'none';
}