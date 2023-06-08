export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    createdAt: string;
    updatedAt: string;
}

export interface AuthUser extends User {
    accessToken: string;
}
