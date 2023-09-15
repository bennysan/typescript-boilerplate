import Canvas from "../../canvas";
import { drawText } from "../../utils/basic-drawing/draw";
import { lerp } from "../../utils/lerp";
import Vector2 from "../../utils/vector2";
import Rectangle from "../rectangle";

export default class Timeline {
  canvas: Canvas;
  start: Date;
  now: Date;
  months: Month[];
  duration: number;

  tickSize: Vector2;
  spacing: number;
  radius: number;
  origin: Vector2;

  windowSpan: number;
  windowOffset: number;
  windowTarget: number;
  visibleMonths: Month[];
  forwardStagedMonths: Month[];
  backStagedMonths: Month[];
  constructor(canvas: Canvas) {
    this.start = new Date("1996-11-20");
    this.now = new Date(Date.now());
    this.months = [];
    this.duration =
      (this.now.getFullYear() - this.start.getFullYear()) * 12 +
      (this.now.getMonth() - this.start.getMonth());
    this.windowSpan = 12 * 4;
    this.windowOffset = 0;
    this.windowTarget = 0;
    this.visibleMonths = [];
    this.forwardStagedMonths = [];
    this.backStagedMonths = [];

    this.canvas = canvas;
    this.tickSize = new Vector2(1.5, 50);
    this.origin = new Vector2(
      canvas.getCanvas().width / 2,
      canvas.getCanvas().height * 0.76
    );

    this.build();
    this.setVisibleMonth();
    this.initVisibleMonths();
  }

  build() {
    let currentYear: number = this.start.getFullYear();
    let currentMonth: number = this.start.getMonth();

    for (let i = 0; i < this.duration; i++) {
      this.months.push(new Month(currentYear, this.getMonthName(currentMonth)));

      currentMonth += 1;

      if (currentMonth >= 12) {
        currentYear += 1;
        currentMonth = 0;
      }
    }
  }

  getMonthName(index: number): string {
    const monthNames: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return monthNames[index];
  }
  update() {
    this.visibleMonths.forEach((month) => month.element.update());
    this.forwardStagedMonths.forEach((month) => month.element.update());
    this.backStagedMonths.forEach((month) => month.element.update());
    if (Math.abs(this.windowTarget - this.windowOffset) > 0.001)
      this.windowOffset = lerp(this.windowOffset, this.windowTarget, 0.01);
  }

  draw() {
    const ctx = this.canvas.getContext();
    this.visibleMonths.forEach((month) => {
      month.element.draw(ctx);

      // drawText(
      //   this.canvas.getContext(),
      //   `${String(month.element.rotation).slice(0, 4)}`,
      //   new Vector2(
      //     month.element.position.x +
      //       Math.cos(month.element.rotation + Math.PI / 2) *
      //         (month.element.origin.y * this.tickSize.y) *
      //         1.5,
      //     month.element.position.y +
      //       Math.sin(month.element.rotation + Math.PI / 2) *
      //         (month.element.origin.y * this.tickSize.y) *
      //         1.5
      //   )
      // );
    });
    // this.forwardStagedMonths[0].element.draw(ctx)
  }

  setVisibleMonth() {
    // Calculate indices for slicing the months array
    const startIndex: number = Math.max(
      0,
      -this.windowSpan / 2 + this.windowOffset
    );
    const additionalEndMonths: number = Math.abs(
      Math.min(0, -this.windowSpan / 2 + this.windowOffset)
    );
    const endIndex: number =
      this.windowSpan / 2 + this.windowOffset + additionalEndMonths;

    // Update the visibleMonths array based on the calculated indices
    this.visibleMonths = [...this.months.slice(startIndex, endIndex)];
    this.backStagedMonths = [...this.months.slice(0, startIndex)];
    this.forwardStagedMonths = [
      ...this.months.slice(endIndex, this.duration - 1)
    ];
  }

  initVisibleMonths(): void {
    const fadeFactor = 2;
    const minorTickSize = this.tickSize.y * 0.6;
    const { width, height } = this.canvas.getCanvas();

    const b_t = lerp(0, Math.PI, -2 / this.windowSpan);
    const f_t = lerp(0, Math.PI, (this.windowSpan / 2 + 1) / this.windowSpan);
    // this.backStagedMonths.forEach((month) => {
    //   month.element.rotation = b_t;
    //   month.element.build();
    // });
    this.forwardStagedMonths.forEach((month) => {
      month.element.rotation = f_t;
      month.element.build();
    });
    for (let i = 0; i < this.windowSpan; i++) {
      const month: Month = this.visibleMonths[i]; // Ensure Month is a class or interface you've defined
      const t: number = i / this.windowSpan;
      const isJan: boolean = month?.month === "Jan";
      const tickHeight: number = isJan ? this.tickSize.y : minorTickSize;
      const element = month?.element; // Assuming element is defined in your Month class
      const additionalAngle: number =
        (Math.abs(Math.min(0, -this.windowSpan / 2 + this.windowOffset)) /
          (this.windowSpan / 2)) *
        (Math.PI / 2);

      // Check for undefined before accessing properties
      if (!element) continue;

      element.position.set(this.origin.x, this.origin.y + 200);
      element.width = this.tickSize.x;
      element.height = tickHeight;

      const dir = new Vector2(
        element.position.x - this.origin.x,
        element.position.y - this.origin.y
      );
      element.origin.set(0.5, -dir.y / tickHeight);
      element.rotate(lerp(0, Math.PI, t) + additionalAngle);
      element.showRay = isJan;
      element.build();

      // Determine fill color based on position within the window
      // const fadeValue = i > this.windowSpan / 2 ? 1 - t : t;
      // const fadeValue: number =
      //   element.rotation > 0 && element.rotation < Math.PI * fadeFactor
      //     ? element.rotation / Math.PI
      //     : 1;
      if (element.rotation < 0) {
        element.setFillColor(
          `rgba(255,255,255,${lerp(
            1,
            0.01,
            -element.rotation / (Math.PI * 0.5)
          )}`
        );
      }

      if (element.rotation > 0) {
        element.setFillColor(
          `rgba(255,255,255,${lerp(
            0.01,
            1,
            1 - element.rotation / (Math.PI * 0.5)
          )}`
        );
      }
      // element.setFillColor(
      //   `rgba(255,255,255,${lerp(0.01, 1, fadeValue * fadeFactor)}`
      // );
    }
  }
}

export class Month {
  element: Rectangle;
  year: number;
  month: string;
  constructor(year: number, month: string) {
    this.year = year;
    this.month = month;
    this.element = new Rectangle(new Vector2(0, 0), 0, 0);
  }
}
