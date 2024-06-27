"use client"
import { useState } from "react";
import CreateEditAnswerModal from "../CreateEditAnswerModal";

interface ITextAnswerProps {
    name: string;
    id: string;
    key: string;
}

const ChartAnswer = (props: ITextAnswerProps) => {
    const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false);
    const url = `http://localhost:3030/image?id=${props.id}`

    const onEditClick = () => {
        if (isEditModalActive) setIsEditModalActive(false);
        else setIsEditModalActive(true);
    }

    const onDeleteClick = async () => {
        const response = await fetch(`http://localhost:3000/api/chartAnswer?id=${props.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            window.location.reload()
        }
    }

    return (
        <>
            <div>
                <h4>{props.name}</h4>
                <button onClick={() => onEditClick()}>Editar</button>
                <button onClick={() => onDeleteClick()}>Deletar</button>
            </div>
            { isEditModalActive ? <CreateEditAnswerModal action="edit" id={props.id} handleClose={onEditClick} answerInfo={{ name: props.name, image: url, answerType: "flowchart" }} /> : <></> }
        </>
    )
}

export default ChartAnswer;