import {updateAxios} from "@/Services/Auth.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState} from "react";
export const ProtectedRoute = ({children}) => {
	const {getAccessTokenSilently, isAuthenticated} = useAuth0();
	const [token, setToken] = useState(null);
	useEffect(() => {
		const setAccessToken = async () => {
			try {
				if (isAuthenticated) {
					const accessToken = await getAccessTokenSilently();
					setToken(accessToken)
				}
			} catch (e) {
				console.log(e.message);
			}
		};
		void setAccessToken()
	}, [getAccessTokenSilently]);
	
	
	return(
		{
		
		}
	)
}
