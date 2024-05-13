import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Authentication.css'

export default function LogIn() {

	const navigate = useNavigate(); //use to change screen after successful log in

	//handles email and password for authentication
	const [formData, setFormData] = useState({
		email: '',
		password: ''
		});
		const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
  
	//handle Log In for user
  	const handleSubmit = async (e) => {
		e.preventDefault();
		try { 
			const response = await fetch('http://localhost:3001/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: formData.email, password: formData.password })
			});
			const data = await response.json();
			if (response.status === 200) {
				localStorage.clear();
				console.log("Login Successful!");
				const token = data.token;
				//use for authentication of user
				localStorage.setItem('token', token);
				if (data.user.usertype == 'customer'){
					localStorage.setItem('customertoken', token);
					navigate('/RootCustomerAccount/CustomerAccount');
					localStorage.setItem('customeremail', formData.email)
				} else {
					localStorage.setItem('merchanttoken', token);
					navigate('/RootMerchantAccount/MerchantAccount');
				}
			} else {
				alert("Error: " + (data.error || "Error logging in"));
			}
		} catch (error) {
			alert('Error: ' + error.message);
		}
	}

  return (
    <>	
		<div className='split white-login' >
			<div className='signin-container'>
				<h1>Sign in to your</h1>
				<h1>Account</h1>
				<form onSubmit={handleSubmit} className="form">
					<label htmlFor="email"></label>
					<input type="email" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
					<br />
					<label htmlFor="password"></label>
					<input type="password" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
					<br />
					<button className='white-button' type="submit">Sign In</button>
				</form>
			</div>
		</div>
		<div className='split orange-login'>
			<div className='welcome-container'>
				<h1>Welcome to</h1>
				<h1>CropCart!</h1>
				<p>New here?</p>
				<button className='orange-button' ><Link to='/Register' >Sign up</Link></button>
			</div>
		</div>
    </>
  );
}
