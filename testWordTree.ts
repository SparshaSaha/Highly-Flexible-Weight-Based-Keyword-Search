import { BuildWordTree } from "./BuildWordTree";
import { WordTreeNode } from "./WordTreeNode";

let temp = new BuildWordTree();

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