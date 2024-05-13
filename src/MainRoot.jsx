import { Outlet, Link } from 'react-router-dom';

export default function MainRoot() {
	return (
	  <>
		<nav>
		  <ul>
			{/* <li><Link to='/'>Home</Link></li> */}
			{/* <li><Link to='/Register'>Register</Link></li> */}
			{/* <li><Link to='/LogIn'>Log In</Link></li> */}
			{/* <li><Link to='/Shopping Cart'>Shopping Cart</Link></li> */}
		  </ul>
		</nav>
		<Outlet/>
	  </>
	);
  }
  
  