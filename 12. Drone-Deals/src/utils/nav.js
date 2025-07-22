import { userService } from "../services/userService.js";

const userDiv = document.querySelector('.user');
const guestDiv = document.querySelector('.guest');

export function updateNav() {
    let userData = userService.getUserData();

    if (userData) {
        userDiv.style.display = 'inline-block';
        guestDiv.style.display = 'none';
    } else {
        guestDiv.style.display = 'inline-block';
        userDiv.style.display = 'none';
    }
}