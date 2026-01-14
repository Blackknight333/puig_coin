let provider;
let signer;
let contract;
let balance;


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
/*const abi = [
  "function transfer(address to, uint256 value) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)"
];*/

let lista = ""
for(let i = 0; i<accounts.length; i++){
  lista += `<option value="${i}">${accounts[i].name}</option>`
}
console.log(lista)
document.getElementById("accounts").innerHTML = lista;
document.getElementById("to").innerHTML = lista;
let value_from_lista;

async function connectWallet() {
  console.log("CALLED connectWallet")
  console.log(accounts[0].name)
  /*if (!window.ethereum) {
    alert("Instala MetaMask");
    return;
  }*/

  //provider = new ethers.BrowserProvider(window.ethereum);
  provider = new ethers.JsonRpcProvider();
  // await provider.send("eth_requestAccounts", []);
  value_from_lista = document.getElementById("accounts").value
  console.log(accounts[value_from_lista].address)
  signer = await provider.getSigner(accounts[value_from_lista].address);



  const address = await signer.getAddress();
  document.getElementById("account").innerText = `Conectado: ${address}`;

  contract = new ethers.Contract(contractAddress, abi, signer);
  balance = await contract.balanceOf(address);
  console.log("BALANCE: " + balance)
  document.getElementById("balance").innerText = `Pugies: ${balance}`
}

async function sendTokens() {
  let index = document.getElementById("to").value
  console.log(index)
  let to = accounts[index].address
  //const to = document.getElementById("to").value;
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
