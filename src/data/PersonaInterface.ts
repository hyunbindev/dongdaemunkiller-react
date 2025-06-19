import { MemberSimple } from "./MemberInterface";

export interface PersonaResponse {
    personaId: string;
    author: MemberSimple|null;
    reveal: boolean;
    createdAt: string;
    objectURL: string;
}