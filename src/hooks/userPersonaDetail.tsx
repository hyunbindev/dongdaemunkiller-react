import { useState } from "react";
import { PersonaResponse } from "../data/PersonaInterface";
import api from "../shared/api";

const usePersonaDetail = (personaId: string) => {
    const [persona, setPersona] = useState<PersonaResponse>();

    const getPersona = () => {
        api.get<PersonaResponse>(`/api/v1/persona/${personaId}`)
            .then((response) => {
                setPersona(response.data);
            })
            .catch((error) => {
                console.error('Error fetching persona details:', error);
                throw error;
            });
    }
    return { persona, getPersona};
}
export default usePersonaDetail;