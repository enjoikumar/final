 
var canvas = document.getElementById("canv");
var $ = canvas.getContext("2d");

var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;

var arr = [];
var u = 0;
var dep = w;
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
//setting a value so it always starts at 0
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

