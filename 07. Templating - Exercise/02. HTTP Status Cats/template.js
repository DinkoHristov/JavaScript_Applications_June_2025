(() => {
     renderCatTemplate();

     function renderCatTemplate() {
        const catsUl = document.querySelector('#allCats ul');

        const catTemplate = document.getElementById('cat-template').innerHTML;

        const createCat = Handlebars.compile(catTemplate);
        
        let catsHTML = cats.map(cat => createCat(cat));

        catsUl.innerHTML = catsHTML;

        let catElements = Array.from(catsUl.children);

        catElements.map(cat => cat.querySelector('[class="showBtn"]').addEventListener('click', onBtnClicked));
     }

     function onBtnClicked(e) {
        e.preventDefault();

        let divStatus = e.target.parentElement.querySelector('[class="status"]');

        if (divStatus.style.display === 'block') {
            divStatus.style.display = 'none';
        } else {
            divStatus.style.display = 'block';
        }
     } 
})();