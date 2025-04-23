// - **Longest Substring Without Repeating Characters (#3)**
    
//     https://leetcode.com/problems/longest-substring-without-repeating-characters/

let start = 0;
let maxLen = 0;
let seen = {};

for (let end = 0; end < s.length; end++) {
    let char = s[end];
    if (seen[char] !== undefined && seen[char] >= start) {
        start = seen[char] + 1;
    }
    seen[char] = end;
    maxLen = Math.max(maxLen, end - start + 1);
}

return maxLen;