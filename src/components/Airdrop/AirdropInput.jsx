import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  TextField,
  NumberField,
  Box,
  Select,
  SelectOption,
  Divider,
} from "@interchain-ui/react";
import { fromBech32 } from "@cosmjs/encoding";
import { supplyContext, trackersContext } from "./utils/context";
import { useChain } from "@cosmos-kit/react";
import { Coin, StdFee } from "@cosmjs/stargate";
import { emoji } from "./utils/Consts";
import { disDenom } from "./utils/utils";

export default function AirdropInput({
  denom,
  setDenom,
  holdersOrLP,
  setHoldersOrLP,
  minAmount,
  setMinAmount,
  airdropEmoji,
  setAirdropEmoji,
  airdropAmount,
  setAirdropAmount,
  excludedWallets,
  setExcludedWallets,
  distributionType,
  setDistributionType,
  brackets,
  setBrackets,
}) {
  const supply = useContext(supplyContext);
  const ctx = useChain("unicorn");

  // Add this function to safely get the label
  const getSafeLabel = (denom) => {
    if (!denom) return "Select Airdrop Emoji";
    return disDenom(denom, emoji);
  };

  // Safeguard function for setters
  const safeSetter = (setter) => (value) => {
    if (typeof setter === "function") {
      setter(value);
    } else {
      console.warn("Setter function not provided");
    }
  };

  return (
    <Box>
      <Select
        label="Search Emoji"
        defaultSelectedItem={{
          key: denom,
          label: disDenom(denom, emoji),
          index: Array.from(supply.keys()).indexOf(denom),
        }}
        onSelectItem={(e) => setDenom(e.key)}
      >
        {Array.from(supply.keys()).map((d) => (
          <SelectOption optionKey={d} label={disDenom(d, emoji)} key={d}>
            {disDenom(d, emoji)}
          </SelectOption>
        ))}
      </Select>
      <Divider orientation="vertical" />
      <Select
        label="Target"
        defaultSelectedItem={{
          key: holdersOrLP ? "Holders" : "LP",
          label: holdersOrLP ? "Holders" : "LP",
          index: holdersOrLP ? 0 : 1,
        }}
        onSelectItem={(e) => setHoldersOrLP(e.key === "Holders")}
      >
        <SelectOption optionKey="Holders" label="Holders" />
        <SelectOption optionKey="LP" label="LP" />
      </Select>
      <Divider orientation="vertical" />
      <NumberField
        label="Minimum Amount"
        placeholder="Enter minimum amount"
        defaultValue={0}
        onChange={(value) => {
          setMinAmount(value);
        }}
      />
      <Divider orientation="vertical" />
      <Select
        label="Airdrop Emoji"
        defaultSelectedItem={{
          key: airdropEmoji || "",
          label: getSafeLabel(airdropEmoji),
          index: airdropEmoji
            ? Array.from(supply.keys()).indexOf(airdropEmoji)
            : -1,
        }}
        onSelectItem={(item) => safeSetter(setAirdropEmoji)(item?.key)}
      >
        <SelectOption optionKey="" label="Select Airdrop Emoji">
          Select Airdrop Emoji
        </SelectOption>
        {Array.from(supply.keys()).map((d) => (
          <SelectOption optionKey={d} label={disDenom(d, emoji)} key={d}>
            {disDenom(d, emoji)}
          </SelectOption>
        ))}
      </Select>
      <Divider orientation="vertical" />
      <NumberField
        label="Airdrop Amount"
        placeholder="Enter airdrop amount"
        defaultValue={0}
        onChange={(value) => {
          safeSetter(setAirdropAmount)(value.toString());
        }}
      />
      <Divider orientation="vertical" />
      <TextField
        id="excluded-wallets"
        label="Excluded Wallets"
        placeholder="Enter comma-separated wallet addresses"
        value={excludedWallets}
        onChange={(e) => {
          safeSetter(setExcludedWallets)(e.target.value);
        }}
      />
    </Box>
  );
}
