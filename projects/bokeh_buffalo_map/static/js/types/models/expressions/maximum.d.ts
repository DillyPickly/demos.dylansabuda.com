import { ColumnarDataSource } from "../sources/columnar_data_source";
import { ScalarExpression } from "./expression";
import * as p from "../../core/properties";
export declare namespace Maximum {
    type Attrs = p.AttrsOf<Props>;
    type Props = ScalarExpression.Props & {
        field: p.Property<string>;
        initial: p.Property<number | null>;
    };
}
export interface Maximum extends Maximum.Attrs {
}
export declare class Maximum extends ScalarExpression<number> {
    properties: Maximum.Props;
    constructor(attrs?: Partial<Maximum.Attrs>);
    static init_Maximum(): void;
    protected _compute(source: ColumnarDataSource): number;
}
//# sourceMappingURL=maximum.d.ts.map