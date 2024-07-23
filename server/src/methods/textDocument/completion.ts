import * as fs from "fs";
import { documents, TextDocumentIdentifier } from "../../documents";
import { RequestMessage } from "../../server";
import log from "../../log";

const words = fs
  .readFileSync("/Users/Win10/Workspace/web2")
  .toString()
  .split("\r\n");

interface CompletionItem {
  label: string;
}

interface CompletionList {
  isIncomplete: boolean;
  items: CompletionItem[];
}

interface Position {
  line: number;
  character: number;
}

interface TextDocumentPositionParams {
  textDocument: TextDocumentIdentifier;
  position: Position;
}

interface CompletionParams extends TextDocumentPositionParams {}

export const completion = (message: RequestMessage): CompletionList | null => {
  const params = message.params as CompletionParams;
  const content = documents.get(params.textDocument.uri);

  if (!content) {
    return null;
  }
  const currentLine = content.split("\n")[params.position.line];
  const lineUntilCursor = currentLine.slice(0, params.position.character);
  const currentPrefix = lineUntilCursor.replace(/.*\W(.*?)/, "$1");
  const items = words
    .filter((word) => word.startsWith(currentPrefix))
    .map((label) => ({ label }));

  return {
    isIncomplete: true,
    items,
  };
};
