import style from './footer.module.css'
import home_icon from '../../../assets/home.svg'
import judgment_icon from '../../../assets/judgment.svg'
import blame_icon from '../../../assets/aim.svg'
import { useNavigate } from 'react-router-dom'
const Footer = () =>{
    const navigate = useNavigate();
    return(
        <div id={style.footer}>
            <div className={style.element} onClick={()=>{navigate('/')}}>
                <img className={style.icon} src={home_icon}/>
                <label className={style.label}>홈</label>
            </div>
            <div className={style.element} onClick={()=>{navigate('/judgment')}}>
                <img className={style.icon} src={judgment_icon}/>
                <label className={style.label}>재판</label>
            </div>
            <div className={style.element} onClick={()=>{navigate('/blame')}}>
                <img className={style.icon} src={blame_icon}/>
                <label className={style.label}>저격</label>
            </div>
        </div>
    )
}
export default Footer;