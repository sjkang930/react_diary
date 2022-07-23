import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { DiaryDispatchContext } from '../App';

import EmotionItem from './EmotionItem';
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

import { getStringDate } from "../util/date"
import { emotionList } from '../util/emotion';

const DiaryEditor = ({ isEdit, originData }) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
    }, []);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        if (
            window.confirm(
                isEdit ? "want to edit diary?" : "write new diary?"
            )
        ) {
            if (!isEdit) {
                onCreate(date, content, emotion);
            } else {
                onEdit(originData.id, date, content, emotion);
            }
        }
        navigate('/', { replace: true });
    }

    const handleRemove = () => {
        if (window.confirm('want to delete?')) {
            onRemove(originData.id)
            navigate('/', { replace: true })
        }
    }
    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData])

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? "Edit Diary" : "Wirte New Diary"}
                leftChild={
                    <MyButton
                        text={"< Go Back"}
                        onClick={() => navigate(-1)}
                    />
                }
                rightChild={
                    isEdit && (
                        <MyButton
                            text={'Delete'}
                            type={'negative'}
                            onClick={handleRemove}
                        />
                    )
                }
            />
            <div>
                <section>
                    <h4>Today's Date?</h4>
                    <div className="input_box"></div>
                    <input
                        className="input_date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                    />
                </section>
                <section>
                    <h4>Today's Feeling</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>Today's Diary</h4>
                    <div className="input_box_text_wrapper">
                        <textarea
                            placeholder="How was your day today?"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"Cancel"} onClick={() => navigate(-1)} />
                        <MyButton
                            text={"Completed"}
                            type={"positive"}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div >
        </div >
    );
}

export default DiaryEditor;