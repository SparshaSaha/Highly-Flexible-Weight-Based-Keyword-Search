import { KeyWordSearch } from "./KeyWordSearch";
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
    arr.push(new TestObjects("Title mantest" + i, i));
}

let res = new KeyWordSearch<TestObjects>(true).getSearchResults(arr,[new SearchParameter('title', 10), new SearchParameter('age', 100)], "tit man");
console.log(JSON.stringify(res));
