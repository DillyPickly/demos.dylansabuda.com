import { Program, VertexBuffer, IndexBuffer } from "./utils";
import { BaseGLGlyph, Transform } from "./base";
import { LineView } from "../line";
export declare class LineGL extends BaseGLGlyph {
    readonly glyph: LineView;
    protected prog: Program;
    protected index_buffer: IndexBuffer;
    protected vbo_position: VertexBuffer;
    protected vbo_tangents: VertexBuffer;
    protected vbo_segment: VertexBuffer;
    protected vbo_angles: VertexBuffer;
    protected vbo_texcoord: VertexBuffer;
    private dash_atlas;
    protected _scale_aspect: number;
    protected I_triangles: Float32Array | Uint32Array;
    protected V_position: Float32Array;
    protected V_angles: Float32Array;
    protected V_tangents: Float32Array;
    protected V_texcoord: Float32Array;
    protected V_segment: Float32Array;
    protected tangents: Float32Array;
    protected _baked_offset: [number, number];
    protected cumsum: number;
    constructor(gl: WebGLRenderingContext, glyph: LineView);
    draw(indices: number[], mainGlyph: LineView, trans: Transform): void;
    protected _set_data(): void;
    protected _set_visuals(): void;
    protected _bake(): void;
    protected _update_scale(sx: number, sy: number): void;
}
//# sourceMappingURL=line.d.ts.map