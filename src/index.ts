import { get } from 'lodash/fp';
import CodeMirror from 'codemirror';
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';

const insertText = (tracker: INotebookTracker) => (args: any) => {
  const widget = tracker.currentWidget;
  if (!widget) return;

  const doc = get("content.activeCell.editor.doc", widget) as CodeMirror.Doc;
  if (!doc) return;

  const selectionBefore = doc.getSelection();
  const from = doc.getCursor("from");
  const to = doc.getCursor("to");
  const anchor = doc.getCursor("anchor");
  const lineLength = doc.getLine(anchor.line).length;

  const { text, autoPad } = args;
  const textToInsert = autoPad ? ` ${text} ` : text;

  if (autoPad)
    doc.extendSelection({ ...from, ch: from.ch - 1 }, { ...to, ch: to.ch + 1 });

  // Determine replacementText by adjust padding based on text selection
  const selectionAfter = doc.getSelection();
  let replacementText;
  if(selectionBefore.length === 0) {
    if (anchor.ch == 0) replacementText = `${textToInsert}${selectionAfter}`;
    else if (anchor.ch == lineLength) replacementText = `${selectionAfter}${textToInsert}`;
    else replacementText = `${selectionAfter.charAt(0)}${textToInsert}${selectionAfter.charAt(1)}`;
  } else {
    replacementText = selectionAfter.replace(selectionBefore, textToInsert);
  }
  replacementText = replacementText.replace(/^[ ]([ ].*)$/, "$1");
  replacementText = replacementText.replace(/^(.*[ ])[ ]$/, "$1");

  doc.replaceSelection(replacementText);
};

const handleActivation = (app: JupyterFrontEnd, tracker: INotebookTracker) => {
  app.commands.addCommand("text-shortcuts:insert-text", {
    label: 'Insert Text',
    execute: insertText(tracker),
  });
};

/**
 * text-shortcuts extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'text-shortcuts',
  autoStart: true,
  requires: [INotebookTracker],
  activate: handleActivation,
};

export default extension;
