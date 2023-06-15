
import {httpClient} from "@/Services/HttpClient.tsx";
import {ProfileService} from "@/Services/ProfileService.tsx";
import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);
	const [profileError, setProfileError] = useState(false);
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
					
					const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
					const metadataResponse = await fetch(userDetailsByIdUrl, {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
				
					
					const {user_metadata} = await metadataResponse.json();
					setUserMetadata(user_metadata);
				} catch (e) {
					console.log(e.message);
				}
			};
			
			void getUserMetadata();
			//Creates an Account to gain access to other paths
			const getAccount = async () => {
				try {
					const userFound = await httpClient.search("/users", {email: user.email});
					if (!userFound.data){
						let occupation = "Eh";
							await ProfileService.send(user.name, user.email, occupation);
					}
				}catch(err){
					setProfileError(true);
				}
			}
			void getAccount();

	}, [getAccessTokenSilently, user?.sub]);
	
	return (
		isAuthenticated && (
		<div>
			<div className="px-4 sm:px-0">
				<h3 className="text-base font-semibold leading-7 text-gray-900">Account Details</h3>
			</div>
			<div className="mt-6 border-t border-gray-100">
				<dl className="divide-y divide-gray-100">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.nickname}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
					</div>
				</dl>
			</div>
		</div>
		)
	);
};

/* Reference: I used tailwindcss component react code to render my account info. */

