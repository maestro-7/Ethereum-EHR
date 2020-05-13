// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
// var Doctor = artifacts.require("./Doctor.sol");
// var healthCare = artifacts.require("./healthCare.sol");
// var patient = artifacts.require("./patient.sol");
// var Ownable = artifacts.require("./Ownable.sol");
// var file = artifacts.require("./file.sol");
var optHealthCare = artifacts.require("./optimized_healthCare.sol");
module.exports = function(deployer) {
  // deployer.deploy(SimpleStorage,"Aniket");
  // deployer.deploy(Doctor)
  // deployer.deploy(patient)
  // deployer.deploy(healthCare)
  // deployer.deploy(Ownable)
  // deployer.deploy(file)
  deployer.deploy(optHealthCare);
  
};
