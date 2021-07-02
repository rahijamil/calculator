var input, result;
input = document.getElementById('inputs');
result = document.getElementById('results');

window.onload = () => {
  setInterval(() => {
    if (input.value.length >= 9) {
      input.classList.add('display');
    }
    else {
      input.classList.remove('display');
    }
  }, 10);
};

function display(v) {
  input.value += v;
  calculate();
}

function reset() {
  if (input.value != "") {
    let form = document.querySelector('.container form');

    let style = window.getComputedStyle(form, '::before');

    form.style.setProperty('--beforeTransform', 'scale(2)');
    form.style.setProperty('--beforeTop', '0');
    form.style.setProperty('--beforeLeft', '0');

    setTimeout(() => {
      form.style.setProperty('--beforeTransform', 'scale(0)');
      form.style.setProperty('--beforeTop', '100%');
      form.style.setProperty('--beforeLeft', '100%');
      input.value = "";
    }, 300);
  }
}

function Delete() {
  let len = input.value.length;
  let newNum = input.value.split('').slice(0, -1).join('');
  input.value = newNum;
}

function calculate() {
  if (input.value == "") {
    result.value = '0';
  }
  else if ((input.value.indexOf('√') < 0) && (input.value.indexOf('^') < 0) && (input.value.indexOf('log') < 0) && (input.value.indexOf('sin') < 0) && (input.value.indexOf('cos') < 0) && (input.value.indexOf('tan') < 0)) {
    result.value = eval(input.value);
  }
  else if (input.value.indexOf('√') > -1) {

    let x = input.value.split('√').slice(input.value.indexOf('√'), input.value.length).pop();
    let root = Math.sqrt(x).toString();

    if (root.slice(root.indexOf('.') + 1, root.length).length > 4) {
      result.value = Number(root).toFixed(4);
    }
    else {
      result.value = root;
    }
  }
  else if (input.value.indexOf('^') > -1) {

    let number = input.value.slice(0, input.value.indexOf('^'));
    let power = input.value.slice(input.value.indexOf('^') + 1, input.value.length);
    result.value = Math.pow(Number(number), Number(power));
  }
  else if ((input.value.indexOf('log') > -1) || (input.value.indexOf('sin') > -1) || (input.value.indexOf('cos') > -1) || (input.value.indexOf('tan') > -1)) {
    if (input.value.indexOf('log') > -1) {
      let l = input.value.slice(input.value.indexOf('log') + 3, input.value.length);
      result.value = Math.log(l).toFixed(4);
    }
    if (input.value.indexOf('sin') > -1) {
      let y = input.value.slice(input.value.indexOf('sin') + 3, input.value.length);
      result.value = Math.sin(Number(y) * (Math.PI / 180)).toFixed(4);
    }
    if (input.value.indexOf('cos') > -1) {
      let z = input.value.slice(input.value.indexOf('cos') + 3, input.value.length);
      result.value = Math.cos(Number(z) * (Math.PI / 180)).toFixed(4);
    }
    if (input.value.indexOf('tan') > -1) {
      let tan = input.value.slice(input.value.indexOf('tan') + 3, input.value.length);
      result.value = Math.tan(Number(tan) * (Math.PI / 180)).toFixed(4);
    }

  }

  if (result.value != "0" && result.value != NaN) {
    localStorage.setItem('lastAns', result.value);
  }

}

function resultUp() {
  if (result.value != "0" && result.value != "") {
    input.value = result.value;
    result.value = "";
  }
}

function ans() {
  input.value = localStorage.getItem('lastAns');
}

/*
function ripple(t, e) {
  let circle = document.createElement('div');
  let x = e.layerX;
  let y = e.layerY;

  circle.classList.add('circle');
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  t.appendChild(circle);
}
*/
var modalContainer, popup, overlay, overlayModal;

modalContainer = document.querySelector('#modal-container');
popup = document.getElementById('popup');
overlay = document.getElementById('overlay');
overlayModal = document.getElementById('overlayModal');

function openPopup() {
  popup.classList.add('popupOpen');
  overlay.classList.add('overlay');
}

function closePopup() {
  popup.classList.remove('popupOpen');
  overlay.classList.remove('overlay');
}

function openModal() {
  closePopup();
  modalContainer.style.visibility = "visible";
  overlayModal.classList.add('overlayModal');
}

function closeModal() {
  modalContainer.style.visibility = "hidden";
  overlayModal.classList.remove('overlayModal');
}


function cancel() {
  closeModal();
}

function ok() {

  closeModal();

  const rbs = document.querySelectorAll('input[name="theme"]');
  let selectedValue;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      localStorage.setItem('mode', selectedValue);
      break;
    }
  }

}

window.onload = () => {
  setInterval(() => {
    let mode = localStorage.getItem('mode');

    if (mode === "light") {
      document.getElementById('body').classList.remove('darkMode');
    }
    else if (mode === "dark") {
      document.getElementById('body').classList.add('darkMode');
    }
  }, 10);
};
