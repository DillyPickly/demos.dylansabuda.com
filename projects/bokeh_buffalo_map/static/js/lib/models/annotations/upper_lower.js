import { DataAnnotation, DataAnnotationView } from "./data_annotation";
import { Dimension } from "../../core/enums";
import * as p from "../../core/properties";
export class UpperLowerView extends DataAnnotationView {
    map_data() {
        const { frame } = this.plot_view;
        const dim = this.model.dimension;
        const xscale = this.coordinates.x_scale;
        const yscale = this.coordinates.y_scale;
        const limit_scale = dim == "height" ? yscale : xscale;
        const base_scale = dim == "height" ? xscale : yscale;
        const limit_view = dim == "height" ? frame.bbox.yview : frame.bbox.xview;
        const base_view = dim == "height" ? frame.bbox.xview : frame.bbox.yview;
        let _lower_sx;
        if (this.model.properties.lower.units == "data")
            _lower_sx = limit_scale.v_compute(this._lower);
        else
            _lower_sx = limit_view.v_compute(this._lower);
        let _upper_sx;
        if (this.model.properties.upper.units == "data")
            _upper_sx = limit_scale.v_compute(this._upper);
        else
            _upper_sx = limit_view.v_compute(this._upper);
        let _base_sx;
        if (this.model.properties.base.units == "data")
            _base_sx = base_scale.v_compute(this._base);
        else
            _base_sx = base_view.v_compute(this._base);
        const [i, j] = dim == 'height' ? [1, 0] : [0, 1];
        const _lower = [_lower_sx, _base_sx];
        const _upper = [_upper_sx, _base_sx];
        this._lower_sx = _lower[i];
        this._lower_sy = _lower[j];
        this._upper_sx = _upper[i];
        this._upper_sy = _upper[j];
    }
}
UpperLowerView.__name__ = "UpperLowerView";
export class XOrYCoordinateSpec extends p.CoordinateSpec {
    get dimension() {
        return this.obj.dimension == "width" ? "x" : "y";
    }
    // XXX: a hack to make a coordinate & unit spec
    get units() {
        return this.spec.units ?? "data";
    }
}
XOrYCoordinateSpec.__name__ = "XOrYCoordinateSpec";
export class UpperLower extends DataAnnotation {
    constructor(attrs) {
        super(attrs);
    }
    static init_UpperLower() {
        this.define(() => ({
            dimension: [Dimension, "height"],
            lower: [XOrYCoordinateSpec, { field: "lower" }],
            upper: [XOrYCoordinateSpec, { field: "upper" }],
            base: [XOrYCoordinateSpec, { field: "base" }],
        }));
    }
}
UpperLower.__name__ = "UpperLower";
UpperLower.init_UpperLower();
//# sourceMappingURL=upper_lower.js.map