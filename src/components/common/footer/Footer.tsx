import style from './footer.module.css';
import home_icon from '../../../assets/home.svg';
import judgment_icon from '../../../assets/judgment.svg';
import blame_icon from '../../../assets/aim.svg';
import persona_icon from '../../../assets/persona.svg';

import home_icon_dark from '../../../assets/dark/home_dark.svg';
import judgment_icon_dark from '../../../assets/dark/judgment_dark.svg';
import blame_icon_dark from '../../../assets/dark/aim_dark.svg';
import persona_icon_dark from '../../../assets/dark/persona_dark.svg';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const Footer = () => {
  const navigate = useNavigate();
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const themeStyle = (theme:string)=>{
    switch (theme) {
        case 'light':
            return style.light;
        case 'dark':
            return style.dark;
        default:
            return style.light;
    }
  }

  return (
    <div id={style.footer} className={themeStyle(themeMode)}>
      <div className={style.element} onClick={() => navigate('/')}>
        <img
          className={style.icon}
          src={themeMode === 'dark' ? home_icon_dark : home_icon}
        />
        <label className={style.label}>홈</label>
      </div>
      <div className={style.element} onClick={() => navigate('/judgment')}>
        <img
          className={style.icon}
          src={themeMode === 'dark' ? judgment_icon_dark : judgment_icon}
        />
        <label className={style.label}>재판</label>
      </div>
      <div className={style.element} onClick={() => navigate('/blame')}>
        <img
          className={style.icon}
          src={themeMode === 'dark' ? blame_icon_dark : blame_icon}
        />
        <label className={style.label}>저격</label>
      </div>
      <div className={style.element} onClick={() => navigate('/persona')}>
        <img
          className={style.icon}
          src={themeMode === 'dark' ? persona_icon_dark : persona_icon}
        />
        <label className={style.label}>페르소나</label>
      </div>
    </div>
  );
};

export default Footer;
