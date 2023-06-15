import {httpClient} from "@/Services/HttpClient.tsx"
export const ReviewService = {
	async send(reviewer_id: string, review: string, company: string) {
		return httpClient.post("/review", { reviewer_id: reviewer_id, review: review, company: company});
	}
	
}
