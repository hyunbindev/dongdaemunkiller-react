import { useEffect, useState } from "react";
import { BlameCommentRequest, BlameCommentResponse, BlameResponse } from "../data/BlameInterface";
import api from "../shared/api";

const useBlameDetail = (blameId:string) => {
    const [blame, setBlame] = useState<BlameResponse>();
    const [comments, setComments] = useState<BlameCommentResponse[]>([]);
    
    const [page, setPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);

    const getBlame = ()=>{
        api.get<BlameResponse>(`/api/v1/blame/${blameId}`)
            .then((response) => {
                setBlame(response.data)})
            .catch((error) => {
                console.error('Error fetching blame data:', error);
            }
        );
    }

    const getBlameComments = (page:number) => {
        api.get(`/api/v1/blameComment/${blameId}`,{params:{page:page}})
            .then((response) => {
                setComments((prevComments) => [...prevComments, ...response.data.content.blameComments]);
                setNextPage(response.data.nextPage);
                setPage(page);
            }) 
            .catch((error) => {
                console.error('Error fetching blame comments:', error);
            }
        );
    }
    const postNewBlameComment = (text:string) => {
        if (text.trim().length < 1){
            alert("댓글을 입력해주세요.");
            return;
        }
        api.post(`/api/v1/blameComment/${blameId}`, {
            blameId:blameId,
            text:text
        }).then((response) => {
            setComments([]);
            setNextPage(false);
            getBlameComments(0); // Refresh comments after posting a new one
        }).catch((error) => {
            console.error('Error posting new blame comment:', error);
        });
    }

    const getNextPage = () => {
        if (nextPage){
            getBlameComments(page+1);
        }
    }

    return { blame, comments, getBlame, getBlameComments , postNewBlameComment ,getNextPage};
}
export default useBlameDetail;