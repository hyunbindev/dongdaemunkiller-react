import { MemberSimple } from "./MemberInterface";

export interface NewsResponseInterface {
    id: number;
    title: string;
    author : MemberSimple,
    text: string;
    imageUrl?: string | null;
    createdAt: string;
    viewCount: number;
}

export interface NewsRecommendStatusInterface {
    newsId: number;
    recommendCount: number;
    unRecommendCount: number;
    type:string;
}

export interface NewsCommentResponse{
    id : string,
    author : MemberSimple,
    text : string,
    createdAt : string
}