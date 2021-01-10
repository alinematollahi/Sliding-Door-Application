
//start

function start() {
    let timer1 = setInterval(func, 10);
    let counter1 = 100;
    let start = document.getElementById("start");
    let inputContainer = document.getElementById("input-container");

    function func() {
        if (counter1 == 0) {
            clearInterval(timer1);
            start.style.display = "none";
            inputContainer.style.display = "block";

            let timer2 = setInterval(func1, 10);
            let counter2 = 0;

            function func1() {

                if (counter2 == 100) {
                    clearInterval(timer2);
                }
                else {
                    counter2++;
                    inputContainer.style.opacity = counter2 / 100;
                }
            }
        }
        else {
            counter1--;
            start.style.opacity = counter1 / 100;
        }
    }
}

var btn = document.getElementById("btn");
btn.addEventListener("click", validation);
btn.addEventListener("click", hidebtnFirst);
var width = document.getElementById("inp1");
var height = document.getElementById("inp2");
var dtype = document.getElementById("dtype");
var operatorType = document.getElementById("operatorType");
var frameType = document.getElementById("frameType");
var glassType = document.getElementById("glassType");

// Validation of each input
width.addEventListener("change", wValidation);
width.addEventListener("change", setAnimation);
height.addEventListener("change", hValidation);
dtype.addEventListener("change", tValidation);
operatorType.addEventListener("change", oValidation);
frameType.addEventListener("change", fValidation);
glassType.addEventListener("change", gValidation);

var index;                                                          // index=1 --> validation is ok , index=0 --> validation error

function wValidation() {
    var width = document.getElementById("inp1");
    var widthValue = width.value;
    var widthDetail = document.getElementById("width-detail");

    if (!(widthValue <= 600 && widthValue >= 80)) {                 // 80cm<= width >=600cm
        widthDetail.style.color = "red";
        index = 0;
    }
    else {
        widthDetail.style.color = "rgb(210, 214, 214)";
    }
}

function hValidation() {
    var height = document.getElementById("inp2");
    var heightValue = height.value;
    var heightDetail = document.getElementById("height-detail");

    if (!(heightValue <= 300 && heightValue >= 180)) {            // 180cm<= height >=300cm
        heightDetail.style.color = "red";
        index = 0;
    }
    else {
        heightDetail.style.color = "rgb(210, 214, 214)";
    }
}

function tValidation() {
    var dtype = document.getElementById("dtype");
    var dtypeText = dtype.options[dtype.selectedIndex].text;
    var typeDetail = document.getElementById("type-detail");

    if (dtypeText == "" || dtypeText == "--Select--") {
        typeDetail.style.color = "red";
        index = 0;
    }
    else {
        typeDetail.style.color = "rgb(210, 214, 214)";
    }
}

function oValidation() {
    var operatorType = document.getElementById("operatorType");
    var opDetail = document.getElementById("op-detail");
    var operatorTypeText = operatorType.options[operatorType.selectedIndex].text;

    if (operatorTypeText == "") {
        opDetail.style.color = "red";
        index = 0;
    }
    else {
        opDetail.style.color = "rgb(210, 214, 214)";
    }
}

function fValidation() {
    var frameType = document.getElementById("frameType");
    var frameTypeText = frameType.options[frameType.selectedIndex].text;
    var frameDetail = document.getElementById("frame-detail");

    if (frameTypeText == "") {
        frameDetail.style.color = "red";
        index = 0;
    }
    else {
        frameDetail.style.color = "rgb(210, 214, 214)";
    }
}

function gValidation() {
    var glassType = document.getElementById("glassType");
    var glassTypeText = glassType.options[glassType.selectedIndex].text;
    var glassDetail = document.getElementById("glass-detail");

    if (glassTypeText == "") {
        glassDetail.style.color = "red";
        index = 0;
    }
    else {
        glassDetail.style.color = "rgb(210, 214, 214)";
    }
}

function validation() {

    index = 1;
    wValidation();
    hValidation();
    tValidation();
    oValidation();
    fValidation();
    gValidation();

    if (index == 1) {                                    // index !=0 in all of inputs

        display();                                       // show animaition box and invoice box
        setAnimation();                                  // set animation parameters

        let timer = setTimeout(move, 2000);
        let timer1 = setInterval(hidebtn, 10);
        let counter = 100;
        let btn = document.getElementById("btn");
        function hidebtn() {                            // to hide button after displaying boxes
            if (counter == 0) {
                clearInterval(timer1);
                btn.disabled = true;
                btn.style.cursor = "auto";
            }
            else {
                counter--;
                btn.style.opacity = counter / 100;
            }
        }
    }
}

function hidebtnFirst() {                                // to hide "move again" button after getting started
    let timer = setTimeout(showAgain, 5000);
    let btnMove = document.getElementById("movebtn");
    btnMove.style.visibility = "hidden";

    function showAgain() {
        btnMove.style.visibility = "visible";
    }
}

var animation = document.getElementById("display-animation");
var invoice = document.getElementById("display-invoice");

function display() {                                      // show animaition box and invoice box
    animation.style.display = "block";
    invoice.style.display = "block";
    let timer = setInterval(displayfunc, 10);
    let counter = 0;

    function displayfunc() {
        if (counter == 100) {
            clearInterval(timer);
        }
        else {
            counter++;
            animation.style.opacity = counter / 100;
            invoice.style.opacity = counter / 100;
        }
    }
}

// animation part

var userWidth = window.innerWidth;
var userHeight = window.innerHeight;
var r = document.querySelector(':root');

function setAnimation() {                                           // set animation parameters

    var gateWidth = document.getElementById("inp1").value;          // Get the gate width from user
    var gateHeight = document.getElementById("inp2").value;         // Get the gate height from user

    if (!(gateWidth <= 600 && gateWidth >= 80)) { }                 // Re-validation
    else if (!(gateHeight <= 300 && gateHeight >= 180)) { }
    else {

        var hGeneral = (((gateHeight / gateWidth) * 0.54 * userWidth) / userHeight) * 100;    //Adjust the gate width and height ratio
        var hOp = ((15 / gateWidth) * 0.54 * userWidth);
        var hTop = 5;
        var hAnm = hGeneral + hOp + hTop;
        var hUp = hTop + hOp;
        var hImgtop = 5;
        var hImgdown = 5;
        var hdivtxt = hGeneral - 10;
        var hTxt = hdivtxt / 2;
        var totalWidth = gateWidth;                        // default
        var wGeneral = 60;                                 // 60% of userWidth , 54%+3%+3% , side walls --> 3%
        var wDivLeft = (100 - wGeneral) * (0.5);           // Animation side div
        var wMarginRight = (100 - wGeneral) * (0.5);       // Animation side div
        var wthd1;                              //  left wall width
        var wthd2;                              //  left fixed door width
        var wthd3;                              //  left moving door2 width
        var wthd4;                              //  left moving door1 width
        var wthd5;                              //  right moving door1 width
        var wthd6;                              //  right moving door2 width
        var wthd7;                              //  right fixed door width
        var wthd8;                              //  right wall width
        var wBorderLeftd2;                      //  left fixed door side frame width                   
        var wBorderLeftd3;                      //  left moving door2 side frame width
        var wBorderLeftd4;                      //  left moving door1 side frame width
        var wBorderLeftd5;                      //  right moving door1 side frame width
        var wBorderLeftd6;                      //  right moving door2 side frame width
        var wBorderLeftd7;                      //  right fixed door side frame width
        var wBorderTopd2;                      //  left fixed door top & bottom frame height                                  
        var wBorderTopd3;                      //  left moving door2 top & bottom frame height
        var wBorderTopd4;                      //  left moving door1 top & bottom frame height
        var wBorderTopd5;                      //  right moving door1 top & bottom frame height
        var wBorderTopd6;                      //  right moving door2 top & bottom frame height
        var wBorderTopd7;                      //  right fixed door top & bottom frame height
        var wSensor;                           // sensor width
        var hSensor;                           // sensor height
        var sensorTop;                         // sensor distance from the top
        var sensorLeft;                        // sensor distance from the left
        var ddtype = document.getElementById("dtype");
        var type = ddtype.options[ddtype.selectedIndex].text;
        var doorType;

        switch (type) {                                                   //Specify the type of doors
            case "1 Door (1 Moving Door)": doorType = 1;
                break;

            case "2 Doors (2 Moving Doors)": doorType = 2;
                break;

            case "2 Doors (1 Moving Door , 1 Fixed Door)": doorType = 3;
                break;

            case "4 Doors (2 Moving Doors , 2 FixedDoors)": doorType = 4;
                break;

            case "2 Doors Telescopic (2 Moving Doors)": doorType = 5;
                break;

            case "3 Doors Telescopic (2 Moving Doors , 1 Fixed Door)": doorType = 6;
                break;

            case "4 Doors Telescopic (4 Moving Doors)": doorType = 7;
                break;

            case "6 Doors Telescopic (4Moving Doors , 2 Fixed Doors)": doorType = 8;
                break;
        }

        // seting doors width and height for different conditions

        if (doorType == 1) {

            wthd1 = 50;
            wthd2 = 0;
            wthd3 = 0;
            wthd4 = 45;
            wthd5 = 0;
            wthd6 = 0;
            wthd7 = 0;
            wthd8 = 5;
            wBorderLeftd2 = 0;
            wBorderLeftd3 = 0;
            wBorderLeftd5 = 0;
            wBorderLeftd6 = 0;
            wBorderLeftd7 = 0;
            wBorderTopd2 = 0;
            wBorderTopd3 = 0;
            wBorderTopd5 = 0;
            wBorderTopd6 = 0;
            wBorderTopd7 = 0;
            totalWidth = 2 * gateWidth;                     // because of wall

            if ((hGeneral / 2) < 60) {                      //  if door heidht < 60% of user height

                hGeneral = (((gateHeight / (2 * gateWidth)) * 0.54 * userWidth) / userHeight) * 100;
                hOp = ((15 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                wBorderLeftd4 = (5 / (2 * gateWidth)) * 0.54 * 100;                                  // frame width = 5cm
                wBorderTopd4 = ((7 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;        // frame height = 7cm
                wSensor = (20 / (2 * gateWidth)) * 0.54 * 100;
                hSensor = ((5 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorTop = ((5 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorLeft = (0.75 * wGeneral) - (wSensor / 2);
            }
            else {

                hGeneral = 60;
                hOp = (15 / gateHeight) * 0.6 * 100;
                wGeneral = (((2 * gateWidth / gateHeight) * 0.6 * userHeight) / userWidth) * (10 / 9) * 100;
                wBorderLeftd4 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd4 = (7 / gateHeight) * 0.6 * 100;
                wSensor = (((20 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                hSensor = (5 / gateHeight) * 0.6 * 100;
                sensorTop = (5 / gateHeight) * 0.6 * 100;
                sensorLeft = (0.75 * wGeneral) - (wSensor / 2);
            }

        }

        else if (doorType == 2) {
            wthd1 = 27.5;
            wthd2 = 0;
            wthd3 = 0;
            wthd4 = 22.5;
            wthd5 = 22.5;
            wthd6 = 0;
            wthd7 = 0;
            wthd8 = 27.5;
            wBorderLeftd2 = 0;
            wBorderLeftd3 = 0;
            wBorderLeftd6 = 0;
            wBorderLeftd7 = 0;
            wBorderTopd2 = 0;
            wBorderTopd3 = 0;
            wBorderTopd6 = 0;
            wBorderTopd7 = 0;
            totalWidth = 2 * gateWidth;

            if ((hGeneral / 2) < 60) {                        //  if door heidht < 60% of user height

                hGeneral = (((gateHeight / (2 * gateWidth)) * 0.54 * userWidth) / userHeight) * 100;
                hOp = ((15 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                wBorderLeftd4 = (5 / (2 * gateWidth)) * 0.54 * 100;
                wBorderTopd4 = ((7 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                wBorderLeftd5 = (5 / (2 * gateWidth)) * 0.54 * 100;
                wBorderTopd5 = ((7 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                wSensor = (20 / (2 * gateWidth)) * 0.54 * 100;
                hSensor = ((5 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorTop = ((5 / (2 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorLeft = 30 - (wSensor / 2);
            }
            else {

                hGeneral = 60;
                hOp = (15 / gateHeight) * 0.6 * 100;
                wGeneral = (((2 * gateWidth / gateHeight) * 0.6 * userHeight) / userWidth) * (10 / 9) * 100;
                wBorderLeftd4 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd4 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd5 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd5 = (7 / gateHeight) * 0.6 * 100;
                wSensor = (((20 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                hSensor = (5 / gateHeight) * 0.6 * 100;
                sensorTop = (5 / gateHeight) * 0.6 * 100;
                sensorLeft = (0.5 * wGeneral) - (wSensor / 2);
            }
        }
        else if (doorType == 3) {
            wthd1 = 5;
            wthd2 = 45;
            wthd3 = 0;
            wthd4 = 45;
            wthd5 = 0;
            wthd6 = 0;
            wthd7 = 0;
            wthd8 = 5;
            wBorderLeftd3 = 0;
            wBorderLeftd5 = 0;
            wBorderLeftd6 = 0;
            wBorderLeftd7 = 0;
            wBorderTopd3 = 0;
            wBorderTopd5 = 0;
            wBorderTopd6 = 0;
            wBorderTopd7 = 0;

            if (hGeneral < 60) {                                    //  if door heidht < 60% of user height

                hGeneral = (((gateHeight / gateWidth) * 0.54 * userWidth) / userHeight) * 100;
                hOp = ((15 / gateWidth) * 0.54 * userWidth) / userHeight * 100;
                wBorderLeftd2 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd2 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd4 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd4 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wSensor = (20 / (gateWidth)) * 0.54 * 100;
                hSensor = ((5 / (gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorTop = ((5 / (gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorLeft = (0.75 * wGeneral) - (wSensor / 2);
            }
            else {

                hGeneral = 60;
                hOp = (15 / gateHeight) * 0.6 * 100;
                wGeneral = (((gateWidth / gateHeight) * 0.6 * userHeight) / userWidth) * (10 / 9) * 100;
                wBorderLeftd2 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd2 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd4 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd4 = (7 / gateHeight) * 0.6 * 100;
                wSensor = (((20 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                hSensor = (5 / gateHeight) * 0.6 * 100;
                sensorTop = (5 / gateHeight) * 0.6 * 100;
                sensorLeft = (0.75 * wGeneral) - (wSensor / 2);
            }
        }
        else if (doorType == 4) {
            wthd1 = 5;
            wthd2 = 22.5;
            wthd3 = 0;
            wthd4 = 22.5;
            wthd5 = 22.5;
            wthd6 = 0;
            wthd7 = 22.5;
            wthd8 = 5;
            wBorderLeftd3 = 0;
            wBorderLeftd6 = 0;
            wBorderTopd3 = 0;
            wBorderTopd6 = 0;

            if (hGeneral < 60) {                                  //  if door heidht < 60% of user height

                hGeneral = (((gateHeight / gateWidth) * 0.54 * userWidth) / userHeight) * 100;
                hOp = ((15 / gateWidth) * 0.54 * userWidth) / userHeight * 100;

                wBorderLeftd2 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd2 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd4 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd4 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd5 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd5 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd7 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd7 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;

                wSensor = (20 / (gateWidth)) * 0.54 * 100;
                hSensor = ((5 / (gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorTop = ((5 / (gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorLeft = (0.5 * wGeneral) - (wSensor / 2);

            }
            else {

                hGeneral = 60;
                hOp = (15 / gateHeight) * 0.6 * 100;
                wGeneral = (((gateWidth / gateHeight) * 0.6 * userHeight) / userWidth) * (10 / 9) * 100;
                wBorderLeftd2 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd2 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd4 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd4 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd5 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd5 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd7 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd7 = (7 / gateHeight) * 0.6 * 100;
                wSensor = (((20 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                hSensor = (5 / gateHeight) * 0.6 * 100;
                sensorTop = (5 / gateHeight) * 0.6 * 100;
                sensorLeft = (0.5 * wGeneral) - (wSensor / 2);
            }
        }
        else if (doorType == 5) {
            wthd1 = 35;
            wthd2 = 0;
            wthd3 = 30;
            wthd4 = 30;
            wthd5 = 0;
            wthd6 = 0;
            wthd7 = 0;
            wthd8 = 5;
            wBorderLeftd2 = 0;
            wBorderLeftd5 = 0;
            wBorderLeftd6 = 0;
            wBorderLeftd7 = 0;
            wBorderTopd2 = 0;
            wBorderTopd5 = 0;
            wBorderTopd6 = 0;
            wBorderTopd7 = 0;
            totalWidth = 1.5 * gateWidth;

            if ((hGeneral / 1.5) < 60) {                                    //  if door heidht < 60% of user height

                hGeneral = (((gateHeight / (1.5 * gateWidth)) * 0.54 * userWidth) / userHeight) * 100;
                hOp = ((15 / (1.5 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                wBorderLeftd3 = (5 / (1.5 * gateWidth)) * 0.5 * 100;
                wBorderTopd3 = ((7 / (1.5 * gateWidth)) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd4 = (5 / (1.5 * gateWidth)) * 0.5 * 100;
                wBorderTopd4 = ((7 / (1.5 * gateWidth)) * 0.5 * userWidth) / userHeight * 100;
                wSensor = (20 / (1.5 * gateWidth)) * 0.54 * 100;
                hSensor = ((5 / (1.5 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorTop = ((5 / (1.5 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorLeft = (0.65 * wGeneral) - (wSensor / 2);
            }
            else {

                hGeneral = 60;
                hOp = (15 / gateHeight) * 0.6 * 100;
                wGeneral = (((1.5 * gateWidth / gateHeight) * 0.6 * userHeight) / userWidth) * (10 / 9) * 100;
                wBorderLeftd3 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd3 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd4 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd4 = (7 / gateHeight) * 0.6 * 100;
                wSensor = (((20 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                hSensor = (5 / gateHeight) * 0.6 * 100;
                sensorTop = (5 / gateHeight) * 0.6 * 100;
                sensorLeft = (0.65 * wGeneral) - (wSensor / 2);
            }
        }
        else if (doorType == 6) {
            wthd1 = 5;
            wthd2 = 30;
            wthd3 = 30;
            wthd4 = 30;
            wthd5 = 0;
            wthd6 = 0;
            wthd7 = 0;
            wthd8 = 5;
            wBorderLeftd5 = 0;
            wBorderLeftd6 = 0;
            wBorderLeftd7 = 0;
            wBorderTopd5 = 0;
            wBorderTopd6 = 0;
            wBorderTopd7 = 0;

            if (hGeneral < 60) {                                    //  if door heidht < 60% of user height

                hGeneral = (((gateHeight / gateWidth) * 0.54 * userWidth) / userHeight) * 100;
                hOp = ((15 / gateWidth) * 0.54 * userWidth) / userHeight * 100;
                wBorderLeftd2 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd2 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd3 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd3 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd4 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd4 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wSensor = (20 / (gateWidth)) * 0.54 * 100;
                hSensor = ((5 / (gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorTop = ((5 / (gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorLeft = (0.65 * wGeneral) - (wSensor / 2);
            }
            else {

                hGeneral = 60;
                hOp = (15 / gateHeight) * 0.6 * 100;
                wGeneral = (((gateWidth / gateHeight) * 0.6 * userHeight) / userWidth) * (10 / 9) * 100;
                wBorderLeftd2 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd2 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd3 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd3 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd4 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd4 = (7 / gateHeight) * 0.6 * 100;
                wSensor = (((20 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                hSensor = (5 / gateHeight) * 0.6 * 100;
                sensorTop = (5 / gateHeight) * 0.6 * 100;
                sensorLeft = (0.65 * wGeneral) - (wSensor / 2);
            }
        }
        else if (doorType == 7) {                                    //  if door heidht < 60% of user height

            wthd1 = 20;
            wthd2 = 0;
            wthd3 = 15;
            wthd4 = 15;
            wthd5 = 15;
            wthd6 = 15;
            wthd7 = 0;
            wthd8 = 20;
            wBorderLeftd2 = 0;
            wBorderLeftd7 = 0;
            wBorderTopd2 = 0;
            wBorderTopd7 = 0;
            totalWidth = 1.5 * gateWidth;

            if (hGeneral < 60) {

                hGeneral = (((gateHeight / (1.5 * gateWidth)) * 0.54 * userWidth) / userHeight) * 100;
                hOp = ((15 / (1.5 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                wBorderLeftd3 = (5 / (1.5 * gateWidth)) * 0.5 * 100;
                wBorderTopd3 = ((7 / (1.5 * gateWidth)) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd4 = (5 / (1.5 * gateWidth)) * 0.5 * 100;
                wBorderTopd4 = ((7 / (1.5 * gateWidth)) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd5 = (5 / (1.5 * gateWidth)) * 0.5 * 100;
                wBorderTopd5 = ((7 / (1.5 * gateWidth)) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd6 = (5 / (1.5 * gateWidth)) * 0.5 * 100;
                wBorderTopd6 = ((7 / (1.5 * gateWidth)) * 0.5 * userWidth) / userHeight * 100;
                wSensor = (20 / (1.5 * gateWidth)) * 0.54 * 100;
                hSensor = ((5 / (1.5 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorTop = ((5 / (1.5 * gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorLeft = (0.5 * wGeneral) - (wSensor / 2);
            }
            else {

                hGeneral = 60;
                hOp = (15 / gateHeight) * 0.6 * 100;
                wGeneral = (((1.5 * gateWidth / gateHeight) * 0.6 * userHeight) / userWidth) * (10 / 9) * 100;
                wBorderLeftd3 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd3 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd4 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd4 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd5 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd5 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd6 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd6 = (7 / gateHeight) * 0.6 * 100;
                wSensor = (((20 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                hSensor = (5 / gateHeight) * 0.6 * 100;
                sensorTop = (5 / gateHeight) * 0.6 * 100;
                sensorLeft = (0.5 * wGeneral) - (wSensor / 2);
            }
        }
        else if (doorType == 8) {

            wthd1 = 5;
            wthd2 = 15;
            wthd3 = 15;
            wthd4 = 15;
            wthd5 = 15;
            wthd6 = 15;
            wthd7 = 15;
            wthd8 = 5;

            if (hGeneral < 60) {                                    //  if door heidht < 60% of user height

                hGeneral = (((gateHeight / gateWidth) * 0.54 * userWidth) / userHeight) * 100;
                hOp = ((15 / gateWidth) * 0.54 * userWidth) / userHeight * 100;
                wBorderLeftd2 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd2 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd3 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd3 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd4 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd4 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd5 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd5 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd6 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd6 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wBorderLeftd7 = (5 / gateWidth) * 0.5 * 100;
                wBorderTopd7 = ((7 / gateWidth) * 0.5 * userWidth) / userHeight * 100;
                wSensor = (20 / (gateWidth)) * 0.54 * 100;
                hSensor = ((5 / (gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorTop = ((5 / (gateWidth)) * 0.54 * userWidth) / userHeight * 100;
                sensorLeft = (0.5 * wGeneral) - (wSensor / 2);
            }
            else {

                hGeneral = 60;
                hOp = (15 / gateHeight) * 0.6 * 100;
                wGeneral = (((gateWidth / gateHeight) * 0.6 * userHeight) / userWidth) * (10 / 9) * 100;
                wBorderLeftd2 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd2 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd3 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd3 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd4 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd4 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd5 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd5 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd6 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd6 = (7 / gateHeight) * 0.6 * 100;
                wBorderLeftd7 = (((5 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                wBorderTopd7 = (7 / gateHeight) * 0.6 * 100;
                wSensor = (((20 / gateHeight) * 0.6 * userHeight) / userWidth) * 100;
                hSensor = (5 / gateHeight) * 0.6 * 100;
                sensorTop = (5 / gateHeight) * 0.6 * 100;
                sensorLeft = (0.5 * wGeneral) - (wSensor / 2);
            }
        }

        // Redefining parameters that may change

        hAnm = hGeneral + hOp + hTop;
        hUp = hTop + hOp;
        hdivtxt = hGeneral - 10;
        hTxt = hdivtxt / 2;
        wDivLeft = (96 - wGeneral) * (0.5);
        wMarginRight = (96 - wGeneral) * (0.5);

        // Assign JavaScript variables to CSS variables

        r.style.setProperty('--wthd1', wthd1 + "%");
        r.style.setProperty('--wthd2', wthd2 + "%");
        r.style.setProperty('--wthd3', wthd3 + "%");
        r.style.setProperty('--wthd4', wthd4 + "%");
        r.style.setProperty('--wthd5', wthd5 + "%");
        r.style.setProperty('--wthd6', wthd6 + "%");
        r.style.setProperty('--wthd7', wthd7 + "%");
        r.style.setProperty('--wthd8', wthd8 + "%");
        r.style.setProperty('--wborderleftd2', wBorderLeftd2 + "vw");
        r.style.setProperty('--wborderleftd3', wBorderLeftd3 + "vw");
        r.style.setProperty('--wborderleftd4', wBorderLeftd4 + "vw");
        r.style.setProperty('--wborderleftd5', wBorderLeftd5 + "vw");
        r.style.setProperty('--wborderleftd6', wBorderLeftd6 + "vw");
        r.style.setProperty('--wborderleftd7', wBorderLeftd7 + "vw");
        r.style.setProperty('--wbordertopd2', wBorderTopd2 + "vh");
        r.style.setProperty('--wbordertopd3', wBorderTopd3 + "vh");
        r.style.setProperty('--wbordertopd4', wBorderTopd4 + "vh");
        r.style.setProperty('--wbordertopd5', wBorderTopd5 + "vh");
        r.style.setProperty('--wbordertopd6', wBorderTopd6 + "vh");
        r.style.setProperty('--wbordertopd7', wBorderTopd7 + "vh");
        r.style.setProperty('--wsensor', wSensor + "vw");
        r.style.setProperty('--hsensor', hSensor + "vh");
        r.style.setProperty('--sensorleft', sensorLeft + "vw");
        r.style.setProperty('--sensortop', sensorTop + "vh");
        r.style.setProperty('--hgeneral', hGeneral + "vh");
        r.style.setProperty('--hop', hOp + "vh");
        r.style.setProperty('--hanm', hAnm + "vh");
        r.style.setProperty('--htop', hTop + "vh");
        r.style.setProperty('--hup', hUp + "vh");
        r.style.setProperty('--himgtop', hImgtop + "vh");
        r.style.setProperty('--htxt', hTxt + "vh");
        r.style.setProperty('--himgdown', hImgdown + "vh");
        r.style.setProperty('--hdivtxt', hdivtxt + "vh");
        r.style.setProperty('--wgeneral', wGeneral + "vw");
        r.style.setProperty('--wdivleft', wDivLeft + "vw");
        r.style.setProperty('--wmarginright', wMarginRight + "vw");

        document.getElementById("wtxt").innerHTML = totalWidth + " cm";  // Assign door width text
    }
}

function setGlassType() {                                           // Adjust the type of glass

    let gg = document.getElementById("glassType");
    let g = gg.options[gg.selectedIndex].text;

    switch (g) {
        case "10mm Transparent": r.style.setProperty('--color', "rgba(224,255,255,0.3)");
            break;

        case "10mm Smoked": r.style.setProperty('--color', "rgba(105,105,105,0.5)");
            break;

        case "10mm Bronze": r.style.setProperty('--color', "rgba(255,222,173,0.5)");
            break;

        case "10mm Satina": r.style.setProperty('--color', "rgba(230,230,250,0.7)");
            break;
    }
}

function setFrameType() {                                          // Adjust the type of frame
    let ff = document.getElementById("frameType");
    let f = ff.options[ff.selectedIndex].text;

    switch (f) {
        case "Silver anodizing": r.style.setProperty('--borderColor', "#808080");
            break;

        case "Gold anodizing": r.style.setProperty('--borderColor', "rgb(218,165,32)");
            break;

        case "White": r.style.setProperty('--borderColor', "rgb(250,240,230)");
            break;
    }
}

function move() {                                                   // Move animation

    let timerbtn = setInterval(hideMovebtn, 1);
    let counterbtn = 100;
    let btnMove = document.getElementById("movebtn");
    function hideMovebtn() {                                        // to hide button when the door is moving
        if (counterbtn == 0) {
            clearInterval(timerbtn);
        }
        else {
            counterbtn--;
            btnMove.style.opacity = counterbtn / 100;
            btnMove.style.cursor = "auto";
            btnMove.disabled = true;
        }
    }

    var ddtype = document.getElementById("dtype");
    var type = ddtype.options[ddtype.selectedIndex].text;
    var doorType;

    switch (type) {                                                //Specify the type of doors
        case "1 Door (1 Moving Door)": doorType = 1;
            break;

        case "2 Doors (2 Moving Doors)": doorType = 2;
            break;

        case "2 Doors (1 Moving Door , 1 Fixed Door)": doorType = 3;
            break;

        case "4 Doors (2 Moving Doors , 2 FixedDoors)": doorType = 4;
            break;

        case "2 Doors Telescopic (2 Moving Doors)": doorType = 5;
            break;

        case "3 Doors Telescopic (2 Moving Doors , 1 Fixed Door)": doorType = 6;
            break;

        case "4 Doors Telescopic (4 Moving Doors)": doorType = 7;
            break;

        case "6 Doors Telescopic (4Moving Doors , 2 Fixed Doors)": doorType = 8;
            break;
    }

    if (doorType == 1) {

        let wd4;
        let x = 0;
        let timer = setInterval(moveType1, 1);
        let d4 = document.getElementById("d4");

        function moveType1() {

            if (x == 450) {
                clearInterval(timer);
                setTimeout(rev1, 3000);

                function rev1() {

                    x = 450;
                    let timer1 = setInterval(revMoveType1, 1);

                    function revMoveType1() {

                        if (x == 0) {
                            clearInterval(timer1);
                            let timerbtn1 = setInterval(showMovebtn, 10);
                            let counterbtn1 = 0;
                            function showMovebtn() {
                                if (counterbtn1 == 100) {
                                    clearInterval(timerbtn1);
                                    btnMove.disabled = false;
                                    btnMove.style.cursor = "pointer";
                                }
                                else {
                                    counterbtn1++;
                                    btnMove.style.opacity = counterbtn1 / 100;
                                }
                            }
                        }
                        else {
                            x--;
                            wd4 = x / 10;
                            d4.style.left = -wd4 + "%";
                        }
                    }
                }

            }
            else {
                x++;
                wd4 = x / 10;
                d4.style.left = -wd4 + "%";
            }
        }

    }
    else if (doorType == 2) {

        let wd4;
        let wd5;
        let x = 0;
        let y = 0;
        let timer = setInterval(moveType2, 1);
        let d4 = document.getElementById("d4");
        let d5 = document.getElementById("d5");

        function moveType2() {

            if (x == 225) {
                clearInterval(timer);
                setTimeout(rev2, 3000);

                function rev2() {

                    x = 225;
                    y = 225;
                    let timer1 = setInterval(revMoveType2, 1);

                    function revMoveType2() {

                        if (x == 0) {
                            clearInterval(timer1);
                            let timerbtn1 = setInterval(showMovebtn, 10);
                            let counterbtn1 = 0;
                            function showMovebtn() {
                                if (counterbtn1 == 100) {
                                    clearInterval(timerbtn1);
                                    btnMove.disabled = false;
                                    btnMove.style.cursor = "pointer";
                                }
                                else {
                                    counterbtn1++;
                                    btnMove.style.opacity = counterbtn1 / 100;
                                }
                            }
                        }
                        else {
                            x--;
                            y--;
                            wd4 = x / 10;
                            wd5 = y / 10;
                            d4.style.left = -wd4 + "%";
                            d5.style.left = wd5 + "%";
                        }
                    }
                }
            }
            else {
                x++;
                y++;
                wd4 = x / 10;
                wd5 = y / 10;
                d4.style.left = -wd4 + "%";
                d5.style.left = wd5 + "%";
            }
        }
    }
    else if (doorType == 3) {
        let wd4;
        let x = 0;
        let timer = setInterval(moveType3, 1);
        let d4 = document.getElementById("d4");

        function moveType3() {

            if (x == 450) {
                clearInterval(timer);
                setTimeout(rev3, 3000);

                function rev3() {

                    x = 450;
                    let timer1 = setInterval(revMoveType3, 1);

                    function revMoveType3() {

                        if (x == 0) {
                            clearInterval(timer1);
                            let timerbtn1 = setInterval(showMovebtn, 10);
                            let counterbtn1 = 0;
                            function showMovebtn() {
                                if (counterbtn1 == 100) {
                                    clearInterval(timerbtn1);
                                    btnMove.disabled = false;
                                    btnMove.style.cursor = "pointer";
                                }
                                else {
                                    counterbtn1++;
                                    btnMove.style.opacity = counterbtn1 / 100;
                                }
                            }
                        }
                        else {
                            x--;
                            wd4 = x / 10;
                            d4.style.left = -wd4 + "%";
                        }
                    }
                }
            }
            else {
                x++;
                wd4 = x / 10;
                d4.style.left = -wd4 + "%";
            }
        }
    }
    else if (doorType == 4) {

        let wd4;
        let wd5;
        let x = 0;
        let y = 0;
        let timer = setInterval(moveType4, 1);
        let d4 = document.getElementById("d4");
        let d5 = document.getElementById("d5");

        function moveType4() {

            if (x == 225) {
                clearInterval(timer);
                setTimeout(rev4, 3000);

                function rev4() {

                    x = 225;
                    y = 225;
                    let timer1 = setInterval(revMoveType4, 1);

                    function revMoveType4() {

                        if (x == 0) {
                            clearInterval(timer1);

                            let timerbtn1 = setInterval(showMovebtn, 10);
                            let counterbtn1 = 0;
                            function showMovebtn() {
                                if (counterbtn1 == 100) {
                                    clearInterval(timerbtn1);
                                    btnMove.disabled = false;
                                    btnMove.style.cursor = "pointer";
                                }
                                else {
                                    counterbtn1++;
                                    btnMove.style.opacity = counterbtn1 / 100;
                                }
                            }
                        }
                        else {
                            x--;
                            y--;
                            wd4 = x / 10;
                            wd5 = y / 10;
                            d4.style.left = -wd4 + "%";
                            d5.style.left = wd5 + "%";
                        }
                    }
                }
            }
            else {
                x++;
                y++;
                wd4 = x / 10;
                wd5 = y / 10;
                d4.style.left = -wd4 + "%";
                d5.style.left = wd5 + "%";
            }
        }
    }
    else if (doorType == 5) {

        let wd4;
        let wd3;
        let x = 0;
        let y = 0;
        let timer = setInterval(moveType5, 1);
        let d4 = document.getElementById("d4");
        let d3 = document.getElementById("d3");

        function moveType5() {

            if (x == 600) {
                clearInterval(timer);
                setTimeout(rev5, 3000);

                function rev5() {

                    x = 600;
                    y = 300;
                    let timer1 = setInterval(revMoveType5, 1);

                    function revMoveType5() {

                        if (x == 0) {
                            clearInterval(timer1);
                            let timerbtn1 = setInterval(showMovebtn, 10);
                            let counterbtn1 = 0;
                            function showMovebtn() {
                                if (counterbtn1 == 100) {
                                    clearInterval(timerbtn1);
                                    btnMove.disabled = false;
                                    btnMove.style.cursor = "pointer";
                                }
                                else {
                                    counterbtn1++;
                                    btnMove.style.opacity = counterbtn1 / 100;
                                }
                            }
                        }
                        else {
                            x -= 2;
                            y--;
                            wd4 = x / 10;
                            wd3 = y / 10;
                            d4.style.left = -wd4 + "%";
                            d3.style.left = -wd3 + "%";
                        }
                    }
                }
            }
            else {
                x += 2;
                y++;
                wd4 = x / 10;
                wd3 = y / 10;
                d4.style.left = -wd4 + "%";
                d3.style.left = -wd3 + "%";
            }
        }
    }
    else if (doorType == 6) {

        let wd3;
        let wd4;
        let x = 0;
        let y = 0;
        let timer = setInterval(moveType6, 1);
        let d4 = document.getElementById("d4");
        let d3 = document.getElementById("d3");

        function moveType6() {

            if (x == 600) {
                clearInterval(timer);
                setTimeout(rev6, 3000);

                function rev6() {

                    x = 600;
                    y = 300;
                    let timer1 = setInterval(revMoveType6, 1);

                    function revMoveType6() {

                        if (x == 0) {
                            clearInterval(timer1);
                            let timerbtn1 = setInterval(showMovebtn, 10);
                            let counterbtn1 = 0;
                            function showMovebtn() {
                                if (counterbtn1 == 100) {
                                    clearInterval(timerbtn1);
                                    btnMove.disabled = false;
                                    btnMove.style.cursor = "pointer";
                                }
                                else {
                                    counterbtn1++;
                                    btnMove.style.opacity = counterbtn1 / 100;
                                }
                            }
                        }
                        else {
                            x -= 2;
                            y--;
                            wd4 = x / 10;
                            wd3 = y / 10;
                            d4.style.left = -wd4 + "%";
                            d3.style.left = -wd3 + "%";
                        }
                    }
                }
            }
            else {
                x += 2;
                y++;
                wd4 = x / 10;
                wd3 = y / 10;
                d4.style.left = -wd4 + "%";
                d3.style.left = -wd3 + "%";
            }
        }
    }
    else if (doorType == 7) {

        let wd3;
        let wd4;
        let wd5;
        let wd6;
        let x = 0;
        let y = 0;
        let z = 0;
        let t = 0;
        let timer = setInterval(moveType7, 5);
        let d3 = document.getElementById("d3");
        let d4 = document.getElementById("d4");
        let d5 = document.getElementById("d5");
        let d6 = document.getElementById("d6");

        function moveType7() {

            if (x == 300) {
                clearInterval(timer);
                setTimeout(rev7, 3000);

                function rev7() {

                    x = 300;
                    y = 150;
                    z = 300;
                    t = 150;
                    let timer1 = setInterval(revMoveType7, 5);

                    function revMoveType7() {

                        if (x == 0) {
                            clearInterval(timer1);
                            let timerbtn1 = setInterval(showMovebtn, 10);
                            let counterbtn1 = 0;
                            function showMovebtn() {
                                if (counterbtn1 == 100) {
                                    clearInterval(timerbtn1);
                                    btnMove.disabled = false;
                                    btnMove.style.cursor = "pointer";
                                }
                                else {
                                    counterbtn1++;
                                    btnMove.style.opacity = counterbtn1 / 100;
                                }
                            }
                        }
                        else {
                            x -= 2;
                            y--;
                            wd4 = x / 10;
                            wd3 = y / 10;
                            d4.style.left = -wd4 + "%";
                            d3.style.left = -wd3 + "%";

                            z -= 2;
                            t--;
                            wd5 = z / 10;
                            wd6 = t / 10;
                            d5.style.left = wd5 + "%";
                            d6.style.left = wd6 + "%";
                        }

                    }
                }
            }
            else {

                x += 2;
                y++;
                wd4 = x / 10;
                wd3 = y / 10;
                d4.style.left = -wd4 + "%";
                d3.style.left = -wd3 + "%";

                z += 2;
                t++;
                wd5 = z / 10;
                wd6 = t / 10;
                d5.style.left = wd5 + "%";
                d6.style.left = wd6 + "%";
            }
        }
    }
    else if (doorType == 8) {

        let wd3;
        let wd4;
        let wd5;
        let wd6;
        let x = 0;
        let y = 0;
        let z = 0;
        let t = 0;
        let timer = setInterval(moveType8, 5);
        let d3 = document.getElementById("d3");
        let d4 = document.getElementById("d4");
        let d5 = document.getElementById("d5");
        let d6 = document.getElementById("d6");

        function moveType8() {

            if (x == 300) {
                clearInterval(timer);
                setTimeout(rev8, 3000);

                function rev8() {

                    x = 300;
                    y = 150;
                    z = 300;
                    t = 150;
                    let timer1 = setInterval(revMoveType8, 5);

                    function revMoveType8() {

                        if (x == 0) {
                            clearInterval(timer1);
                            let timerbtn1 = setInterval(showMovebtn, 10);
                            let counterbtn1 = 0;
                            function showMovebtn() {
                                if (counterbtn1 == 100) {
                                    clearInterval(timerbtn1);
                                    btnMove.disabled = false;
                                    btnMove.style.cursor = "pointer";
                                }
                                else {
                                    counterbtn1++;
                                    btnMove.style.opacity = counterbtn1 / 100;
                                }
                            }
                        }
                        else {
                            x -= 2;
                            y--;
                            wd4 = x / 10;
                            wd3 = y / 10;
                            d4.style.left = -wd4 + "%";
                            d3.style.left = -wd3 + "%";

                            z -= 2;
                            t--;
                            wd5 = z / 10;
                            wd6 = t / 10;
                            d5.style.left = wd5 + "%";
                            d6.style.left = wd6 + "%";
                        }
                    }
                }
            }
            else {
                x += 2;
                y++;
                wd4 = x / 10;
                wd3 = y / 10;
                d4.style.left = -wd4 + "%";
                d3.style.left = -wd3 + "%";

                z += 2;
                t++;
                wd5 = z / 10;
                wd6 = t / 10;
                d5.style.left = wd5 + "%";
                d6.style.left = wd6 + "%";
            }
        }
    }
}

// invoice part  (Angularjs)

var app = angular.module("myapp", []);
app.controller("myctrl", ($scope) => {            

    $scope.operators = [
        { name: "Toormax", fee: 1000 },
        { name: "Record", fee: 800 },
        { name: "Faac", fee: 1200 }
    ];
    $scope.frameType = [
        { name: "Silver anodizing", fee: 50 },
        { name: "Gold anodizing", fee: 60 },
        { name: "White", fee: 40 }
    ];
    $scope.glassType = [
        { name: "10mm Transparent", fee: 15 },
        { name: "10mm Smoked", fee: 20 },
        { name: "10mm Bronze", fee: 25 },
        { name: "10mm Satina", fee: 30 }
    ];
    $scope.installation = {
        opt: 150,
        glass: 10
    };
});

