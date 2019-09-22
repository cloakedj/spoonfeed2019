const mP = require('./DontMissModels/mainPost');
const scwI =  require('./DontMissModels/smallCardImage');
const scwiI = require('./DontMissModels/smallCardNoImage');
const scwB = require('./DontMissModels/smallCardBg');
const dcnI = require('./DontMissModels/defaultCard');


let getData = (async () =>{
   const mPD = await mP();
   const scwID = await scwI();
   const scwiID = await scwiI();
   const scwBD = await scwB();
   const dcnID = await dcnI();
   return {mPD,scwID,scwiID,scwBD,dcnID};
})();

module.exports = getData;