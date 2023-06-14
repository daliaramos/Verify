import {ProfileType} from "@/VerifyType.ts";
import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;


export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
	},
});

export async function getNextProfileFromServer() {
	const profile = await httpClient.get<ProfileType>("/profile");
	console.log("in getnextprofilefromserver", profile, "proofile.data", profile.data)
	return profile.data
}


