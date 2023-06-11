import {AuthContext} from "@/App.tsx";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);
	
	const token = React.useContext(AuthContext);
	
	useEffect(() => {
		const getUserMetadata = async () => {
			const domain = "dev-icy4q2uffvluyg31.us.auth0.com";
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: `https://dev-icy4q2uffvluyg31.us.auth0.com/api/v2/`,
						scope: "read:current_user",
					},
				});
				
				console.log("access tojen", accessToken);
				
				const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
			
				
			
				const metadataResponse = await fetch(userDetailsByIdUrl, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				console.log(metadataResponse)
				const { user_metadata } = await metadataResponse.json();
				
				setUserMetadata(user_metadata);
			} catch (e) {
				console.log(e.message);
			}
		};
		
		void getUserMetadata();
	}, [getAccessTokenSilently, user?.sub]);
	
	
	return (
		isAuthenticated && (
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<h3>User Metadata</h3>
				
				{userMetadata ? (
					<pre>{JSON.stringify(userMetadata, null, 2)}</pre>
				) : (
					"No user metadata defined"
				)}
			</div>
		)
	);
};



