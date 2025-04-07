function solve() {
    const contactsElement = document.getElementById('contacts');

    createContacts();
    addDetailsBtnClickEvent();

    function createContacts() {
        const contactTemplate = `
            <div class="contact card">
                <div>
                    <i class="far fa-user-circle gravatar"></i>
                </div>
                <div class="info">
                    <h2>Name: {{name}}</h2>
                    <button class="detailsBtn">Details</button>
                    <div class="details" id="{{id}}" style="display: none;">
                    <p>Phone number: {{phoneNumber}}</p>
                    <p>Email: {{email}}</p>
                </div>
                </div>
            </div>
        `;
        const createContactTemplate = Handlebars.compile(contactTemplate);

        let contactsHTML = contacts.map(contact => createContactTemplate(contact)).join('');

        contactsElement.innerHTML = contactsHTML;
    }

    function addDetailsBtnClickEvent() {
        const detailsBtns = Array.from(contactsElement.querySelectorAll('button'));
        detailsBtns.map(button => button.addEventListener('click', showDetails));
    }

    function showDetails(e) {
        const parent = e.target.parentElement;
        const divDetails = parent.querySelector('.details');

        if (divDetails.style.display === 'block') {
            divDetails.style.display = 'none';
        } else {
            divDetails.style.display = 'block';
        }
    }
}

solve();