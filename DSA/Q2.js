// - **Squares of a Sorted Array (#977)**

//     https://leetcode.com/problems/squares-of-a-sorted-array/

let output = [];
for (let i = 0; i < nums.length; i++) {
  output.push(nums[i] * nums[i]);
}
return output.sort((a, b) => a - b);
