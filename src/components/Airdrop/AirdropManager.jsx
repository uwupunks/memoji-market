import React, { useState, useEffect } from 'react';
import { Button, Select, SelectOption, NumberField, Box, Text } from '@interchain-ui/react';
import { useChain } from '@cosmos-kit/react';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';

// interface AirdropManagerProps {
//   airdropEmoji: string;
//   airdropAmount: string;
//   eligibleRecipients: Array<{ address: string; balance: number }>;
//   excludedWallets?: string;
// }

// type DistributionType = 'equal' | 'proRata' | 'bracketed' | 'weightedBracket';

// interface Bracket {
//   min: number;
//   max: number;
//   amount: number;
// }

// interface WeightedBracket {
//   minTokens: number;
//   maxTokens: number;
//   weight: number;
// }

export function AirdropManager({ 
  airdropEmoji, 
  airdropAmount, 
  eligibleRecipients, 
  excludedWallets
}) {
  const { address, getSigningStargateClient } = useChain("unicorn");
  const [filteredRecipients, setFilteredRecipients] = useState(eligibleRecipients);
  const [distributionType, setDistributionType] = useState('equal');
  const [brackets, setBrackets] = useState([{ min: 0, max: Infinity, amount: 0 }]);
  const [weightedBrackets, setWeightedBrackets] = useState([
    { minTokens: 0, maxTokens: 1000, weight: 1 },
    { minTokens: 1000, maxTokens: Infinity, weight: 2 }
  ]);

  useEffect(() => {
    const excludedAddresses = excludedWallets ? excludedWallets.split(',').map(addr => addr.trim()) : [];
    const filtered = eligibleRecipients.filter(recipient => !excludedAddresses.includes(recipient.address));
    setFilteredRecipients(filtered);
  }, [eligibleRecipients, excludedWallets]);

  const handleAirdrop = async () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!airdropEmoji || !airdropAmount) {
      alert("Please select an emoji and enter an amount for the airdrop.");
      return;
    }

    if (filteredRecipients.length === 0) {
      alert("There are no eligible recipients for the airdrop.");
      return;
    }

    try {
      const client = await getSigningStargateClient();
      
      const totalAmount = BigInt(Math.floor(parseFloat(airdropAmount) * 1e6)); // Convert to micro units

      let messages;

      switch (distributionType) {
        case 'equal':
          messages = createEqualDistributionMessages(totalAmount);
          break;
        case 'proRata':
          messages = createProRataDistributionMessages(totalAmount);
          break;
        case 'bracketed':
          messages = createBracketedDistributionMessages();
          break;
        case 'weightedBracket':
          messages = createWeightedBracketDistributionMessages(totalAmount);
          break;
      }

      const fee = {
        amount: [{ denom: "uwunicorn", amount: "5000" }],
        gas: "200000",
      };

      const result = await client.signAndBroadcast(address, messages, fee);

      if (result.code !== undefined && result.code !== 0) {
        alert(`Transaction failed with code ${result.code}: ${result.rawLog}`);
      } else {
        alert(`Airdrop successful! Transaction hash: ${result.transactionHash}`);
      }

    } catch (error) {
      console.error("Error during airdrop:", error);
      alert(`An error occurred during the airdrop: ${error.message}`);
    }
  };

  const createEqualDistributionMessages = (totalAmount) => {
    const amountPerRecipient = totalAmount / BigInt(filteredRecipients.length);
    return filteredRecipients.map(recipient => ({
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: MsgSend.fromPartial({
        fromAddress: address,
        toAddress: recipient.address,
        amount: [{ denom: airdropEmoji, amount: amountPerRecipient.toString() }]
      })
    }));
  };

  const createProRataDistributionMessages = (totalAmount) => {
    const totalBalance = filteredRecipients.reduce((sum, recipient) => sum + recipient.balance, 0);
    return filteredRecipients.map(recipient => {
      const recipientShare = (recipient.balance / totalBalance) * Number(totalAmount);
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.fromPartial({
          fromAddress: address,
          toAddress: recipient.address,
          amount: [{ denom: airdropEmoji, amount: Math.floor(recipientShare).toString() }]
        })
      };
    });
  };

  const createBracketedDistributionMessages = () => {
    return filteredRecipients.map(recipient => {
      const bracket = brackets.find(b => recipient.balance >= b.min && recipient.balance < b.max);
      const amount = bracket ? bracket.amount : 0;
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.fromPartial({
          fromAddress: address,
          toAddress: recipient.address,
          amount: [{ denom: airdropEmoji, amount: (amount * 1e6).toString() }]
        })
      };
    });
  };

  const createWeightedBracketDistributionMessages = (totalAmount) => {
    const recipientsByBracket = weightedBrackets.map(bracket => 
      filteredRecipients.filter(r => r.balance >= bracket.minTokens && r.balance < bracket.maxTokens)
    );

    const totalWeightedRecipients = recipientsByBracket.reduce((sum, recipients, index) => 
      sum + recipients.length * weightedBrackets[index].weight, 0
    );

    let messages= [];

    recipientsByBracket.forEach((recipients, bracketIndex) => {
      const bracketWeight = weightedBrackets[bracketIndex].weight;
      const bracketTotalAmount = (BigInt(recipients.length * bracketWeight) * totalAmount) / BigInt(totalWeightedRecipients);
      const amountPerWallet = bracketTotalAmount / BigInt(recipients.length || 1); // Avoid division by zero

      recipients.forEach(recipient => {
        messages.push({
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: MsgSend.fromPartial({
            fromAddress: address,
            toAddress: recipient.address,
            amount: [{ denom: airdropEmoji, amount: amountPerWallet.toString() }]
          })
        });
      });
    });

    return messages;
  };

  return (
    <Box>
      <Select
        label="Distribution Type"
        defaultSelectedItem={{ key: distributionType, label: distributionType, index: 0 }}
        onSelectItem={(item) => setDistributionType(item?.key)}
      >
        <SelectOption optionKey="equal" label="Equal Distribution" />
        <SelectOption optionKey="proRata" label="Pro Rata Distribution" />
        <SelectOption optionKey="bracketed" label="Bracketed Distribution" />
        <SelectOption optionKey="weightedBracket" label="Weighted Bracket Distribution" />
      </Select>

      {distributionType === 'bracketed' && (
        <Box>
          <Text>Brackets</Text>
          {brackets.map((bracket, index) => (
            <Box key={index}>
              <NumberField
                label={`Bracket ${index + 1} Min`}
                value={bracket.min}
                onChange={(value) => {
                  const newBrackets = [...brackets];
                  newBrackets[index].min = value;
                  setBrackets(newBrackets);
                }}
              />
              <NumberField
                label={`Bracket ${index + 1} Max`}
                value={bracket.max === Infinity ? 0 : bracket.max}
                onChange={(value) => {
                  const newBrackets = [...brackets];
                  newBrackets[index].max = value === 0 ? Infinity : value;
                  setBrackets(newBrackets);
                }}
              />
              <NumberField
                label={`Bracket ${index + 1} Amount`}
                value={bracket.amount}
                onChange={(value) => {
                  const newBrackets = [...brackets];
                  newBrackets[index].amount = value;
                  setBrackets(newBrackets);
                }}
              />
            </Box>
          ))}
          <Button onClick={() => setBrackets([...brackets, { min: 0, max: Infinity, amount: 0 }])}>
            Add Bracket
          </Button>
        </Box>
      )}

      {distributionType === 'weightedBracket' && (
        <Box>
          <Text>Weighted Brackets</Text>
          {weightedBrackets.map((bracket, index) => (
            <Box key={index}>
              <NumberField
                label={`Bracket ${index + 1} Min Tokens`}
                value={bracket.minTokens}
                onChange={(value) => {
                  const newBrackets = [...weightedBrackets];
                  newBrackets[index].minTokens = value;
                  setWeightedBrackets(newBrackets);
                }}
              />
              <Box>
                <NumberField
                  label={`Bracket ${index + 1} Max Tokens`}
                  value={bracket.maxTokens === Infinity ? 0 : bracket.maxTokens}
                  onChange={(value) => {
                    const newBrackets = [...weightedBrackets];
                    newBrackets[index].maxTokens = value === 0 ? Infinity : value;
                    setWeightedBrackets(newBrackets);
                  }}
                  isDisabled={bracket.maxTokens === Infinity}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={bracket.maxTokens === Infinity}
                    onChange={(e) => {
                      const newBrackets = [...weightedBrackets];
                      newBrackets[index].maxTokens = e.target.checked ? Infinity : 0;
                      setWeightedBrackets(newBrackets);
                    }}
                  />
                  Infinite
                </label>
              </Box>
              <NumberField
                label={`Bracket ${index + 1} Weight`}
                value={bracket.weight}
                onChange={(value) => {
                  const newBrackets = [...weightedBrackets];
                  newBrackets[index].weight = value;
                  setWeightedBrackets(newBrackets);
                }}
              />
              {index > 1 && (
                <Button onClick={() => {
                  const newBrackets = weightedBrackets.filter((_, i) => i !== index);
                  setWeightedBrackets(newBrackets);
                }}>
                  Remove Bracket
                </Button>
              )}
            </Box>
          ))}
          <Button onClick={() => setWeightedBrackets([...weightedBrackets, { minTokens: 0, maxTokens: Infinity, weight: 1 }])}>
            Add Weighted Bracket
          </Button>
        </Box>
      )}

      <Button onClick={handleAirdrop} disabled={!address || !airdropEmoji || !airdropAmount}>
        Send Airdrop {airdropEmoji ? `(${airdropEmoji})` : ''} {airdropAmount ? `${airdropAmount} tokens` : ''}
      </Button>
      <Text>Eligible Recipients: {filteredRecipients.length}</Text>
    </Box>
  );
}