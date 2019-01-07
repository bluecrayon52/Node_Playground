/**
 * @param {number[]} candies
 * @return {number}
 */

const candies1 = [1,1,2,2,3,3];  // max 3
const candies2 = [1,1,2,3]; // max 2 
const candies3 = [1,1,2,2,2,3]; // max 3
const candies4 = [1,1,1,2,2,3,4,5]; // max 4

// calculate the max number of unique candies the sister can get 
// assume even Array, candy must be evenly distributed between brother and sister
var distributeCandies = function(candies) {
    let unique = new Set();
    candies.forEach((candy)=>{
        if (!unique.has(candy)) {
            unique.add(candy);
        }
    });
    let max = candies.length/2;
    if(unique.size < max) {
        max = unique.size;
    }
    return max;
};

var countCandiesMap = (candies) => {
    var unique = new Map();
    
    candies.forEach((candy)=>{
        if (!unique.has(candy)) {
            unique.set(candy, 1);
        } else {
            var number = unique.get(candy) + 1;
            unique.set(candy, number);
        }
    });
     
    // unique.forEach((value, key, map)=> {
        
    // });
    console.log(unique);
}
console.log(distributeCandies(candies1));
console.log(distributeCandies(candies2));

countCandiesMap(candies3);
countCandiesMap(candies4);