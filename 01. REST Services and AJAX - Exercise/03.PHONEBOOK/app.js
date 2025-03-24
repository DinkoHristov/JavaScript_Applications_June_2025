function attachEvents() {
    const personNameRegex = /^[A-Za-z]{3,}$/;
    const phoneRegex = /^\+359\s?\d{6,}$/;

    const getAndPostUrl = `https://http-rest-b17ec-default-rtdb.firebaseio.com/phonebook/phonebook.json`;

    const ulElement = document.getElementById('phonebook');
    const loadButton = document.getElementById('btnLoad');
    const createButton = document.getElementById('btnCreate');

    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    loadButton.addEventListener('click', onLoadButtonClicked);
    createButton.addEventListener('click', onCreateButtonClicked);

    function onLoadButtonClicked() {
        clearUlElement();

        fetch(getAndPostUrl)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(contact => {
                    if (data[contact] !== null) {
                        let { person, phone } = data[contact];

                        let li = document.createElement('li');
                        li.id = `${contact}`;
                        li.innerHTML = `${person}: ${phone}`;

                        let deleteButton = document.createElement('button');
                        deleteButton.innerHTML = 'Delete';
                        deleteButton.addEventListener('click', onDeleteButtonClicked);

                        li.appendChild(deleteButton);
                        ulElement.appendChild(li);   
                    }
                })
            })
            .catch();
    }

    function onDeleteButtonClicked(e) {
        let contactId = e.target.parentElement.id;
        const deleteUrl = `https://http-rest-b17ec-default-rtdb.firebaseio.com/phonebook/phonebook/${contactId}.json`;

        fetch(deleteUrl, {
            method: 'DELETE'
        })
        .then(() => loadButton.click())
        .catch();
    }

    function onCreateButtonClicked() {
        if (!personNameRegex.test(personInput.value) || !phoneRegex.test(phoneInput.value)) {
            let message = 'Person name or person phone number are invalid! ' + 
            'Person name must have at least 3 letters and the phone number must start with +359 and have 6 or more digits after!';
            window.alert(message);
            return;
        }

        fetch(getAndPostUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                person: personInput.value,
                phone: phoneInput.value,
            }),
        })
        .then(() => {
            personInput.value = '';
            phoneInput.value = '';
            loadButton.click();
        })
        .catch();
    }

    function clearUlElement() {
        let allLiElements = Array.from(ulElement.children);

        allLiElements.forEach(currentLi => {
            currentLi.remove();
        });
    }
}

attachEvents();