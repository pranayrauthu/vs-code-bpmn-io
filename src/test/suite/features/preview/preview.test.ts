import { it } from 'mocha';
import * as path from 'path';

import * as vscode from 'vscode';

const COMMAND = 'extension.bpmn-io.preview';

const TEST_FILE = path.join(__dirname, '../../..', 'fixtures', 'simple.bpmn');

suite('<preview>', () => {

  it('should open preview', async () => {
    // given
    const { document } = await openFile(TEST_FILE);

    const { uri } = document;

    // then
    await vscode.commands.executeCommand(COMMAND, uri);
    await sleep(500);
  });

});

// helpers //////

async function openFile(path: string): Promise<vscode.TextEditor> {
  const uri = vscode.Uri.file(path);
  const document = await vscode.workspace.openTextDocument(uri);
  const editor = await vscode.window.showTextDocument(document);

  // wait for editor to open
  await sleep(500);

  return editor;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
