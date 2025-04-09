let provider, signer;
let walletAddress = null;
let score = 0;

// Connect to MetaMask
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

// GPU simulation
const gpu = new GPU();
const kernel = gpu.createKernel(function(seed) {
  let x = seed;
  for (let i = 0; i < 1024; i++) {
    x = Math.sin(x + i) * Math.cos(x - i);
  }
  return x;
}).setOutput([256]);

document.getElementById('runSim').onclick = () => {
  const seed = Math.random();
  const result = kernel(seed);
  score = result.reduce((acc, val) => acc + Math.abs(val), 0);
  document.getElementById('score').textContent = score.toFixed(4);
};

// Submit to blockchain (requires smart contract)
document.getElementById('submit').onclick = async () => {
  if (!walletAddress) return alert("Please connect wallet first.");

  const contractAddress = "ALAMAT_KONTRAK_ANDA";
  const contractABI = [
    // Ganti dengan ABI kontrak kamu
    "function submitScore(uint256 _score) public"
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  try {
    const tx = await contract.submitScore(Math.floor(score * 10000));
    await tx.wait();
    alert("Submitted to blockchain!");
  } catch (err) {
    console.error(err);
    alert("Failed to submit.");
  }
};
