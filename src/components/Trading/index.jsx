import React, { useState, useEffect, useRef } from "react";
import { useChain, useWallet } from "@cosmos-kit/react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { getCNSAsync } from "hooks/cns";
import "./Trading.css";
import "./mobile-warning.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ENDPOINTS = {
  supply: "https://lcd.osmosis.zone/cosmos/bank/v1beta1/supply",
  pairInfo: "https://lcd.osmosis.zone/cosmwasm/wasm/v1/contract",
};

const CONTRACTS = {
  lp: "uwu1mf6ptkssddfkke8tpjk0mwpaxn6kmejqfyg6kj0vgtzxfv8hr0qsmgzpz",
};

function Trading() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emoji", headerName: "Icon", width: 100 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "marketCap", headerName: "Market Cap", flex: 1 },
    { field: "supply", headerName: "Supply", flex: 1 },
    { field: "balance", headerName: "Balance", flex: 1 },
  ]);

  const [balanceData, setBalanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isWalletConnected, address } = useWallet();
  const { chain } = useChain("osmosis");
  let gridRef = useRef();

  const FAKE_DIAMONDS = "factory/unicorn1pawhaxskmdkzvfgevs0dh4lxuctn4x8wt2sqyz95tgem9ne2nrwqjg6rvq/udiamond";

  const fetchSupplyData = async () => {
    try {
      setIsLoading(true);
      const controller = new AbortController();
      const { signal } = controller;

      const supplyResponse = await fetch(ENDPOINTS.supply, { signal });
      const supplyJson = await supplyResponse.json();
      const supplyData = supplyJson.supply.filter(
        (s) => s.denom != FAKE_DIAMONDS
      );
      const lpBalances = await fetchBalancesAsync(CONTRACTS.lp, signal);
      const getPair = async (denom) => {
        const res = await fetch(
          `${ENDPOINTS.pairInfo}/${CONTRACTS.lp}/smart/${Buffer.from(
            JSON.stringify({
              get_pair: {
                asset_infos: [
                  {
                    native_token: {
                      denom: "factory/uwu1qr8xvfl0s3vnqh62emt9yrqwzfxpvjzs6zy6tawghe4q8emxmyaq9ff375/uBTC",
                    },
                  },
                  {
                    native_token: {
                      denom,
                    },
                  },
                ],
              },
            })
          ).toString("base64")}`,
          { signal }
        );
        return res.json();
      };

      const data = await Promise.all(
        supplyData.map(async (token) => {
          let lpBalance = lpBalances?.find((b) => b.denom === token.denom);
          const denom = token.denom;
          const amount = token.amount;
          const denomDisplay = denom.includes("factory/")
            ? denom.split("/")[2]
            : denom;
          const emoji = determineEmoji(denomDisplay);
          let price = 0;

          try {
            const pairInfo = await getPair(denom);
            if (pairInfo?.data?.contract_addr) {
              price = 30000; // Mock price for demo
            }
          } catch (error) {
            console.error("Error fetching pair info:", error);
          }

          const marketCap = (parseFloat(amount) / 1e6) * price;
          return {
            denom,
            denomDisplay,
            emoji,
            price: price ? `$${price.toLocaleString()}` : "N/A",
            marketCap: marketCap ? `$${marketCap.toLocaleString()}` : "N/A",
            supply: (parseFloat(amount) / 1e6).toLocaleString(),
          };
        })
      );

      setRowData(data);

      if (isWalletConnected && data.length > 0) {
        const userBalances = await fetchBalancesAsync(address, signal);
        const userBalancesFiltered = userBalances.filter(
          (b) => b.denom != FAKE_DIAMONDS
        );
        const balances = userBalancesFiltered?.map((ub) => ({
          name: data.find((r) => r.denom === ub.denom)?.denomDisplay,
          denom: ub.denom,
          emoji: data.find((r) => r.denom === ub.denom)?.emoji,
          balance: (parseFloat(ub.amount) / 1e6).toLocaleString(),
        }));
        setBalanceData(balances);
      }

      setIsLoading(false);
      return () => controller.abort();
    } catch (error) {
      console.error("Error fetching supply data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplyData();
  }, [isWalletConnected, address]);

  const fetchBalancesAsync = async (address, signal) => {
    try {
      const response = await fetch(
        `https://lcd.osmosis.zone/cosmos/bank/v1beta1/balances/${address}`,
        { signal }
      );
      const json = await response.json();
      return json.balances;
    } catch (error) {
      console.error("Error fetching balances:", error);
      return [];
    }
  };

  const determineEmoji = (name) => {
    // Your emoji determination logic here
    return "🪙"; // Default emoji
  };

  const onFirstDataRendered = () => {
    gridRef.current.api.sizeColumnsToFit();
  };

  return (
    <div className={`trading-container ${isLoading ? 'loading' : ''}`}>
      <div className="header">
        <h1>UwU Trading</h1>
        {!isWalletConnected && (
          <button onClick={() => chain.connect()}>Connect Wallet</button>
        )}
        {isWalletConnected && (
          <div className="wallet-info">
            <p>Connected: {address}</p>
            <button onClick={() => chain.disconnect()}>Disconnect</button>
          </div>
        )}
      </div>

      <div className="ag-theme-quartz" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          onFirstDataRendered={onFirstDataRendered}
          rowSelection="single"
        />
      </div>

      {isWalletConnected && balanceData.length > 0 && (
        <div className="balances-section">
          <h2>Your Balances</h2>
          <div className="balances-grid">
            {balanceData.map((balance, index) => (
              <div key={index} className="balance-item">
                <span>{balance.emoji}</span>
                <span>{balance.name}</span>
                <span>{balance.balance}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Trading;
