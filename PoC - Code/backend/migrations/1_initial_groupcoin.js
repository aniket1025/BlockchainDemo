const GroupcoinToken = artifacts.require("GroupcoinToken");

module.exports = function(deployer) {
  deployer.deploy(GroupcoinToken);
};
