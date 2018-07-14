import { WordTreeNode } from "./WordTreeNode";

export class WordTreeUtils {

	// Function to be called to build the prefix tree from words
	// @returns the head node of the built tree
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

	// Returns the index of the passed character
	private getArrayIndexMapping(character: string): number {
		return character.charCodeAt(0) - 97;
	}

	// Checks the number of characters matching between the query and the words in the tree
	// @returns the number of character matches starting from the beginning
	public checkPresenceInTree(head: WordTreeNode, word: string, index: number): number {
		if (index == word.length || head.characterLinks[this.getArrayIndexMapping(word[index])] == undefined) {
			return 0;
		}

		return this.checkPresenceInTree(head.characterLinks[this.getArrayIndexMapping(word[index])], word, index + 1) + 1;
	}
}
