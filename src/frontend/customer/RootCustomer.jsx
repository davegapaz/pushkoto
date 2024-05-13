import { Link, useNavigate, Outlet } from 'react-router-dom';

import './RootCustomer.css'

export default function RootCustomer() {
	const isCutomerSignedIn = !!localStorage.getItem("customertoken");

    const handleSignOut = () => {
		localStorage.clear();
        useNavigate('/')
    }

	return (
		<>
				{isCutomerSignedIn? (
						<>
						 <header className="CustomerHeader">
							<div className="left">
								<a className="NameOfApp">CropCart</a>
								<img src={'https://th.bing.com/th/id/OIP.07DUnE60ZtI7251ulRVYpQHaHU?rs=1&pid=ImgDetMain'} alt="image" onClick={() => handleClickOnShoppingCart()}>{/*  lagay mo sa src ung image ng shopping cart para*/}</img>
							</div>
							<div className="right">
								<div className="nav-container">
									<Link to='/RootCustomerAccount/CustomerAccount' >Account</Link>
									<Link to='/RootCustomerAccount/CCatalog' >Catalog</Link>
									<Link to='/RootCustomerAccount/ShoppingCart'>Shopping Cart</Link>
									<Link to='/' onClick={handleSignOut} >Sign Out</Link>
								</div>
							</div>
							</header>
						</>	
					) : (
						<>
							<li><Link to='/'>Log In</Link></li>
							<li><Link to='/Register'>Sign Up</Link></li>
						</>
					)
				}
			<Outlet />
		</>
	);
}