const GroupcoinToken = artifacts.require("GroupcoinToken");
const TreasuryContract = artifacts.require("TreasuryContract");

module.exports = async function(deployer, network, accounts) {
    // Deploy the GroupcoinToken first
    await deployer.deploy(GroupcoinToken);
    const token = await GroupcoinToken.deployed();
    console.log('GroupcoinToken is deployed at: ', token.address);

    // Now deploy the TreasuryContract, passing in the address of the newly deployed GroupcoinToken
    await deployer.deploy(TreasuryContract, token.address);
    const treasury = await TreasuryContract.deployed();
    console.log('TreasuryContract is deployed at: ', treasury.address);
    console.log('TreasuryContract is linked with GroupcoinToken at address:', token.address);
};
