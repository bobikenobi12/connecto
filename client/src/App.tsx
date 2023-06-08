import { Box } from "@chakra-ui/react";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";

import { Outlet } from "react-router-dom";

function App() {
	return (
		<Box minH="100vh" bg="gray.100">
			<NavBar />
			<Outlet />
			<Footer />
		</Box>
	);
}

export default App;
