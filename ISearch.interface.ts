module Search {
    export interface ISearch<T> {
        /*
        @param objectsToSearchIn: Takes in objects of generic type T on which search has been conducted
        @param searchParameters: Parameters on which search has to be conducted specifically
        @return Weight wise sorted objects
        */
        getSearchResults(objectsToSearchIn: T[], searchParameters: SearchParameter[]): T[];
    }
}
