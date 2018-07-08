module Search {
    export class ObjectWithWeight<T> {
        public object: T;
        public weight: number;

        constructor(object: T, weight:number) {
            this.object = object;
            this.weight = weight;
        }
    }
}
