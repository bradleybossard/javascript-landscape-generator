var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initPoints();
}, false)

function drawBackground() {
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.fill();
}

function displaceSegment(start, end) {
  var midX = start.x + (end.x - start.x) / 2;
  var midY = start.y + ((end.y - start.y) / 2) - (Math.random() * (end.x - start.x) * 0.1);
  var midpoint = {x: midX, y: midY};
  return [start, midpoint, end];
}

function iterateSegment(numIterations) {
  for (var i = 0; i < numIterations; i++) {
    var iteration = [];
    for (var j = 0; j < points.length - 1; j++) {
      var segment = displaceSegment(points[j], points[j+1]);
      iteration = iteration.concat(segment);
		}
    points = iteration;
	}
}

function drawLine(lineArray) {
  ctx.beginPath();
  lineArray.forEach(function(el, i) {
    if (i === 0) {
	    ctx.moveTo(el.x, el.y);
    } else {
	    ctx.lineTo(el.x, el.y);
		}  
	});
	ctx.lineTo(canvas.width, canvas.height);
	ctx.lineTo(0, canvas.height);
	ctx.fillStyle = "black";
	ctx.fill();
}

function initPoints() {
	points = [];
	points.push({x: 0, y: canvas.height / 2 + 20}); 
	points.push({x: canvas.width, y: canvas.height / 2 - 200}); 
	iterateSegment(4);
}

var points = [];
initPoints();

function run() {
  drawBackground();
  drawLine(points);
  window.requestAnimationFrame(run);
}

run();
