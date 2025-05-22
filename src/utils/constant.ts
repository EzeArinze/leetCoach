export const getPlaceholder = (language: string) => {
  switch (language) {
    case "python":
      return "# Write your Python solution here\n\ndef two_sum(nums, target):\n    # Your code here\n    pass";
    case "java":
      return "// Write your Java solution here\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}";
    case "cpp":
      return "// Write your C++ solution here\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n        return {0, 0};\n    }\n};";
    case "javascript":
    default:
      return "// Write your JavaScript solution here\n\nfunction twoSum(nums, target) {\n  // Your code here\n  return [0, 0];\n}";
  }
};
