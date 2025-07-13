import { createPostComment } from './comment.js'

const topicContainer = document.querySelector('.topic-container');
const formContainer = document.querySelector('.container');
const homeForm = document.querySelector('.new-topic-border');

const url = `http://localhost:3030/jsonstore/collections/myboard/posts`;

export function showPosts(e) {
    if (e != undefined) {
        e.preventDefault();
    }

    homeForm.style.display = 'block';
    topicContainer.replaceChildren();

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Invalid response!');
            }

            return res.json();
        })
        .then(async data => {
            let posts = Object.keys(data).map(p => 
                `<div class="topic-container">
                    <div class="topic-name-wrapper">
                        <div class="topic-name">
                            <a href="#" class="normal" id="${data[p]._id}">
                                <h2>${data[p].title}</h2>
                            </a>
                            <div class="columns">
                                <div>
                                    <p>Date: <time>${data[p].createdOn}</time></p>
                                    <div class="nick-name">
                                        <p>Username: <span>${data[p].username}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            ).join('\n');

            topicContainer.innerHTML = posts.trimEnd();
            attachClickEvents();
        })
        .catch(err => console.log(err));
}

export function createPost() {
    formContainer.querySelector('.public').addEventListener('click', onPostBtnClicked);
}

export function clearPost() {
    formContainer.querySelector('.cancel').addEventListener('click', onCancelBtnClicked);
}

function onPostBtnClicked(e) {
    e.preventDefault();

    let title = formContainer.querySelector('#topicName');
    let username = formContainer.querySelector('#username');
    let postText = formContainer.querySelector('#postText');
    
    if (title.value.trim() == '' || 
        username.value.trim() == '' || 
        postText.value.trim() == '') {
        return;
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            username: username.value,
            content: postText.value,
            // createdOn: Date.now()
            createdOn: new Date()
        })
    })
    .then(() => {
        title.value = '';
        username.value = '';
        postText.value = '';
        showPosts(e);
    })
    .catch(err => console.log(err));
}

function onCancelBtnClicked(e) {
    e.preventDefault();

    let title = formContainer.querySelector('#topicName');
    let username = formContainer.querySelector('#username');
    let postText = formContainer.querySelector('#postText');

    title.value = '';
    username.value = '';
    postText.value = '';
}

async function attachClickEvents() {
    let postsLinks = Array.from(topicContainer.querySelectorAll('.topic-name a'));

    postsLinks.forEach(link => {
        link.addEventListener('click', onPostDetailsClicked);
    });
}

async function onPostDetailsClicked(e) {
    e.preventDefault();

    let postId = e.target.parentElement.id;
    await createPostComment(postId);
}