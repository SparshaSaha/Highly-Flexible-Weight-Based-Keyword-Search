module Search {
    export class KeyWordSearch<T> implements ISearch<T> {

        public getSearchResults(objectsToSearchIn: T[], searchParameters: SearchParameter[], query: string): T[] {
            let weightedObjects = this.generateWeightsForObjects(objectsToSearchIn, searchParameters, query);
            return this.sortObjectsOnWeight(weightedObjects);
        }

        // Generated weights for all objects
        // Filters objects with weight equalto 0
        // @returns weighted and filtered objects
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

        // Function to sort objects on the descending order of weights of weights
        // @returns unwrapped sorted objects
        public sortObjectsOnWeight(objectsWithWeight: ObjectWithWeight<T>[]): T[] {
            let sortedObjects = objectsWithWeight.sort(function(a, b) {
                return b.weight - a.weight;
            });

            let unwrappedObjects: T[] = [];

            for (let currentObject of sortedObjects) {
                unwrappedObjects.push(currentObject.object);
            }

            return unwrappedObjects; 
        }
    }
}
