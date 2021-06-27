import { ContinuousScale } from "./continuous_scale";
import { ScreenArray } from "../../core/types";
export class LogScale extends ContinuousScale {
    constructor(attrs) {
        super(attrs);
    }
    get s_compute() {
        const [factor, offset, inter_factor, inter_offset] = this._compute_state();
        return (x) => {
            if (inter_factor == 0)
                return 0;
            else {
                const _x = (Math.log(x) - inter_offset) / inter_factor;
                return isFinite(_x) ? _x * factor + offset : NaN;
            }
        };
    }
    compute(x) {
        const [factor, offset, inter_factor, inter_offset] = this._compute_state();
        let value;
        if (inter_factor == 0)
            value = 0;
        else {
            const _x = (Math.log(x) - inter_offset) / inter_factor;
            if (isFinite(_x))
                value = _x * factor + offset;
            else
                value = NaN;
        }
        return value;
    }
    v_compute(xs) {
        const [factor, offset, inter_factor, inter_offset] = this._compute_state();
        const result = new ScreenArray(xs.length);
        if (inter_factor == 0) {
            for (let i = 0; i < xs.length; i++)
                result[i] = 0;
        }
        else {
            for (let i = 0; i < xs.length; i++) {
                const _x = (Math.log(xs[i]) - inter_offset) / inter_factor;
                let value;
                if (isFinite(_x))
                    value = _x * factor + offset;
                else
                    value = NaN;
                result[i] = value;
            }
        }
        return result;
    }
    invert(xprime) {
        const [factor, offset, inter_factor, inter_offset] = this._compute_state();
        const value = (xprime - offset) / factor;
        return Math.exp(inter_factor * value + inter_offset);
    }
    v_invert(xprimes) {
        const [factor, offset, inter_factor, inter_offset] = this._compute_state();
        const result = new Float64Array(xprimes.length);
        for (let i = 0; i < xprimes.length; i++) {
            const value = (xprimes[i] - offset) / factor;
            result[i] = Math.exp(inter_factor * value + inter_offset);
        }
        return result;
    }
    _get_safe_factor(orig_start, orig_end) {
        let start = orig_start < 0 ? 0 : orig_start;
        let end = orig_end < 0 ? 0 : orig_end;
        if (start == end) {
            if (start == 0)
                [start, end] = [1, 10];
            else {
                const log_val = Math.log(start) / Math.log(10);
                start = 10 ** Math.floor(log_val);
                if (Math.ceil(log_val) != Math.floor(log_val))
                    end = 10 ** Math.ceil(log_val);
                else
                    end = 10 ** (Math.ceil(log_val) + 1);
            }
        }
        return [start, end];
    }
    /*protected*/ _compute_state() {
        const source_start = this.source_range.start;
        const source_end = this.source_range.end;
        const target_start = this.target_range.start;
        const target_end = this.target_range.end;
        const screen_range = target_end - target_start;
        const [start, end] = this._get_safe_factor(source_start, source_end);
        let inter_factor;
        let inter_offset;
        if (start == 0) {
            inter_factor = Math.log(end);
            inter_offset = 0;
        }
        else {
            inter_factor = Math.log(end) - Math.log(start);
            inter_offset = Math.log(start);
        }
        const factor = screen_range;
        const offset = target_start;
        return [factor, offset, inter_factor, inter_offset];
    }
}
LogScale.__name__ = "LogScale";
//# sourceMappingURL=log_scale.js.map