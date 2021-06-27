import { View } from "../view";
import { CanvasLayer } from "../util/canvas";
import * as p from "../properties";
export interface Renderable {
    request_render(): void;
    readonly canvas: {
        create_layer(): CanvasLayer;
    };
}
export declare abstract class VisualProperties {
    readonly obj: View & Renderable;
    readonly prefix: string;
    /** @prototype */
    type: string;
    attrs: string[];
    private readonly _props;
    [Symbol.iterator](): Generator<p.Property<unknown>, void, undefined>;
    constructor(obj: View & Renderable, prefix?: string);
    abstract get doit(): boolean;
    update(): void;
}
export declare abstract class VisualUniforms {
    readonly obj: View & Renderable;
    readonly prefix: string;
    /** @prototype */
    type: string;
    attrs: string[];
    [Symbol.iterator](): Generator<p.Property<unknown>, void, undefined>;
    constructor(obj: View & Renderable, prefix?: string);
    abstract get doit(): boolean;
    update(): void;
}
//# sourceMappingURL=visual.d.ts.map