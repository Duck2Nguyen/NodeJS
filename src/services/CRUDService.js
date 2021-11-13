import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcypt = await hashPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve("success roi nhe");
        } catch (e) {
            reject(e);
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,    // mục đích để lấy về mảng các object bỏ thừa
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let user = await db.User.findByPk(id, {  // Cách này dùng dc nhưng tìm qua key:id
            //     raw: true,
            // });
            let user = await db.User.findOne({
                where: { id: id },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve()
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserData = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: false
            })
            if (user) {
                user.destroy();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
            else {
                resolve()
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserData: deleteUserData,
}