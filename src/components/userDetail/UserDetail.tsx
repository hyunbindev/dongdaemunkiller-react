import style from './userDetail.module.css'
import left_arrow from '../../assets/left_arrow.svg'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const UserDetail = () => {
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    
  }, [user]);
  return (
    <div className={style.userDetail}>
        <img src={user.profile}></img>
        <div className={style.userDetailText}>
            <div className={style.name}>{user.name}</div>
            <img className={style.more} src={left_arrow} />
        </div>
    </div>
  );
};
export default UserDetail;