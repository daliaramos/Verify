import {ReviewCard} from "@/Components/ReviewCard.tsx";
import {httpClient} from "@/Services/HttpClient.tsx";
import React, {useCallback, useState} from "react";

export const SearchBar = () => {
	const [company, setCompany] = useState("");
	const [review, setReview] = useState([]);
	const [card, setCard] = useState(false);
	const searchForReview = useCallback(async () => {
		
		//Any user can search for reviews on a company with out loggin
		async function searchCompany() {
			try {
				const reviewResponse = await httpClient.search("/search", {company: company});
				if(reviewResponse.data.length > 0) {
					const reviewArr = reviewResponse.data;
					setCard(true);
					setReview(reviewArr);
				}
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
			{
					card &&
					review.map((reviews: { company: string; makeReview: string, id: number}) => (
						<div key={reviews.id}>
							{" "}
									<ReviewCard company={reviews.company} review={reviews.makeReview}/>
						</div>
					))
			}
		</div>
	);
};
/* Reference: I used tailwindcss react code component to create a input field.*/

/*
 */

