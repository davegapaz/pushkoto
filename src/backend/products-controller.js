import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/ICS')

const ProductType = {
	1: "Staple",
	2: "Fruits and Vegetables",
	3: "Livestock",
	4: "Seafood",
	5: "Others"
}

const Product = mongoose.model('Product', {
	name: String,
	description: String,
	type: Number,
	quantity: String,
	image: String,
	price: Number
});

//get all Product
const getProduct = async (req, res) => {
	const product = await Product.find({});
	res.send(product)
}


// get Product by id
const getProductByid = async (req, res) => {
	const product = await Product.findOne({ id: req.query.id })
	res.send(product)
}

// save new Product
const addProduct = async (req, res) => {
	const { id, name, description, type, quantity } = req.body
	const newProduct = new Product({ id, name, description, type, quantity })
	const result = await newProduct.save()

	if (result._id) {
		res.send({ success: true })
	} else {
		res.send({ success: false })
	}
}

//update a product
const updateProduct = async (req,res) => {
	const updateProduct = await Product.updateOne({_id: req.body._id}, 
													{$set: {
															_id: req.body._id,
															name: req.body.name,
															description: req.body.description,
															type: req.body.type,
															quantity: req.body.quantity,
															image: req.body.image,
															price: req.body.price		
														}
													}
	
	)
	res.send(updateProduct);
}

// delete 
const deleteProduct = async (req, res) => {
	const { id } = req.body
	const result = await Product.deleteOne({ id })
	if (result.deletedCount == 1) {
		res.send({ success: true })
	} else { 
		res.send({ success: false })
	}
	
}


export { getProduct, getProductByid, addProduct, deleteProduct, updateProduct };