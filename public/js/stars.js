 
var canvas = document.getElementById("canv");
//$ has to be 2d
var $ = canvas.getContext("2d");

//making sure background fills the entire page
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;

var arr = [];
var sprinkle = w;
var dp = 0.70;

//mouse locations
var rat = {
  x: 0,
  y: 0
};

var mouse = {
  x: 0,
  y: 0
};

//points of depth and perception
function Obj(x, y, z) {
  this.set(x, y, z);  
}

//setting a value so it always starts at 0 a
//and each object inheriting the value
Obj.prototype = {
  set: function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  },
  //this is for rotation of the angle using matrices
  //making X responsive
  rotX: function(ang) {
    var y = this.y;
    var z = this.z;
    this.y = y * Math.cos(ang) - z * Math.sin(ang);
  },
  // making y responsive
  rotY: function(ang) {
    var x = this.x;
    var z = this.z;
    this.x = x * Math.cos(ang) - z * Math.sin(ang);
  },
  // z responsive
  rotZ: function(ang) {
    var x = this.x;
    var y = this.y;
    this.x = x * Math.cos(ang) - y * Math.sin(ang);
  }
};

//creating the stars and making them move
function Part(x, y, z) {
  //giving the variables perspectives
  this.op = new Obj(x, y, z);
  this.rp = new Obj(x, y, z);
  this.rot = new Obj();
  this.vel = new Obj();
  //changing the color and size, has to be hsla
  this.color = 'hsla(216,95%,85%,'+random(2, 2)+')';
}

//the mouse will change, so the background needs to be responsive
//this makes sure it stays in place
function upd(rot) {
  for (var i in arr) {
    op = arr[i].op;
    rp = arr[i].rp;
    rot = arr[i].rot;
    //vel represents velocity
    vel = arr[i].vel;
    //color to color
    color = arr[i].color;
    //vel would make equal the mouse and increase the speed
    // set it to .10 to make sure its not too fast
    vel.x += mouse.x * .10;
    vel.y += mouse.y * .10;
    rp.set(op.x, op.y, op.z);

    //rotation is set to the velocity
    rot.x += vel.x;
    rot.y += vel.y;
    rot.z += vel.z;

    rp.rotY(rot.y);
    rp.rotX(rot.x);
    //so mouse movements arent too fast;
    //set to zero becaause it matches the xyz values
    vel.set(
      vel.x * dp,
      vel.y * dp,
      0
    );
  }
}

//creating the stars
//puts them all in the array and then 
//riterating them over the x and y
//filling the bacground
function draw() {
  for (var i in arr) {
    stars = arr[i];
    depth = ((stars.rp.z / sprinkle) + 1);
    $.fillStyle = stars.color;
    $.fillRect(w + stars.rp.x, h + stars.rp.y, random(depth/1, depth/2),  depth/1);
  }
}

//randomizes the position of the stars and puts them everywhere
function random(min, max) {
  return Math.random() * (max - min) + min;
}

//sets the numbers of stars
//randomizes the positon from above
//each dot has its own space
//add too many and even though it moves it doesnt look like it moves
function go() {
  for (var i = 0; i < 5000; i++) {
    var dimension = new Part(
      random(-w, h),
      random(-w, h),
      random(-sprinkle, sprinkle)
    );
    arr.push(dimension);
  }
}

//makes the mouse responsive to movement
window.addEventListener('mousemove', function(e) {
  //client is user, it has to be client
  mouse.x = (e.clientY - rat.y) / w;
  mouse.y = (e.clientX - rat.x) / h;
  rat.x = e.clientX;
  rat.y = e.clientY;
}, false);


//creating the background color
function run() {
  $.clearRect(0, 0, w, h);
  //setting it to the width/height
  var background = 
    $.createLinearGradient(canvas.width,
    canvas.height * 2,
    canvas.width + canvas.width, 2);
    //setting the color, has to be hsla or rgb
    background.addColorStop(1, 'rgb(8, 1, 25)');
    //fill the background
    $.fillStyle = background;
    $.fillRect(0, 0, w, h);
    //calling upon functions above
    upd();
    draw();
    //making sure the animation runs
    window.requestAnimationFrame(run);
}

// invoking the functions
go();
run();