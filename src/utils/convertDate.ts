export const convertDate = (dateString: string): string => {
    // UTC로 파싱된 날짜 객체
    const utcDate = new Date(dateString);

    // 한국(KST)은 UTC+9, 따라서 보정
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - kstDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}분 전`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    } else {
        return `${Math.floor(diffInSeconds / 86400)}일 전`;
    }
}
