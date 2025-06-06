import { useEffect } from "react";
import { JudgmentResponse } from "../data/JudgmentInterface";
import { BlameResponse } from "../data/BlameInterface";

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
        if(blame.targets.length > 0) {
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
    return {blameShare , judgmentShare}
}
export default KaKaoShared;