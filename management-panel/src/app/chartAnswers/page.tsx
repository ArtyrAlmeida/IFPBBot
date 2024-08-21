"use client"
import { IChartAnswer } from '@/interfaces';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CreateEditAnswerModal from '../components/Answers/CreateEditAnswerModal';
import ChartAnswer from '../components/Answers/ChartAnswer/ChartAnswer';
import Image from "next/image";

import styles from "./chartAnswers.module.css";

const ChartAnswers: NextPage = () => {
    const [chartAnswers, setChartAnswers] = useState<IChartAnswer[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [isCreateModalActive, setIsCreateModalActive] = useState<boolean>(false);

    const fetchChartAnswers = async () => {
        const response = await fetch("http://localhost:3000/api/chartAnswer");
        if (response.ok) {
            const body: IChartAnswer[] = await response.json();
            return setChartAnswers(body)
        }
        setError(true)
    }
    
    useEffect(() => {
        fetchChartAnswers()
    }, []);
    
    const onCreateClick = () => {
        if (isCreateModalActive) setIsCreateModalActive(false);
        else setIsCreateModalActive(true);
    }

    return ( 
        <>
            <div>
                <h1 className='page-title'>Fluxogramas</h1>
                <div className={styles.chartList}>
                    {chartAnswers.map(e => <ChartAnswer key={e._id!} id={e._id!} name={e.name} />)}
                    <button className={styles.createButton} onClick={onCreateClick}>
                        <Image src="/create.svg" alt="Edição de fluxograma" width={24} height={24} />
                        <h4>Criar</h4>
                    </button>
                </div>
                { isCreateModalActive ? <CreateEditAnswerModal action="create" handleClose={onCreateClick} answerInfo={{ name: "", image: "", answerType: "flowchart" }} /> : <></> }
            </div>
        </> 
    )
}

export default ChartAnswers;