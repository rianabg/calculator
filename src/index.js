$(document).ready(function(){
    $('.num').click(addNum);

    $('.op').click(tryAddOperator);

    $('.dec').click(tryAddDec);

    $('#neg').click(tryAddNeg);

    $('#clear').click(clear);

    $('#sum').click(sum);
    
});

var screen = $('#screen');
var canDec = true;
var canOp = false;
var canNeg = true;
var openParen = false;


//ok how tf can i get this to work
document.onkeydown = function(event){
    var keyCode = event.keyCode;
    var btnVal = String.fromCharCode(event.keyCode);
    if(keyCode === 48 || keyCode ===  49 || keyCode ===  50 || keyCode ===  51 || keyCode ===  52 || keyCode ===  53 || keyCode ===  54 || keyCode ===  55 || keyCode ===  56 || keyCode ===  57){
        screen.html(screen.html() + btnVal);
        canOp = true; 
        canNeg = false;
    } else if(event.shiftKey && keyCode === 187) {
        if(canOp){
            screen.html(screen.html() + '+');
            canOp = false;
            canDec = true;
            canNeg = true;
        } 
    } else if(event.shiftKey && keyCode === 189) {
        if(canNeg){
            screen.html(screen.html() +'-');
            canNeg = false;
            canOp = false;
        } if(canOp){
            screen.html(screen.html() + '-');
            canOp = false;
            canDec = true;
            canNeg = true;
        }
    } else if(event.shiftKey && keyCode === 56) {
        if(canOp){
            screen.html(screen.html() + '*');
            canOp = false;
            canDec = true;
            canNeg = true;
        } 
    } else if(keyCode === 191) {
        if(canOp){
            screen.html(screen.html() + '/');
            canOp = false;
            canDec = true;
            canNeg = true;
        } 
    } else if(keyCode === 13) {
        sum(); 
    } else if(keyCode === 8) {
        clear(); 
    } else if(keyCode === 190) {
        if(canDec){
            screen.html(screen.html() + '.');
            canDec = false;
        }
    }
}

function sum() {
    addParens();
    var sum = eval(screen.html());
    screen.html(sum);
}

function clear(){
    screen.html('');
    canDec = true;
    canOp = false;
    canNeg = true;
    openParen = false;
}

function tryAddOperator(){
    var op = $(this).html();
    if(canOp){
        screen.html(screen.html() + op);
        canOp = false;
        canDec = true;
        canNeg = true;
    }
}

function tryAddDec(){
    var dec = $(this).html();
    if(canDec){
        screen.html(screen.html() + dec);
        canDec = false;
    }
}

function tryAddNeg(){
    if(canNeg){
        screen.html(screen.html() +'-');
        canNeg = false;
        canOp = false;
    }
}

function addNum() {
    var num = $(this).html();
    var numOne = screen.html(screen.html() + num);
    canOp = true; 
    canNeg = false;
}

function addParens(){
    var opers = /\*|\-|\/|\+/;
    var arr = screen.html().split('');
    for (var i = 0; i < arr.length; i++){
        //not working
        if (opers.test(arr[i]) && openParen){
            arr[i] = ')' + arr[i];
            openParen = false;
        } else if (i === arr.length - 1 && openParen){
            arr[i] = arr[i] + ')';
            openParen = false;
        }
        if (opers.test(arr[i]) && arr[i-1] && arr[i-1].includes('-')){
            arr[i] = '(' + arr[i];
            openParen = true;
        } else if (i === 0 && arr[i] === '-'){
            arr[i] = '(-';
            openParen = true;
        } 
    }
    arr = arr.join('');
    screen.html(arr);
}
