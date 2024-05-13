import { Link, useNavigate , Outlet} from 'react-router-dom';
import './cssFiles/MerchantAccount.css'

export default function MerchantAccount() {
	const isMerchantSignedIn = !!localStorage.getItem("merchanttoken");

	return (
		<>
			{ isMerchantSignedIn ? (
				<main>
					<h1> Hi Merchant! </h1>	
				</main>
			) : (
				<h1> Log In or Sign up </h1>	
			)	
			}		
		</>
	);
}