(function() {
  this.calculatorNamespace = this.calculatorNamespace || {};
  var ns = this.calculatorNamespace;

  ns.initialise = function () {
      var calculator = new ns.Calculator();

      $('button[id^="btnNumber"]').on('click', calculator.numberClick);

      $('#btnPlus').on('click', calculator.plusClick);
      $('#btnMinus').on('click', calculator.minusClick);
      $('#btnClearEntry').on('click', calculator.clearEntry);
      $('#btnClear').on('click', calculator.clear);

      calculator.clear();
  }

  ns.Calculator = (function() {

    function Calculator() { 
    }

    Calculator.prototype.numberClick = function () {
        $('#txtInput').val($('#txtInput').val() == '0' ? this.innerText : $('#txtInput').val() + this.innerText);
    }

    Calculator.prototype.plusClick = function () {
        $('#txtResult').val(Number($('#txtResult').val()) + Number($('#txtInput').val()));
        Calculator.prototype.clearEntry();
    }

    Calculator.prototype.minusClick = function () {
        $('#txtResult').val(Number($('#txtResult').val()) - Number($('#txtInput').val()));
        Calculator.prototype.clearEntry();
    }

    Calculator.prototype.clearEntry = function () {
        $('#txtInput').val('0');
    }

    Calculator.prototype.clear = function () {
        $('#txtInput').val('0');
        $('#txtResult').val('0');
    }

    return Calculator;
  })();

})();
