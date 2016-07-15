 
var canvas = document.getElementById("canv");
var $ = canvas.getContext("2d");

var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;

var arr = [];
var u = 0;
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
  this.op = new Obj(x, y, z);
  this.rp = new Obj(x, y, z);
  this.rot = new Obj();
  this.vel = new Obj();
  this.color = 'hsla(216,95%,85%,'+rnd(0.5, 1)+')';
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
    color = arr[i].color;
    vel.x += mouse.x * 0.15;
    vel.y += mouse.y * 0.15;
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
function draw() {
  for (var i in arr) {
    stars = arr[i];
    depth = ((stars.rp.z / sprinkle) + 1);
    $.fillStyle = stars.color;
    $.fillRect(w + stars.rp.x, h + stars.rp.y, rnd(depth/0.8, depth/2),  depth/0.9);
  }
}

//randomizes the position of the stars and puts them everywhere
function rnd(min, max) {
  return Math.random() * (max - min) + min;
}
