import { updateNav } from "../navigate.js";
import { request } from "../requester.js";
import { userUtils } from "../userData.js";
import { utils } from "../utils.js";
import { showLoginView } from "./login.js";

export async function showLogoutView() {
    try {
        userUtils.clearUserData();

        showLoginView();
        updateNav();
    } catch (err) {
        alert(err);
    }
}