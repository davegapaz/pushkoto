import { useEffect, useState } from "react";
import './ShoppingCart.css';

export default function ShoppingCart() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        fetch('http://localhost:3001/get-product')
            .then(response => response.json())
            .then(body => {
                setProducts(body);
            })
            .finally(() => setIsLoading(false)); // Set loading state to false after fetch
    }, []);

    useEffect(() => {
        const email = localStorage.getItem("customeremail");
        fetch(`http://localhost:3001/get-user?email=${email}`)
            .then(response => response.json())
            .then(body => {
                setCart(body.cart);
                console.log(cart);
            })
            .finally(() => setIsLoading(false)); // Set loading state to false after fetch
    }, []);

    function totalCount(cart) {
        let totalCount = 0;
        cart.forEach((element, index) => {
            totalCount += element.count;
        });
        return totalCount;
    }

    const removeFromCart = async (product) => {
        const index = cart.findIndex(item => item.id === product.id);
        const val = [...cart];
        if (val[index].count > 1) {
            val[index] = { ...val[index], count: val[index].count - 1 };
            setCart(val);
        } else {
            val.splice(index, 1);
            setCart(val);
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

    function getItemDetails(productId) {
        return products.find(product => product._id === productId);
    }

    if (isLoading) {
        return <div>Loading...</div>; // Render loading indicator while fetching data
    }

    return (
        <main>
            <div className="label-container">
                <div className="label-left">
                    <h1>Logo</h1>
                    <h1>Shopping Cart</h1>
                </div>
                <div className="label-right">
                    <h1>Total Items: {totalCount(cart)}</h1>
                </div>
            </div>
            <div className="cart-container">
                {cart.map((item, index) => {
                    const product = getItemDetails(item.id);
                    return (
                        <div key={index} className="items-container">
                            <div className="image-container">
                                <img src={product.image}></img>
                            </div>
                            <div className="product-name">
                                <h3>Product: {product.name}</h3>
                                <h3>Type: {product.type}</h3>
                            </div>
                            <div className="product-quantity">
                                <h3>Quatity</h3>
                                <h3>{cart[index].count}</h3>
                            </div>
                            <div className="product-price">
                                <h3> Price</h3>
                                <h3>{product.price}</h3>
                            </div>
                            <div className="xbutton-container">
                                <button className="x-button" onClick={() => removeFromCart(item)}>Delete Item</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
