const jwt = require('jsonwebtoken');
const UserModel = require("../models/user");
const {UploadClient} = require("@uploadcare/upload-client");

const client = new UploadClient({publicKey: process.env.UPLOADCARE_PUBLIC_KEY});

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"});
}

module.exports = {
    signUp: async function (req, res) {
        try {
            const {firstName, lastName, email, password} = req.body;
            const file = req.file;

            let imageUrl = '';

            if (file) {

                const result = await client.uploadFile(file.buffer, {
                    fileName: file.originalname,
                    contentType: file.mimetype,
                });

                imageUrl = `https://ucarecdn.com/${result.uuid}/`;
            }

            const isEmailExist = await UserModel.findOne({email});

            if (isEmailExist) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }

            const user = await UserModel.create({
                firstName,
                lastName,
                email,
                password,
                imageUrl
            });

            return res.status(201).json({
                user,
                token: generateToken(user._id)
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    login: async function (req, res) {
        try {
            const {email, password} = req.body;

            const user = await UserModel.findOne({email});
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'ایمیل نامعتبر است.'
                });
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'پسوورد نادرست است.'
                });
            }

            return res.json({
                user,
                token: generateToken(user._id)
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    getMe: async function (req, res) {
        const user = req.user;

        return res.status(200).json({user});
    },
};
