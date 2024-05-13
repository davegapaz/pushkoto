{/* 
!!!
    Edit component
        - is capable to edit the products. Nagrereflect din ung edit/changes sa database
        - automatically changes its state. no need to refresh the site to show the edited information of the products

        feature to work on: nakalagay na sa text field ung initial values para pag di na ieedit, di na need irewrite sa text field.
!!!
*/}

import React, {useState} from 'react';

import './cssFiles/Edit.css';

export default function EditProduct({update,id}) {
    const [formData, setFormData] = useState({
        _id: id,
        name: '',
        description: '',
        type: '',
        quantity: '',
        image: '',
        price: '',
    });

    //same logic sa add product. inaappend ung current name and value sa object na cinecreate ni setFormData
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }


    //this will execute once the submit button is clicked
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch ('http://localhost:3001/update-product', {
                method: 'POST',
                headers: {
					'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: formData, name: formData.name, description: formData.description, type: formData.type, quantity: formData.quantity, image: formData.image, price: formData.price})

            });
            if (response.ok) {
                update(formData); //this contains the updated details of the product
            } else {
                alert('failed to edit product');
            }
        } catch (error) {
            console.log('error adding product:', error);
            alert("error occured");
        }
    }


    //same logic with addProduct
    return (
        <div>
            <h1>Edit Product</h1>
            
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
    )
}