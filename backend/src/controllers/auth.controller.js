const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(401).json({
                message: "Invalid emial"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function logoutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User Logged out successfully"
    });
}

async function registerFoodPartner(req, res) {
    try {
        const { name, email, password, phone, address, contactName } = req.body;

        const isAccountAlreadyExists = await foodPartnerModel.findOne({
            email
        })

        if (isAccountAlreadyExists) {
            return res.status(400).json({
                message: "Food partner account already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword,
            phone: phone || 'Not provided',
            address: address || 'Not provided',
            contactName: contactName || name
        })

        const token = jwt.sign({
            id: foodPartner._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.status(201).json({
            message: "Food partner registered successfully",
            foodPartner: {
                _id: foodPartner._id,
                email: foodPartner.email,
                name: foodPartner.name
            }
        })
    } catch (error) {
        console.error('Food partner registration error:', error)
        res.status(500).json({ message: "Internal server error" })
    }
}

async function loginFoodPartner(req, res) {

    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

async function logoutFoodPartner(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}

async function getCurrentUser(req, res) {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Try to find as user first
        const user = await userModel.findById(decoded.id);
        if (user) {
            return res.status(200).json({
                user: {
                    _id: user._id,
                    email: user.email,
                    fullName: user.fullName
                },
                userType: 'user'
            });
        }
        
        // Try to find as food partner
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (foodPartner) {
            return res.status(200).json({
                user: {
                    _id: foodPartner._id,
                    email: foodPartner.email,
                    name: foodPartner.name
                },
                userType: 'foodPartner'
            });
        }
        
        return res.status(404).json({ message: "User not found" });
        
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getCurrentUser
}