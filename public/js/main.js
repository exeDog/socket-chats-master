
var socket = io(window.location.href);

socket.on("disconnect", function() {
	setTitle("Disconnected");
});

socket.on("connect", function() {
	setTitle("Connected to Chattes");
	hideChats();
	putFocus();
});

socket.on("message", function(message) {
	printMessage(message,null);
});

document.forms[1].onsubmit = function () {
    var input = document.getElementById("message");
    printMessage(input.value,userName);
    socket.emit("chat",userName + ' : ' + input.value);
    input.value = '';
};

function setTitle(title) {
    document.querySelector("h1").innerHTML = title;
}

function printMessage(message,name) {
    var p = document.createElement("p");
    name == null  ? p.innerText = message: p.innerText = name +' : ' + message;
    document.querySelector("div.messages").appendChild(p);
}

var userName = 'Guest';

function getClientName() {
    userName = document.getElementById("name").value;
    var parent = document.getElementById('forms');
    var element = document.getElementById('form1');
    parent.removeChild(element);
    welcomeUser(userName);
}

function welcomeUser(name) {
    document.getElementById('user').innerHTML = 'Welcome ' + name;
    document.getElementsByTagName('p')[0].innerHTML = "Thank you for logging in";
    showChats();
}

function showChats() {
    document.getElementById('form2').style.display = 'block';
    moveFocus();
}

function moveFocus() {
    document.getElementById('message').focus();
}

function hideChats() {
    document.getElementById('form2').style.display = 'none';
}

function putFocus() {
    document.getElementById('name').focus();
}