// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const path = require('path');
const fs = require('fs');
import dayjs from 'dayjs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ai-voice-note" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.takeNoteByVoice', () => {
		// 拼接文件名
        const fileName = `notes_${dayjs().format('YYYY-MM-DD HH:mm:ss')}.md`;
        // 获取文件夹路径
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (workspaceFolder) {
            // 为新文件创建绝对路径
            const filePath = path.join(workspaceFolder.uri.fsPath, fileName);

            // 创建文件并写入内容
            fs.writeFileSync(filePath, '');

            // 编辑器中打开文件
            vscode.workspace.openTextDocument(filePath).then(doc => {
                
                vscode.window.showTextDocument(doc);

            }, (error) => {
                vscode.window.showErrorMessage(`Failed to open ${fileName}: ${error}`);
            }).then(() => {
                 // 执行开启语音输入
                 vscode.commands.executeCommand('workbench.action.editorDictation.start');
            });
        } else {
            vscode.window.showWarningMessage('No workspace opened to create note file.');
        }	
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
