function solve() {

    start();

    function start() {
        window.onload = onPageLoaded;
        
        const mainSection = document.getElementById('views');
        const currentSection = mainSection.querySelector('section');
        const guestNav = document.getElementById('guest');
        const userNav = document.getElementById('user');

        const loggedUser = JSON.parse(localStorage.getItem('user'));

        if (loggedUser !== null && loggedUser.token) {
            guestNav.style.display = 'none';
            userNav.style.display = 'block';
        } else {
            guestNav.style.display = 'block';
            userNav.style.display = 'none';
        }
        
        if (currentSection.id === 'home-view') {
            const addButton = document.querySelector('[class="add"]');
            addButton.addEventListener('click', createNewCatch);
        } else if (currentSection.id === 'login-view') {
            loginUser();
        } else if (currentSection.id === 'register-view') {
            registerUser();
        }
    }

    function onPageLoaded() {
        const loggedUser = JSON.parse(localStorage.getItem('user'));

        setAciveClass();
        setUserInfoAndActivateDeactivateButtons(loggedUser);
    }

    function registerUser() {
        // Register User
        const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const notification = document.querySelector('.notification');
        const registerButton = document.querySelector('form[id="register"] button');
    
        registerButton.addEventListener('click', onRegisterBtnClicked);
    
        function onRegisterBtnClicked(e) {
            e.preventDefault();
            notification.innerHTML = '';
    
            const email = document.querySelector('[name="email"]');
            const password = document.querySelector('[name="password"]');
            const confirmPassword = document.querySelector('[name="rePass"]');
    
            if (!email.value.trim() || !password.value.trim() || !confirmPassword.value.trim()) {
                notification.innerHTML = 'Inputs cannot be empty!';
                return;
            }
    
            if (!emailRegex.test(email.value)) {
                notification.innerHTML = 'Invalid email format!';
                return;
            }
    
            if (password.value !== confirmPassword.value) {
                notification.innerHTML = "Passwords don't match!";
                return;
            }
    
            fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message); });
                }
                
                return response.json();
            })
            .then(data => {
                localStorage.setItem('user', JSON.stringify({
                    email: data.email,
                    token: data.accessToken,
                    _id: data._id,
                }));
    
                window.location.href = 'index.html';
            })
            .catch(error => {
                notification.innerHTML = `Registration failed: ${error.message}`;
            });
        }
    }

    function loginUser() {
        const loginForm = document.querySelector('form[id="login"]');
        const loginButton = loginForm.querySelector('button');

        loginButton.addEventListener('click', onLoginBtnClicked);

        function onLoginBtnClicked(e) {
            e.preventDefault();

            const email = loginForm.querySelector('[name="email"]'); 
            const password = loginForm.querySelector('[name="password"]'); 
            const notification = loginForm.querySelector('[class="notification"]');

            const existingUser = localStorage.getItem('user');

            if (email.value.trim() === '' || password.value.trim() === '') {
                notification.innerHTML = `Inputs cannot be empty!`;
                return;
            }
    
            fetch(`http://localhost:3030/users/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid email or password!');
                }

                return response.json();
            })
            .then(data => {
                localStorage.setItem('user', JSON.stringify({
                    email: data.email,
                    token: data.accessToken,
                    _id: data._id,
                }));

                window.location.href = 'index.html';
            })
            .catch(error => notification.innerHTML = error.message);
        }
    }

    function enableDisableButtons(loggedUser) {
        const mainSection = document.getElementById('views');
        const currentSection = mainSection.querySelector('section');

        if (currentSection.id === 'home-view') {
            let mainSection = document.getElementById('home-view');
            let allButtons = Array.from(mainSection.querySelectorAll('button'));

            if (loggedUser !== null && loggedUser.token) {
                allButtons.forEach(button => {
                    if (button.classList.value !== 'load') {
                        button.disabled = false;
                    }

                    if (button.classList.value === 'update' || button.classList.value === 'delete') {
                        button.disabled = loggedUser._id.localeCompare(button.dataset.ownerId) === 0 ? false : true;
                    }
                });
            } else {
                allButtons.forEach(button => {
                    if (button.classList.value !== 'load') {
                        button.disabled = true;
                    }
                });
            }
        }
    }

    function onLogoutBtnClicked() {
        const user = JSON.parse(localStorage.getItem('user'));
    
        fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': user.token,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
    
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        })
        .catch(error => console.error(error.message));
    }
    

    function loadCatches() {
        const mainDiv = document.getElementById('catches');
        const loggedUser = JSON.parse(localStorage.getItem('user'));

        mainDiv.innerHTML = '';

        fetch(`http://localhost:3030/data/catches`)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    let catchElement = createCatch(data[key]);

                    mainDiv.appendChild(catchElement);
                })

                enableDisableButtons(loggedUser);
            })
            .catch(error => console.log(error.message));
    }

    function createCatch(data) {
        let catchDiv = document.createElement('div');
        catchDiv.classList.add('catch');

        let anglerLabel = document.createElement('label');
        anglerLabel.innerHTML = 'Angler';

        let anglerInput = document.createElement('input');
        anglerInput.type = 'text';
        anglerInput.classList.add('angler');
        anglerInput.value = data.angler;
        
        let weightLabel = document.createElement('label');
        weightLabel.innerHTML = 'Weight';

        let weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.classList.add('weight');
        weightInput.value = data.weight;

        let speciesLabel = document.createElement('label');
        speciesLabel.innerHTML = 'Species';

        let speciesInput = document.createElement('input');
        speciesInput.type = 'text';
        speciesInput.classList.add('species');
        speciesInput.value = data.species;

        let locationLabel = document.createElement('label');
        locationLabel.innerHTML = 'Location';

        let locationInput = document.createElement('input');
        locationInput.type = 'text';
        locationInput.classList.add('location');
        locationInput.value = data.location;

        let baitLabel = document.createElement('label');
        baitLabel.innerHTML = 'Bait';

        let baitInput = document.createElement('input');
        baitInput.type = 'text';
        baitInput.classList.add('bait');
        baitInput.value = data.bait;

        let timeLabel = document.createElement('label');
        timeLabel.innerHTML = 'Capture Time';

        let timeInput = document.createElement('input');
        timeInput.type = 'number';
        timeInput.classList.add('captureTime');
        timeInput.value = data.captureTime;

        let updateButton = document.createElement('button');
        updateButton.classList.add('update');
        updateButton.dataset.ownerId = data._ownerId;
        updateButton.dataset.id = data._id;
        updateButton.innerHTML = 'Update';
        updateButton.addEventListener('click', onUpdateBtnClicked);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.dataset.ownerId = data._ownerId;
        deleteButton.dataset.id = data._id;
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', onDeleteBtnClicked);

        catchDiv.appendChild(anglerLabel);
        catchDiv.appendChild(anglerInput);
        catchDiv.appendChild(weightLabel);
        catchDiv.appendChild(weightInput);
        catchDiv.appendChild(speciesLabel);
        catchDiv.appendChild(speciesInput);
        catchDiv.appendChild(locationLabel);
        catchDiv.appendChild(locationInput);
        catchDiv.appendChild(baitLabel);
        catchDiv.appendChild(baitInput);
        catchDiv.appendChild(timeLabel);
        catchDiv.appendChild(timeInput);
        catchDiv.appendChild(updateButton);
        catchDiv.appendChild(deleteButton);

        return catchDiv;
    }

    function onUpdateBtnClicked(e) {
        e.preventDefault();

        const loggedUser = JSON.parse(localStorage.getItem('user'));
        const loadButton = document.querySelector('[class="load"]');

        let catchId = e.target.dataset.id;
        let div = e.target.parentElement;

        let angler = div.querySelector('[class="angler"]');
        let weight = div.querySelector('[class="weight"]');
        let species = div.querySelector('[class="species"]');
        let location = div.querySelector('[class="location"]');
        let bait = div.querySelector('[class="bait"]');
        let captureTime = div.querySelector('[class="captureTime"]');

        if (angler.value.trim() === '' ||
            !weight.value ||
            species.value.trim() === '' ||
            location.value.trim() === '' ||
            bait.value.trim() === '' ||
            !captureTime.value) {
                return;
        }

        fetch(`http://localhost:3030/data/catches/${catchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': loggedUser.token,
            },            
            body: JSON.stringify({
                angler: angler.value,
                weight: weight.value,
                species: species.value,
                location: location.value,
                bait: bait.value,
                captureTime: captureTime.value,
            }),
        })
        .then(() => {
            loadButton.click();
        })
        .catch(error => console.log(error.message));
    }

    function onDeleteBtnClicked(e) {
        e.preventDefault();
        
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        const loadButton = document.querySelector('[class="load"]');

        let catchId = e.target.dataset.id;

        fetch(`http://localhost:3030/data/catches/${catchId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': loggedUser.token,
            },    
        })
        .then(() => {
            loadButton.click();
        })
        .catch(error => console.log(error.message));
    }

    function createNewCatch(e) {
        e.preventDefault();

        const loggedUser = JSON.parse(localStorage.getItem('user'));

        const loadButton = document.querySelector('[class="load"]');
        const fieldset = e.target.parentElement;
        
        let angler = fieldset.querySelector('[name="angler"]');
        let weight = fieldset.querySelector('[name="weight"]');
        let species = fieldset.querySelector('[name="species"]');
        let location = fieldset.querySelector('[name="location"]');
        let bait = fieldset.querySelector('[name="bait"]');
        let captureTime = fieldset.querySelector('[name="captureTime"]');

        if (angler.value.trim() === '' ||
            !weight.value ||
            species.value.trim() === '' ||
            location.value.trim() === '' ||
            bait.value.trim() === '' ||
            !captureTime.value) {
                return;
        }

        fetch(`http://localhost:3030/data/catches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': loggedUser.token,
            },            
            body: JSON.stringify({
                _ownerId: loggedUser._ownerId,
                angler: angler.value,
                weight: weight.value,
                species: species.value,
                location: location.value,
                bait: bait.value,
                captureTime: captureTime.value,
                _createdOn: Date.now(),
                _id: loggedUser._id,
            }),
        })
        .then(() => {
            loadButton.click();
            angler.value = '';
            weight.value = '';
            species.value = '';
            location.value = '';
            bait.value = '';
            captureTime.value = '';
        })
        .catch(error => console.log(error.message));
    }

    function setAciveClass() {
        const mainSection = document.getElementById('views');
        const currentSection = mainSection.querySelector('section');
        
        const loadButton = document.querySelector('[class="load"]');
        if (loadButton !== null) {
            loadButton.addEventListener('click', loadCatches);
        }

        const anchors = Array.from(document.getElementsByTagName('a'));
        anchors.map(a => a.classList.remove('active'));
    
        if (currentSection.id === 'home-view') {
            const homeAnchor = document.getElementById('home');
            homeAnchor.classList.add('active');
        } else if (currentSection.id === 'login-view') {
            const loginAnchor = document.getElementById('login');
            loginAnchor.classList.add('active');
        } else if (currentSection.id === 'register-view') {
            const registerAnchor = document.getElementById('register');
            registerAnchor.classList.add('active');
        }
    }

    function setUserInfoAndActivateDeactivateButtons(loggedUser) {
        if (loggedUser !== null && loggedUser.token) {
            const nav = document.querySelector('nav');
            let p = nav.querySelector('[class="email"]');
            let span = p.querySelector('span');
            span.innerHTML = loggedUser.email;

            const logoutButton = document.getElementById('logout');
            logoutButton.style.display = 'block';
            logoutButton.addEventListener('click', onLogoutBtnClicked);

            enableDisableButtons(loggedUser);
        } else {
            const logoutButton = document.getElementById('logout');
            logoutButton.style.display = 'none';
            logoutButton.removeEventListener('click', onLogoutBtnClicked);

            enableDisableButtons(loggedUser);
        }
    }
}

solve();