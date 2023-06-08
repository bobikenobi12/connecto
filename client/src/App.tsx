import Footer from "./components/Footer";
import NavBar from "./components/Navbar";

import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<NavBar />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
