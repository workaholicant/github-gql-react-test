export interface User {
    databaseId: number;
    name: string;
    login: string;
    bio: string;
    avatarUrl: string;
}

export interface Repository {
    databaseId: number;
    name: string;
    description: string;
    url: string;
    updatedAt: Date;
}