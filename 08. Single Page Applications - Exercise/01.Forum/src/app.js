import { showPosts, createPost, clearPost } from "./home.js";

showPosts();

document.getElementById('home-view').addEventListener('click', showPosts);
createPost();
clearPost();