function attachEvents() {
    const allPostsUrl = 'https://blog-apps-c12bf.firebaseio.com/posts.json';
    
    const selectElement = document.getElementById('posts');
    const postTitleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');
    const postCommentsElement = document.getElementById('post-comments');
    
    const loadButton = document.getElementById('btnLoadPosts');
    const viewButton = document.getElementById('btnViewPost');

    loadButton.addEventListener('click', onLoadBtnClicked);
    viewButton.addEventListener('click', onViewBtnClicked);

    function onLoadBtnClicked() {
        fetch(allPostsUrl)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    let option = document.createElement('option');
                    option.value = key;
                    option.innerHTML = `${data[key].title}`;

                    selectElement.appendChild(option);
                })
            })
    }

    function onViewBtnClicked(e) {
        let postID = selectElement.value;

        const currentPostUrl = `https://blog-apps-c12bf.firebaseio.com/posts/${postID}.json`;

        fetch(currentPostUrl)
            .then(response => response.json())
            .then(data => {
                postTitleElement.innerHTML = data.title;
                postBodyElement.innerHTML = data.body;

                data.comments.forEach(comment => {
                    let li = document.createElement('li');
                    li.id = comment.id;
                    li.innerHTML = `${comment.text}`;

                    postCommentsElement.appendChild(li);
                });
            })
    }
}

attachEvents();