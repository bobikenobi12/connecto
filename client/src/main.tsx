import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "./App";

import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

import ForgotPasswordForm from "./pages/ForgotPassword";

import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import PeopleListPage from "./pages/PeopleListPage";

import Hero from "./components/Hero";

import Events from "./pages/Events";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<Provider store={store}>
				<Router>
					<Routes>
						<Route element={<App />}>
							<Route path="/" element={<Hero />} />
							<Route
								path="/terms-and-conditions"
								element={<TermsAndConditions />}
							/>
							<Route
								path="/privacy-policy"
								element={<PrivacyPolicy />}
							/>
							<Route
								path="/people"
								element={<PeopleListPage />}
							/>
							<Route path="/events" element={<Events />} />8
						</Route>
						<Route path="/sign-up" element={<SignUpPage />} />
						<Route path="/sign-in" element={<SignInPage />} />
						<Route
							path="/forgot-password"
							element={<ForgotPasswordForm />}
						/>
						<Route path="*" element={<h1>404</h1>} />
					</Routes>
				</Router>
			</Provider>
		</ChakraProvider>
	</React.StrictMode>
);
