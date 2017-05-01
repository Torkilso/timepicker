

var reg = document.getElementsByClassName("reg")

var clocks = {}


for(var i = 0; i < reg.length; i++) {

    reg[i].innerHTML += "<div class='tp_head'></div><div class='tp_body'><div class='tp_clock reg_clock' onmouseenter='mouse_over(event, this)' onmouseleave='mouse_out(event, this)' onmousemove='mouse_move(event, this)'></div><div class='tp_footer'></div></div>"


}

var reg_clocks = document.getElementsByClassName("reg_clock");

for(var i = 0; i < reg.length; i++) {
    reg_clocks[i].innerHTML += "<div class='pointer'><div class='pointer_circle'><div class='pointer_line'></div><div class='pointer_smallcircle'></div></div></div>";
}

var pointers = document.getElementsByClassName("pointer");

for(var i = 0; i < reg_clocks.length; i++) {

    var position = reg_clocks[i].getBoundingClientRect();

    var x = position.left;
    var y = position.top;

    var radius = reg_clocks[i].offsetWidth/2;

    for(var j = 12; j > 0; j--){

        var cos = Math.cos(2 * Math.PI * ((j-3)/12));
        var sin = Math.sin(2 * Math.PI * ((j-3)/12));

        var element_x = 26 + radius * cos * 0.8;
        var element_y = 137 + radius * sin * 0.8;

        reg_clocks[i].innerHTML += "<div class='number' style='position: absolute; top: " + (radius + element_y) + "px; left: " + (radius + element_x) + "px;'>" + (j) + "</div>";
    }

}



function mouse_over(e, src) {

    var p = src.getElementsByClassName("pointer");

    set_pointer(e, src, p[0]);
}

function mouse_out(e, src) {
    var p = src.getElementsByClassName("pointer");

    set_pointer(e, src, p[0]);
}

function mouse_move(e, src) {
    var p = src.getElementsByClassName("pointer");

    set_pointer(e, src, p[0]);
}

function mouse_click(e, src){
    var p = src.getElementsByClassName("pointer");

    set_pointer(e, src, p[0]);
}


function set_pointer(e, src, p) {

    var pos_origin = src.getBoundingClientRect();

    origin_x = -150;
    origin_y = 0;


    x_mouse = e.x - pos_origin.left - 150;
    y_mouse = -(e.y - pos_origin.top - 150);

    console.log(x_mouse + ", " + y_mouse);
    console.log(origin_x + ", " + origin_y);


    //var angle = Math.atan2(y_mouse - origin_y, x_mouse - origin_x) * 180 / Math.PI;


    var	dx = x_mouse - origin_x;
    var dy = y_mouse - origin_y;

    //var angle = Math.atan2(dy,dx);

    var angle = Math.atan2(y_mouse, x_mouse) - Math.atan2(origin_y, origin_x);



    p.style.transform = "rotate("+ angle*-57.3 + "deg)";


}

