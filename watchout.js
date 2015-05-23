// start slingin' some d3 here.

var svg = d3.select("body").append("svg")
  .attr("width", 700)
  .attr("height", 450);

svg.append("defs")
  .append("pattern")
  .attr("id", "image")
  .attr("x",0)
  .attr("y",0)
  .attr("height",20)
  .attr("width",20)
  .append("image")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 20)
  .attr("height", 20)
  .attr("xlink:href", "shuriken.png");

var player = d3.select("svg").append("path")
  // add the teardrop shape from source
  .attr("d", "m-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z")
  .attr("fill", "#787899")
  .attr("transform", "translate(350,225)");
  // .call(drag);
var dragMove = d3.behavior.drag()
  .on('drag', function(){
    player.attr('transform', 'translate('+Math.max(Math.min(700,d3.event.x),0)+','+Math.max(Math.min(450, d3.event.y),0)+')')
  });

player.call(dragMove);

// player.attr("fill", "#00ff00");

// create array of enemies
var enemyArray = [];
for (var i=0; i<30; i++){
  enemyArray.push(i);
}


// create enemies
var enemies = svg.selectAll("circle")
.data(enemyArray)
.enter()
.append("circle")
.attr("class", "enemy")
.style("fill", "url(#image)")
.attr("r", 10)
.attr("cx", function() {return Math.floor(Math.random()*700);})
.attr("cy", function() {return Math.floor(Math.random()*450);});

// .attr("transform", newLocation);

var enemyMove = function(){
  enemies
    .transition()
      .duration(2000)
      .attr("cx", function() {return Math.floor(Math.random()*700);})
      .attr("cy", function() {return Math.floor(Math.random()*450);});
};

// function that checks if there's a collision
// d3.transform(enemies.attr("transform")).translate
var checkCollision = function(){
  enemies.each(function(d,i){
    var enemyX = d3.select(this).attr("cx");
    var enemyY = d3.select(this).attr("cy");
    var playerX = d3.transform(player.attr("transform")).translate[0];
    var playerY = d3.transform(player.attr("transform")).translate[1];

    var distance = Math.sqrt( Math.pow((enemyX - playerX), 2) + Math.pow((enemyY - playerY), 2));

    if (distance < 15){
      collisions++;
      d3.select(".collisions span").text(collisions);
      if (+d3.select(".current span").text() > +d3.select(".high span").text()) {
        d3.select(".high span").text(d3.select(".current span").text());
      }
      score = 0;
      d3.select(".current span").text(score);
    }
  });
};

var collisions = 0;
var score = 0;

setInterval(function(){
  score++;
  d3.select(".current span").text(score);
},1000);
setInterval(checkCollision, 50);
setInterval(enemyMove, 2000);
