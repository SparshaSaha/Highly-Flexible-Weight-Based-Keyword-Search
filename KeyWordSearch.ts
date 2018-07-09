import { ObjectWithWeight } from "./ObjectWithWeight";
import { SearchParameter } from "./SearchParameter";
import { ISearch } from "./ISearch.interface";

export class KeyWordSearch<T> implements ISearch<T> {

    public  getSearchResults(objectsToSearchIn: T[], searchParameters: SearchParameter[], query: string): T[] {
        let weightedObjects = this.generateWeightsForObjects(objectsToSearchIn, searchParameters, query.toLowerCase().split(' '));
        return this.sortObjectsOnWeight(weightedObjects);
    }

    // Generated weights for all objects
    // Filters objects with weight equalto 0
    // @returns weighted and filtered objects
    private generateWeightsForObjects(objectsToSearchIn: T[],searchParameters: SearchParameter[], tokenizedQuery: string[]): ObjectWithWeight<T>[] {
            
        let objectsWithWeight: ObjectWithWeight<T>[] = []; 
        for(let currentObject of objectsToSearchIn) {
            let weightForCurrentObject: number = 0;
            for(let currentParameter of searchParameters) {
                /*let tokenizedParameter: string[] = currentObject[currentParameter.parameterName].toLowerCase().split(' ')
                weightForCurrentObject += this.keyWordMatch(tokenizedQuery, tokenizedParameter) * currentParameter.parameterWeight;
        
                if (tokenizedParameter.join('').includes(tokenizedQuery.join(''))) {
                    weightForCurrentObject += 1;
                }*/
                console.log( this.recursiveDepthFirstSearch(currentObject[currentParameter.parameterName], tokenizedQuery, currentParameter.parameterWeight));
                weightForCurrentObject += this.recursiveDepthFirstSearch(currentObject[currentParameter.parameterName], tokenizedQuery, currentParameter.parameterWeight);
            }

            if (weightForCurrentObject > 0) {
                let objectWithWeight = new ObjectWithWeight<T>(currentObject, weightForCurrentObject);
                objectsWithWeight.push(objectWithWeight);
            }
        }
        return objectsWithWeight;
    }

    private keyWordMatch(tokenizedQuery: string[], tokenizedObjectParameter: string[]): number {  
        let hashedWords = {};
        for (let queryWord of tokenizedQuery) {
            hashedWords[queryWord] = true;
        }

        let matchCount: number = 0;
        for (let currentWord of tokenizedObjectParameter) {
            if (hashedWords[currentWord] == true) {
                matchCount++;
            }
        }
        console.log("Match count "+matchCount);
        return matchCount;
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

    private recursiveDepthFirstSearch(objectToSearch, tokenizedQuery: string[], weightForParam: number): number {
        if (Array.isArray(objectToSearch)) {
            let weight = 0;
            for(let current of objectToSearch) {
                weight += this.recursiveDepthFirstSearch(current, tokenizedQuery, weightForParam) * weightForParam;
            }
            return weight;
        } else if (typeof objectToSearch === 'object') {
            let weight = 0;
            for(let current in objectToSearch) {
                weight += this.recursiveDepthFirstSearch(objectToSearch[current], tokenizedQuery, weightForParam) * weightForParam;
            }
            return weight;
        } else {
            let tokenizedParameter = objectToSearch.toLowerCase().split(' ');
            let weight = this.keyWordMatch(tokenizedQuery, tokenizedParameter) * weightForParam;
            if (tokenizedParameter.join('').includes(tokenizedQuery.join(''))) {
                weight += 1;
            }
            return weight;
        }
    }
}
