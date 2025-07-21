import { html } from "../../node_modules/lit-html/lit-html.js";
import { request } from "../services/requestService.js";
import { urls } from "../utils/urls.js";

const editTemp = (furniture, error) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${IsValid(error, 'make')}" id="new-make" type="text" name="make" value="${furniture.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${IsValid(error, 'model')}" id="new-model" type="text" name="model" value="${furniture.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${IsValid(error, 'year')}" id="new-year" type="number" name="year" value="${furniture.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${IsValid(error, 'description')}" id="new-description" type="text" name="description" value="${furniture.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${IsValid(error, 'price')}" id="new-price" type="number" name="price" value="${furniture.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${IsValid(error, 'img')}" id="new-image" type="text" name="img" value="${furniture.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value="${furniture.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`; 

let context = null;
let id = null;
export async function showEditView(ctx) {
    id = ctx.params.id;

    try {
        let furniture = await request.getAsync(urls.updateFurniturePUT + id);
        ctx.renderMain(editTemp(furniture));
        document.querySelector('form').addEventListener('submit', onSubmit);
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let { make, model, year, description, price, img, material } = Object.fromEntries(formData);

    let { hasError, error } = createErrorObj(make, model, year, description, price, img);

    if (hasError) {
        return context.renderMain(editTemp({ make, model, year, description, price, img, material }, error));
    }

    try {
        await request.putAsync(urls.updateFurniturePUT + id, { make, model, year, description, price, img, material });
        e.target.reset();
        context.redirectTo(`/details/${id}`);
    } catch (error) {
        alert(error.message);
    }
}

function createErrorObj(make, model, year, description, price, img) {
    let hasError = false
    let error = {};

    if (!make || make.length < 4) {
        error.make = true;
        hasError = true;
    }

    if (!model || model.length < 4) {
        error.model = true;
        hasError = true;
    }

    if (!year || year < 1950 || year > 2050) {
        error.year = true;
        hasError = true;
    }

    if (!description || description.length < 10) {
        error.description = true;
        hasError = true;
    }

    if (!price || price < 0) {
        error.price = true;
        hasError = true;
    }

    if (!img) {
        error.img = true;
        hasError = true;
    }

    return { hasError, error };
}

function IsValid(error, field) {
    if (error != undefined) {
        return error[field] == true ? 'is-invalid' : 'is-valid';
    }
}