import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

await mongoose.connect('mongodb://127.0.0.1:27017/ICS')

const SECRET_KEY = "secret_key123456789";

const UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    usertype: String,
    email: String,
    password: String,
    cart: [{
        id: String,
        count: Number
    }]
});

const User = mongoose.model('User', UserSchema);


//get Customer
const getRegisteredUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email }, {password:0});
        res.send(user);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' });
    }
} 

//Added by: DAN
//ADDED to get all user depending on usertype (merchant or customer)
//Use: for merchants view of all users
const getAllUser = async (req,res) => {
	try { 
		const users = await User.find({usertype: req.query.usertype}, {password:0});
		res.send(users);
	} catch  (error) {
		res.status(500).json({error: 'unable to get users'});
	}
}

// get User by email
const logIn = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({email})
		if (!user){
			return res.status(401).json({ error: 'Invalid Credentials' });
		}
		if (await bcrypt.compare(password, user.password)){
			const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1hr' });
			return res.status(200).json({ user: user, message: 'Login Successful', token: token});
		}
		return res.status(401).json({ error: 'Invalid Credentials' });
	} catch (error) {
		return res.status(500).json({ error: 'Error logging in' });
	}
}

// add new User
const addUser = async (req, res) => {
	const {fname, lname, usertype, email, password } = req.body
	const gensalt = await bcrypt.genSalt(10);
	const pass = await bcrypt.hash(password, gensalt);
	const newUser = new User({fname, lname, usertype, email, password: pass});
	const result = await newUser.save()
	if (result._id) {
		res.send({ success: true })
	} else {
		res.send({ success: false })
	}
}

// delete 
const deleteUser = async (req, res) => {
	const { email } = req.body
	const result = await User.deleteOne({ email })
	if (result.deletedCount == 1) {
		res.send({ success: true })
	} else { 
		res.send({ success: false })
	}
	
}

const editUserCart = async (req, res) => {
    try {
        const { email, cart } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        user.cart = cart;
        const updatedUser = await user.updateOne({cart: cart});
    } catch (error) {
        console.error("Error editing user cart:", error);
        res.status(500).json({ success: false, message: "An error occurred while editing user cart." });
    }
};




export {getRegisteredUser, getAllUser, logIn, addUser, deleteUser, editUserCart };