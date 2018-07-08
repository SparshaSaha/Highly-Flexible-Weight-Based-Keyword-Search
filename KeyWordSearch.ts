module Search {
    export class KeyWordSearch<T> implements ISearch<T> {

        public getSearchResults(objectsToSearchIn: T[], searchParameters: SearchParameter[], query: string): T[] {
            let weightedObjects = this.generateWeightsForObjects(objectsToSearchIn, searchParameters, query);

        }

        public generateWeightsForObjects(objectsToSearchIn: T[],searchParameters: SearchParameter[], query: string): ObjectWithWeight<T>[] {
            
            let objectsWithWeight: ObjectWithWeight<T>[] = []; 
            for(let currentObject of objectsToSearchIn) {
                let weightForCurrentObject: number = 0;
                for(let currentParameter of searchParameters) {
                    if (currentObject[currentParameter.getParameterName()]) {
                        weightForCurrentObject += currentParameter.getParameterWeight();
                    }
                }

                if (weightForCurrentObject > 0) {
                    let objectWithWeight = new ObjectWithWeight<T>(currentObject, weightForCurrentObject);
                    objectsWithWeight.push(objectWithWeight);
                }
            }
            return objectsWithWeight;
        }

        public sortObjectsOnWeight(objectsWithWeight: ObjectWithWeight<T>[]): T[] {
            let sorted = objectsWithWeight.sort(function(a, b) {
                
            });
        }

    }
}
