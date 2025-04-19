import { useEffect, useState } from 'react';
import Blame from './Blame';
import style from './blameSummaryStyle.module.css';
import api from '../../shared/api';
import { Link } from 'react-router-dom';
import { BlameResponse } from '../../data/BlameInterface';
const BlameSummary = () => {
    const[blameList, setBlameList] = useState<BlameResponse[]>([]);
    useEffect(() => {
        api.get('/api/v1/blame',{params:{page:0}}).then((response) => {
            setBlameList(response.data.content.blames);
        }).catch((error) => {
            console.error('Error fetching blame data:', error);
        });
    }
    , []);
    return (
        <div id={style.blameSummary}>
            <div id={style.header}>
                <h1>동대문 저격</h1>
                <Link to="/blame" id={style.more}>더보기</Link>
            </div>
            <div>
                {
                    blameList.map((blame, index) => {
                        return (
                            <Link to={`/blame/${blame.id}`} key={index}>   
                                <Blame blame={blame}/>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
};
export default BlameSummary;