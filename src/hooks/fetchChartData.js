import axios from "axios";
import retry from "async-retry";
import { ENDPOINTS } from "src/constants";
const POOL_ID = "1225";

// Function to fetch the latest block height with retries
async function getLatestBlockHeight() {
  return retry(
    async () => {
      try {
        const response = await axios.get(ENDPOINTS.latestBlock);
        return parseInt(response.data.block.header.height);
      } catch (error) {
        if (error.response && error.response.data.code === 12) {
          console.error(`Endpoint not implemented: ${ENDPOINTS.latestBlock}`);
          throw new Error("Block height endpoint not supported");
        }
        console.error(`Error fetching latest block height: ${error.message}`);
        throw error;
      }
    },
    {
      retries: 3,
      factor: 2,
      minTimeout: 500,
      maxTimeout: 5000,
      onRetry: (error, attempt) => {
        console.log(
          `Retrying getLatestBlockHeight (attempt ${attempt}): ${error.message}`
        );
      },
    }
  );
}

// Function to fetch block data for a specific block height with retries
async function getBlockData(blockHeight) {
  return retry(
    async () => {
      try {
        const response = await axios.get(`${ENDPOINTS.blocks}/${blockHeight}`);
        return response.data.block;
      } catch (error) {
        if (error.response && error.response.data.code === 12) {
          console.error(
            `Endpoint not implemented: ${ENDPOINTS.blocks}/${blockHeight}`
          );
          return null;
        }
        console.error(
          `Error fetching block data for block ${blockHeight}: ${error.message}`
        );
        throw error;
      }
    },
    {
      retries: 3,
      factor: 2,
      minTimeout: 500,
      maxTimeout: 5000,
      onRetry: (error, attempt) => {
        console.log(
          `Retrying getBlockData for block ${blockHeight} (attempt ${attempt}): ${error.message}`
        );
      },
    }
  );
}

// Function to fetch pool data for a specific block height with retries and fallback
async function getPoolData(poolId, blockHeight) {
  try {
    const response = await retry(
      async () => {
        const res = await axios.get(`${ENDPOINTS.pools}/${poolId}`, {
          params: { height: blockHeight },
        });
        return res.data.pool;
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 500,
        maxTimeout: 5000,
        onRetry: (error, attempt) => {
          console.log(
            `Retrying ${ENDPOINTS.pools} for block ${blockHeight} (attempt ${attempt}): ${error.message}`
          );
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.data.code === 12) {
      console.warn(`Endpoint not implemented: ${ENDPOINTS.pools}`);
    }
    console.error(
      `Error fetching pool data for block ${blockHeight} from ${ENDPOINTS.pools}: ${error.message}`
    );
    return null; // Return null if all endpoints fail
  }

  return null; // Return null if all endpoints fail
}

// Function to calculate prices from pool data
function calculatePrices(pool) {
  if (!pool) {
    return null;
  }

  const assets = pool.poolAssets || pool.pool_assets;
  if (!assets || assets.length !== 2) {
    return null;
  }

  const tokenA = assets[0].token;
  const tokenB = assets[1].token;

  // Assuming 6-decimal precision for both tokens (standard in Cosmos)
  const amountA = parseInt(tokenA.amount) / 1_000_000;
  const amountB = parseInt(tokenB.amount) / 1_000_000;

  // Price of tokenA in terms of tokenB (e.g., uowo in usparkle)
  const priceAinB = amountB / amountA;
  // Price of tokenB in terms of tokenA (e.g., usparkle in uowo)
  const priceBinA = amountA / amountB;

  return {
    tokenADenom: tokenA.denom,
    tokenBDenom: tokenB.denom,
    priceAinB,
    priceBinA,
  };
}

// Main function to fetch price data for the last 100 blocks
export async function fetchLast100BlocksPrices() {
  try {
    // Get the latest block height
    const latestBlock = await getLatestBlockHeight();
    console.log(`Latest block height: ${latestBlock}`);

    // Array to store price data
    const priceHistory = [];

    // Fetch data for the last 100 blocks (latest to latest - 99)
    for (let i = 0; i < 100; i++) {
      const blockHeight = latestBlock - i;
      console.log(`Fetching data for block ${blockHeight}...`);

      const blockData = await getBlockData(blockHeight);
      const timestamp = blockData ? blockData.header.time : null;

      const poolData = await getPoolData(POOL_ID, blockHeight);
      if (poolData) {
        const prices = calculatePrices(poolData);
        if (prices) {
          priceHistory.push({
            blockHeight,
            timestamp,
            prices,
          });
        } else {
          console.warn(`No valid price data for block ${blockHeight}`);
        }
      } else {
        console.warn(
          `Skipping block ${blockHeight} due to unavailable pool data`
        );
      }

      // Add delay to avoid rate-limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Output the price history
    console.log("\nPrice History for Pool", POOL_ID);
    priceHistory.forEach((entry) => {
      console.log(
        `Block ${entry.blockHeight} (Timestamp: ${entry.timestamp || "N/A"}):`
      );
      console.log(
        `  ${entry.prices.tokenADenom} in ${
          entry.prices.tokenBDenom
        }: ${entry.prices.priceAinB.toFixed(6)}`
      );
      console.log(
        `  ${entry.prices.tokenBDenom} in ${
          entry.prices.tokenADenom
        }: ${entry.prices.priceBinA.toFixed(6)}`
      );
    });

    return priceHistory;
  } catch (error) {
    console.error("Error in fetchLast100BlocksPrices:", error.message);
    throw error;
  }
}

export async function fetch24HourPriceChange() {
  try {
    // Get the latest block height
    const latestBlock = await getLatestBlockHeight();
    console.log(`Latest block height: ${latestBlock}`);

    // Estimate block height 24 hours ago (~55,189 blocks, based on ~1.56s block time)
    const blockHeight24hAgo = latestBlock - 55189;

    // Array to store price data for latest and 24h ago
    const priceHistory = [];

    // Fetch data for the latest block
    console.log(`Fetching data for latest block ${latestBlock}...`);
    let latestBlockData = await getBlockData(latestBlock);
    let latestTimestamp = latestBlockData ? latestBlockData.header.time : null;
    let latestPoolData = await getPoolData(POOL_ID, latestBlock);

    if (latestPoolData) {
      const latestPrices = calculatePrices(latestPoolData);
      if (latestPrices) {
        priceHistory.push({
          blockHeight: latestBlock,
          timestamp: latestTimestamp,
          prices: latestPrices,
        });
      } else {
        console.warn(`No valid price data for block ${latestBlock}`);
      }
    } else {
      console.warn(
        `Skipping block ${latestBlock} due to unavailable pool data`
      );
    }

    // Fetch data for the block ~24 hours ago
    console.log(
      `Fetching data for block ${blockHeight24hAgo} (~24 hours ago)...`
    );
    const blockData24hAgo = await getBlockData(blockHeight24hAgo);
    const timestamp24hAgo = blockData24hAgo
      ? blockData24hAgo.header.time
      : null;
    const poolData24hAgo = await getPoolData(POOL_ID, blockHeight24hAgo);

    if (poolData24hAgo) {
      const prices24hAgo = calculatePrices(poolData24hAgo);
      if (prices24hAgo) {
        priceHistory.push({
          blockHeight: blockHeight24hAgo,
          timestamp: timestamp24hAgo,
          prices: prices24hAgo,
        });
      } else {
        console.warn(`No valid price data for block ${blockHeight24hAgo}`);
      }
    } else {
      console.warn(
        `Skipping block ${blockHeight24hAgo} due to unavailable pool data`
      );
    }

    // Calculate 24-hour price change
    let priceChange = null;
    if (priceHistory.length === 2) {
      const latestPriceAinB = priceHistory[0].prices.priceAinB;
      const priceAinB24hAgo = priceHistory[1].prices.priceAinB;
      const latestPriceBinA = priceHistory[0].prices.priceBinA;
      const priceBinA24hAgo = priceHistory[1].prices.priceBinA;

      // Calculate percentage change: ((new - old) / old) * 100
      const priceChangeAinB =
        ((latestPriceAinB - priceAinB24hAgo) / priceAinB24hAgo) * 100;
      const priceChangeBinA =
        ((latestPriceBinA - priceBinA24hAgo) / priceBinA24hAgo) * 100;

      priceChange = {
        tokenADenom: priceHistory[0].prices.tokenADenom,
        tokenBDenom: priceHistory[0].prices.tokenBDenom,
        priceChangeAinB: priceChangeAinB.toFixed(2), // Percentage, rounded to 2 decimals
        priceChangeBinA: priceChangeBinA.toFixed(2), // Percentage, rounded to 2 decimals
        latestPriceAinB: latestPriceAinB.toFixed(6),
        latestPriceBinA: latestPriceBinA.toFixed(6),
        priceAinB24hAgo: priceAinB24hAgo.toFixed(6),
        priceBinA24hAgo: priceBinA24hAgo.toFixed(6),
      };
    } else {
      console.warn("Insufficient data to calculate 24-hour price change");
    }

    // Output the price history and change
    console.log("\nPrice History for Pool", POOL_ID);
    priceHistory.forEach((entry) => {
      console.log(
        `Block ${entry.blockHeight} (Timestamp: ${entry.timestamp || "N/A"}):`
      );
      console.log(
        `  ${entry.prices.tokenADenom} in ${
          entry.prices.tokenBDenom
        }: ${entry.prices.priceAinB.toFixed(6)}`
      );
      console.log(
        `  ${entry.prices.tokenBDenom} in ${
          entry.prices.tokenADenom
        }: ${entry.prices.priceBinA.toFixed(6)}`
      );
    });

    if (priceChange) {
      console.log("\n24-Hour Price Change:");
      console.log(
        `  ${priceChange.tokenADenom} in ${priceChange.tokenBDenom}: ${priceChange.priceChangeAinB}%`
      );
      console.log(
        `  ${priceChange.tokenBDenom} in ${priceChange.tokenADenom}: ${priceChange.priceChangeBinA}%`
      );
    }

    return { priceHistory, priceChange };
  } catch (error) {
    console.error("Error in fetch24HourPriceChange:", error.message);
    throw error;
  }
}
