console.log('Resource initialized');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg = document.querySelector('#message-box')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error) {
                msg.textContent = data.error;
            } else {
                msg.textContent = 'Temperature in '+data.City+' is '+data.Temperature;
            };  
        });
    });
});