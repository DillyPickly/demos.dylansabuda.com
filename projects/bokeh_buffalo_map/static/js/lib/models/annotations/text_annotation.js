import { Annotation, AnnotationView } from "./annotation";
import { div, display, undisplay, remove } from "../../core/dom";
import { RenderMode } from "../../core/enums";
import { SideLayout } from "../../core/layout/side_panel";
import { font_metrics } from "../../core/util/text";
import { assert, unreachable } from "../../core/util/assert";
export class TextAnnotationView extends AnnotationView {
    update_layout() {
        const { panel } = this;
        if (panel != null)
            this.layout = new SideLayout(panel, () => this.get_size(), true);
        else
            this.layout = undefined;
    }
    initialize() {
        super.initialize();
        if (this.model.render_mode == 'css') {
            this.el = div();
            this.plot_view.canvas_view.add_overlay(this.el);
        }
    }
    remove() {
        if (this.el != null)
            remove(this.el);
        super.remove();
    }
    connect_signals() {
        super.connect_signals();
        if (this.model.render_mode == 'css') {
            // dispatch CSS update immediately
            this.connect(this.model.change, () => this.render());
        }
        else {
            this.connect(this.model.change, () => this.request_render());
        }
    }
    render() {
        if (!this.model.visible && this.model.render_mode == "css")
            undisplay(this.el);
        super.render();
    }
    _calculate_text_dimensions(ctx, text) {
        const { width } = ctx.measureText(text);
        const { height } = font_metrics(this.visuals.text.font_value());
        return [width, height];
    }
    _calculate_bounding_box_dimensions(ctx, text) {
        const [width, height] = this._calculate_text_dimensions(ctx, text);
        let x_offset;
        switch (ctx.textAlign) {
            case 'left':
                x_offset = 0;
                break;
            case 'center':
                x_offset = -width / 2;
                break;
            case 'right':
                x_offset = -width;
                break;
            default:
                unreachable();
        }
        // guestimated from https://www.w3.org/TR/2dcontext/#dom-context-2d-textbaseline
        let y_offset;
        switch (ctx.textBaseline) {
            case 'top':
                y_offset = 0.0;
                break;
            case 'middle':
                y_offset = -0.5 * height;
                break;
            case 'bottom':
                y_offset = -1.0 * height;
                break;
            case 'alphabetic':
                y_offset = -0.8 * height;
                break;
            case 'hanging':
                y_offset = -0.17 * height;
                break;
            case 'ideographic':
                y_offset = -0.83 * height;
                break;
            default:
                unreachable();
        }
        return [x_offset, y_offset, width, height];
    }
    _canvas_text(ctx, text, sx, sy, angle) {
        this.visuals.text.set_value(ctx);
        const bbox_dims = this._calculate_bounding_box_dimensions(ctx, text);
        ctx.save();
        ctx.beginPath();
        ctx.translate(sx, sy);
        if (angle)
            ctx.rotate(angle);
        ctx.rect(bbox_dims[0], bbox_dims[1], bbox_dims[2], bbox_dims[3]);
        if (this.visuals.background_fill.doit) {
            this.visuals.background_fill.set_value(ctx);
            ctx.fill();
        }
        if (this.visuals.border_line.doit) {
            this.visuals.border_line.set_value(ctx);
            ctx.stroke();
        }
        if (this.visuals.text.doit) {
            this.visuals.text.set_value(ctx);
            ctx.fillText(text, 0, 0);
        }
        ctx.restore();
    }
    _css_text(ctx, text, sx, sy, angle) {
        const { el } = this;
        assert(el != null);
        undisplay(el);
        this.visuals.text.set_value(ctx);
        const [x, y] = this._calculate_bounding_box_dimensions(ctx, text);
        el.style.position = "absolute";
        el.style.left = `${sx + x}px`;
        el.style.top = `${sy + y}px`;
        el.style.color = ctx.fillStyle;
        el.style.font = ctx.font;
        el.style.lineHeight = "normal"; // needed to prevent ipynb css override
        if (angle) {
            el.style.transform = `rotate(${angle}rad)`;
        }
        if (this.visuals.background_fill.doit) {
            this.visuals.background_fill.set_value(ctx);
            el.style.backgroundColor = ctx.fillStyle;
        }
        if (this.visuals.border_line.doit) {
            this.visuals.border_line.set_value(ctx);
            // attempt to support vector-style ("8 4 8") line dashing for css mode
            el.style.borderStyle = ctx.lineDash.length < 2 ? "solid" : "dashed";
            el.style.borderWidth = `${ctx.lineWidth}px`;
            el.style.borderColor = ctx.strokeStyle;
        }
        el.textContent = text;
        display(el);
    }
}
TextAnnotationView.__name__ = "TextAnnotationView";
export class TextAnnotation extends Annotation {
    constructor(attrs) {
        super(attrs);
    }
    static init_TextAnnotation() {
        this.define(() => ({
            render_mode: [RenderMode, "canvas"],
        }));
    }
}
TextAnnotation.__name__ = "TextAnnotation";
TextAnnotation.init_TextAnnotation();
//# sourceMappingURL=text_annotation.js.map