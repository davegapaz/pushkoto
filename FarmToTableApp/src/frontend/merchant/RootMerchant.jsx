import {Outlet, useNavigate, Link} from 'react-router-dom'

export default function RootMerchant() {
	const isMerchantSignedIn = !!localStorage.getItem("merchanttoken");

    const handleSignOut = () => {
		localStorage.clear();
        useNavigate('/')
    }
    
    return (
        <>
            <nav>
                {isMerchantSignedIn ? (
					<>
						<header className="CustomerHeader">
							<div className="left">
								<a className="NameOfApp">CropCart</a>
								<img src={'https://th.bing.com/th/id/OIP.07DUnE60ZtI7251ulRVYpQHaHU?rs=1&pid=ImgDetMain'} alt="image" onClick={() => handleClickOnShoppingCart()}>{/*  lagay mo sa src ung image ng shopping cart para*/}</img>
							</div>
							<div className="right">
								<div className="nav-container">
									<Link to='/RootMerchantAccount/MerchantAccount'>Account</Link>
									<Link to='/RootMerchantAccount/MCatalog'>Catalog</Link>
									<Link to='/RootMerchantAccount/Customers'>Customers</Link>
									<Link to='/' onClick={handleSignOut} >Sign Out</Link>
								</div>
							</div>
						</header>
				   </>	
                ) : (
                    <>
                        <Link to='/'>Log In</Link>
                        <Link to='/Register'>Sign Up</Link>       
                    </>
                )}
            </nav>
            <Outlet/>
        </>

    )
}