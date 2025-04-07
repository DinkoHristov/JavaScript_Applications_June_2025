function attachEvents() {
    const url = `http://localhost:3030/jsonstore/collections/students`;

    const tableElement = document.getElementById('results');
    const tableBodyElement = tableElement.querySelector('tbody');
    const inputElements = document.querySelector('.inputs');

    const submitButton = document.getElementById('submit');

    window.addEventListener('load', loadTable);
    submitButton.addEventListener('click', onSubmitBtnClicked);

    function loadTable(e) {
        e.preventDefault();
        tableBodyElement.innerHTML = '';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    let tr = document.createElement('tr');
                    tr.id = key;

                    let tdFirstName = document.createElement('td');
                    tdFirstName.innerHTML = data[key].firstName;

                    let tdLastName = document.createElement('td');
                    tdLastName.innerHTML = data[key].lastName;

                    let tdFacultyNumber = document.createElement('td');
                    tdFacultyNumber.innerHTML = data[key].facultyNumber;
                    
                    let tdGrade = document.createElement('td');
                    tdGrade.innerHTML = Number(data[key].grade).toFixed(2);

                    tr.appendChild(tdFirstName);
                    tr.appendChild(tdLastName);
                    tr.appendChild(tdFacultyNumber);
                    tr.appendChild(tdGrade);

                    tableBodyElement.appendChild(tr);
                });
            })
            .catch();
    }

    function onSubmitBtnClicked(e) {
        e.preventDefault();

        let firstName = inputElements.querySelector('[name="firstName"]');
        let lastName = inputElements.querySelector('[name="lastName"]');
        let facultyNumber = inputElements.querySelector('[name="facultyNumber"]');
        let grade = inputElements.querySelector('[name="grade"]');

        if (firstName.value.trim() == '' || lastName.value.trim() == '' ||
            facultyNumber.value.trim() == '' || grade.value.trim() == '') {
                return;
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            }),
        })
        .then(() => {
            firstName.value = '';
            lastName.value = '';
            facultyNumber.value = '';
            grade.value = '';
            loadTable(e);
        })
        .catch();
    }
}

attachEvents();