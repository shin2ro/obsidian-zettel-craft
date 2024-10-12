import {Plugin} from 'obsidian';

export default class UniqueIdNoteCreator extends Plugin {
	async onload() {
		this.addCommand({
			id: 'create-new-note',
			name: 'Create new note',
			callback: async () => {
				await this.createNewNote();
			}
		});
	}

	async createNewNote() {
		const now = window.moment();
		const id = now.format('YYYYMMDDHHmm');
		let data = '---\n';
		data += `id: ${id}\n`;
		data += 'title: \n';
		data += '---\n'
		data += '\n';
		data += `# ${id} \n`;
		const file = await this.app.vault.create(`${id}.md`, data);
		await this.app.workspace.getLeaf('tab').openFile(file);
		this.app.workspace.activeEditor?.editor?.setSelections([
			{ anchor: { ch: 7, line: 2}},
			{ anchor: { ch: 15, line: 5}},
		]);
	}
}
