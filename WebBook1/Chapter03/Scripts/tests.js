module ('Calculator Test Suite', { setup: function () { initialise(); } } );

QUnit.TriggerClick =
  function (el)
  {
    // Trying jQuery of triggering click event did not work
    //$('btn5').click(); 

    // The book method of using QUnit to trigger click event did not work, instead, use
    // this method taken from web forum post:
    // http://stackoverflow.com/questions/3631453/how-can-i-trigger-a-native-javascript-event-from-a-qunit-test
    // QUnit.triggerEvent(btn, "click");

    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent('click', true, true, window,
      0, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(clickEvent);
  };


test("Initalise Test", function() {
  expect(2);
  var expected = '0';
  equal(txtInput.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtInput.value);
  equal(txtResult.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtResult.value);
});

test("Button Click Test", function() {
  var buttonQuantity = 10;
  expect(buttonQuantity * 2);
  for (var i = 0; i < buttonQuantity; i++) {
    
    var btn = document.getElementById('btn' + i);
    QUnit.TriggerClick(btn);
    var result = txtInput.value[txtInput.value.length-1];
    var expected = String(i);
    equal(result, expected, 'Expected value: ' + expected +
      ' Actual value: ' + result);
    var expectedLength = i < 2 ? 1 : i;
    equal(txtInput.value.length, expectedLength,
      'Expected string length: ' + expectedLength +
      'Actual value: ' + txtInput.value.length);
  }
});

test("Add Test", function() {
  expect(2);
  txtInput.value = '10';
  txtResult.value = '20';
  var btnPlus = document.getElementById('btnPlus');
  QUnit.TriggerClick(btnPlus);
  var expected = 30;
  equal(txtResult.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtResult.value);
  expected = 0;
  equal(txtInput.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtInput.value);
});

test("Subtract Test", function() {
  expect(2);
  txtInput.value = '10';
  txtResult.value = '20';
  var btnMinus = document.getElementById('btnMinus');
  QUnit.TriggerClick(btnMinus);
  var expected = 10;
  equal(txtResult.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtResult.value);
  expected = 0;
  equal(txtInput.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtInput.value);
});

test("Clear Entry Test", function() {
  txtInput.value = '10';
  var btnClearEntry = document.getElementById('btnClearEntry');
  QUnit.TriggerClick(btnClearEntry);
  var expected = 0;
  equal(txtInput.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtResult.value);
});

test("Clear Test", function() {
  txtInput.value = '10';
  txtResult.value = '20';
  var btnClear= document.getElementById('btnClear');
  QUnit.TriggerClick(btnClear);
  var expected = 0;
  equal(txtInput.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtInput.value);
  equal(txtResult.value, expected, 'Expected value: ' + expected + ' Actual value: ' + txtResult.value);
});

