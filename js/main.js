myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p2, p3);

const points = [p1, p2, p3, p4];
const segments = [s1, s2, s3, s4];

const graph = new Graph(points, segments);
graph.draw(ctx);

function addRandomPoint() {
  if (graph.isFullPoint()) {
    console.log("all possible point added");
    return;
  }

  const success = graph.tryAddPoint(
    new Point(Math.random() * myCanvas.width, Math.random() * myCanvas.height)
  );

  if (!success) {
    return addRandomPoint();
  }

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
}

function addRandomSegment() {
  if (graph.isFullSegment()) {
    console.log("all possible segments added");
    return;
  }

  const index1 = Math.floor(Math.random() * graph.points.length);
  const index2 = Math.floor(Math.random() * graph.points.length);

  if (index1 == index2) {
    return addRandomSegment();
  }

  const success = graph.tryAddSegment(
    new Segment(graph.points[index1], graph.points[index2])
  );

  if (success) {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
  } else {
    return addRandomSegment();
  }
}

function removeRandomSegment() {
  if (graph.segments.length == 0) {
    console.log("No segment now");
    return;
  }

  const index = Math.floor(Math.random() * graph.segments.length);
  graph.removeSegment(graph.segments[index]);

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
}

function removeRandomPoint() {
  if (graph.points.length == 0) {
    console.log("No points now");
    return;
  }

  const index = Math.floor(Math.random() * graph.points.length);
  graph.removePoint(graph.points[index]);

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
}

function removeAll() {
  graph.dispose();

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
}
