function getInfo() {
    const busIDInput = document.getElementById('stopId');
    const stopNameDivElement = document.getElementById('stopName');
    const busesUlElement = document.getElementById('buses');

    const url = `https://http-rest-b17ec-default-rtdb.firebaseio.com/businfo/${busIDInput.value}.json`;

    for (const element of Array.from(busesUlElement.children)) {
        element.remove();
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            stopNameDivElement.innerHTML = data.name;
            let buses = data.buses;
            Object.keys(buses).forEach(busId => {
                let li = document.createElement('li');
                li.innerHTML = `Bus ${busId} arrives in ${buses[busId]}`;

                busesUlElement.appendChild(li);
            });
        })
        .catch(error => stopNameDivElement.innerHTML = 'Error');
}