import React, { useContext, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { emoji } from "./utils/Consts";
import { toHumanString } from "./utils/utils";
import {
  balancesContext,
  namesContext,
  poolsContext,
  supplyContext,
  trackersContext,
  uwuPriceContext,
} from "./utils/context";
import { Button } from "@interchain-ui/react";
import { useChain } from "@cosmos-kit/react";
import { AirdropManager } from "./AirdropManager";

import AirdropInput from "./AirdropInput";

function AirdropGrid({
  denom,
  setDenom,
  holdersOrLP,
  setHoldersOrLP,
  minAmount,
  setMinAmount,
  airdropEmoji,
  setAirdropEmoji,
  airdropAmount,
  excludedWallets,
  distributionType,
  brackets,
  setAirdropAmount,
  setExcludedWallets,
  setDistributionType,
  setBrackets,
}) {
  const minAmountBaseUnit = minAmount * Math.pow(10, 6);
  const minter = "unicorn1rn9f6ack3u8t3ed04pfaqpmh5zfp2m2ll4mkty";

  const supply = useContext(supplyContext);
  const trackers = useContext(trackersContext);
  const balances = useContext(balancesContext);
  const names = useContext(namesContext);
  const pools = useContext(poolsContext);
  const uwuPrice = useContext(uwuPriceContext);

  const [usdPrices, setusdPrices] = useState(false);
  const ctx = useChain("unicorn");

  const sysAddrs = new Set(pools.values()).add(minter);
  const userBals = Array.from(balances.entries()).filter(
    ([k, bs]) => !sysAddrs.has(k)
  );
  const getTotal = (d) =>
    userBals
      .map(([k, bs]) => bs.amounts.get(d) ?? 0)
      .reduce((a, b) => a + b, 0);

  const rows = userBals
    .map(([k, bs]) => {
      const t = trackers.get(k) ?? { addr: k, amt: 0, label: "" };
      const o = Object.fromEntries(
        Array.from(supply.entries()).map(([d, s]) => {
          return [
            d,
            (bs?.amounts.get(d) ?? 0) /
              (s - (balances.get(minter)?.amounts.get(d) ?? 0)),
          ];
        })
      );
      Object.assign(o, {
        address: k,
        label: t.label,
        name: names.get(k) ?? "",
        total:
          Array.from(supply.entries())
            .map(([d, s]) => {
              if (d == "uwunicorn") {
                return (bs?.amounts.get(d) ?? 0) / 1000000;
              }
              const pb = balances.get(pools.get(d))?.amounts.get(d) ?? 0;
              const pbu =
                balances.get(pools.get(d))?.amounts.get("uwunicorn") ?? 0;
              const v = ((bs?.amounts.get(d) ?? 0) * pbu) / (pb * 1000000);
              return v;
            })
            .reduce((a, b) => a + b, 0) * (usdPrices ? uwuPrice : 1),
      });
      return o;
    })
    .filter((row) => {
      // Filter rows based on minAmount
      const balance =
        balances.get(row.address?.toString())?.amounts.get(denom) ?? 0;
      return balance >= minAmountBaseUnit;
    });

  const sumTotal = (k) =>
    (
      getTotal(k) /
      (supply.get(k) - (balances.get(minter)?.amounts.get(k) ?? 0))
    ).toLocaleString(undefined, { style: "percent", minimumFractionDigits: 2 });

  const colDefs = [
    { headerName: "address", field: "address" },
    { headerName: "label", field: "label" },
    { headerName: ".unicorn", field: "name" },
    {
      headerName: `size (${usdPrices ? "$" : "🦄"})`,
      field: "total",
      valueFormatter: (p) =>
        usdPrices
          ? p.value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          : toHumanString(p.value.toString()),
    },
    {
      headerName: `Net Amount (${emoji.get(denom) || denom})`,
      field: "netAmount",
      valueGetter: (params) => {
        const balance =
          balances.get(params.data.address)?.amounts.get(denom) ?? 0;
        return balance * 1e-6; // Convert from micro units to whole tokens
      },
      valueFormatter: (p) => toHumanString(p.value.toString()),
    },
  ].concat(
    Array.from(emoji.entries()).map(([k, v]) => ({
      headerName: `${v} ${sumTotal(k)}`,
      field: k,
      hide: k != denom,
      valueFormatter: (p) =>
        p.value?.toLocaleString(undefined, {
          style: "percent",
          minimumFractionDigits: 2,
        }),
    }))
  );

  const defaultColDef = React.useMemo(() => {
    return { width: 150, cellStyle: {} };
  }, []);

  var agGrid = (
    <AgGridReact
      rowData={rows}
      defaultColDef={defaultColDef}
      columnDefs={colDefs}
      enableSorting
      rowClass="row-borders"
    />
  );

  const eligibleRecipients = rows
    .filter((row) => {
      const balance =
        balances.get(row.address?.toString())?.amounts.get(denom) ?? 0;
      const isExcluded = excludedWallets
        .split(",")
        .map((addr) => addr.trim())
        .includes(row.address.toString());
      return balance >= minAmountBaseUnit && !isExcluded;
    })
    .map((row) => ({
      address: row.address.toString(),
      balance:
        (balances.get(row.address.toString())?.amounts.get(denom) ?? 0) * 1e-6, // Convert to whole tokens
    }));

  useEffect(() => {
    console.log("Airdrop Emoji:", airdropEmoji);
    console.log("Airdrop Amount:", airdropAmount);
  }, [airdropEmoji, airdropAmount]);

  return (
    <>
      <div className="form">
        <h3>Airdrop Station</h3>

        <AirdropInput
          denom={denom}
          setDenom={setDenom}
          holdersOrLP={holdersOrLP}
          setHoldersOrLP={setHoldersOrLP}
          minAmount={minAmount}
          setMinAmount={setMinAmount}
          airdropEmoji={airdropEmoji}
          setAirdropEmoji={setAirdropEmoji}
          airdropAmount={airdropAmount}
          setAirdropAmount={setAirdropAmount}
          excludedWallets={excludedWallets}
          setExcludedWallets={setExcludedWallets}
          distributionType={distributionType}
          setDistributionType={setDistributionType}
          brackets={brackets}
          setBrackets={setBrackets}
        />

        <AirdropManager
          airdropEmoji={airdropEmoji}
          airdropAmount={airdropAmount}
          eligibleRecipients={eligibleRecipients}
          excludedWallets={excludedWallets || ""}
        />
        <Button onClick={() => setusdPrices(!usdPrices)}>
          Display in {usdPrices ? "$" : "🦄"} (1,000,000 🦄 ={" "}
          {(1000000 * uwuPrice).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
          )
        </Button>
      </div>
      <div className="grid">
        <div id="airdropGrid" className="ag-theme-quartz-dark">
          {agGrid}
        </div>
      </div>
    </>
  );
}

export default AirdropGrid;
