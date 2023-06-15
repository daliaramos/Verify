import {httpClient} from "@/Services/HttpClient.tsx";
import React, {useCallback, useState} from "react";

export const SearchBar = () => {
	const [company, setCompany] = useState("");
	const [card, setCard] = useState(false);
	
	const searchForReview = useCallback(async () => {
		
		//Any user can search for reviews on a company with out loggin
		async function searchCompany() {
			try {
				const reviewResponse = await httpClient.search("/search", {company: company});
				const foundReview = reviewResponse.data;
				console.log("Review", foundReview.data );
				setCard(
					true
				)
				
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
					card && <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Review</h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Company</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{company}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Review</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{}</dd>
              </div>
            </dl>
          </div>
        </div>
			}
			
		</div>
	);
};
/* Reference: I used tailwindcss react code component to create a input field.*/
