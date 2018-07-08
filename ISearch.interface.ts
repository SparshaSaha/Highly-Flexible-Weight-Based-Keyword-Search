import { SearchParameter } from "./SearchParameter";
  export interface ISearch<T> {
      /*
      @param objectsToSearchIn: Takes in objects of generic type T on which search has been conducted
      @param searchParameters: Parameters on which search has to be conducted specifically
      @param query: String query to search for
      @return Weight wise sorted objects
      */
      getSearchResults(objectsToSearchIn, searchParameters: SearchParameter[], query: string): T[];
  }
