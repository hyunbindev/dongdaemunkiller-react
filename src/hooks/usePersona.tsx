import { useState } from "react";
import { PersonaResponse } from "../data/PersonaInterface";
import api from "../shared/api";

const usePersona = () => {
    const [personaList, setPersonaList] = useState<PersonaResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [nextPage, setNextPage] = useState<boolean>(false);
    const initPersonaList = () => {
        api.get('/api/v1/persona', { params: { page: 0 } })
        .then((res) => {
            setPersonaList(res.data.content.personas);
            setNextPage(false);
            setPage(0);
            setNextPage(res.data.nextPage);
        })
    }
    const getNextPage = () => {
        if (nextPage) {
            api.get('/api/v1/persona', { params: { page: page + 1 } })
            .then((res) => {
                setPersonaList((prevPersonaList) => [...prevPersonaList, ...res.data.content.personas]);
                setNextPage(res.data.nextPage);
                setPage(page + 1);
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }
    return {personaList, initPersonaList,getNextPage};
};
export default usePersona;