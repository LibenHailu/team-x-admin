
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

var email = '';
var password = '';

window.addEventListener('load', function () {
    email = getCookie('userEmail');
    password = getCookie('password');
    loginButtonClicked();

});
function registrationButton() {
    window.location.href = "RegistrationPage.html";
}

function loginButtonClicked() {
    document.getElementById('alert').innerHTML = ""
    document.getElementById('buttonSpinner').className = "";
    if (email == '' || password == '') {
        email = document.getElementsByTagName('input')[0].value;
        password = document.getElementsByTagName('input')[1].value;
        var rememberMe = document.getElementsByTagName('input')[2].checked;
    }

    if (email == "" || password == "") {
        return;
    }

    document.getElementById('buttonSpinner').className = "spinner-border spinner-border-sm";
    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;

            if (response == "Invalid") {
                document.getElementById('alert').innerHTML = "Invalid username or password!"
                document.getElementById('buttonSpinner').className = "d-none";
            }

            if (response == "Okay") {
                window.location.replace("HomePage.html");
                document.getElementById('buttonSpinner').className = "d-none";
            }
        }
    }
    request.open('POST', 'Login.php', true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("email=" + email + "&password=" + password + "&rememberMe=" + rememberMe);

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}