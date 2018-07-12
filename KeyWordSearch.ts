import { ObjectWithWeight } from "./ObjectWithWeight";
import { SearchParameter } from "./SearchParameter";
import { ISearch } from "./ISearch.interface";

export class KeyWordSearch<T> implements ISearch<T> {
    private regExp: RegExp;
    constructor(regExp?: RegExp) {
        if (!regExp) {
            this.regExp = /[\s,+-._]+/;
        } else {
            this.regExp = regExp;
        }
    }

    public  getSearchResults(objectsToSearchIn: T[], searchParameters: SearchParameter[], query: string): T[] {
        let weightedObjects = this.generateWeightsForObjects(objectsToSearchIn, searchParameters, query.toLowerCase().split(this.regExp));
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
                weightForCurrentObject += this.recursiveDepthFirstSearch(currentObject[currentParameter.parameterName], tokenizedQuery, currentParameter.parameterWeight);
            }

            if (weightForCurrentObject > 0) {
                let objectWithWeight = new ObjectWithWeight<T>(currentObject, weightForCurrentObject);
                objectsWithWeight.push(objectWithWeight);
            }
        }
        return objectsWithWeight;
    }

    // Counts number of keyword matches between object parameter and query
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

    // Recursively searches for a match in a given object
    // @returns calculated weight for that object
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
            let tokenizedParameter = objectToSearch.toString().toLowerCase().split(this.regExp);
            let weight = this.keyWordMatch(tokenizedQuery, tokenizedParameter) * weightForParam;
            if (tokenizedParameter.join('').includes(tokenizedQuery.join(''))) {
                weight += 1;
            }
            return weight;
        }
    }
}
