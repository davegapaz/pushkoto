import { useEffect, useState } from "react";
import './cssFiles/CustomerList.css';

export default function CustomerList() {
	const isMerchantSignedIn = !!localStorage.getItem("merchanttoken");

	const [users, setUsers] = useState([]);

    //fetch the date from the mongodb, using the get method from the user-controller.js
    useEffect( () => {
        fetch( 'http://localhost:3001/get-all-user?usertype=customer')
        .then(response => response.json())
        .then(body => {
            setUsers(body)
			console.log(body);
        })
    }, [])

	return (
		<>
			{ isMerchantSignedIn ? (
				<main>
					<h1>List of Customers</h1>
					<div className="listWrapper">
						<div className="customerWrapper">
						{users.map((user,i) => (
								<div className="customerContainer" key={user._id}>
									<a className="nameOfCustomer">{user.fname} {user.lname}</a>
									<a className="userType">user type: {user.usertype}  </a>
									<a className="email">Email: {user.email}  </a>
								</div>
							))}
						</div>
					</div>
				</main>
			) : (
				<h1> Log In or Sign up </h1>	
			)	
			}		
		</>
	);
}