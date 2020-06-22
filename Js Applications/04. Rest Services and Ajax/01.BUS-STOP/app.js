function getInfo() {
    const stopIdInput = document.getElementById('stopId');
    const stopName = document.getElementById("stopName");
    const busContainer = document.getElementById('buses');

    const busesUrl = `https://judgetests.firebaseio.com/businfo/${stopIdInput.value}.json`;
    busContainer.innerHTML = '';
    stopName.textContent = '';
    fetch(busesUrl)
    .then(res => res.json())
    .then(handleSucces)
    .catch(handleError);
}

function handleSucces(data){
    
        const {name,buses} = data;
        stopName.textContent = name;
        Object.entries(buses).forEach(([busId, busTime])=>{
            const li = document.createElement('li');
            li.textContent= `Bus ${busId} arrives in ${busTime} minutes.`;
            busContainer.appendChild(li);
        });
    
}
function handleError(err){
    stopName.textContent = 'Error';
}