import { KeyWordSearch} from "./KeyWordSearch";
import { SearchParameter } from "./SearchParameter";

class TestObjects {
    public title: string;
    public age: number;

    constructor(title: string, age: number) {
        this.title = title;
        this.age = age;
    }
}
let arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(new TestObjects("Title .  ++ " + i, i));
}
let res = new KeyWordSearch<TestObjects>().getSearchResults(arr,[new SearchParameter('title', 10), new SearchParameter('age', 100)], "title 7");
console.log(JSON.stringify(res));
