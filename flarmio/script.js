document.getElementById('numberForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const numberInput = document.getElementById('number');
    const errorMessage = document.getElementById('error-message');

    //check if num>10
    if (numberInput <=10){
        errorMessage.textContent = "Please enter a number greater than 10";
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
        alert('Submitted');
    }
});