function getInfo() {
    const stopIdElement = document.getElementById('stopId');
    const stopNameElement = document.getElementById('stopName');
    const ulElement = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdElement.value}`;

    fetch(url)
            .then(response => response.json())
            .then(data => {
                stopNameElement.innerHTML = data.name;

                let buses = data.buses;
                Object.keys(buses).forEach(bus => {
                    let li = document.createElement('li');
                    li.innerHTML = `Bus ${bus} arrives in ${buses[bus]} minutes`;

                    ulElement.appendChild(li);
                });
            })
            .catch(error => stopNameElement.innerHTML = `Error`);
}