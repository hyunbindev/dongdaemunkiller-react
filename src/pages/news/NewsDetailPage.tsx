import { useNavigate } from 'react-router-dom';
import style from './NewsDetail.module.css'

import sample_img from '../../assets/example.png';
import CommonComment from '../../components/common/comment/CommonComment';

import thumb_up_icon from '../../assets/thumb_up.svg';
import thumb_down_icon from '../../assets/thumb_down.svg';

import share_icon from '../../assets/share.svg'

import back_icon from '../../assets/back.svg'

const NewsDetailPage = ()=>{
    const navigate = useNavigate();
    return(
        <div id={style.newDetailPage}>
            <div id={style.header}>
                <h1>DongDaemun Times</h1>
                <h2>“what’s happening now in Dongdaemun.”</h2>
            </div>
            <div id={style.content}>
                <h1>기사 제목</h1>
                <div id={style.imageContainer}>
                    <img src={sample_img}/>
                </div>
                <div id={style.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac magna in risus fermentum ultrices. Donec vitae felis nec nisi vehicula tincidunt. Proin eget sapien augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam auctor diam eget nunc tincidunt, in venenatis nulla ullamcorper. Fusce lacinia mi at eros faucibus, vel blandit tortor consectetur. Maecenas varius urna vitae enim volutpat, in cursus nunc pellentesque.
                    동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세. 남산 위에 저 소나무 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세. 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세.
                    orem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac magna in risus fermentum ultrices. Donec vitae felis nec nisi vehicula tincidunt. Proin eget sapien augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam auctor diam eget nunc tincidunt, in venenatis nulla ullamcorper. Fusce lacinia mi at eros faucibus, vel blandit tortor consectetur. Maecenas varius urna vitae enim volutpat, in cursus nunc pellentesque.
                    時は金なり、光陰矢の如し。千里の道も一歩から。初心忘るべからず。石の上にも三年。温故知新。七転び八起き。一期一会。
                </div>
                <div id={style.info}>
                    <div id={style.author}>
                        <img id={style.profile} src={sample_img}/>
                        <div id={style.authorName}>김기자 기자</div>
                    </div>
                    <div id={style.createdAt}>
                        西紀 2025年 7月 13日
                    </div>
                </div>
            </div>
            <div id={style.controller}>
                <div id={style.recommend}>
                    <div className={style.btnContainer}>
                        <img src={thumb_up_icon}/><div className={style.count}>456</div>
                    </div>
                    <div className={style.btnContainer}>
                        <img src={thumb_down_icon}/><div className={style.count}>456</div>
                    </div>
                    <div className={style.btnContainer}>
                        <img src={share_icon}/>공유하기
                    </div>
                </div>
            </div>
            <div id={style.commentContainer}>
                <CommonComment onCommentSubmit={()=>{}} commentNodes={[]}/>
                <div style={{height:"7rem"}}>
                </div>
            </div>
            <div id={style.back} onClick={()=>navigate('/news')}>
                <img src={back_icon}/>
            </div>
        </div>
    )
}
export default NewsDetailPage;