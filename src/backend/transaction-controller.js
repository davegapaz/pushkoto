import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/ICS')

const OrderStatus = {
	0: "Pending",
	1: "Completed",
	2: "Canceled",
}

const Transaction = mongoose.model('Transaction', {
	productID: String,
	quantity: Number,
	status: { type: Number, enum: [0, 1, 2] },
	email: {type: String, ref: 'User'},
	dateOrderd: { type: Date, default: Date.now },
	time: { type: Date, default: Date.now }
});

//get all Transaction
const getTransaction = async (req, res) => {
	const transaction = await Transaction.find({});
	res.send(transaction)
}


// get Transaction by id
const getTransactionByid = async (req, res) => {
	const transaction = await Transaction.findOne({ id: req.query.id })
	res.send(transaction)
}

// save new Transaction
const addTransaction = async (req, res) => {
	const { id, productID, quantity, status, email, dateOrderd, time } = req.body
	const newTransaction = new Transaction({ id, productID, quantity, status, email, dateOrderd, time })
	const result = await newTransaction.save()

	if (result._id) {
		res.send({ success: true })
	} else {
		res.send({ success: false })
	}
}

// delete 
const deleteTransaction = async (req, res) => {
	const { id } = req.body
	const result = await Transaction.deleteOne({ id })
	if (result.deletedCount == 1) {
		res.send({ success: true })
	} else { 
		res.send({ success: false })
	}
	
}


export { getTransaction, getTransactionByid, addTransaction, deleteTransaction };