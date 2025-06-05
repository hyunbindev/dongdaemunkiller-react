import BlameComment from "../components/blame/BlameComment";
import { MemberSimple } from "./MemberInterface";

export interface BlameResponse{
    id : string,
    title : string,
    author : MemberSimple,
    targets : MemberSimple[],
    text : string,
    createdAt : string,
    commentsCount : number
    targeted: boolean
}

export interface BlameRequest{
    authorUuid : string,
    title: string,
    targetUuids : string[],
    content : string
}
export interface BlameCommentRequest{
    blameId : string,
    content : string
}

export interface BlameCommentResponse{
    blameCommentId : string,
    author : MemberSimple,
    createdAt : string,
    text : string
}

export interface BlameCommentRequest{
    blameId : string,
    text : string
}