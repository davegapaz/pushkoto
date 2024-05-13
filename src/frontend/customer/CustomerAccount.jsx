import './Customer.css'

export default function CustomerAccount() {
	const isCutomerSignedIn = !!localStorage.getItem("customertoken");

	return (
		<>
			{isCutomerSignedIn ? (
				<main>
					<h1> Hi Customer</h1>
				</main>
			) : (
				<main>
					<h1> Log in or Sign Up</h1>
				</main>
			)
			}
		</>
	);
}