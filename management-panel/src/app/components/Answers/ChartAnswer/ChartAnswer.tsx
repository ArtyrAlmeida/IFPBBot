"use client"
import { useState } from "react";
import CreateEditAnswerModal from "../CreateEditAnswerModal";
import Image from "next/image";

import styles from "./ChartAnswer.module.css";

const botAddress = "";

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
            <div className={styles.chartAnswer}>
                <h4><a href={`${botAddress}/image/${props.id}`} target="_blank">{props.name}</a></h4>
                <div className={styles.chartButtonArea}>
                    <button className={styles.chartButton} onClick={() => onEditClick()}><Image src="/pen.svg" alt="Edição de fluxograma" width={24} height={24} /></button>
                    <button className={styles.chartButton} onClick={() => onDeleteClick()}><Image src="/bin.svg" alt="Remoção de fluxograma" width={24} height={24} /></button>
                </div>
            </div>
            { isEditModalActive ? <CreateEditAnswerModal action="edit" id={props.id} handleClose={onEditClick} answerInfo={{ name: props.name, image: url, answerType: "flowchart" }} /> : <></> }
        </>
    )
}

export default ChartAnswer;