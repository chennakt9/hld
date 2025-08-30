class Point {
  constructor(public x: number, public y: number, public data?: any) {}
}

class Rectangle {
  constructor(public x: number, public y: number, public w: number, public h: number) {}

  contains(p: Point): boolean {
    return (
      p.x >= this.x - this.w &&
      p.x < this.x + this.w &&
      p.y >= this.y - this.h &&
      p.y < this.y + this.h
    );
  }

  intersects(range: Rectangle): boolean {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class Quadtree {
  points: Point[] = [];
  divided = false;
  northeast?: Quadtree;
  northwest?: Quadtree;
  southeast?: Quadtree;
  southwest?: Quadtree;

  constructor(public boundary: Rectangle, public capacity: number) {}

  subdivide() {
    const { x, y, w, h } = this.boundary;

    const ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    const nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    const sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);

    this.northeast = new Quadtree(ne, this.capacity);
    this.northwest = new Quadtree(nw, this.capacity);
    this.southeast = new Quadtree(se, this.capacity);
    this.southwest = new Quadtree(sw, this.capacity);

    this.divided = true;

    // ⚠️ Reinsert existing points into children
    for (let p of this.points) {
      this.northeast.insert(p) ||
      this.northwest.insert(p) ||
      this.southeast.insert(p) ||
      this.southwest.insert(p);
    }

    this.points = []; // Clear the current node’s points
  }

  insert(point: Point): boolean {
    if (!this.boundary.contains(point)) return false;

    if (this.points.length < this.capacity && !this.divided) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (
      this.northeast!.insert(point) ||
      this.northwest!.insert(point) ||
      this.southeast!.insert(point) ||
      this.southwest!.insert(point)
    );
  }

  query(range: Rectangle, found: Point[] = []): Point[] {
    if (!this.boundary.intersects(range)) return found;

    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }

    if (this.divided) {
      this.northwest!.query(range, found);
      this.northeast!.query(range, found);
      this.southwest!.query(range, found);
      this.southeast!.query(range, found);
    }

    return found;
  }
}
