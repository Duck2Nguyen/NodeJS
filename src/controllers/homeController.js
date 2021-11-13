import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });  // đã khai báo ở viewEngine

    } catch (e) {
        console.log(e)
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    return res.send('post crud from sever')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    //  console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    else {
        return res.send('User not found')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let users = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: users
    });

}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    let users = await CRUDService.deleteUserData(userId);
    return res.render('displayCRUD.ejs', {
        dataTable: users
    });

}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}