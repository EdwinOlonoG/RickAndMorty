import { Character } from "./ICharactetrs";

export interface Response {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Character[];
}