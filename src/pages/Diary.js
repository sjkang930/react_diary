import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import MyButton from '../ components/MyButton';
import MyHeader from '../ components/MyHeader';

import { DiaryStateContext } from '../App';
import { getStringDate } from "../util/date"
import { emotionList } from '../util/emotion';

const Diary = () => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Emotion Diary - id${id}'s diary`;
    }, [])

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );

            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert("there's no diary")
                navigate('/', { replace: true })
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="DiaryPage">loading...</div>;
    } else {
        const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        console.log(curEmotionData)

        return (
            <div className="DiaryPage">
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))} Diary`}
                    leftChild={
                        <MyButton
                            text={"< Go Back"}
                            onClick={() => navigate(-1)}
                        />
                    }
                    rightChild={
                        <MyButton
                            text={"Edit"}
                            onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    }
                />
                <article>
                    <section>
                        <h4>Today's feeling</h4>
                        <div
                            className={[
                                "diary_img_wrapper",
                                `diary_img_wrapper_${data.emotion}`,
                            ].join(" ")}
                        >
                            <img src={curEmotionData.emotion_img} />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>Today's Diary</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;