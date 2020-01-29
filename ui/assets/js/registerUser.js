function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function onRegisterButtonClicked() {

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var jobTitle = document.getElementById('jobTitle').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
    var gender = $("input[name='gender']:checked").val();
    var prefer = 'yes';
    var imageUploder = document.getElementById('image-uploder');

    if ($('#prefer').prop("checked") == false) {
        prefer = "no";
    }

    if (firstName == "") {
        index = 1;
        message = "Please fill first name";
        errorCheck(index, message);
        return;
    }
    if (lastName == "") {
        index = 2;
        message = "Please fill last name";
        errorCheck(index, message);
        return;
    }
    if (email == "" || !validateEmail(email)) {
        index = 3;
        message = "Please use valid email";
        errorCheck(index, message);
        return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
        index = 4;
        message = "Please use valid phone number";
        errorCheck(index, message);
        return;
    }

    if (password != confirmPassword) {
        index = 5;
        message = "Password doesn't match";
        errorCheck(index, message);
        return;
    }

    if (!validatePassword(password)) {
        index = 5;
        message = "Please enter valid password";
        errorCheck(index, message);
        return;
    }

    var data = new FormData();

    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('phoneNumber', phoneNumber);
    data.append('email', email);
    data.append('jobTitle', jobTitle);
    data.append('password', password);
    data.append('prefer', prefer);
    data.append('country', country);
    data.append('city', city);
    data.append('gender', gender);

    $.ajax({
        url: "RegisterPage.php",
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        success: function (msg) {
            changeProfile(msg)
        }
    });
}

function changeProfile(msg) {

    if (msg == 'Okay') {
        window.location.replace('HomePage.html');

    } else if ('Error') {

        document.getElementById('alert-box').style.display = 'block';
        var alertBox = document.getElementById('alert-box-inside');
        var xButton = document.getElementById('xButton');
        xButton.className = 'close';
        alertBox.className = 'alert alert-danger alert-dismissible fade show';
        alertBox.childNodes[2].innerHTML = "Oops!"
        document.getElementById('par-error').innerHTML = "something went wrong."

    } else {
        switch (msg) {
            case "Please fill first name": index = 1;
                message = "Please fill first name";
                errorCheck(index, message);
                return;

            case "Please fill last name":
                index = 2;
                message = "Please fill last name";
                errorCheck(index, message);
                return;

            case "Please use valid email":
                index = 3;
                message = "Please use valid email";
                errorCheck(index, message);
                return;

            case "Please use valid phone number":
                index = 4;
                message = "Please use valid phone number";
                errorCheck(index, message);
                return;
            case "Please enter password":
                index = 5;
                message = "Please enter password";
                errorCheck(index, message);
                return;
        }
    }
}

function errorCheck(index, erroMessage) {

    var firstNameError = document.getElementById('fname-error');
    var lastNameError = document.getElementById('lname-error');
    var emailError = document.getElementById('email-error');
    var phoneNumberError = document.getElementById('phoneNumber-error');
    var passwordError = document.getElementById('password-error');

    switch (index) {
        case 1: firstNameError.style.visibility = "visible";
            firstNameError.innerHTML = erroMessage;
            break;
        case 2: lastNameError.style.visibility = "visible";
            lastNameError.innerHTML = erroMessage;
            break;
        case 3: emailError.style.visibility = "visible";
            emailError.innerHTML = erroMessage;
            break;
        case 4: phoneNumberError.style.visibility = "visible";
            phoneNumberError.innerHTML = erroMessage;
            break;
        case 4: phoneNumberError.style.visibility = "visible";
            phoneNumberError.innerHTML = erroMessage;
            break;
        case 5: passwordError.style.visibility = "visible";
            passwordError.innerHTML = erroMessage;
            break;
    }
}

function onFocusInInput(obj) {
    var objId = obj.id;

    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
    var phoneNumber = document.getElementById('phoneNumber');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    var firstNameError = document.getElementById('fname-error');
    var lastNameError = document.getElementById('lname-error');
    var emailError = document.getElementById('email-error');
    var phoneNumberError = document.getElementById('phoneNumber-error');
    var passwordError = document.getElementById('password-error');

    switch (objId) {
        case firstName.id: firstNameError.style.visibility = "hidden";
            break;
        case lastName.id: lastNameError.style.visibility = "hidden";
            break;
        case email.id: emailError.style.visibility = "hidden";
            break;
        case phoneNumber.id: phoneNumberError.style.visibility = "hidden";
            break;
        case password.id: passwordError.style.visibility = "hidden";
            break;
        case confirmPassword.id: passwordError.style.visibility = "hidden";
            break;
    }

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.trim()
    if (phoneNumber.length != 9) {
        return false;
    } else if (phoneNumber.charAt(0) != 9) {
        return false;
    }
    return true;
}

function validatePassword(password) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test(password);
}

