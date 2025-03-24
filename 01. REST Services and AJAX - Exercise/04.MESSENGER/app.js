function attachEvents() {
    const url = 'https://http-rest-b17ec-default-rtdb.firebaseio.com/messenger/messenger.json';

    const authorInput = document.getElementById('author');
    const contentInput = document.getElementById('content');

    const textareaElement = document.getElementById('messages');
    const sendButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');

    sendButton.addEventListener('click', onSendButtonClicked);
    refreshButton.addEventListener('click', onRefreshButtonClicked);

    function onSendButtonClicked() {
        if (authorInput.value.trim() === '' || contentInput.value.trim() === '') {
            window.alert('Author input and Message input cannot be empty!');
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author: authorInput.value,
                content: contentInput.value,
            }),
        })
        .then(() => {
            authorInput.value = '';
            contentInput.value = '';
            refreshButton.click();
        })
        .catch(error => textareaElement.innerHTML = `${error.message}`);
    }

    function onRefreshButtonClicked() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let allMessages = [];
                Object.keys(data).forEach(message => {
                    if (data[message] !== null) {
                        let { author, content } = data[message];
                        allMessages.push({
                            author,
                            message: content,
                        });
                    }
                });

                let resultText = allMessages.map(x => `${x.author}: ${x.message}`).join('\n');

                textareaElement.innerHTML = resultText;
            })
            .catch(error => textareaElement.innerHTML = `${error.message}`);
    }
}

attachEvents();