import { PersonaResponse } from '../../data/PersonaInterface';
import { convertDate } from '../../utils/convertDate';
import style from './persona.module.css';


import anno_icon from '../../assets/dark/persona_dark.svg';
import AudioComponent from './audio/AudioComponent';
import { useNavigate } from 'react-router-dom';

interface PersonaProps {
  persona:PersonaResponse;
}

const Persona:React.FC<PersonaProps> = ({persona}) => {
  const authorImage = persona.author?.profile || anno_icon;
  return (
    <div className={style.personaElement}>
        <div className={style.personaHeader}>
            <div className={style.author}>
                <img className={style.authorImage} src={authorImage} alt="Author Avatar" />
                <div className={style.authorName}>{persona.author?.name}</div>
            </div>
            <div>{convertDate(persona.createdAt)}</div>
        </div>
        <div>
            <AudioComponent objectURL={persona.objectURL} />
        </div>
        <div className={style.personaFooter}>

        </div>
    </div>
  );
}
export default Persona;