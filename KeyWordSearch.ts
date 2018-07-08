import { ObjectWithWeight } from "./ObjectWithWeight";
import { SearchParameter } from "./SearchParameter";
import { ISearch } from "./ISearch.interface";

export class KeyWordSearch<T> implements ISearch<T> {

    public  getSearchResults(objectsToSearchIn: T[], searchParameters: SearchParameter[], query: string): T[] {
        let weightedObjects = this.generateWeightsForObjects(objectsToSearchIn, searchParameters, query.toLowerCase());
        return this.sortObjectsOnWeight(weightedObjects);
    }

    // Generated weights for all objects
    // Filters objects with weight equalto 0
    // @returns weighted and filtered objects
    private generateWeightsForObjects(objectsToSearchIn: T[],searchParameters: SearchParameter[], query: string): ObjectWithWeight<T>[] {
            
        let objectsWithWeight: ObjectWithWeight<T>[] = []; 
        for(let currentObject of objectsToSearchIn) {
            let weightForCurrentObject: number = 0;
            for(let currentParameter of searchParameters) {
                if (currentObject[currentParameter.parameterName].toLowerCase().includes(query)) {
                    weightForCurrentObject += currentParameter.parameterWeight;
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
    private sortObjectsOnWeight(objectsWithWeight: ObjectWithWeight<T>[]): T[] {
        let sortedObjects = objectsWithWeight.sort(function(a, b) {
            return b.weight - a.weight;
        });

        let unwrappedObjects = [];

        for (let currentObject of sortedObjects) {
            unwrappedObjects.push(currentObject.object);
        }

        return unwrappedObjects; 
    }

    private recursiveDepthFirstSearch(objectToSearch, query: string, weightForMatch: number): number {
        if (Array.isArray(objectToSearch)) {
            let weight = 0;
            for(let current of objectToSearch) {
                weight += this.recursiveDepthFirstSearch(current, query, weight);
            }
            return weight;
        } else if (typeof objectToSearch === 'object') {
            let weight = 0;
            for(let current in objectToSearch) {
                weight += this.recursiveDepthFirstSearch(objectToSearch[current], query, weightForMatch);
            }
            return weight;
        } else {
            if (objectToSearch === query) {
                return weightForMatch;
            }
        }
    }
}
