import {httpClient} from "@/Services/HttpClient.tsx"
export const ProfileService = {
	async send( name: string, email: string, occupation: string) {
		return httpClient.post("/users", { name: name, email: email, occupation: occupation});
	}
	
}
