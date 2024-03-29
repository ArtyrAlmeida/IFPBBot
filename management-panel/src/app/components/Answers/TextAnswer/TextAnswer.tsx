"use client"
import { useState } from "react";
import CreateEditModal from "./CreateEditModal";

interface ITextAnswerProps {
    name: string;
    text: string;
    id: string;
    key: string;
}


const TextAnswer = (props: ITextAnswerProps) => {
    const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false);

    const onEditClick = () => {
        if (isEditModalActive) setIsEditModalActive(false);
        else setIsEditModalActive(true);
    }

    const onDeleteClick = async () => {
        const response = await fetch(`http://localhost:3000/api/textAnswer?id=${props.id}`, {
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
            { isEditModalActive ? <CreateEditModal action="edit" id={props.id} handleClose={onEditClick} answerInfo={{ name: props.name, text: props.text }} /> : <></> }
        </>
    )
}

export default TextAnswer;