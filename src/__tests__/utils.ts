import CodeMirror from "codemirror";
import _ from "lodash/fp";

import { getPaddedTextToInsert } from "../utils";

describe("getPaddedTextToInsert", () => {
    const docTemplate =
        "The quick brown fox jumps over the lazy dog." +
        "\nThis is line two." +
        "\nThis is line three.";
    const textToInsert = "|>";
    const textToInsertLeftPadded = ` ${textToInsert}`;
    const textToInsertRightPadded = `${textToInsert} `;
    const textToInsertPadded = ` ${textToInsert} `;

    let doc;

    beforeEach(() => {
        doc = new CodeMirror.Doc(docTemplate);
    });

    it("should right pad at start of text, character after cursor", () => {
        doc.setSelection({ line: 0, ch: 0 }, { line: 0, ch: 0 });
        expect(getPaddedTextToInsert(doc, textToInsert)).toBe(
            textToInsertRightPadded
        );
    });

    it("shouldn't right pad at start of text, space after cursor", () => {
        doc.setSelection({ line: 0, ch: 0 }, { line: 0, ch: 3 });
        expect(getPaddedTextToInsert(doc, textToInsert)).toBe(textToInsert);
    });

    it("should right pad at end of text", () => {
        doc.setSelection({ line: doc.lastLine(), ch: docTemplate.length });
        expect(doc.getSelection()).toBe("");
        expect(getPaddedTextToInsert(doc, textToInsert)).toBe(
            textToInsertPadded
        );
    });

    it("shoudn't left pad at start of text", () => {
        doc.setSelection({ line: 0, ch: 0 });
        expect(doc.getSelection()).toBe("");
        expect(getPaddedTextToInsert(doc, textToInsert)).toBe(
            textToInsertRightPadded
        );
    });

    it("should left pad just after a word", () => {
        doc.setSelection({ line: 0, ch: 3 });
        expect(doc.getSelection()).toBe("");
        expect(getPaddedTextToInsert(doc, textToInsert)).toBe(
            textToInsertLeftPadded
        );
    });

    it("should pad in the middle of a word", () => {
        doc.setSelection({ line: 0, ch: 5 });
        expect(doc.getSelection()).toBe("");
        expect(getPaddedTextToInsert(doc, textToInsert)).toBe(
            textToInsertPadded
        );
    });
});
