const Student = require('../models/studentSchema');

// render home page
module.exports.homePage = async function (req, res) {
  const students = await Student.find({});
  return res.render('home', { students });
};

//Controllers are responsible for handling incoming requests and returning responses to the client. 
