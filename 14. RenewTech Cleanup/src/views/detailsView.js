import { html, nothing } from "../libs.js";
import { request } from "../services/requestService.js";
import { url } from "../utils/urls.js";
import { userInfo } from "../utils/user.js";

const detailsTemplate = (item, isOwner, notAuthor, allLikes, isLikeBtnVisible) => html`
    <section id="details">
        <div id="details-wrapper">
        <img id="details-img" src="${item.imageUrl}" />
        <div>
            <p id="details-type">${item.type}</p>
            <div id="info-wrapper">
            <div id="details-description">
                <p id="description">${item.description}</p>
                <p id="more-info">${item.learnMore}</p>
            </div>
            </div>
            <h3>Like Solution:<span id="like">${allLikes}</span></h3>

            <div id="action-buttons">
                ${isOwner 
                    ? html`
                    <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                    <a href="/delete/${item._id}" id="delete-btn">Delete</a>
                    `
                    : nothing
                }
                
                ${notAuthor && isLikeBtnVisible
                    ? html`<a href="/like/${item._id}"  id="like-btn" @click="${onLike}">Like</a>`
                    : nothing
                }
            </div>
        </div>
        </div>
    </section>
`;

let context = null;
export async function showDetailsView(ctx) {
    const id = ctx.params.id;
    let userId = userInfo.getUserId();

    try {
        let solution = await request.getAsync(url.showDetails + id);
        let allLikes = await request.getAsync(url.getAllLikes(id));
        let isLikeBtnVisible = await request.getAsync(url.getAllLikesForUser(id, userId)) == 0;
        const isOwner = userId === solution._ownerId;
        const notAuthor = userId && userId !== solution._ownerId;

        ctx.render(detailsTemplate(solution, isOwner, notAuthor, allLikes, isLikeBtnVisible));
        context = ctx;
    } catch (error) {
        alert(error.message);
    }
}

async function onLike(e) {
    e.preventDefault();

    const id = context.params.id;
    let userId = userInfo.getUserId();

    try {
        await request.postAsync(url.postLike, { solutionId: id });
        let solution = await request.getAsync(url.showDetails + id);
        let allLikes = await request.getAsync(url.getAllLikes(id));
        let isLikeBtnVisible = await request.getAsync(url.getAllLikesForUser(id, userId)) == 0;
        const isOwner = userId === solution._ownerId;
        const notAuthor = userId && userId !== solution._ownerId;

        context.render(detailsTemplate(solution, isOwner, notAuthor, allLikes, isLikeBtnVisible));
    } catch (error) {
        alert(error.message);
    }
}