const baseUrl = `https://testapp-13aec-default-rtdb.firebaseio.com/`;

const booksElement = document.getElementById('books');
const foundBookElement = document.getElementById('found-book');

const loadButton = document.getElementById('loadBooks');
const createBookElement = document.getElementById('createBook');
const findTitleElement = document.getElementById('find-title');

loadButton.addEventListener('click', getAllBooksClicked);
createBookElement.addEventListener('click', createBookClicked);
findTitleElement.addEventListener('change', findBookExecuted);

function getAllBooksClicked() {
    booksElement.innerHTML = '';

    fetch(`${baseUrl}/Books.json`)
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                let li = createLiElement(key, data);

                booksElement.appendChild(li);
            })
        })
        .catch(error => booksElement.innerHTML = `No books found: ${error.message}!`);
}

function onInfoBtnClicked(e) {
    let bookId = e.target.parentElement.id;

    fetch(`${baseUrl}/Books/${bookId}.json`)
        .then(response => response.json())
        .then(data => {
            let message = '';

            Object.keys(data).forEach(key => {
                message += `Book ${key} is: ${data[key]}!\n`;
            });

            showNotification(message.trimEnd());
        })
        .catch(error => showNotification(`Wrong book id: ${error.message}`, 'error'));
}

function onModifyBookBtnClicked(e) {
    let bookId = e.target.parentElement.id;
    
    let yearElementLi = e.target.parentElement;

    let yearElement = yearElementLi.querySelector('#year');
    yearElement.style.display = 'block';

    if (yearElement.value > 0) {
        fetch(`${baseUrl}/Books/${bookId}.json`, {
            method: 'PATCH',
            body: JSON.stringify( {year: yearElement.value} ), 
        })
        .then(() => {
            showNotification(`Book year: ${yearElement.value} is successfully added!`);

            yearElement.value = '';
            yearElement.style.display = 'none';
        })
        .catch(error => showNotification(`Book year not added: ${error.message}`, 'error'));
    }
}

function onChangeAuthorCLicked(e) {
    let bookId = e.target.parentElement.id;
    
    let authorElementLi = e.target.parentElement;

    let authorElement = authorElementLi.querySelector('#author-change');
    authorElement.style.display = 'block';

    if (authorElement.value.trim() !== '') {
        fetch(`${baseUrl}/Books/${bookId}/author/.json`, {
            method: 'PUT',
            body: JSON.stringify(authorElement.value), 
        })
        .then(() => {
            showNotification(`Book author is changed to: ${authorElement.value}!`);

            authorElement.value = '';
            authorElement.style.display = 'none';
        })
        .catch(error => showNotification(`Book author was not modified: ${error.message}`, 'error'));
    }
}

function createBookClicked(e) {
    e.preventDefault();

    let bookTitleElement = document.getElementById('title');
    let bookAuthorElement = document.getElementById('author');

    if (bookTitleElement.value.trim() !== '' && bookAuthorElement.value.trim() !== '') {
        let newBook = {
            title: bookTitleElement.value,
            author: bookAuthorElement.value,
        };

        fetch(`${baseUrl}/Books.json`, {
            method: 'POST',
            body: JSON.stringify(newBook),
        })
        .then(() => {
            showNotification(`Book ${bookTitleElement.value} is created successfully!`)
            bookTitleElement.value = '';
            bookAuthorElement.value = '';
        })
        .catch(error => showNotification(`Book is not created: ${error.message}!`, 'error'))
    } else {
        showNotification('Book title and author cannot be empty!', 'error');
    }
}

function findBookExecuted(e) {
    let searchedTitle = e.target.value;
    foundBookElement.innerHTML = '';

    fetch(`${baseUrl}/Books.json`)
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                if (data[key].title.toLowerCase().includes(searchedTitle.toLowerCase())) {
                    let li = document.createElement('li');
                    li.id = key;
                    li.innerHTML = `Book title: <b>${data[key].title}</b>`;

                    let infoButton = document.createElement('button');
                    infoButton.innerHTML = 'Info';
                    infoButton.addEventListener('click', onInfoBtnClicked);

                    li.appendChild(infoButton);

                    foundBookElement.appendChild(li);
                }
            })
        }) 
        .catch(error => showNotification(`Book is not found: ${error.message}!`, 'error'));
}

function createLiElement(key, data) {
    let li = document.createElement('li');
    li.id = key;
    li.innerHTML = `Book title: <b>${data[key].title}</b>`;

    let infoButton = document.createElement('button');
    infoButton.innerHTML = 'Info';
    infoButton.addEventListener('click', onInfoBtnClicked);

    let yearInput = document.createElement('input');
    yearInput.type = 'number';
    yearInput.id = 'year';
    yearInput.name = 'year';
    yearInput.placeholder = 'Book year...';
    yearInput.style.display = 'none';

    let modifyBookBtn = document.createElement('button');
    modifyBookBtn.innerHTML = 'Add book year';
    modifyBookBtn.addEventListener('click', onModifyBookBtnClicked);

    let authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.id = 'author-change';
    authorInput.name = 'author-change';
    authorInput.placeholder = 'New book author...';
    authorInput.style.display = 'none';

    let changeAuthorBtn = document.createElement('button');
    changeAuthorBtn.innerHTML = 'Change author';
    changeAuthorBtn.addEventListener('click', onChangeAuthorCLicked);

    li.appendChild(infoButton);
    li.appendChild(yearInput);
    li.appendChild(modifyBookBtn);
    li.appendChild(authorInput);
    li.appendChild(changeAuthorBtn);

    return li;
}

// Custom notification
function showNotification(message, type = 'success') {
    let notification = document.getElementById('notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }

    notification.classList.remove('show', 'hide');

    notification.style.backgroundColor = type === 'error' ? '#ff4d4d' : '#4CAF50';
    notification.innerText = message;

    notification.classList.add('show');

    if (notification.timeoutId) {
        clearTimeout(notification.timeoutId);
    }

    notification.timeoutId = setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.classList.remove('show', 'hide');
        }, 500);
    }, 3000);
}