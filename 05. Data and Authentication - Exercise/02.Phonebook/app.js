function attachEvents() {
    const baseUrl = `http://localhost:3030/jsonstore/phonebook`;

    const phonebookElement = document.getElementById('phonebook');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    
    const createButton = document.getElementById('btnCreate');
    const loadButton = document.getElementById('btnLoad');

    loadButton.addEventListener('click', onLoadBtnClicked);
    createButton.addEventListener('click', onCreateBtnClicked);

    function onLoadBtnClicked() {
        phonebookElement.innerHTML = '';
    
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    data[key]._id = key;
    
                    let li = document.createElement('li');
                    li.id = data[key]._id;
                    li.innerHTML = `${data[key].person}: ${data[key].phone}`;
    
                    let deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = 'Delete';
                    deleteBtn.addEventListener('click', onDeleteBtnClicked);
    
                    li.appendChild(deleteBtn);
                    phonebookElement.appendChild(li);
                });
            })
            .catch(error => console.error('Load error:', error));
    }    

    function onDeleteBtnClicked(e) {
        const phoneId = e.target.parentElement.id;
    
        fetch(`${baseUrl}/${phoneId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Contact wasn't deleted!`);
            }
    
            e.target.parentElement.remove();
        })
        .catch(error => console.log(error.message));
    }
   
    function onCreateBtnClicked() {
        if (personInput.value.trim() !== '' && phoneInput.value.trim() !== '') {
            fetch(baseUrl, {
                method: 'POST',
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
    }
}

attachEvents();