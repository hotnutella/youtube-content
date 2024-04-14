$(document).ready(function () {
    $('#myForm').submit(function (event) {
        event.preventDefault();

        // Clear previous results or error messages
        $('#result').empty();

        // Validation
        var isValid = true;
        var errorMessage = '';

        const name = $('#name').val();
        if (name.length < 2) {
            isValid = false;
            errorMessage += 'Name must be at least 2 characters long. ';
        }

        const email = $('#email').val();
        if (!validateEmail(email)) {
            isValid = false;
            errorMessage += 'Enter a valid email. ';
        }

        const dob = $('#dob').val();
        if (!validateDate(dob)) {
            isValid = false;
            errorMessage += 'You must be at least 18 years old. ';
        }

        if (!isValid) {
            $('#result').html(errorMessage);
            return; // Stop the submission of the form
        }

        const color = $('#color').val();
        const news = $('#news').is(':checked');
        const hobbies = $('#hobbyList input')
            .map(function () {
                return $(this).val()
            })
            .get()
            .join(', ')

        const request = { name, email, dob, color, news, hobbies }
        console.log(request)

        $('#result').html(`Name: ${name}, Email: ${email}, Hobbies: ${hobbies}`)
    })
})

$('#addHobby').click(function () {
    const newDiv = document.createElement('div');

    const newInput = document.createElement('input');
    $(newInput).attr('type', 'text')
    $(newInput).attr('placeholder', 'Enter hobby')

    const newButton = document.createElement('button');
    $(newButton).addClass('removeHobby');
    $(newButton).html('Remove');

    newDiv.appendChild(newInput);
    newDiv.appendChild(newButton);

    $('#hobbyList').append(newDiv);
});

$('#hobbyList').on('click', '.removeHobby', function () {
    $(this).parent().remove();
});

function validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function validateDate(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}