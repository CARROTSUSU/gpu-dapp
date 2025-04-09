let provider, signer;
let walletAddress = null;

// Connect Metamask
document.getElementById('connectBtn').onclick = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    walletAddress = await signer.getAddress();
    document.getElementById('walletAddress').textContent = "Connected: " + walletAddress;
  } else {
    alert("Please install MetaMask");
  }
};

// GPU.js simulation
const gpu = new GPU();
const kernel = gpu.createKernel(function(seed) {
  let x = seed;
  for (let i = 0; i < 1024; i++) {
    x = Math.sin(x + i) * Math.cos(x - i);
  }
  return x;
}).setOutput([256]);

let score = 0;
document.getElementById('runSim').onclick = () => {
  const seed = Math.random();
  const result = kernel(seed);
  score = result.reduce((acc, val) => acc + Math.abs(val), 0);
  document.getElementById('score').textContent = score.toFixed(4);
};

// Submit placeholder
document.getElementById('submit').onclick = () => {
  if (!walletAddress) return alert("Please connect wallet first.");
  alert(`Simulated submit: ${score.toFixed(4)} by ${walletAddress}`);
  // Nanti kirim ke smart contract di sini
};
