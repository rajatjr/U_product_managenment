const User = require('../model/usermodel')
const Product = require('../model/productsmodel')
const jwt = require("jsonwebtoken")
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')


exports.createUser = async (req, res) => {
    try {
        let { name, email, password } = req.body

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);

        password = hashPassword;
        const us = await User.findOne({ where: { email } })
        if (!us) {
            const user = await User.create({
                name: name,
                email: email,
                password: password,
            })
            return res.status(200).json(user);
        }
        return (
            res.status(200).json({
                success: false,
                msg: 'User already registered'
            })
        )
    } catch (error) {
        console.log(error)
    }

};



exports.login = async (req, res) => {

    const { email, password } = await req.body;

    try {
        const findUser = await User.findOne({ where: { email } });
        const isMatchPwd = bcrypt.compareSync(password, findUser.password);
        if (isMatchPwd) {
            const token = jwt.sign({ user: findUser }, "shiva")
            res.status(200).json(token)
        }
        else {
            return res.status(400).json("Invalid Credentials");
        }
    }
    catch (error) {
        res.status(404).json({ msg: error });
    }
};

exports.addproducts = (async (req, res) => {

    let { Product_name, Product_Price, Product_category, user_id } = req.body
    const userId = user_id
    const product = await Product.create({
        Product_name,
        Product_Price,
        Product_category,
        userId
    })
    res.status(200).json({ success: true, data: product })
})


exports.getAllProducts = (async (req, res) => {
    try {
        const Allproducts = await Product.findAll({ where: { user_id: req.params.id } });
        await res.json(Allproducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

exports.productdetails = (async (req, res) => {
    const { id } = req.query;
    try {
        const details = await Product.findAll({ where: { id: { [Op.like]: `%${id}%` } } });
        await res.json(details);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

exports.deleteitems = (async (req, res) => {
    const { id } = req.query;
    try {
        const deleteditems = await Product.destroy({ where: { id: { [Op.like]: `%${id}%` } } });
        await res.json(deleteditems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


exports.finditems = (async (req, res) => {
    const { item } = req.query;
    try {
        const filteredProducts = await Product.findAll({ where: { Product_name: { [Op.like]: `%${item}%` } } });
        await res.json(filteredProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

exports.updateproducts = (async (req, res) => {
    const { id } = req.query;
    let { Product_name, Product_Price, Product_category } = await req.body
    await Product.update({
        Product_name,
        Product_Price,
        Product_category
    }, { where: { id: { [Op.like]: id } } })
    res.json("Product Updated Successfully")
})