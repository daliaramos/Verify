import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {Navigate} from "react-router-dom";

export const Review = () => {
	const { isAuthenticated, loginWithRedirect} = useAuth0();
	
	return (
		isAuthenticated && (
			<div>
			
			</div>
		)
	)
}
