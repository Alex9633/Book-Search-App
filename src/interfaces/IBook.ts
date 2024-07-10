export interface IBook {
    id: number;
    title: string;
    author: string;
    genre: string;
}

export type BookKeys = keyof IBook;
