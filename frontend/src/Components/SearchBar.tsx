import {useCallback, useState} from "react";

export const SearchBar = () => {
	const [company, setCompany] = useState("");
	
	return (
		<div>
			<label htmlFor={"company"}>Search for company name:</label>
			<input
				type="text"
				id="company"
				required
				value={company}
				onChange={(e) => setCompany(e.target.value)}
				name={"email"}
			/>
		</div>
	);
};
