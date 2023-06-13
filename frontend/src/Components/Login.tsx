import { updateAxios} from "@/Services/Auth.tsx";
import React, {useCallback, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	const {isAuthenticated, getAccessTokenSilently } = useAuth0();
	useEffect(() => {
		const setAccessToken = async () => {
			try {
				if (isAuthenticated) {
					const accessToken = await getAccessTokenSilently();
					if (accessToken) {
						await updateAxios(accessToken);
					}
				}
			} catch (e) {
				console.log(e.message);
			}
		};
			setAccessToken()
		}, [isAuthenticated]);
	return(
		<div className="bg-white">
			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
					/>
				</div>
				<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
					
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Login to review a company
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Before you write a review about a company create an account.
						</p>
						<button onClick={() => loginWithRedirect()}>Log In</button>
					</div>
				</div>
				<div
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
					/>
				</div>
			</div>
		</div>)
};


