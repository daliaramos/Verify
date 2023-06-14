
import {ProfileType, ReviewType} from "@/VerifyType.ts";
import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";

export type ProfileProps = ReviewType & {

};

export const Review = () => {
	//const { } = props;
	
	const [currentProfile, setCurrentProfile] = useState<ProfileType>();
	const { isAuthenticated, loginWithRedirect} = useAuth0();
	
	
	/*
	const fetchProfile = (props: ProfileProps) => {
		getNextProfileFromServer()
			.then((response) => setCurrentProfile(response))
			.catch((err) => console.log("Error in profile", err));
	}
	
	useEffect(() => {
		fetchProfile();
		console.log(currentProfile)
	}, []);
	
	*/
	
	return (
		isAuthenticated && (
			<div>
				<div className="px-4 sm:px-0">
					<h3 className="text-base font-semibold leading-7 text-gray-900">Review</h3>
				</div>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-100">
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
						</div>
					</dl>
				</div>
			</div>
		)
	)
}
