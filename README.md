# Weight Based Keyword Search
A module in 100% typescript used to provide efficient client side searching. It uses weight based KeyWord Search to search across a given object

# How it works
KeyWord Search takes in a query, an array of objects and a list of search paramters. (Look in examples secttion for a better understanding)

The array may contain objects of any type and it even supports nested object searching. (Look in examples for a better understanding)

It tokenizes the query as well as the object parameters into lowercase strings on the basis of a regular expression, either supplied or taken by default.

It then inserts the query words into a map and loops through the tokenized words for an object parameter and finds the number of matches. the number of matches are multiplied by the parameter weight to find out the weight for that object.

This step is done for all objects and then the objects are sorted in the descending order of calculated weights.

So basically, the results with the highest weights are the results which are nearest to the query

# Usage

