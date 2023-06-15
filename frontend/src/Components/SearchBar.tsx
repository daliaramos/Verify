import {ReviewCard} from "@/Components/ReviewCard.tsx";
import {httpClient} from "@/Services/HttpClient.tsx";
import React, {useCallback, useState} from "react";

export const SearchBar = () => {
	const [company, setCompany] = useState("");
	const [review, setReview] = useState("");
	const [card, setCard] = useState(false);
	
	const searchForReview = useCallback(async () => {
		
		//Any user can search for reviews on a company with out loggin
		async function searchCompany() {
			try {
				const reviewResponse = await httpClient.search("/search", {company: company});
				if(reviewResponse.data.length > 0) {
					setCard(
						true
					)
					
					setReview(reviewResponse.data[0].makeReview)
				}
				
			}catch(err){
				console.error("Error getting review");
			}
		}
		searchCompany().catch(err => console.error("Failed to get review", err))
	}, [company, card]);
	
	const getReview = (
		<ReviewCard company={company} review={review}/>
	)
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
			{
					card && (getReview)
			}
		</div>
	);
};
/* Reference: I used tailwindcss react code component to create a input field.*/
