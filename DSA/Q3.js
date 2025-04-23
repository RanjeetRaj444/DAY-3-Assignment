// - **Find First and Last Position of Element in Sorted Array (#34)**

//     https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

if (nums.length == 0) return [-1, -1];
let output = [];

for (let i = 0; i < nums.length; i++) {
  if (nums[i] == target) {
    output.push(i);
  }
}
if (output.length >= 2) {
  return [output[0], output[output.length - 1]];
} else if (output.length == 1) {
  return [output[0], output[0]];
} else {
  return [-1, -1];
}
