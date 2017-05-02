

var reg = document.getElementsByClassName("reg");



var clocks_reg = [];
var clocks_am = [];

var reg_numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12];
var reg_numbers_ = [12,13,14,15,16,17,18,19,20,21,22,23,24];

var mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 0];


for(var i = 0; i < reg.length; i++) {
    reg[i].innerHTML += "<div class='tp_head'></div><div class='tp_body'><div class='tp_clock reg_clock' onmouseenter='mouse_over(event, this)' onmouseleave='mouse_out(event, this)' onmousemove='mouse_move(event, this)'></div><div class='tp_footer'></div></div>"
    clocks_reg.push({
        "element":reg[i],
        "hour":9,
        "min":0,
        "clock": reg[i].getElementsByClassName("reg_clock")[0]
    })
}

var reg_clocks = document.getElementsByClassName("reg_clock");

for(var i = 0; i < reg.length; i++) {
    reg_clocks[i].innerHTML += "<div class='pointer'><div class='pointer_circle'><div class='pointer_line'></div><div class='pointer_smallcircle'</div></div></div>";
}

for(var i = 0; i < clocks_reg.length; i++) {
    fillClock(mins, clocks_reg[i].clock)
}

function fillClock(numbers, element) {
    var radius = element.offsetWidth/2;

    for(var j = 12; j > 0; j--){

        var cos = Math.cos(2 * Math.PI * ((j-3)/12));
        var sin = Math.sin(2 * Math.PI * ((j-3)/12));

        var element_x = 26 + radius * cos * 0.8;
        var element_y = 137 + radius * sin * 0.8;

        reg_clocks[i].innerHTML += "<div class='number' style='position: absolute; top: " + (radius + element_y) + "px; left: " + (radius + element_x) + "px;'>" + (numbers[j]) + "</div>";
    }
}

function mouse_over(e, src) {
    var p = src.getElementsByClassName("pointer")[0];
    set_pointer(e, src, p);
}

function mouse_out(e, src) {
    var p = src.getElementsByClassName("pointer")[0];
    set_pointer(e, src, p);
}

function mouse_move(e, src) {
    var p = src.getElementsByClassName("pointer")[0];
    set_pointer(e, src, p);
}

function mouse_click(e, src){
    var p = src.getElementsByClassName("pointer")[0];



    set_pointer(e, src, p);

}

function set_pointer(e, src, p) {
    var pos_origin = src.getBoundingClientRect();

    var origin_x = -150;
    var origin_y = 0;
    var x_mouse = e.x - pos_origin.left - 150;
    var y_mouse = -(e.y - pos_origin.top - 150);

    var	dx = x_mouse - origin_x;
    var dy = y_mouse - origin_y;

    var angle = Math.atan2(y_mouse, x_mouse) - Math.atan2(origin_y, origin_x);

    var rotateAngle = -(angle * 57.3);
    var angle_ratio = Math.round(rotateAngle/30);
    console.log(angle_ratio);

    p.style.transform = "rotate("+ (angle_ratio * 30) + "deg)";
}



