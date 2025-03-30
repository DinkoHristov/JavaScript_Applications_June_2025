function solution() {
    const url = `http://localhost:3030/jsonstore/advanced/articles/list  `;

    const mainElement = document.getElementById('main');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            createAccordionElement(data);
        })
        .catch();

    function createAccordionElement(data) {
        data.forEach(element => {
            let divMain = document.createElement('div');
            divMain.classList.add('accordion');

            let divHead = document.createElement('div');
            divHead.classList.add('head');

            let span = document.createElement('span');
            span.innerHTML = element.title;

            let button = document.createElement('button');
            button.classList.add('button');
            button.id = element._id;
            button.innerHTML = 'More';
            button.addEventListener('click', onButtonClicked);

            divHead.appendChild(span);
            divHead.appendChild(button);

            let divExtra = document.createElement('div');
            divExtra.classList.add('extra');
            divExtra.style.display = 'none';

            let p = document.createElement('p');
            p.innerHTML = '';

            divExtra.appendChild(p);

            divMain.appendChild(divHead);
            divMain.appendChild(divExtra);

            mainElement.appendChild(divMain);
        });
    }

    function onButtonClicked(e) {
        let id = e.target.id;
        let divExtra = e.target.parentElement.parentElement.getElementsByClassName('extra')[0];
        let p = divExtra.querySelector('p');

        let detailsUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

        fetch(detailsUrl)
            .then(response => response.json())
            .then(data => p.innerHTML = data.content)
            .catch();

        if (e.target.innerHTML === 'More') {
            e.target.innerHTML = 'Less';
            divExtra.style.display = 'block';
        } else {
            e.target.innerHTML = 'More';
            divExtra.style.display = 'none';
        }
    }
}

solution();