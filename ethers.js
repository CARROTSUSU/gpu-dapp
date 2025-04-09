<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
document.getElementById('connectBtn').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      document.getElementById('walletAddress').innerText = `Connected: ${address}`;
    } catch (err) {
      console.error(err);
      alert('Wallet connection failed');
    }
  } else {
    alert('MetaMask not found. Please install it.');
  }
});

</script>
