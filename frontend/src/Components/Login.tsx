import { updateAxios} from "@/Services/Auth.tsx";
import {context} from "msw";
import React, {useCallback, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	
	console.log(isAuthenticated)
	
	useEffect(() => {
		const setAccessToken = async () => {
			try {
				if (isAuthenticated) {
					const accessToken = await getAccessTokenSilently();
					if (accessToken) {
						await updateAxios(accessToken);
					}
				}
			} catch (e) {
				console.log(e.message);
			}
		};
			setAccessToken()
		}, [isAuthenticated]);
	return <button onClick={() => loginWithRedirect()}>Log In</button>;
};


