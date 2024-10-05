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
		const now = Date.now();
		const id = this.encode(now);
		let data = '---\n';
		data += `id: ${id}\n`;
		data += 'title: \n';
		data += '---\n'
		const file = await this.app.vault.create(`${id}.md`, data);
		await this.app.workspace.getLeaf('tab').openFile(file);
	}

	encode(x: number): string {
		const symbols = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
		let encoded = '';
		for (let i = 0; i < 10; i++) {
			const mod = x % symbols.length;
			encoded = symbols[mod] + encoded;
			x = (x - mod) / symbols.length
		}
		return encoded;
	}
}
