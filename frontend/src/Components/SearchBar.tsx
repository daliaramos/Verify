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
			<form>
				<label htmlFor="default-search"
					   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
				<div className="relative">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
							 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
						</svg>
					</div>
					<input type="search" id="company"
						   value={company}
						   onChange={(e) => setCompany(e.target.value)}
						   name={"company"}
						   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						   placeholder="Search Company" required>
					</input>
					<button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={searchForReview}>Search</button>
				</div>
			</form>
	{/*		<div>
				<input
					className={"block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
					type="text"
					id="company"
					required
					value={company}
					onChange={(e) => setCompany(e.target.value)}
					name={"company"}
				/>

			</div>*/}

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

