import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from './../ components/MyHeader'
import MyButton from './../ components/MyButton'
import DiaryList from './../ components/DiaryList'
// import { useSearchParams } from "react-router-dom";

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const headText = `${monthNames[curDate.getMonth()]} ${curDate.getFullYear()}`


    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Emotion Diary`;
    }, [])

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23, //23시
                59, //59분
                59 //59초
            ).getTime();

            setData(
                diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
            );
        }
    }, [diaryList, curDate]);


    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    };

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        );
    };

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
                rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;