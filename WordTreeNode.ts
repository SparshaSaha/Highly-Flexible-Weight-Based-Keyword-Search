export class WordTreeNode {
    public characterLinks: WordTreeNode[];

    constructor() {
        this.characterLinks = new Array(26);
    }
}
