import { isEqual, pick } from "lodash/fp";
import CodeMirror from "codemirror";

const getPaddingText = (
    pos1: CodeMirror.Position,
    pos2: CodeMirror.Position,
    lastPos: CodeMirror.Position,
    ch: string
): string => {
    const pickPos = pick(["line", "ch"]);

    // End of line
    if (isEqual(pickPos(pos2), pickPos(lastPos))) return " ";

    // Nothing selected
    if (isEqual(pickPos(pos1), pickPos(pos2))) return "";

    // Already padded
    if (ch === " ") return "";

    // Not yet padded
    return " ";
};

export const getPaddedTextToInsert = (
    doc: CodeMirror.Doc,
    textToInsert: string
): string => {
    const _doc = doc.copy(false);

    const from = _doc.getCursor("from");
    const to = _doc.getCursor("to");

    _doc.extendSelection(
        { ...from, ch: from.ch - 1 },
        { ...to, ch: to.ch + 1 }
    );

    const extSelectedText = _doc.getSelection();
    const extFrom = _doc.getCursor("from");
    const extTo = _doc.getCursor("to");

    const lastLine = _doc.lastLine();
    const lastPos: CodeMirror.Position = {
        line: lastLine,
        ch: _doc.getLine(lastLine).length,
    };

    const leftCh = getPaddingText(
        from,
        extFrom,
        lastPos,
        extSelectedText.slice(0, 1)
    );
    const rightCh = getPaddingText(
        to,
        extTo,
        lastPos,
        extSelectedText.slice(-1)
    );
    const paddedTextToInsert = `${leftCh}${textToInsert}${rightCh}`;

    return paddedTextToInsert;
};
