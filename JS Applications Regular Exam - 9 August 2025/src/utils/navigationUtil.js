import { userUtil } from "./userUtil.js";

const userDiv = document.querySelector('.user');
const guestDiv = document.querySelector('.guest');
const notification = document.getElementById('errorBox');
const errorMsg = notification.querySelector('.msg');

export function updateNav() {
    let userData = userUtil.getUserData();

    if (userData) {
        userDiv.style.display = 'inline-block';
        guestDiv.style.display = 'none';
    } else {
        guestDiv.style.display = 'inline-block';
        userDiv.style.display = 'none';
    }
}

export function showNotification(message) {
    notification.style.display = 'inline-block';
    errorMsg.innerHTML = message;
}

export function hideNotification(message = 'MESSAGE') {
    notification.style.display = 'none';
    errorMsg.innerHTML = message;
}