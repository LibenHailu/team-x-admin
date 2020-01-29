
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function goToProfilePage() {
    window.location.href = 'ProfilePage.html';
}

window.addEventListener('load', onLoadingPage);
var projectID = getCookie("projectID");
var userID = getCookie("userID");

function onApplyClicked() {
    var message = document.getElementById('message').value;
    if (message.length < 8) {
        var messageError = document.getElementById('message-error');
        messageError.style.visibility = "visible";
        messageError.innerHTML = "Message to short.";
        return;
    }

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            alert(response);
        }
    }
    request.open('POST', 'ApplyPage.php', true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("projectID=" + projectID + "&message=" + message + "&applierID=" + userID);
}

function onFocusInput() {
    var titleError = document.getElementById('message-error');
    titleError.style.visibility = "hidden";
}

function loadProject(project) {

    document.getElementById('form-project-title').value = project.title;
    document.getElementById('form-project-description').value = project.description;

    document.getElementById('article-project-title').innerHTML = project.title;
    document.getElementById('article-project-budget').innerHTML = project.budget;
    document.getElementById('article-project-category').innerHTML = project.category;
    document.getElementById('article-project-subCategory').innerHTML = project.subCategory;
    document.getElementById('article-project-workType').innerHTML = project.workType;
}

function onLoadingPage() {
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
            var responseArray = JSON.parse(response);
            for (project in responseArray) {
                loadProject(responseArray[project]);
            }
        }
    }
    request.open('POST', 'ProjectPage.php', true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("projectID=" + projectID);
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