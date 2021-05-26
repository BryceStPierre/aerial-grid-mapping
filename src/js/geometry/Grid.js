import Point from "./Point";
import Line from "./Line";
import Rectangle from "./Rectangle";
import Polygon from "./Polygon";

/** Class representing a grid on the Cartesian plane. */
export default class Grid {
  /**
   * @param {number} graphWidth
   * @param {number} graphHeight
   * @param {number} unitSize
   * @param {Line} initialLine
   */
  constructor(graphWidth, graphHeight, unitSize, line1) {
    this._unitSize = unitSize;
    this._bounds = new Rectangle(graphWidth, graphHeight);

    const u = unitSize * Math.sqrt(Math.pow(line1.slope, 2) + 1);

    let p1 = new Point(0, line1.yIntercept);
    let p2 = new Point(0, line1.yIntercept - u);
    let line2 = new Line(line1.slope, p2);
    let line3 = new Line(line1.inverseSlope, p1);

    let p3 = line2.pointOfIntersectionWith(line3);
    let p4 = p1.rotate90DegreesClockwiseAbout(p3);
    let line4 = new Line(line1.inverseSlope, p4);

    const v = line4.yIntercept - line3.yIntercept;

    this._positiveSet = [line1];
    this._negativeSet = [line3];

    let positiveLowerLimit = new Line(line1.slope, new Point(graphWidth, 0));
    let positiveUpperLimit = new Line(line1.slope, new Point(0, graphHeight));

    let nextYIntercept = line1.yIntercept - u;
    while (nextYIntercept > positiveLowerLimit.yIntercept) {
      this._positiveSet.push(new Line(line1.slope, nextYIntercept));
      nextYIntercept -= u;
    }

    nextYIntercept = line1.yIntercept + u;
    while (nextYIntercept < positiveUpperLimit.yIntercept) {
      this._positiveSet.unshift(new Line(line1.slope, nextYIntercept));
      nextYIntercept += u;
    }

    let negativeLowerLimit = new Line(line1.slope, new Point(0, 0));
    let negativeUpperLimit = new Line(
      line1.slope,
      new Point(graphWidth, graphHeight)
    );

    nextYIntercept = line3.yIntercept - v;
    while (nextYIntercept > negativeLowerLimit.yIntercept) {
      this._negativeSet.unshift(new Line(line3.slope, nextYIntercept));
      nextYIntercept -= v;
    }

    nextYIntercept = line3.yIntercept + v;
    while (nextYIntercept < negativeUpperLimit.yIntercept) {
      this._negativeSet.push(new Line(line3.slope, nextYIntercept));
      nextYIntercept += v;
    }

    // Uncomment to use this class without a constraint.
    // this.setConstraint(this._bounds.asPolygon());
  }

  /**
   * @param {Polygon} constraint 
   */
  setConstraint(constraint) {
    this._units = [];

    for (let i = 0; i + 1 <= this._positiveSet.length - 1; i++) {
      for (let j = 0; j + 1 <= this._negativeSet.length - 1; j++) {
        let unit = new Polygon([
          this._positiveSet[i].pointOfIntersectionWith(this._negativeSet[j]),
          this._positiveSet[i + 1].pointOfIntersectionWith(this._negativeSet[j]),
          this._positiveSet[i + 1].pointOfIntersectionWith(this._negativeSet[j + 1]),
          this._positiveSet[i].pointOfIntersectionWith(this._negativeSet[j + 1])
        ]);

        if (this._bounds.containsPolygon(unit) && constraint.containsPolygon(unit)) {
          this._units.push({
            row: i,
            column: j,
            polygon: unit
          });
        }
      }
    }
  }

  /**
   * @param {number} graphHeight 
   * @returns {JSON}
   */
  asGraphic(graphHeight) {
    return {
      "lines": this._positiveSet.concat(this._negativeSet).map(l => {
        let points = [
          l.pointAtX(0),
          l.pointAtX(this._bounds.width),
          l.pointAtY(0),
          l.pointAtY(this._bounds.height)
        ];
        let xValues = points
          .filter(p => this._bounds.containsPoint(p))
          .map(p => p.x);
        return l.asGraphic(xValues[0], xValues[1], this._bounds.height);
      }),
      "units": this._units.map(u => {
        let unit = u;
        unit.polygon = u.polygon.asGraphic(graphHeight);
        return unit;
      })
    }
  }
}
