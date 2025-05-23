import React,{useEffect, useState} from "react";
import { MemberSimple } from "../data/MemberInterface";
import api from "../shared/api";

const useMemberSimple = () => {
    const [members, setMembers] = useState<MemberSimple[]>([]);

    const getAllMembers = (page:number) => {
        api.get('/api/v1/member/search',{params:{page:page}})
        .then((response) => {
            setMembers(response.data.content.members);
        })
        .catch((error) => {
            console.error('Error fetching members:', error);
        });
    }

    const getMemberByName = (name:string,page:number) => {
        api.get('/api/v1/member/search',{params:{name:name,page:page}})
        .then((response) => {
            setMembers(response.data.content.members);
        })
        .catch((error) => { 
            console.error('Error fetching members:', error);
        });
    }
    const initMembers = () => {
        setMembers([]);
    }
    return {members,getAllMembers,getMemberByName,initMembers};
}
export default useMemberSimple;