import { use, useEffect, useState } from "react";
import { NewsCommentResponse } from "../data/NewsInterface";
import api from "../shared/api";

const useNewsComment = (newsId: string) => {
    const [comments, setComments] = useState<NewsCommentResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);

    useEffect(() => {
        getComments(0);
    },[]);

    const getComments =  (page:number) => {
        api.get(`/api/v1/${newsId}/newscomment`, { params: { page } })
        .then(res => {
            console.log('Comments fetched:', res);
            setComments(res.data.content.newsComments);
        })
        .catch(err => {
            console.error('Error fetching comments:', err);
        });
    }

    const postComment = (text:string) => {
        api.post(`/api/v1/newscomment`, {
            newsId: newsId,
            text: text
        })
        .then(res => {
            console.log('Comment posted:', res.data);
            getComments(0);
            setPage(0);
        })
        .catch(err => {
            console.error('Error posting comment:', err);
        });
    }

    const getNextPageComments = () => {
        api.get(`/api/v1/${newsId}/newscomment`, {params:{page:page+1}})
        .then((response) => {
            setComments((prevComments) => [...prevComments, ...response.data.content.newsComments]);
            setNextPage(response.data.nextPage);

            setPage(page+1);
        })
        .catch((error) => {
            console.error('Error fetching judgment comments:', error);
        });
    }

    return { comments, getComments ,postComment ,getNextPageComments};
}
export default useNewsComment;