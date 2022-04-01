import db from '../models/index';
import crudService from '../services/crudService';
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log('---------');
    console.log(data);
    console.log('---------');
    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let getAboutPage = (req, res) => {
  return res.render('test/about.ejs');
};

let getCRUD = async (req, res) => {
  try {
    //return res.send('get CRUD with TT');
    return res.render('crud.ejs');
  } catch (error) {
    console.log(error);
  }
};
let postCRUD = async (req, res) => {
  try {
    let message = await crudService.createNewUser(req.body);
    console.log(message);
    return res.send('crud.ejs');
  } catch (error) {
    console.log(error);
  }
};
let displayCrud = async (req, res) => {
  let data = await crudService.getAllUser();
  console.log('---------');
  console.log(data);
  return res.render('displayCrud.ejs', {
    dataTable: data,
  });
  //return res.send('ok display ');
};
let getEditCrud = async (req, res) => {
  let userId = req.query.id;
  //console.log(userId);
  if (userId) {
    let userData = await crudService.getUserById(userId);
    //console.log(userData);
    // return res.send('user found ');
    return res.render('editCrud.ejs', {
      user: userData,
    });
  } else {
    return res.send('user not found ');
  }
};
let putCrud = async (req, res) => {
  let data = req.body;
  let allUsers = await crudService.updateUserData(data);
  return res.render('displayCrud.ejs', {
    dataTable: allUsers,
  });
  //return res.send('edit done');
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await crudService.deleteUserById(id);

    let data = await crudService.getAllUser();
    return res.render('displayCrud.ejs', {
      dataTable: data,
    });

    //return res.send('delete user succeed');
  } else {
    return res.send('user not found');
  }
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayCrud: displayCrud,
  getEditCrud: getEditCrud,
  putCrud: putCrud,
  deleteCRUD: deleteCRUD,
};
