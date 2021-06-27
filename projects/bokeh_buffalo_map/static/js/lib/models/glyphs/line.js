import { XYGlyph, XYGlyphView } from "./xy_glyph";
import { generic_line_scalar_legend, line_interpolation } from "./utils";
import { LineGL } from "./webgl/line";
import * as mixins from "../../core/property_mixins";
import * as hittest from "../../core/hittest";
import { Selection } from "../selections/selection";
export class LineView extends XYGlyphView {
    initialize() {
        super.initialize();
        const { webgl } = this.renderer.plot_view.canvas_view;
        if (webgl != null) {
            this.glglyph = new LineGL(webgl.gl, this);
        }
    }
    _render(ctx, indices, data) {
        const { sx, sy } = data ?? this;
        let move = true;
        ctx.beginPath();
        for (const i of indices) {
            const sx_i = sx[i];
            const sy_i = sy[i];
            if (!isFinite(sx_i + sy_i))
                move = true;
            else {
                if (move) {
                    ctx.moveTo(sx_i, sy_i);
                    move = false;
                }
                else
                    ctx.lineTo(sx_i, sy_i);
            }
        }
        this.visuals.line.set_value(ctx);
        ctx.stroke();
    }
    _hit_point(geometry) {
        /* Check if the point geometry hits this line glyph and return an object
        that describes the hit result:
          Args:
            * geometry (object): object with the following keys
              * sx (float): screen x coordinate of the point
              * sy (float): screen y coordinate of the point
              * type (str): type of geometry (in this case it's a point)
        */
        const result = new Selection();
        const point = { x: geometry.sx, y: geometry.sy };
        let shortest = 9999;
        const threshold = Math.max(2, this.line_width.value / 2);
        for (let i = 0, end = this.sx.length - 1; i < end; i++) {
            const p0 = { x: this.sx[i], y: this.sy[i] };
            const p1 = { x: this.sx[i + 1], y: this.sy[i + 1] };
            const dist = hittest.dist_to_segment(point, p0, p1);
            if (dist < threshold && dist < shortest) {
                shortest = dist;
                result.add_to_selected_glyphs(this.model);
                result.view = this;
                result.line_indices = [i];
            }
        }
        return result;
    }
    _hit_span(geometry) {
        const { sx, sy } = geometry;
        const result = new Selection();
        let val;
        let values;
        if (geometry.direction == 'v') {
            val = this.renderer.yscale.invert(sy);
            values = this._y;
        }
        else {
            val = this.renderer.xscale.invert(sx);
            values = this._x;
        }
        for (let i = 0, end = values.length - 1; i < end; i++) {
            if ((values[i] <= val && val <= values[i + 1]) || (values[i + 1] <= val && val <= values[i])) {
                result.add_to_selected_glyphs(this.model);
                result.view = this;
                result.line_indices.push(i);
            }
        }
        return result;
    }
    get_interpolation_hit(i, geometry) {
        const [x2, y2, x3, y3] = [this._x[i], this._y[i], this._x[i + 1], this._y[i + 1]];
        return line_interpolation(this.renderer, geometry, x2, y2, x3, y3);
    }
    draw_legend_for_index(ctx, bbox, _index) {
        generic_line_scalar_legend(this.visuals, ctx, bbox);
    }
}
LineView.__name__ = "LineView";
export class Line extends XYGlyph {
    constructor(attrs) {
        super(attrs);
    }
    static init_Line() {
        this.prototype.default_view = LineView;
        this.mixins(mixins.LineScalar);
    }
}
Line.__name__ = "Line";
Line.init_Line();
//# sourceMappingURL=line.js.map