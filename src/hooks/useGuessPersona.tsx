import api from "../shared/api";

const useGuessPersona = (personaId:string, callback:()=>void) =>{

    const postGuess = (authorUuid:string)=>{
        api.post('/api/v1/persona/guess',{personaId : personaId, guessAuthorUuid: authorUuid})
        .then((res)=>{callback()})
        .catch((err)=>{console.error(err)})
    }

    return { postGuess }
}
export default useGuessPersona;