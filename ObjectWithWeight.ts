export class ObjectWithWeight<T> {
    public object;
    public weight: number;

    constructor(object: T, weight:number) {
        this.object = object;
        this.weight = weight;
    }
}

