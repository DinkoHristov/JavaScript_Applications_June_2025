import { userInfo } from "./userData.js";

const userDiv = document.querySelector('.user');
const guestDiv = document.querySelector('.guest');

export function updateNav() {
    let userData = userInfo.getUserData();

    if (userData) {
        userDiv.style.display = 'inline-block';
        guestDiv.style.display = 'none';
    } else {
        guestDiv.style.display = 'inline-block';
        userDiv.style.display = 'none';
    }
}