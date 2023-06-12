import {getTokenFromStorage, updateAxios} from "@/Services/Auth.tsx";
import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	const [token, setToken] = useState();
	const [userId, setUserId] = useState();
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	
	console.log(isAuthenticated)
	
	const setAccessToken = async () => {
		try {
			const accessToken = await getAccessTokenSilently();
			localStorage.setItem("token", accessToken)
			
			
		} catch (e) {
			console.log(e.message);
		}
	};
	
	setAccessToken();
	return <button onClick={() => loginWithRedirect()}>Log In</button>;
};


