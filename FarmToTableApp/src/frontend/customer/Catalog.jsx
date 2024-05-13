import { useEffect, useState } from "react"
import './Catalog.css'

export default function Catalog(){
	const isCutomerSignedIn = !!localStorage.getItem("customertoken");

	const [products, setProducts ] = useState([])
    const [sortBy, setSortBy] = useState([])
	const [cart, setCart] = useState([])

    useEffect(() => {
        fetch( 'http://localhost:3001/get-product')
        .then(response => response.json())
        .then(body => {
            setProducts(body)
        });
    }, [])

	useEffect(() => {
		const email = localStorage.getItem("customeremail")
		fetch(`http://localhost:3001/get-user?email=${email}`)
		.then(response => response.json())
		.then(body => {
			setCart(body.cart)
			console.log(cart)
		});
	}, [])

	const addToCart = async (product) => {
        const productID = product._id.toString();
        const existingItem = cart.find(item => item.id === productID);
        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === productID ? { ...item, count: item.count + 1 } : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { id: productID, count: 1 }]);
        }
        await handleEdit();
    }

	const handleEdit = async (e) => {
		try { 
			const response = await fetch('http://localhost:3001/editUserCart', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: localStorage.getItem("customeremail"), cart: cart })
			});
		} catch (error) {
			alert('Error: ' + error.message);
		}
	}

	return (
		<>
			{isCutomerSignedIn ? (
				<main>
					<div className="rounded-box">
						<div className="box-content">
							<h2>What is CropCart?</h2>
							<p>CropCart is an innovative online platform tailored for agricultural trade. It streamlines the process of buying and selling agricultural products, fostering seamless transactions between farmers and buyers. With CropCart, farmers gain access to a broader market, while buyers enjoy a diverse selection of quality produce. The platform facilitates efficient and transparent transactions, empowering stakeholders in the agricultural ecosystem.</p>
						</div>
					</div>


					<div className="buttons-container">
						<button className="B">Sort by:</button>
						<button className="B">Name</button>
						<button className="B">Type</button>
						<button className="B">Price</button>
						<button className="B">Quantity</button>
					</div>
					
					<br></br>
					<br></br>
					<br></br>
					
					<div className="main-products-container">
						{products.map((product) => (
							<div key={product.id} className="product-cards">
								<div className="image-container">
									<img src={product.image}></img>
								</div>
								<div className="text-container">
									<h2>{product.name}</h2>
									<h3>${product.price}</h3>
								</div>
								<div className="button-container">
									<button className="addToCart-button" onClick={() => addToCart(product)}>Add to Cart</button>
								</div>
							</div>
						))}
					</div>
				</main>
			) : (
				<main>
					<h1> Log in or Sign Up</h1>
				</main>
			)
			}
		</>
	);
}