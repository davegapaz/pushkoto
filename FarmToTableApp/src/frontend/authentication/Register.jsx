import { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

export default function Register() {
	
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    usertype: 'customer',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('User added successfully!');
        setFormData({
          fname: '',
          lname: '',
          usertype: 'customer',
          email: '',
          password: ''
        });
      } else {
        alert('Failed to add user. Please try again.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
		<div className='split orange-reg'>
			<div className='welcome-container'>
				<h1>Welcome back to</h1>
				<h1>CropCart!</h1>
				<p>Already have an account?</p>
				<button className='orange-button' ><Link to='/'>Sign in</Link></button>
			</div>
		</div>
		<div className='split white-reg'>
			<div className='register-container'>
				<h1>Create Account!</h1>
				<form onSubmit={handleSubmit} className="form">
					<input type="text" id="fname" name="fname" placeholder='First Name' value={formData.fname} onChange={handleChange} required />
					<br />
					<input type="text" id="lname" name="lname" placeholder='Last Name' value={formData.lname} onChange={handleChange} required />
					<br />
					{/* add admin muna kasi we have different database, para maregister muna yung admin account na gagamitin nyo */}
					{/* <select id="usertype" name="usertype" value={formData.usertype} onChange={handleChange}>
						<option value="customer">Customer</option>
						<option value="merchant">Merchant</option>
					</select> */}
					<input type="email" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
					<br />
					<input type="password" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
					<br />
					<button className="white-button" type="submit">Submit</button>
				</form>
			</div>
		</div>
    </>
  );
}
