var longestCommonSubsequence = function (text1, text2) {
  //   let n = text1.length;
  //   let m = text2.length;
  //   let dp = new Array(n + 1).fill(0).map((x) => new Array(m + 1).fill(0));

  //   for (let i = 1; i <= n; i++) {
  //     for (let j = 1; j <= m; j++) {
  //       // two  possible scenarioes:
  //       // 1. the current char of text1 and text2 does not match
  //       // 2. the current char of text1 and text2 matches
  //       if (text1.charAt(i - 1) !== text2.charAt(j - 1)) {
  //         // check left and top for longer subsequence length
  //         dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  //       } else {
  //         // check diag for prev longest subsequence length and add 1
  //         dp[i][j] = dp[i - 1][j - 1] + 1;
  //       }
  //     }
  //   }
  //   return dp[n][m];
  //O(n) space
  let prevRow = Array(text2.length + 1).fill(0);
  const curRow = Array(text2.length + 1).fill(0);
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curRow[j] = 1 + prevRow[j - 1];
      } else {
        curRow[j] = Math.max(curRow[j - 1], prevRow[j]);
      }
    }
    prevRow = curRow;
  }
  return prevRow[text2.length];
};
//recursive
var longestCommonSubsequence = function (text1, text2) {
  const memo = new Map();
  return recursion(text1, text2, text1.length - 1, text2.length - 1, memo);
  function recursion(text1, text2, index1, index2, memo) {
    // base cases
    if (index1 < 0 || index2 < 0) return 0;

    const key = index1 + "#" + index2;

    if (memo.has(key)) return memo.get(key);

    let result;

    if (text1.charAt(index1) === text2.charAt(index2)) {
      result = recursion(text1, text2, index1 - 1, index2 - 1, memo) + 1;
    } else {
      result = Math.max(
        recursion(text1, text2, index1, index2 - 1, memo),
        recursion(text1, text2, index1 - 1, index2, memo)
      );
    }

    memo.set(key, result);
    return result;
  }
};
