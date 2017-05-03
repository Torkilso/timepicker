var inputs = document.getElementsByClassName("timeinput");

function openTimepicker(timepicker) {
    if(timepicker.classList.contains("open")){
        cancel(timepicker);
        return;
    }
    timepicker.style.visibility = "visible";
    timepicker.style.display = "block";

    timepicker.classList.add("open");



    if(!timepicker.classList.contains("opened")){
        fillClock(REG_N, timepicker.getElementsByClassName("tp_clock")[0], false);
    }
}

var tps = document.getElementsByClassName("timepicker");

const REG_N = [0,1,2,3,4,5,6,7,8,9,10,11,0,12,13,14,15,16,17,18,19,20,21,22,23,12];

const AM_N = [0,1,2,3,4,5,6,7,8,9,10,11,12,12,13,14,15,16,17,18,19,20,21,22,23,12];

const MINS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 0];

const DAY = 1;
const NIGHT = 2;
const MIN = 3;
const HOUR = 4;

for(var i = 0; i < tps.length; i++) {
    tps[i].innerHTML += "<div class='tp_head'></div><div class='tp_body'>" +
        "<div class='tp_clock reg_clock' onclick='setTime(event, this, this.parentElement.parentElement)' onmouseenter='mouse_over(event, this)' " +
        "onmouseleave='mouse_out(event, this)' onmousemove='mouse_move(event, this)'></div>" +
        "<div class='tp_footer'></div></div>"

    tps[i].getElementsByClassName("tp_head")[0].innerHTML = "<div class='tp_time'><div class='tp_hour time_active' onclick='changeMinutesHour(this.parentElement.parentElement.parentElement)'>09</div>" +
        "<div class='tp_colon'>:</div><div class='tp_minutes' onclick='changeMinutesHour(this.parentElement.parentElement.parentElement)'>00</div>" +
        "</div><div class='tp_ampm'><div class='am time_active' onclick='toggleDayNight(this.parentElement.parentElement.parentElement)'>0-12</div>" +
        "<div class='pm' onclick='toggleDayNight(this.parentElement.parentElement.parentElement)'>12-24</div></div>";
    tps[i].getElementsByClassName("tp_footer")[0].innerHTML = "<div class='tp_cancel' onclick='cancel(this.parentElement.parentElement.parentElement)'>CANCEL</div>" +
        "<div class='tp_confirm' onclick='confirmTime(this.parentElement.parentElement.parentElement)'>OK</div>";


    if(!isReg(tps[i])){
        tps[i].getElementsByClassName("am")[0].innerHTML = "AM";
        tps[i].getElementsByClassName("pm")[0].innerHTML = "PM";
    }
}

var clocks = document.getElementsByClassName("tp_clock");

for(var i = 0; i < tps.length; i++) {
    clocks[i].innerHTML += "<div class='numbers'></div><div class='pointer'><div class='pointer_circle'><div class='pointer_line'></div><div class='pointer_smallcircle'</div></div></div>";
}

for(var i = 0; i < tps.length; i++) {
    fillClock(REG_N, tps[i].getElementsByClassName("tp_clock")[0], false)
}

function fillClock(numbers, clock, late) {
    clock.getElementsByClassName("numbers")[0].innerHTML = "";
    var radius = clock.offsetWidth/2;

    var hourCheck = 0;
    if(late){
        hourCheck = 13;
    }

    if(numbers != MINS && !isReg(clock.parentElement.parentElement)){
        numbers = AM_N;
        hourCheck = 0;
    }

    for(var j = 12; j > 0; j--){

        var cos = Math.cos(2 * Math.PI * ((j-3)/12));
        var sin = Math.sin(2 * Math.PI * ((j-3)/12));

        var element_x = 26 + radius * cos * 0.8;
        var element_y = 137 + radius * sin * 0.8;


        clock.getElementsByClassName("numbers")[0].innerHTML += "<div class='number' style='position: absolute; top: " + (radius + element_y) + "px; left: " + (radius + element_x) + "px;'>" + (numbers[j+hourCheck]) + "</div>";
    }
}

function mouse_over(e, src) {
    var p = src.getElementsByClassName("pointer")[0];
    setPointer(getAngleNumber(e, src), p);
}

function mouse_out(e, src) {
    var p = src.getElementsByClassName("pointer")[0];
    setPointer(getAngleNumber(e, src), p);
}

function mouse_move(e, src) {
    var p = src.getElementsByClassName("pointer")[0];
    setPointer(getAngleNumber(e, src), p);
}

function mouse_click(e, src, timepicker){
    var p = src.getElementsByClassName("pointer")[0];
    var header = timepicker.getElementsByClassName("tp_head")[0];
    console.log(header);

    setPointer(getAngleNumber(e, src), p);
}

function getAngleNumber(e, src) {
    var pos_origin = src.getBoundingClientRect();

    var origin_x = -150;
    var origin_y = 0;
    var x_mouse = e.x - pos_origin.left - 150;
    var y_mouse = -(e.y - pos_origin.top - 150);

    var angle = Math.atan2(y_mouse, x_mouse) - Math.atan2(origin_y, origin_x);

    var rotateAngle = -(angle * 57.3);
    var angle_ratio = Math.round(rotateAngle/30);
    return angle_ratio;
}

function calculateTime(type, number) {
    var time = 0;

    time = number - 3;


    if(number == 0 || number == 1 || number == 2){
        time += 12;
    }


    if(type == DAY){
        time += 12
    }

    return time;
}

function setPointer(number, p) {
    p.style.transform = "rotate("+ (number * 30) + "deg)";
}

function setTime(e, clock, timepicker){
    var inputNumber = getAngleNumber(e, clock);
    var t = getTypeDayNight(timepicker);

    var n = calculateTime(t, inputNumber);
    var h = getTypeHourMinute(timepicker);

    if(h == HOUR) {
        setHour(timepicker, n);
    } else {
        if(t == DAY){
            n -=12;
        }
        n *= 5;
        setMinute(timepicker, n)
    }
}

function setHour(timepicker, hour){
    var hourEl = timepicker.getElementsByClassName("tp_hour")[0];

    if(hour < 10){
        hourEl.innerHTML = "0" + hour;
    } else {
        hourEl.innerHTML = hour;
    }


}

function setMinute(timepicker, minutes){
    var minEl = timepicker.getElementsByClassName("tp_minutes")[0];
    if(minutes < 10){
        minEl.innerHTML = "0" + minutes;
    } else {
        minEl.innerHTML = minutes;
    }
}

function changeMinutesHour(timepicker) {

    if(getTypeHourMinute(timepicker) == MIN){
        changeDayNight(timepicker);
    } else {
        fillClock(MINS, timepicker.getElementsByClassName("tp_clock")[0], false);
    }
    timepicker.getElementsByClassName("tp_hour")[0].classList.toggle("time_active");
    timepicker.getElementsByClassName("tp_minutes")[0].classList.toggle("time_active");
}

function changeDayNight(timepicker) {
    if(getTypeDayNight(timepicker) == NIGHT){
        fillClock(REG_N, timepicker.getElementsByClassName("tp_clock")[0], false);
    } else {
        fillClock(REG_N, timepicker.getElementsByClassName("tp_clock")[0], true);
    }
}

function toggleDayNight(timepicker) {
    if(getTypeHourMinute(timepicker) == HOUR) {
        if(getTypeDayNight(timepicker) == DAY){
            fillClock(REG_N, timepicker.getElementsByClassName("tp_clock")[0], false);
        } else {
            fillClock(REG_N, timepicker.getElementsByClassName("tp_clock")[0], true);
        }
    }
    timepicker.getElementsByClassName("am")[0].classList.toggle("time_active");
    timepicker.getElementsByClassName("pm")[0].classList.toggle("time_active");
}

function getTypeHourMinute(timepicker){
    var hour = timepicker.getElementsByClassName("tp_hour")[0];
    if(hour.classList.contains('time_active')){
        return HOUR;
    } else {
        return MIN;
    }
}

function getTypeDayNight(timepicker){

    if(!isReg(timepicker)){
        return NIGHT;
    }

    var d = timepicker.getElementsByClassName("am")[0];
    if(d.classList.contains('time_active')){
        return NIGHT;
    } else {
        return DAY;
    }
}

function isReg(timepicker) {
    if(timepicker.classList.contains('reg')){
        return true;
    }
    return false;
}

function cancel(timepicker){
    timepicker.classList.remove("open");
    timepicker.classList.add("opened");
    timepicker.style.visibility = "hidden";
    timepicker.style.display = "none";
}

function confirmTime(timepicker){
    timepicker.classList.remove("open");
    timepicker.classList.add("opened");

    var str = "";

    var hr = timepicker.getElementsByClassName("tp_hour")[0].innerHTML;
    var min = timepicker.getElementsByClassName("tp_minutes")[0].innerHTML;

    if(isReg(timepicker)){
        str = hr + ":" + min;
    } else {
        var ty = "";
        if(timepicker.getElementsByClassName("am")[0].classList.contains("time_active")){
            ty = "am";
        } else {
            ty = "pm"
        }
        str = hr + ":" + min + " " + ty;
    }

    timepicker.parentElement.getElementsByClassName("text")[0].innerHTML = str;

    timepicker.style.visibility = "hidden";
    timepicker.style.display = "none";
}

