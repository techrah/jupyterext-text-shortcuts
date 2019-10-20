import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  CodeMirrorEditor,
} from '@jupyterlab/codemirror';

import { INotebookTracker } from '@jupyterlab/notebook';
import { IEditorTracker } from '@jupyterlab/fileeditor';

/**
 * Initialization data for the text-shortcuts extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'text-shortcuts',
  autoStart: true,
  requires: [INotebookTracker, IEditorTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    tracker.currentChanged.connect(tracker => {
      app.commands.addCommand("text-shortcuts:insert-text", {
        label: 'Insert Text',
        execute: args => {
          let widget = tracker.currentWidget;
          if (widget) {
            const text: string = args['text'] as string || '';
            let editor = widget.content.activeCell.editor as CodeMirrorEditor;
            editor.doc.replaceSelection(text);
          }
        },
      });
    })
  }
};

export default extension;
