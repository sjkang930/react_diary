import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiaryEditor from "../ components/DiaryEditor";
import { DiaryStateContext } from "../App";

const Edit = () => {
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `Emotion Diary - id ${id}'s diary Edit`;
    }, []);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );

            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                alert("there's no diary")
                navigate("/", { replace: true })
            }
        }
    }, [id, diaryList]);

    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit;