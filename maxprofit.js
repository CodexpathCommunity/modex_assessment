function maxProfitK(prices, k) {
  const n = prices.length;

  // If k is greater than or equal to half the number of prices, we can perform as many transactions as we want.
  // In this case, we can simply calculate the sum of all positive price differences.
  if (k >= Math.floor(n / 2)) {
    return prices.reduce((maxProfit, price, i) => {
      if (i > 0 && price > prices[i - 1]) {
        return maxProfit + (price - prices[i - 1]);
      }
      return maxProfit;
    }, 0);
  }
  // Create a dp array to store the maximum profit at each transaction and each day
  const dp = Array.from({ length: k + 1 }, () => new Array(n).fill(0));

  for (let i = 1; i <= k; i++) {
    let maxSoFar = -prices[0];
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.max(dp[i][j - 1], prices[j] + maxSoFar);
      maxSoFar = Math.max(maxSoFar, dp[i - 1][j - 1] - prices[j]);
    }
  }

  return dp[k][n - 1];
}

const prices = [3, 2, 6, 5, 0, 3];
const k = 2;
const maxProfit = maxProfitK(prices, k);
console.log(maxProfit); // Output: 7
