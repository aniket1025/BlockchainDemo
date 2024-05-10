import Web3 from 'web3';

// Create a function to load the provider
const loadProvider = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return new Web3(window.ethereum);
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (window.web3) {
    return new Web3(window.web3.currentProvider);
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

export default loadProvider;
