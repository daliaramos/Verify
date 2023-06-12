import {httpClient} from "@/Services/HttpClient.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";


export const updateAxios = async (token: string) => {
	httpClient.interceptors.request.use(
		async (config) => {
			// @ts-ignore
			config.headers = {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			};
			
			return config;
		},
		(error) => {
			console.error("REJECTED TOKEN PROMISE");
			Promise.reject(error);
		}
	);
};




//Will return a token from our backend /login route. Call this funtion if we don't have a token.
export async function getLoginTokenFromServer(email){
	let password = "Yoyololosss";
	const login_result = await httpClient.post("/login", {email, password});
	return login_result.data
}

export function getPayloadFromToken(token: string){
	const base64Url = token.split(".")[1];
	if(base64Url == null){
		console.log("Token has no payload");
	}
	// Mostly ignore me, taken from JWT docs, this extracts the text payload from our token
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
	
	const payload = JSON.parse(jsonPayload);
	console.log(payload);
	return payload;
}
function getUserIdFromToken(token: string) {
	const payload = getPayloadFromToken(token);
	return payload.userId;
}
