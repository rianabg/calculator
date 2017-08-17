  $('.button').on('click', function(evt) {
    var buttonPressed = $(this).html();
    
    if (buttonPressed === "C") {
      result = 0;
      currentEntry = '0';
    } else if (buttonPressed === "CE") {
      currentEntry = '0';
    } else if (buttonPressed === "back") {
      //currentEntry = currentEntry.substring(0, currentEntry.length-1);
    } else if (buttonPressed === "+/-") {
      currentEntry *= -1;
    } else if (buttonPressed === '.') {
      currentEntry += '.';
    } else if (isNumber(buttonPressed)) {
      if (currentEntry === '0') currentEntry = buttonPressed;
      else currentEntry = currentEntry + buttonPressed;
    } else if (isOperator(buttonPressed)) {
      prevEntry = parseFloat(currentEntry);
      operation = buttonPressed;
      currentEntry = '';
    } else if(buttonPressed === '%') {
      currentEntry = currentEntry / 100;
    } else if (buttonPressed === 'sqrt') {
      currentEntry = Math.sqrt(currentEntry);
    } else if (buttonPressed === '1/x') {
      currentEntry = 1 / currentEntry;
    } else if (buttonPressed === 'pi') {
      currentEntry = Math.PI;
    } else if (buttonPressed === '=') {
      currentEntry = operate(prevEntry, currentEntry, operation);
      operation = null;
    }
    
    updateScreen(currentEntry);
  });
});

updateScreen = function(displayValue) {
  var displayValue = displayValue.toString();
  $('.screen').html(displayValue.substring(0, 10));
};

$('body').keydown(function(event){
    if(event.keyCode === 48 || 49 || 50 || 51 || 52 || 53 || 54 || 55 || 56 || 57){
        addNum();
    } else if (event.keyCode === 189 || 187 || 191 || 88){
        tryAddOperator();
    } else if (event.keyCode === 192){
        tryAddNeg();
    } else if (event.keyCode === 8){
        clear();
    } else if (event.keyCode === 190){
        tryAddDec();
    }
 });