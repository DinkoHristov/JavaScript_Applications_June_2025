function loadCommits() {
    const usernameInput = document.getElementById('username');
    const repositoryInput = document.getElementById('repo');
    const ulElement = document.getElementById('commits');

    const url = `https://api.github.com/repos/${usernameInput.value}/${repositoryInput.value}/commits`;

    fetch(url)
        .then(respones => respones.json())
        .then(data => {
            data.forEach(currentRepo => {
                let li = document.createElement('li');
                li.innerHTML = `${currentRepo.commit.author.name}: ${currentRepo.commit.message}`;

                ulElement.appendChild(li);
            });
        })
        .catch(error => {
            let li = document.createElement('li');
            li.innerHTML = `Error: ${error.message}`;

            ulElement.appendChild(li);
        })
}