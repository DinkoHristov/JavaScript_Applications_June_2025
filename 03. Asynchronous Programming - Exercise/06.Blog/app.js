function attachEvents() {
    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const selectElement = document.getElementById('posts');
    const postTitleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');
    const postCommentsElement = document.getElementById('post-comments');

    const loadPostsButton = document.getElementById('btnLoadPosts');
    const viewPostsButton = document.getElementById('btnViewPost');

    loadPostsButton.addEventListener('click', onLoadBtnClicked);
    viewPostsButton.addEventListener('click', onViewBtnClicked);

    async function onLoadBtnClicked() {
        try {
            const response = await fetch(postsUrl);
            const data = await response.json();

            selectElement.innerHTML = '';

            Object.values(data).forEach(post => {
                let option = document.createElement('option');
                option.value = post.id;
                option.textContent = post.title;
                selectElement.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }

    async function onViewBtnClicked() {
        try {
            let selectedPostId = selectElement.value;
            if (!selectedPostId) return;

            const postResponse = await fetch(postsUrl);
            const postsData = await postResponse.json();
            const selectedPost = postsData[selectedPostId];

            const commentsResponse = await fetch(commentsUrl);
            const commentsData = await commentsResponse.json();
            const postComments = Object.values(commentsData).filter(comment => comment.postId === selectedPostId);

            postTitleElement.textContent = selectedPost.title;
            postBodyElement.textContent = selectedPost.body;

            postCommentsElement.innerHTML = '';
            postComments.forEach(comment => {
                let li = document.createElement('li');
                li.textContent = comment.text;
                postCommentsElement.appendChild(li);
            });
        } catch (error) {
            console.error('Error loading post details:', error);
        }
    }
}

attachEvents();