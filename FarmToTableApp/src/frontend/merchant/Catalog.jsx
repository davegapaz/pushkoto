import { useEffect, useState } from "react"
import './cssFiles/Catalog.css'
import AddProduct from "./addProduct";
import EditProduct from "./Edit";

export default function MCatalog(){
	const isMerchantSignedIn = !!localStorage.getItem("merchanttoken");

	const [products, setProducts ] = useState([])
    const [ sortBy, setSortBy] = useState([])
    const [showEditComponent, setShowEditComponent] = useState(false);
    const [IsWidgetOpen, setIsWidgetOpen] = useState(false);
    const [productIdToEdit, setProductIdToEdit] = useState();

    useEffect(() => {
        
        fetch( 'http://localhost:3001/get-product')
        .then(response => response.json())
        .then(body => {
            setProducts(body)
        })
    }, [])


    //function to sort product
    const sortProductsByName = () => {
        const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
        setSortBy("name");
    };  

    // const sortProductsByType = () => {
    //     const sortedProducts = [...products].sort((a, b) => a.Type.localeCompare(b.name));
    //     setProducts(sortedProducts);
    //     setSortBy("name");
    // };

    const sortProductsByPrice = () => {
        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
        setSortBy("price");
    };  


    //function to handle sorting button click
    const handleSortByClick = (option) => {
        switch(option) {
            case "name":
                sortProductsByName();
                break;
            case "price":
                sortProductsByPrice();
                break;
            default:
                break;
        }
    }

    //function to addProduct
    const addProduct = (newProducts) => {
        const updated = [...products,newProducts];
        setProducts(updated);
    }

    const handleEdit = async (id) => {
        setShowEditComponent(true); //shows the edit component to the website
        setID(id); //set the id of the current product to edit
    }


    const updateProduct = async (updatedProduct) => {
        // update the products array with the edited product
        const updatedProducts = products.map(product => {
            if(product._id === updatedProduct._id) {
                return updatedProduct;
            } else {
                return product;
            }
        });
        setProducts(updatedProducts); //this will change the state of the products
        setIsWidgetOpen(false); //this will indicate that the edit component is closed.
        setShowEditComponent(false); //close or remove the edit component
        
    }

    //this will set the current id
    const setID = async (id) => {
        setProductIdToEdit(id); //change the state of ProductIdToEdit. to always get the current productId of the product to edit
    }

	return (
		<>
			{isMerchantSignedIn ? (
				<main>
					<div className="merchantflexWrapper">
						<div className="TextBox">
							<h1>Product Listings</h1>                    
						</div>
						
						<div className="buttonWrapper">
							<a>Sort by:</a>
							<button className="merchantbutton" onClick={()=> handleSortByClick("name")}>Name</button>
							<button className="merchantbutton">Type</button>
							<button className="merchantbutton" onClick={()=> handleSortByClick("price")}>Price</button>
							<button className="merchantbutton">Quantity</button>
	
						</div>
	
						<div className="merchantProductListWrapper">
						{products.map((product,i) => (
							<div className="merchantProductListContainer" key={product.id}>
								<div className="imageContainer">
									<img src={product.image} alt="image"></img>
								</div>
								<a className="productName">{product.name}</a>
                                <a className="productDescription">{product.description}</a>
                                <a className="productType">{product.type}</a>
                                <a className="productQuantity">{product.quantity}</a>
                                <a className="productQuantity">{product.price}</a>
                                <button className="EditProduct" onClick={() => handleEdit(product._id)}>Edit</button>
							   
                            </div>
						   ))}
						</div>  


					 </div>
                     {/* Edit/update functionality*/}
                     {showEditComponent && <EditProduct update={updateProduct} id={productIdToEdit}/>}


                     {/* Add product functionality*/}
					 <div className="addProductWrapper">
						<div className="add">
							<h1></h1>
							<AddProduct add_product={addProduct}/>
						</div>
					</div>
				</main>
			) : (
				<h1>Log In or Sign UP</h1>
			)
			}
		</>
	);
}

// export default MCatalog;