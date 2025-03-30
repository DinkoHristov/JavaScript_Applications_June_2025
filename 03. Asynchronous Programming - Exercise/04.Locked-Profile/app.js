function lockedProfile() {
    const mainElement = document.getElementById('main');
    const url = `http://localhost:3030/jsonstore/advanced/profiles`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mainElement.innerHTML = ''; // Clear existing HTML if needed
            Object.values(data).forEach((user, index) => {
                createProfile(user, index + 1);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function createProfile(user, index) {
        let divProfile = document.createElement('div');
        divProfile.classList.add('profile');

        let img = document.createElement('img');
        img.classList.add('userIcon');
        img.src = `./iconProfile2.png`;

        let labelLock = document.createElement('label');
        labelLock.textContent = 'Lock';

        let radioInputLock = document.createElement('input');
        radioInputLock.type = 'radio';
        radioInputLock.name = `user${index}Locked`;
        radioInputLock.value = 'lock';
        radioInputLock.checked = true;

        let labelUnlock = document.createElement('label');
        labelUnlock.textContent = 'Unlock';

        let radioInputUnlock = document.createElement('input');
        radioInputUnlock.type = 'radio';
        radioInputUnlock.name = `user${index}Locked`;
        radioInputUnlock.value = 'unlock';

        let br = document.createElement('br');
        let hr = document.createElement('hr');

        let usernameLabel = document.createElement('label');
        usernameLabel.textContent = 'Username';

        let inputUsername = document.createElement('input');
        inputUsername.type = 'text';
        inputUsername.name = `user${index}Username`;
        inputUsername.value = user.username;
        inputUsername.disabled = true;
        inputUsername.readOnly = true;

        let divHiddenFields = document.createElement('div');
        divHiddenFields.classList.add('hidden-fields');
        divHiddenFields.style.display = 'none'; // Initially hidden

        let hiddenHr = document.createElement('hr');

        let emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email:';

        let inputEmail = document.createElement('input');
        inputEmail.type = 'email';
        inputEmail.name = `user${index}Email`;
        inputEmail.value = user.email;
        inputEmail.disabled = true;
        inputEmail.readOnly = true;

        let ageLabel = document.createElement('label');
        ageLabel.textContent = 'Age:';

        let inputAge = document.createElement('input');
        inputAge.type = 'number';
        inputAge.name = `user${index}Age`;
        inputAge.value = user.age;
        inputAge.disabled = true;
        inputAge.readOnly = true;

        let button = document.createElement('button');
        button.textContent = 'Show more';
        button.addEventListener('click', (event) => {
            let isLocked = radioInputLock.checked;
            if (!isLocked) {
                if (divHiddenFields.style.display === 'none') {
                    divHiddenFields.style.display = 'block';
                    event.target.textContent = 'Hide it';
                } else {
                    divHiddenFields.style.display = 'none';
                    event.target.textContent = 'Show more';
                }
            }
        });

        divHiddenFields.appendChild(hiddenHr);
        divHiddenFields.appendChild(emailLabel);
        divHiddenFields.appendChild(inputEmail);
        divHiddenFields.appendChild(ageLabel);
        divHiddenFields.appendChild(inputAge);

        divProfile.appendChild(img);
        divProfile.appendChild(labelLock);
        divProfile.appendChild(radioInputLock);
        divProfile.appendChild(labelUnlock);
        divProfile.appendChild(radioInputUnlock);
        divProfile.appendChild(br);
        divProfile.appendChild(hr);
        divProfile.appendChild(usernameLabel);
        divProfile.appendChild(inputUsername);
        divProfile.appendChild(divHiddenFields);
        divProfile.appendChild(button);

        mainElement.appendChild(divProfile);
    }
}