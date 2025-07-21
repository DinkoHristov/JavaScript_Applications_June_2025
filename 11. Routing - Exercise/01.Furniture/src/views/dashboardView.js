import { html } from "../../node_modules/lit-html/lit-html.js";
import { request } from "../services/requestService.js";
import { urls } from "../utils/urls.js";

const furnitureTemp = (furniture) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
                <img src="${furniture.img}" />
                <p>${furniture.description}</p>
                <footer>
                    <p>Price: <span>${furniture.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${furniture._id}" class="btn btn-info">Details</a>
                </div>
        </div>
    </div>
</div>
`;

const allFurnituresTemp = (furnitures) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${furnitures.map(f => furnitureTemp(f))}
</div>
`;

let context = null
export async function showDashboardView(ctx) {
    try { 
        let allFurnitures = await request.getAsync(urls.allFurnituresGET);
        ctx.renderMain(allFurnituresTemp(allFurnitures));
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
} 