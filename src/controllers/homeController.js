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
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayCrud: displayCrud,
};
