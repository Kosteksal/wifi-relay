const btn = document.querySelector('#btn');

var relStatus = 0;

function switcher () {
    let request = fetch('http://192.168.1.144/relaysw', {mode: 'no-cors'});
request
  .then(response => {
    // обработка ответа
   // console.log( response );
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
                btn.classList.add('btn-off');
            } else {
                btn.classList.add('btn-on');
            }
        }
    }
    request.send();
};


btn.addEventListener('click', switcher);

document.addEventListener('DOMContentLoaded', info);