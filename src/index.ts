import { get } from "lodash/fp";
import CodeMirror from "codemirror";
import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin,
} from "@jupyterlab/application";
import { INotebookTracker } from "@jupyterlab/notebook";
import { getPaddedTextToInsert } from "./utils";

const PLUGIN_ID = "@techrah/text-shortcuts:plugin";

const insertText = (tracker: INotebookTracker) => (args: any) => {
    const widget = tracker.currentWidget;
    if (!widget) return;

    // If a kernel name is specified in args, compare with current kernel name.
    const kernel = get("sessionContext.session.kernel", widget);
    if (args.kernel && kernel.name !== args.kernel) return;

    const doc = get("content.activeCell.editor.doc", widget) as CodeMirror.Doc;
    if (!doc) return;

    const { text, autoPad } = args;
    const insertionText = autoPad ? getPaddedTextToInsert(doc, text) : text;

    doc.replaceSelection(insertionText);
};

const handleActivation = (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    app.commands.addCommand("text-shortcuts:insert-text", {
        label: "Insert Text",
        execute: insertText(tracker),
    });
};

/**
 * text-shortcuts extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
    id: PLUGIN_ID,
    autoStart: true,
    requires: [INotebookTracker],
    activate: handleActivation,
};

export default extension;
