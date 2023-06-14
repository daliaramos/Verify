export type State = {
	currentProfile: ProfileType;
	currentReview: ReviewType;
};

export type ProfileType = {
	name: string;
	occupation: string;
	id: number;
};

export type ReviewType= {
	id: number;
	review
};

