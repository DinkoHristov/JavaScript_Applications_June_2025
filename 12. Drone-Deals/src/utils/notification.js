const errorBox = document.getElementById('errorBox');
const errorMessage = errorBox.querySelector('.msg');

function show(message) {
    errorBox.style.display = 'inline-block';
    errorMessage.textContent = message;
}

function hide(message = 'MESSAGE') {
    errorBox.style.display = 'none';
    errorMessage.textContent = message;
}

export const notification = {
    show,
    hide
};