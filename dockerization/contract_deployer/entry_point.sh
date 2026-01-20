#!/bin/sh

echo "---SLEEPING WHILE HARDHAT NODE STARTS---"
sleep 10
npx hardhat ignition deploy --network testnet_docker ignition/modules/PGCToken.ts