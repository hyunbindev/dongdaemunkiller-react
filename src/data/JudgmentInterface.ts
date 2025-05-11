import { MemberSimple } from "./MemberInterface";

export interface JudgmentResponse{
    id : string,
    author : MemberSimple,
    title : string,
    text : string,
    selections : 
    {
        id : string,
        title : string
    }[],
    createdAt : string,
    commentCount: number | undefined,
    voteCount:number | undefined
}

export interface JudgmentVoteCountResponse{
    selectionId : string,
    selectionTitle : string,
    voteCount : number,
    voted : boolean
}