const PARAMS = require("./params");

function paramValidator(params) {
  let updateData = {};
  //console.log(params)
  //console.log(params["important"])
 // console.log(Object.keys(params))
  PARAMS.forEach(ele => {
    if (ele in params) {
        console.log(ele+":"+params[ele]);
        
        updateData[`tasks.$.${ele}`] = params[ele];
    }

    //console.log(ele)
   
  });

  return updateData;
}

module.exports = paramValidator;
