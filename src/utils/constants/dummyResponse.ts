export const tipsResponse = `### Tips for approaching this problem:

1. **Understand the problem first**
   - What are the inputs and expected outputs?
   - Are there any constraints or edge cases?

2. **Consider using a hash map**
   - Hash maps provide O(1) lookup time
   - They're useful for finding complements or pairs

3. **Think about efficiency**
   - Can you solve this in a single pass?
   - What's the time and space complexity of your approach?

4. **Start with a brute force solution**
   - Then optimize from there
   - Sometimes two pointers or sorting can help

5. **Test your solution with examples**
   - Try the given examples
   - Create your own test cases, especially edge cases`;

export const explanationResponseValue = `### Problem Explanation:

This appears to be the "Two Sum" problem:

**Problem Statement:**
Given an array of integers 'nums' and an integer 'target', return indices of the two numbers such that they add up to the target.

**Input:**
- An array of integers (nums)
- A target integer (target)

**Output:**
- An array of two indices where the corresponding values sum to the target

**Constraints:**
- Each input has exactly one solution
- You may not use the same element twice
- You can return the answer in any order

**Example:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1]`;
