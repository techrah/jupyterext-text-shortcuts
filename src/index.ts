import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { CodeMirrorEditor } from '@jupyterlab/codemirror';
import { INotebookTracker } from '@jupyterlab/notebook';
import { IEditorTracker } from '@jupyterlab/fileeditor';

const insertText = (tracker: INotebookTracker) => (args: any) => {
  let widget = tracker.currentWidget;
  if (widget) {
    let text: string = args['text'] as string || '';
    const editor = widget.content.activeCell.editor as CodeMirrorEditor;
    const doc = editor.doc;
    const selectionBefore = doc.getSelection();
    const from = doc.getCursor("from");
    const to = doc.getCursor("to");
    const anchor = doc.getCursor("anchor");
    const lineLength = doc.getLine(anchor.line).length;
    doc.extendSelection({ ...from, ch: from.ch - 1 }, { ...to, ch: to.ch + 1 });
    const selectionAfter = doc.getSelection();
    text = ` ${text} `;
    let replacementText;
    if(selectionBefore.length === 0) {
      if (anchor.ch == 0) replacementText = `${text}${selectionAfter}`;
      else if (anchor.ch == lineLength) replacementText = `${selectionAfter}${text}`;
      else replacementText = `${selectionAfter.charAt(0)}${text}${selectionAfter.charAt(1)}`;
    } else {
      replacementText = selectionAfter.replace(selectionBefore, text);
    }
    replacementText = replacementText.replace(/^[ ]([ ].*)$/, "$1");
    replacementText = replacementText.replace(/^(.*[ ])[ ]$/, "$1");
    doc.replaceSelection(replacementText);
  }
};

const handleActivation = (app: JupyterFrontEnd, tracker: INotebookTracker) => {
  tracker.currentChanged.connect(tracker => {
    app.commands.addCommand("text-shortcuts:insert-text", {
      label: 'Insert Text',
      execute: insertText(tracker),
    });
  });
};

/**
 * text-shortcuts extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'text-shortcuts',
  autoStart: true,
  requires: [INotebookTracker, IEditorTracker],
  activate: handleActivation,
};

export default extension;
