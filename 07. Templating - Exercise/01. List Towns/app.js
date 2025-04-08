function attachEvents() {
    const townInput = document.getElementById('towns');
    const rootElement = document.getElementById('root');

    const loadButton = document.getElementById('btnLoadTowns');
    loadButton.addEventListener('click', onCreateLiElement);

    function onCreateLiElement(e) {
        e.preventDefault();

        let towns = townInput.value.split(', ');

        let ulElement = document.createElement('ul');

        towns.map(town => {
            let li = document.createElement('li');
            li.innerHTML = town;
            
            ulElement.appendChild(li);
        });

        rootElement.appendChild(ulElement);
    }
}

attachEvents();