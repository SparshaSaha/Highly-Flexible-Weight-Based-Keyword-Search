import { WordTreeUtils } from "./WordTreeUtils";
import { WordTreeNode } from "./WordTreeNode";

let temp = new WordTreeUtils();

let str = ["cool","cock"];

let x = temp.buildTree(str);
parse(x);

function parse(node: WordTreeNode) {
    for (let i = 0; i < node.characterLinks.length; i++ ) {
        if (node.characterLinks[i] != undefined) {
            console.log(String.fromCharCode(i + 97));
            parse(node.characterLinks[i]);
        }
    }
}