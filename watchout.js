// start slingin' some d3 here.

var svg = d3.select("body").append("svg")
  .attr("width", 700)
  .attr("height", 450)


var player = d3.select("svg").append("path")
  // add the teardrop shape from source
  .attr("d", "m-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z")
  .attr("fill", "#ff00ff")
  .attr("transform", "translate(350,225)");
  // .call(drag);
var dragMove = d3.behavior.drag()
  .on('drag', function(){
    player.attr('transform', 'translate('+d3.event.x+','+d3.event.y+')')
  });

player.call(dragMove);

// player.attr("fill", "#00ff00");

// create array of enemies
var enemyArray = [];
for (var i=0; i<30; i++){
  enemyArray.push(i);
}

// function for random location
var newLocation = function(d) {
  return ("translate("+Math.floor(Math.random()*700)+","+Math.floor(Math.random()*450)+")");
};

// create enemies
var enemies = svg.selectAll("circle")
.data(enemyArray)
.enter()
.append("circle")
.attr("r", 10)
.attr("transform", newLocation);

var enemyMove = function(){
  enemies
    .transition(1000)
    .attr("transform", newLocation);
};

setInterval(enemyMove, 2000);
