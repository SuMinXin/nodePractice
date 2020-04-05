var socket = io();

document.addEventListener("DOMContentLoaded", ()=>{
	var status = $('#status');
	var sendForm = $('#sendform')[0];
	var content = $('#content')[0];

	socket.on("connect", function(){
		status.text("Connected!");
	});
	socket.on("disconnect", function () {
		status.text("Disconnected!");
	});
	socket.on("user", function (user) {
		$('#user').text(user);
	});
	socket.on("online", function (amt) {
		$('#online').text(amt);
	});
	socket.on("message", function(d){
		content.appendChild(createMsgBox(d));
		$('#message').val('');
	});

	sendForm.addEventListener("submit", function(element){
		if(checkSend()){
			element.preventDefault();
			var data = {};
			var child = sendForm.children;
			$(child).each(function(index, e){
				if(e.name){
					data[e.name] = e.value;
				}
			});
			socket.emit("send", data);
		}else{
			return false;
		}
	});
});

function checkSend(){
	if(!$('#message').val().trim()){
		alert('Please Inter Your Message.');
		return false;
	}
	return true;
}

function createMsgBox(d){
	var msgBox = document.createElement("div");
		msgBox.className = "message";
        msgBox.appendChild(createNameBox());
        msgBox.appendChild(document.createTextNode(d.message));
        return msgBox;
}

function createNameBox(){
	var nameBox = document.createElement("span");
		nameBox.className = "name";
		nameBox.appendChild(document.createTextNode($('#user').text()));
		return nameBox;
}

function trim(){
	$('#message').val($('#message').val().trim());
}