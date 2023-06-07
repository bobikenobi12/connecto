import Footer from "./components/Footer";

import { useProtectedQuery } from "./features/auth/authApiSlice";

function App() {
	const { isLoading } = useProtectedQuery();

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<Footer />
		</>
	);
}

export default App;
