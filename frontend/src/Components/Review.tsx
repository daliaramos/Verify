import {getNextProfileFromServer} from "@/Services/HttpClient.tsx";
import {ProfileType} from "@/VerifyType.ts";
import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export const Review = () => {
	const [currentProfile, setCurrentProfile] = useState<ProfileType>();
	const { isAuthenticated, loginWithRedirect} = useAuth0();

	
	const fetchProfile = () => {
		getNextProfileFromServer()
			.then((response) => setCurrentProfile(response))
			.catch((err) => console.log("Error in profile", err));
	}
	
	useEffect(() => {
		fetchProfile();
		console.log(currentProfile)
	}, []);
	
	
	
	return (
		isAuthenticated && (
				<div className="card card-compact w-96 bg-base-100 shadow-xl">
					<figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
					<div className="card-body">
						<h2 className="card-title">Shoes!</h2>
						<p>If a dog chews shoes whose shoes does he choose?</p>
						<div className="card-actions justify-end">
							<button className="btn btn-primary">Buy Now</button>
						</div>
					</div>
			</div>
		)
	)
}
