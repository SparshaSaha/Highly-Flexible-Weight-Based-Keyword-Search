import { WordTreeNode } from "./WordTreeNode";

export class WordTreeUtils {

	public buildTree(words: string[]): WordTreeNode {

		let currentNode: WordTreeNode = new WordTreeNode();
		let head: WordTreeNode = currentNode;

		for (let word of words) {
			currentNode = head;
			for (let letter of word) {
				let index = this.getArrayIndexMapping(letter);
				if (currentNode.characterLinks[index] == undefined) {
					currentNode.characterLinks[index] = new WordTreeNode();
				}
				currentNode = currentNode.characterLinks[index];
			}
		}

		return head;
	}

	private getArrayIndexMapping(character: string): number {

		return character.charCodeAt(0) - 97;
	}

	public checkPresenceInTree(head: WordTreeNode, word: string, index: number): number {

		if (index == word.length || head.characterLinks[this.getArrayIndexMapping(word[index])] == undefined) {
			return 0;
		}

		return this.checkPresenceInTree(head.characterLinks[this.getArrayIndexMapping(word[index])], word, index + 1) + 1;
	}
}
