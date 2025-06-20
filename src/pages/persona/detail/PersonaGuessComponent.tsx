import { PersonaResponse } from "../../../data/PersonaInterface";
import SelectGuessAuthor from "./SelectGuessAuthor";

import style from './personaDetailPage.module.css'

import persona_icon from '../../../assets/dark/persona_dark.svg'
interface PersonaGuessComponentProps{
    persona:PersonaResponse;
    refreshPersonaFunc:()=>void;
}

const PersonaGuessComponent:React.FC<PersonaGuessComponentProps> = ({persona, refreshPersonaFunc}) =>{
    if(!persona.reveal && !persona.author?.uuid)return (
                                                        <div>
                                                            <p id={style.text}>"{persona.author?.name}의 정체를 밝혀보세요!"</p>
                                                            <div>
                                                                <SelectGuessAuthor persona={persona} refreshPersonaFunc={refreshPersonaFunc}/>
                                                            </div>
                                                        </div>
                                                        )
    if(persona.reveal && !persona.author?.uuid)return (
                                                        <div id={style.failGuess}>
                                                            <img src={persona_icon}/>
                                                            <p id={style.text}>"{persona.author?.name}의 정체를 밝혀내지 못 했어요."</p>
                                                        </div>
                                                        )
                                                return(<></>)
}
export default PersonaGuessComponent;