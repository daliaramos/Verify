import {ReviewCard} from "@/Components/ReviewCard.tsx";
import {httpClient} from "@/Services/HttpClient.tsx";
import {useCallback, useState} from "react";

export const SearchBar = () => {
	const [company, setCompany] = useState("");
	const searchForReview = useCallback(async () => {
		
		//Any user can search for reviews on a company with out loggin
		async function searchCompany() {
			try {
				const reviewResponse = await httpClient.search("/search", {company: company});
				const foundReview = reviewResponse.data;
				console.log("Review", foundReview)
				
			}catch(err){
				console.error("Error getting review");
			}
		}
		searchCompany().catch(err => console.error("Failed to get review", err))
	}, [company]);
	

	return (
		<div>
			<div>
			<label htmlFor={"company"}>Search for company name:</label>
			<input
				type="text"
				id="company"
				required
				value={company}
				onChange={(e) => setCompany(e.target.value)}
				name={"company"}
			/>
			</div>
			<div>
				<button onClick={searchForReview}>Search</button>
			</div>
		</div>
	);
};
/* Reference: I used tailwindcss react code component to create a input field.*/
