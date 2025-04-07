function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const tbody = document.querySelector('tbody');
    const loadBtn = document.getElementById('loadBooks');
    const form = document.querySelector('form');
    const titleInput = form.querySelector('input[name="title"]');
    const authorInput = form.querySelector('input[name="author"]');
    const submitBtn = form.querySelector('button');

    loadBtn.addEventListener('click', loadBooks);
    submitBtn.addEventListener('click', onSubmit);

    function loadBooks() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                tbody.innerHTML = '';

                Object.entries(data).forEach(([id, book]) => {
                    const tr = document.createElement('tr');
                    tr.setAttribute('data-id', id);

                    tr.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                        </td>
                    `;

                    tr.querySelector('.edit').addEventListener('click', () => onEdit(id, book));
                    tr.querySelector('.delete').addEventListener('click', () => onDelete(id));

                    tbody.appendChild(tr);
                });
            });
    }

    function onSubmit(e) {
        e.preventDefault();
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();

        if (!title || !author) return;

        if (form.dataset.id) {
            fetch(`${url}/${form.dataset.id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, author })
            }).then(() => {
                form.reset();
                submitBtn.textContent = 'Submit';
                form.querySelector('h3').textContent = 'FORM';
                delete form.dataset.id;
                loadBooks();
            });
        } else {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ title, author })
            }).then(() => {
                form.reset();
                loadBooks();
            });
        }
    }

    function onEdit(id, book) {
        titleInput.value = book.title;
        authorInput.value = book.author;
        submitBtn.textContent = 'Save';
        form.querySelector('h3').textContent = 'Edit FORM';
        form.dataset.id = id;
    }

    function onDelete(id) {
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        }).then(() => loadBooks());
    }
}

attachEvents();