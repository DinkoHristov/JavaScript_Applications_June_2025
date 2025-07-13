const formContainer = document.querySelector('.topic-container');
const homeForm = document.querySelector('.new-topic-border');

const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;
const commentsUrl = `http://localhost:3030/jsonstore/collections/myboard/comments`;

let postId = null;

export async function createPostComment(postId) {
    homeForm.style.display = 'none';
    formContainer.replaceChildren();

    let post = await getPostDetails(postId);
    postId = post._id;

    // Първо създаваме основния HTML без коментарите
    let element = `
        <div class="theme-content">
            <div class="theme-title">
                <div class="theme-name-wrapper">
                    <div class="theme-name">
                        <h2>${post.title}</h2>
                    </div>
                </div>
            </div>
        
                <div class="comment">
                 <div class="header">
                    <img src="./static/profile.png" alt="avatar">
                    <p><span>${post.username}</span> posted on <time>${post.createdOn}</time></p>
                    <p class="post-content">${post.content}</p>
                 </div>
                 <div class="comments-container">
                    <!-- Коментарите ще се заредят тук -->
                 </div>
                </div>
             
            

            <div class="answer-comment">
                <p><span>currentUser</span> comment:</p>
                <div class="answer" id=${post._id}>
                    <form>
                        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                        <div>
                            <label for="username">Username <span class="red">*</span></label>
                            <input type="text" name="username" id="username">
                        </div>
                        <button>Post</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    formContainer.innerHTML = element;
    writeComment();
    
    // След това зареждаме коментарите асинхронно
    loadAndDisplayComments(post._id);
}

async function getPostDetails(postId) {
    return await fetch(`${url}/${postId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Invalid response!');
            }

            return res.json();
        })
        .then(data => data)
        .catch(err => console.log(err));
}

function writeComment() {
    formContainer.querySelector('button').addEventListener('click', onPostCommentClicked);
}

function onPostCommentClicked(e) {
    e.preventDefault();

    console.log("e.target: ", e.target.parentElement.parentElement.id);
    let postId = e.target.parentElement.parentElement.id;

    let comment = formContainer.querySelector('#comment');
    let username = formContainer.querySelector('#username');

    if (comment.value.trim() == '' || username.value.trim() == '') {
        return;
    }

    fetch(commentsUrl, {
        method: 'POST',
        body: JSON.stringify({
            text: comment.value,
            username: username.value,
            postId: postId,
            createdOn: Date.now()
        })
    })
        .then(() => {
            comment.value = '';
            username.value = '';
        })
        .catch(err => console.log(err));
}

async function loadPostComments(postId) {
    if (postId != null) {
        try {
            const res = await fetch(commentsUrl);
            if (!res.ok) {
                throw new Error('Invalid response');
            }
            const data = await res.json();
            const postComments = Object.values(data).filter(post => post.postId == postId);
            return postComments;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
    return [];
}

async function loadAndDisplayComments(postId) {
    const postComments = await loadPostComments(postId);
    const commentsContainer = formContainer.querySelector('.comments-container');
    
    if (commentsContainer && postComments && postComments.length > 0) {
        commentsContainer.innerHTML = appendComments(postComments);
    }
}

function appendComments(comments) {
    let allComments = comments.map(c => `
            <img src="./static/profile.png" alt="avatar">
            <p><span>${c.username}</span> posted on <time>${c.createdOn}</time></p>
            <p class="post-content">${c.text}</p>
    `).join('\n');

    return allComments.trimEnd();
}