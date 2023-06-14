
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PaperClipIcon } from '@heroicons/react/20/solid'


export const Profile = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);
	
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
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
					</div>
				</dl>
			</div>
		</div>
		)
	);
};



