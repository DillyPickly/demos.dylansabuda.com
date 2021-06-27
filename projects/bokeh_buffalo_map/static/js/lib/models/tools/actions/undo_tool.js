import { ActionTool, ActionToolView } from "./action_tool";
import { tool_icon_undo } from "../../../styles/icons.css";
export class UndoToolView extends ActionToolView {
    connect_signals() {
        super.connect_signals();
        this.connect(this.plot_view.state.changed, () => this.model.disabled = !this.plot_view.state.can_undo);
    }
    doit() {
        this.plot_view.state.undo();
    }
}
UndoToolView.__name__ = "UndoToolView";
export class UndoTool extends ActionTool {
    constructor(attrs) {
        super(attrs);
        this.tool_name = "Undo";
        this.icon = tool_icon_undo;
    }
    static init_UndoTool() {
        this.prototype.default_view = UndoToolView;
        this.override({
            disabled: true,
        });
        this.register_alias("undo", () => new UndoTool());
    }
}
UndoTool.__name__ = "UndoTool";
UndoTool.init_UndoTool();
//# sourceMappingURL=undo_tool.js.map