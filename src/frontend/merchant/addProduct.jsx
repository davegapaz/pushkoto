{/* 
!!!
Component for adding product to the catalog. 
    - capable of adding the product to the database
    - automatically update the state (no need for refresh)


!!!
*/}


import React, { useState } from 'react';


export default function AddProduct({add_product}) {

    const [formData, setFormData] = useState({
        //this object is the initial state of the formData
        name: '',
        description: '',
        type: '',
        quantity: '',
        image: '',
        price: '',

    });

    //once na nag input si user doon sa text field, mapupunta yung value nung text field doon sa object na ginagawa ni setFormData method
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // this will execute once submit button is clicked
    const handleSubmit =  async (event) => {
        event.preventDefault();
        try{
            const response = await fetch ('http://localhost:3001/add-product', {
                method: 'POST',
                headers: {
					'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: formData.name, description: formData.description, type: formData.type, quantity: formData.quantity, image: formData.image, price: formData.price})
            });
            if (response.ok) {
                add_product(formData);  //callback function which accepts the json formData. Itong JSON ung naglalaman ng mga details about the product na iaadd.
                
                //this will reset the text fields to blank
                setFormData({
                    name: '',
                    description: '',
                    type: '',
                    quantity: '',
                    image: '',
                    price: '',
                });
            } else {
                alert('failed to add product');
            }
        } catch (error) {
            console.log('error adding product:', error);
            alert("error occured");
        }

    };

    return (
        <div>
            <h1>Add Product</h1>
            {/* Form or text fields for adding product*/}
            <form onSubmit={handleSubmit}>
              
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <br />
                <label>Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                <br />
                <label>Type:</label>
                <input type="text" name="type" value={formData.type} onChange={handleChange} required />
                <br />
                <label>Quantity:</label>
                <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
                <br />
                <label>Image Link:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                <br />
                <label>Price:</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} required />
                <br />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
