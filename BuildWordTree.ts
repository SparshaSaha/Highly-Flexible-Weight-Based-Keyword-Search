import { WordTreeNode } from "./WordTreeNode";

export class BuildWordTree {

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

    public checkPresence(word: string) {
        
    }

    private getArrayIndexMapping(character: string): number {
        
        return character.charCodeAt(0) - 97;
    }
}
