import log from "../../log";
import { NotificationMessage } from "../../server";
import {
  documents,
  TextDocumentContentChangeEvent,
  VersionedTextDocumentIdentifier,
} from "../../documents";

interface DidChangeTextDocumentParams {
  textDocument: VersionedTextDocumentIdentifier;
  contentChanges: TextDocumentContentChangeEvent[];
}

export const didChange = (message: NotificationMessage): void => {
  const params = message.params as DidChangeTextDocumentParams;
  documents.set(params.textDocument.uri, params.contentChanges[0].text);
};
