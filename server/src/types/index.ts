export interface CleanUser {
    username: string;
    fullName: string;
    gender: "male" | "female";
    id: string;
    profilePic: string;
    createdAt: Date;
    updatedAt: Date;
}