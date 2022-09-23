const btn = document.querySelector('#btn');

var relStatus = 0;

function switcher () {
    let request = fetch('http://192.168.1.144/relaysw', {mode: 'no-cors'});
request
  .then(response => {
   console.log( response );
   if (btn.classList.contains('btn-on')) {
       btn.classList.remove('btn-on');
       btn.classList.add('btn-off');
   }  else {
    btn.classList.remove('btn-off');
    btn.classList.add('btn-on');
};
btn.classList.toggle
  })
  .catch(error => {
    // обработка ошибки
    console.log( error );
  });
}

function info () {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://192.168.1.144/relaystat', true);
    request.onload = function() {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            relStatus = Number.parseInt(response);
            if (relStatus == 0) {
                btn.classList.remove('btn-on');
                btn.classList.add('btn-off');
            } 
            else {
                btn.classList.remove('btn-off');
                btn.classList.add('btn-on');
            }
        } else {alert("Не в одной сети!")}
    }
    request.send();
};


btn.addEventListener('click', switcher);

document.addEventListener('DOMContentLoaded', info);

setInterval(info, 500);