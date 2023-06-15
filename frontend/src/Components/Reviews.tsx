import {httpClient} from "@/Services/HttpClient.tsx";
import {ReviewService} from "@/Services/ReviewService.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {useCallback, useState} from 'react'
import {useNavigate} from "react-router-dom";

export const Reviews = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [company, setCompany] = useState("");
	const [review, setReview] = useState("");
	
	const makeReview = useCallback(async () => {
		const createReview = async () => {
			try {
				const userFound = await httpClient.search("/users", {email: user.email});
				if (userFound.data){
					await ReviewService.send(userFound.data.id, review, company);
				}
			}catch(err){
				console.error("Error creating review", err)
			}
		}
		createReview();
	}, [company, review]);
	
	
	return isAuthenticated && (
		<div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div
				className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
				aria-hidden="true"
			>
				<div
					className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
				/>
			</div>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Make a review</h2>
			</div>
			
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div className="sm:col-span-2">
						<label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
							Company
						</label>
						<div className="mt-2.5">
							<input
								type="text"
								name="company"
								id="company"
								value={company}
								onChange={(e) => setCompany(e.target.value)}
								autoComplete="organization"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
							Review
						</label>
						<div className="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								value={review}
								onChange={(e) => setReview(e.target.value)}
								autoComplete="email"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<button
						onClick={makeReview}
						className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Post
					</button>
				</div>
			
		</div>
	)
}
