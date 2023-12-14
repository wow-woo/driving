class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  addPoint(point) {
    this.points.push(point);
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  addSegment(seg) {
    this.segments.push(seg);
  }

  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  tryAddSegment(seg) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  isFullSegment() {
    const getPath = (number_points) => {
      if (number_points == 1) {
        return number_points;
      }
      return number_points * getPath(number_points - 1);
    };

    const n = this.points.length;
    const all_seg = Math.floor(getPath(n) / (getPath(n - 2) * 2));
    console.log("p", this.segments.length, "s", all_seg);
    return this.segments.length >= all_seg;
  }

  isFullPoint() {
    return this.points.length >= ctx.width * ctx.height;
  }

  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  removePoint(point) {
    const segs = this.getSegmentWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }

    return this.points.splice(this.points.indexOf(point), 1);
  }

  getSegmentWithPoint(point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }

    return segs;
  }
}
