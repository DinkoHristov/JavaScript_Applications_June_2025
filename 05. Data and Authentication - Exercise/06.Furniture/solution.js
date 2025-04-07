function solve() {
    const homeLoggedFileName = 'homeLogged.html';
    const homeLoggedOutFileName = 'home.html';
    const loginFileName = 'login.html';
    const currentPage = location.pathname.split('/').pop();
    const user = JSON.parse(localStorage.getItem('user'));
    
    const registerForm = document.querySelector('form[action="/register"]');
    const loginForm = document.querySelector('form[action="/login"]');
    const divExercise = document.getElementById('exercise');
    const divOrders = document.querySelector('[class="orders"]');

    start();

    function start() {
        if (!user && currentPage !== homeLoggedOutFileName && currentPage !== loginFileName) {
            window.location.href = homeLoggedOutFileName;
            return;
        }
    
        if (user && currentPage !== homeLoggedFileName) {
            window.location.href = homeLoggedFileName;
            return;
        }
    
        const buyButton = document.getElementById('buy');
    
        if (buyButton !== null) {
            buyButton.addEventListener('click', onBuyBtnClicked);
        }
    
        const logoutButton = document.getElementById('logoutBtn');
        if (logoutButton !== null) {
            logoutButton.addEventListener('click', onLogoutBtnClicked);
        }
    
        if (divExercise !== null) {
            const createButton = divExercise.querySelector('button');
            if (createButton !== null) {
                createButton.addEventListener('click', onCreateBtnClicked);
            }
    
            const user = JSON.parse(localStorage.getItem('user'));
            if (user === null && currentPage !== loginFileName) {
                loadCurrentUserCreatedFurnitures();
            } else if (user !== null && user.token !== null && currentPage === homeLoggedFileName) {
                loadCurrentUserCreatedFurnitures();
            }
        }
    
        if (divOrders !== null) {
            const allOrdersButton = document.getElementById('show-orders-btn');
            allOrdersButton.addEventListener('click', onAllOrdersBtnClicked);
        }
    
        if (registerForm !== null || loginForm !== null) {
            attachRegisterFunction();
            attachLoginFunction();
        }
    }
  
    function attachRegisterFunction() {
        const notification = registerForm.getElementsByClassName('notification')[0];
        const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const registerButton = registerForm.querySelector('button');
        registerButton.addEventListener('click', onRegisterBtnClicked);

        function onRegisterBtnClicked(e) {
            e.preventDefault();

            notification.innerHTML = '';
    
            const emailInput = registerForm.querySelector('[name="email"]');
            const passwordInput = registerForm.querySelector('[name="password"]');
            const confirmPasswordInput = registerForm.querySelector('[name="rePass"]');
    
            if (!emailInput.value.trim() ||
                !passwordInput.value.trim() ||
                !confirmPasswordInput.value.trim()) {
                    notification.innerHTML = `Inputs cannot be empty!`;
                    return;
            }

            if (!emailRegex.test(emailInput.value)) {
                notification.innerHTML = `Email must have 3 or more letters followed by @domain.{2 or more letter}!`;
                return;
            }
  
            let isPasswordsSame = passwordInput.value.localeCompare(confirmPasswordInput.value) === 0;
  
            if (!isPasswordsSame) {
                notification.innerHTML = `Password and Confirm Password must be the same!`;
                return;
            }

            const existingUser = JSON.parse(localStorage.getItem('user'));

            if (existingUser !== null && existingUser.email.localeCompare(emailInput.value) === 0) {
                notification.innerHTML = `User with email: ${emailInput.value} already exists!`;
                return;
            }
  
            fetch(`http://localhost:3030/users/register`, {
                method: 'POST',
                body: JSON.stringify({
                  email: emailInput.value,
                  password: passwordInput.value,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error with user\'s registration!');
                }
          
                return response.json();
            })
            .then(() => {
                emailInput.value = '';
                passwordInput.value = '';
                confirmPasswordInput.value = '';
            })
            .catch(error => notification.innerHTML = error.message);
        }
    }

    function attachLoginFunction() {
        const notification = loginForm.getElementsByClassName('notification')[0];
        const loginButton = loginForm.querySelector('button');
        loginButton.addEventListener('click', onLoginBtnClicked);

        function onLoginBtnClicked(e) {
            e.preventDefault();

            notification.innerHTML = '';
            const emailInput = loginForm.querySelector('[name="email"]');
            const passwordInput = loginForm.querySelector('[name="password"]');

            if (!emailInput.value.trim() || !passwordInput.value.trim()) {
                notification.innerHTML = `Inputs cannot be empty!`;
                return;
            }

            fetch(`http://localhost:3030/users/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value,
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Cannot find such user!');
                }

                return response.json();
            })
            .then(data => {
                localStorage.setItem('user', JSON.stringify({
                    email: data.email,
                    token: data.accessToken,
                    id: data._id,
                }));

                emailInput.value = '';
                passwordInput.value = '';
                window.location.href = homeLoggedFileName;
            })
            .catch(error => notification.innerHTML = error.message);
        }
    }

    function onLogoutBtnClicked(e) {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            return;
        }
    
        fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': user.token,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed!');
            }
    
            localStorage.removeItem('user');
            window.location.href = homeLoggedOutFileName;
        })
        .catch(error => console.error(error.message));
    }

    function onCreateBtnClicked(e) {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        const notification = divExercise.getElementsByClassName('notification')[0];
        notification.innerHTML = '';

        const table = divExercise.getElementsByClassName('table')[0];
        if (table === undefined) {
            return;
        }
        const tableBody = table.querySelector('tbody');

        createFurniture();

        function createFurniture() {
            const form = document.getElementById('create-form');

            const nameInput = form.querySelector('[name="name"]');
            const priceInput = form.querySelector('[name="price"]');
            const factorInput = form.querySelector('[name="factor"]');
            const imgInput = form.querySelector('[name="img"]');

            if (!nameInput.value.trim() ||
                !priceInput.value.trim() ||
                !factorInput.value.trim() ||
                !imgInput.value.trim()) {
                    notification.innerHTML = `Inputs cannot be empty!`;
                    return;
            }

            fetch(`http://localhost:3030/data/furniture`, {
                method: 'POST',
                headers: {
                    'X-Authorization': user.token,
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    price: priceInput.value,
                    factor: factorInput.value,
                    img: imgInput.value,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Furniture is not created!');
                }
    
                return response.json();
            })
            .then(data => {
                let trElement = tableCreateFurnitureTrElement(data);
                tableBody.appendChild(trElement);

                nameInput.value = '';
                priceInput.value = '';
                factorInput.value = '';
                imgInput.value = '';
            })
            .catch(error => notification.innerHTML = error.message);
        }
    }

    function loadCurrentUserCreatedFurnitures() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user === null) {
            loadFurnituresLoggedOutUser();
            return;
        }

        const notification = divExercise.getElementsByClassName('notification')[0];
        const table = divExercise.getElementsByClassName('table')[0];
        if (table === undefined) {
            return;
        }
        const tableBody = table.querySelector('tbody');

        tableBody.innerHTML = '';

        fetch(`http://localhost:3030/data/furniture`)
            .then(response => response.json())
            .then(data => {
                data.forEach(furniture => {
                    if (furniture._ownerId.localeCompare(user.id) === 0) {
                        let trElement = tableCreateFurnitureTrElement(furniture);
                        tableBody.appendChild(trElement);
                    }
                });
            })
            .catch(error => notification.innerHTML = `Furnitures couldn\'t be loaded!: ${error.message}`);
    }

    function tableCreateFurnitureTrElement(data) {
        let tr = document.createElement('tr');

        let tdImg = document.createElement('td');
        let img = document.createElement('img');
        img.src = data.img;
        tdImg.appendChild(img);

        let tdName = document.createElement('td');
        let nameP = document.createElement('p');
        nameP.innerHTML = data.name;
        tdName.appendChild(nameP);
        
        let tdPrice = document.createElement('td');
        let priceP = document.createElement('p');
        priceP.innerHTML = data.price;
        tdPrice.appendChild(priceP);
        
        let tdFactor = document.createElement('td');
        let factorP = document.createElement('p');
        factorP.innerHTML = data.factor;
        tdFactor.appendChild(factorP);

        let tdCheckbox = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        tdCheckbox.appendChild(checkbox);

        tr.appendChild(tdImg);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdFactor);
        tr.appendChild(tdCheckbox);

        return tr;
    }

    function onBuyBtnClicked(e) {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        let furnitures = loadCheckedFurnitures();
        if (furnitures.length <= 0) {
            return;
        }

        fetch(`http://localhost:3030/data/orders`, {
            method: 'POST',
            headers: {
                'X-Authorization': user.token,
            },
            body: JSON.stringify(furnitures),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Couldn\'t buy furnitures!');
            }

            return response.json();
        })
        .catch(error => console.log(error.message));
    }

    function loadCheckedFurnitures() {
        const table = divExercise.getElementsByClassName('table')[0];
        if (table === undefined) {
            return;
        }
        const tableBody = table.querySelector('tbody');
        const trElements = Array.from(tableBody.querySelectorAll('tr'));

        let furnitures = [];

        trElements.forEach(tr => {
            let tdElements = Array.from(tr.querySelectorAll('td'));

            let img = tdElements[0].querySelector('img').src;
            let name = tdElements[1].querySelector('p').innerHTML;
            let price = tdElements[2].querySelector('p').innerHTML;
            let factor = tdElements[3].querySelector('p').innerHTML;
            let checked = tdElements[4].querySelector('input').checked;

            if (checked) {
                furnitures.push({
                    img,
                    name,
                    price,
                    factor,
                });
            }
        });

        return furnitures;
    }

    function onAllOrdersBtnClicked(e) {
        e.preventDefault();

        let paragraphs = Array.from(divOrders.querySelectorAll('p'));
        paragraphs.forEach(p => p.remove());

        const user = JSON.parse(localStorage.getItem('user'));

        const userId = user.id;
        const encodedUserId = encodeURIComponent(`_ownerId="${userId}"`);
        const url = `http://localhost:3030/data/orders?where=${encodedUserId}`;
          
        let names = [];
        let totalPrice = 0;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Could not find the user!');
                }

                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    const emptyMsg = document.createElement('p');
                    emptyMsg.innerHTML = `Bought furniture: <span>Nothing bought yet!</span>`;
                    
                    const priceMsg = document.createElement('p');
                    priceMsg.innerHTML = `Total price: <span>0 $</span>`;
                
                    divOrders.insertBefore(emptyMsg, e.target);
                    divOrders.insertBefore(priceMsg, e.target);
                    return;
                }                

                data.forEach(furniture => {
                    Object.keys(furniture).forEach(key => {
                        if (typeof(furniture[key]) === 'object') {
                            names.push(furniture[key].name);
                            totalPrice += Number(furniture[key].price);
                        }
                    }); 
                });

                let namesP = document.createElement('p');
                namesP.innerHTML = `Bought furniture: <span>${names.join(', ')}</span>`;

                let priceP = document.createElement('p');
                priceP.innerHTML = `Total price: <span>${totalPrice} $</span>`;

                divOrders.insertBefore(namesP, e.target);
                divOrders.insertBefore(priceP, e.target);
            })
            .catch(error => console.log(error.message));
    }

    function loadFurnituresLoggedOutUser() {
        const table = document.querySelector('[class="table"]');
        if (table === null) {
            return;
        }
        const body = table.querySelector('tbody');

        body.innerHTML = '';

        fetch(`http://localhost:3030/data/furniture`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unsuccessfully loading of the furnitures!');
                }

                return response.json();
            })
            .then(data => {
                data.forEach(furniture => {
                    let tdElement = tableCreateFurnitureTrElement(furniture);
                    tdElement.querySelector('input').disabled = true;
                    body.appendChild(tdElement);
                });
            })
            .catch(error => console.log(error.message));
    }
}
  
solve();