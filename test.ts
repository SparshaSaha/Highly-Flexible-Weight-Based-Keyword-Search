import { KeyWordSearch} from "./KeyWordSearch";
import { SearchParameter } from "./SearchParameter";

class TestObjects {
    public title: string;

    constructor(title: string) {
        this.title = title;
        
    }
}
let arr = [];
for (let i = 0; i < 10; i++) {
    arr.push(new TestObjects("Title " + i));
}
let res = new KeyWordSearch<TestObjects>().getSearchResults(arr,[new SearchParameter('title', 10)], "5");
console.log(JSON.stringify(res));
