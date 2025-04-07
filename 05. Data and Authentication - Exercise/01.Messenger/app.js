function attachEvents() {
    const url = `http://localhost:3030/jsonstore/messenger`;

    const messagesElement = document.getElementById('messages');
    const messageInput = document.querySelectorAll('input[type="text"]');
    const authorInput = messageInput[0];
    const contentInput = messageInput[1];

    const refreshButton = document.getElementById('refresh');
    const sendButton = document.getElementById('submit');

    refreshButton.addEventListener('click', onRefreshBtnClicked);
    sendButton.addEventListener('click', onSendBtnClicked);

    function onRefreshBtnClicked() {    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let messages = Object.keys(data).map(key => `${data[key].author}: ${data[key].content}`).join('\n');
                
                messagesElement.innerHTML = messages;
            })
            .catch();
    }

    function onSendBtnClicked() {    
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                author: authorInput.value,
                content: contentInput.value,
            }),
        })
        .then(() => {
            authorInput.value = '';
            contentInput.value = '';
        })
        .catch();
    }
}

attachEvents();