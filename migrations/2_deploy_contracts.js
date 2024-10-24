const Caller = artifacts.require("Caller");
const Receiver = artifacts.require("Receiver");
const PensionFund = artifacts.require("PensionFund");

module.exports = function (deployer) {
  deployer.deploy(Caller);
  deployer.deploy(Receiver);
  // Deploy PensionFund with no parameters now
  deployer.deploy(PensionFund);
};