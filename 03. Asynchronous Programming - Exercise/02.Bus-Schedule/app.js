function solve() {
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');
    const infoBoxElement = document.querySelector('.info');

    let currentStop = { currentId: 'depot'};

    function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${currentStop.currentId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                currentStop.name = data.name;
                currentStop.nextStop = data.next;

                departButton.disabled = true;
                arriveButton.disabled = false;
                infoBoxElement.innerHTML = `Next stop ${currentStop.name}`;
            })
            .catch(() => {
                departButton.disabled = true;
                arriveButton.disabled = true;
                infoBoxElement.innerHTML = 'Error';
            });
    }

    function arrive() {
        currentStop.currentId = currentStop.nextStop;

        arriveButton.disabled = true;
        departButton.disabled = false;
        infoBoxElement.innerHTML = `Arriving at ${currentStop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();