const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const errorMessage = document.querySelector('#error');
const forecastMessage = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = searchInput.value;

    errorMessage.textContent = '';
    forecastMessage.textContent = '';

    fetch(`/weather?address=${location}`)
        .then(response => response.json())
        .then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;

                return;
            }

            forecastMessage.innerHTML = data.location + '<br />' + data.forecast;
        })
})