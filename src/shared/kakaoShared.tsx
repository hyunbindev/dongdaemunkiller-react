import { useEffect } from "react";
import { JudgmentResponse } from "../data/JudgmentInterface";
import { BlameResponse } from "../data/BlameInterface";
import { PersonaResponse } from "../data/PersonaInterface";
import { NewsResponseInterface } from "../data/NewsInterface";

const KaKaoShared = ()=>{
    useEffect(()=>{
        if(!window.Kakao.isInitialized()) {
            window.Kakao.init(import.meta.env.VITE_APP_KAKAO_KEY);
        }
    },[]);

    const HOST_URL = import.meta.env.VITE_CLIENT_HOST

    const blameShare = (blame:BlameResponse) => {
        let title;
        let description;
        if(blame.targets !== null && blame.targets.length > 0) {
            const targetNames = blame.targets.map(target => target.name).join(', ');
            title = `${targetNames}님이 저격당했어요!!`;
            description = `${targetNames}님의 저격글을 확인해 보세요!!`;
        } else {
            title = `${blame.author.name}님이 전체공개로 저격했어요!!`;
            description = `${blame.author.name}님이 상남자답게 작성한 저격글을 확인해 보세요!!`;
        }
        window.Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: description,
                imageUrl: ``,
                link: {
                    mobileWebUrl: `${HOST_URL}/blame/${blame.id}`,
                    webUrl: `${HOST_URL}blame/${blame.id}`,
                },
            },
            buttons: [
                {
                    title: '저격글 확인하기',
                    link: {
                        mobileWebUrl: `${HOST_URL}/blame/${blame.id}`,
                        webUrl: `${HOST_URL}/blame/${blame.id}`,
                    },
                },
            ],
        });
    }

    const judgmentShare = (judgment:JudgmentResponse) => {
        window.Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: `${judgment.title}`,
                description: `${judgment.text}`,
                imageUrl: ``,
                link: {
                    mobileWebUrl: `${HOST_URL}/judgment/${judgment.id}`,
                    webUrl: `${HOST_URL}/judgment/${judgment.id}`,
                },
            },
            buttons: [
                {
                    title: '심판하기!',
                    link: {
                        mobileWebUrl: `${HOST_URL}/judgment/${judgment.id}`,
                        webUrl: `${HOST_URL}/judgment/${judgment.id}`,
                    },
                },
            ],
        });
    }
    const personaShare = (persona:PersonaResponse) => {
        window.Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: `누군가 페르소나를 올렸어요!!`,
                description: `페르소나의 진짜 작성자를 맞춰보세요!`,
                imageUrl: ``,
                link: {
                    mobileWebUrl: `${HOST_URL}/persona/${persona.personaId}`,
                    webUrl: `${HOST_URL}/judgment/${persona.personaId}`,
                },
            },
            buttons: [
                {
                    title: '페르소나 확인하고 작성자 맞추기',
                    link: {
                        mobileWebUrl: `${HOST_URL}/persona/${persona.personaId}`,
                        webUrl: `${HOST_URL}/persona/${persona.personaId}`,
                    },
                },
            ],
        });
    }
    const newsShare = (news:NewsResponseInterface) => {
        console.log("Sharing news:", news.imageUrl);
        window.Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: `[속보]${news.title}`,
                description: `${news.text.slice(0, 15)}....`,
                imageUrl: news.imageUrl || '',
                link: {
                    mobileWebUrl: `${HOST_URL}/news/${news.id}`,
                    webUrl: `${HOST_URL}/news/${news.id}`,
                },
            },
            buttons: [
                {
                    title: '뉴스 읽기',
                    link: {
                        mobileWebUrl: `${HOST_URL}/news/${news.id}`,
                        webUrl: `${HOST_URL}/news/${news.id}`,
                    },
                },
            ],
        });
    }
    return {blameShare , judgmentShare ,personaShare, newsShare}
}
export default KaKaoShared;