(() => {
    const monkeyTemplate = document.getElementById('monkey-template').innerHTML;
    const monkeysElement = document.querySelector('.monkeys');

    const createMonkey = Handlebars.compile(monkeyTemplate);
    let mokeysHTML = monkeys.map(monkey => createMonkey(monkey));

    monkeysElement.innerHTML = mokeysHTML;

    Array.from(monkeysElement.querySelectorAll('button')).map(button => button.addEventListener('click', onBtnCLicked));

    function onBtnCLicked(e) {
        e.preventDefault();
        let paragraph = e.target.parentElement.querySelector('p');
        
        if (paragraph.style.display === 'block') {
            paragraph.style.display = 'none';
        } else {
            paragraph.style.display = 'block';
        }
    }
})()