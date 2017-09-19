module.exports = function (dirname, fileType, callbackFnct) {
  const fs = require('fs');
  const path = require('path');
  if (dirname && fileType && callbackFnct) {
    // console.log(dirname, fileType, callbackFnct);
    fs.readdir(dirname, (err, list) => {
      if (err) {
        return callbackFnct(err, null);
      }
      const newListToReturn = list.filter(obj => path.extname(obj) === `.${fileType}`);
      if (typeof callbackFnct === 'function') {
        callbackFnct(null, newListToReturn);
      }
    });
  } else {
    return 'Error, missing info';
  }
};
