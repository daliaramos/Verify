import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "@css/Verify.css"
export const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<div>
			<button className="btn btn-primary">Button</button>

		</div>
	);
};

