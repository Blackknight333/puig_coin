let provider;
let signer;
let contract;
let balance;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
  "function transfer(address to, uint256 value) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)"
];

async function connectWallet() {
  /*if (!window.ethereum) {
    alert("Instala MetaMask");
    return;
  }*/

  //provider = new ethers.BrowserProvider(window.ethereum);
  provider = new ethers.JsonRpcProvider();
  // await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();



  const address = await signer.getAddress();
  document.getElementById("account").innerText = `Conectado: ${address}`;

  contract = new ethers.Contract(contractAddress, abi, signer);
  balance = await contract.balanceOf(address);
  console.log(balance)
  document.getElementById("balance").innerText = `Pugies: ${balance}`
}

async function sendTokens() {
  const to = document.getElementById("to").value;
  console.log(to)
  const amount = document.getElementById("amount").value;
  console.log(amount)
  console.log(ethers.parseUnits(amount, 0))

  const tx = await contract.transfer(
    to,
    //ethers.parseUnits(amount, 18)
    ethers.parseUnits(amount, 0)

  );

  /*const tx = await contract.transfer(
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    //ethers.parseUnits(amount, 18)
    2000

  );*/

  await tx.wait();
  alert(`Transacción completada \n Sent ${ethers.parseUnits(amount, 0)} to ${to}`);
}
