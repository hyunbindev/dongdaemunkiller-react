import style from './userDetail.module.css'
import left_arrow from '../../assets/left_arrow.svg'
const UserDetail = () => {
  return (
    <div className={style.userDetail}>
        <img src="http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg"></img>
        <div className={style.userDetailText}>
            <div className={style.name}>이름</div>
            <div className={style.email}>직책</div>
            <img className={style.more} src={left_arrow} />
        </div>
    </div>
  );
};
export default UserDetail;