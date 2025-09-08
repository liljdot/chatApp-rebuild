export interface User {
    username: string;
    fullName: string;
    gender: "male" | "female";
    id: string;
    profilePic: string;
    createdAt: Date;
    updatedAt: Date;
}