var txtInput;
var txtResult;
var txtUserMessage;

function initialise() {
  txtInput = document.getElementById('txtInput');
  txtResult = document.getElementById('txtResult');
  txtUserMessage = document.getElementById('txtUserMessage');

  for (var i = 0; i < 10; i++ ) {
    // Need to stick with this way of attaching event handler, from book, since jQuery method did not work
    document.getElementById('btn'+String(i)).addEventListener('click', numberClick, false);
  }

  document.getElementById('btnPlus').addEventListener('click', plusClick, false);
  document.getElementById('btnMinus').addEventListener('click', minusClick, false);
  document.getElementById('btnClearEntry').addEventListener('click', clearEntry, false);
  document.getElementById('btnClear').addEventListener('click', clear, false);
  document.getElementById('divButtons').addEventListener('click', anyButtonClick, false);

  clear();
}

function anyButtonClick(evt) {
  txtUserMessage.value = 'Button Clicked: ' + evt.srcElement.innerText;
}

function numberClick() {
  txtInput.value = txtInput.value == '0' ?
   this.innerText : txtInput.value + this.innerText;
}

function plusClick() {
  txtResult.value = Number(txtResult.value) + Number(txtInput.value);
  clearEntry();
}

function minusClick() {
  txtResult.value = Number(txtResult.value) - Number(txtInput.value);
  clearEntry();
}

function clearEntry() {
  txtInput.value = '0';
}

function clear() {
  txtInput.value = '0';
  txtResult.value = '0';
}

function finaliseEquals() {

}
