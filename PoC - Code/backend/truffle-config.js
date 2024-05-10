/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network ID
    }
  },
compilers: {
  solc: {
    version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
    settings: {
      optimizer: {
        enabled: true,
        runs: 200   // Optimize for how many times you intend to run the code
      },
      evmVersion: "london"   // Optional: Adjust according to your Ethereum client version
    }
  }
}

};