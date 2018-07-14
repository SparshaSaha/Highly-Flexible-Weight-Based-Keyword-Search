import { WordTreeUtils } from "./WordTreeUtils";
import { WordTreeNode } from "./WordTreeNode";

let temp = new WordTreeUtils();

let str = ["cool","cocky","sparsha"];

let x = temp.buildTree(str);

function parse(node: WordTreeNode) {
    for (let i = 0; i < node.characterLinks.length; i++ ) {
        if (node.characterLinks[i] != undefined) {
            console.log(String.fromCharCode(i + 97));
            parse(node.characterLinks[i]);
        }
    }
}
console.log(temp.checkPresenceInTree(x,"spa", 0));