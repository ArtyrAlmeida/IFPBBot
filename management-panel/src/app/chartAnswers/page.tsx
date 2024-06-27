"use client"
import { IChartAnswer } from '@/interfaces';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CreateEditAnswerModal from '../components/Answers/CreateEditAnswerModal';
import ChartAnswer from '../components/Answers/ChartAnswer/ChartAnswer';

const TextAnswers: NextPage = () => {
    const [textAnswers, setTextAnswers] = useState<IChartAnswer[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [isCreateModalActive, setIsCreateModalActive] = useState<boolean>(false);

    const fetchTextAnswers = async () => {
        const response = await fetch("http://localhost:3000/api/chartAnswer");
        if (response.ok) {
            const body: IChartAnswer[] = await response.json();
            return setTextAnswers(body)
        }
        setError(true)
    }
    
    useEffect(() => {
        fetchTextAnswers()
    }, []);
    
    const onCreateClick = () => {
        if (isCreateModalActive) setIsCreateModalActive(false);
        else setIsCreateModalActive(true);
    }

    return ( 
        <main>
            <h1>Respostas Textuais</h1>
            <button onClick={onCreateClick}>Criar</button>
            <div>
                {textAnswers.map(e => <ChartAnswer key={e._id!} id={e._id!} name={e.name} />)}
            </div>
            { isCreateModalActive ? <CreateEditAnswerModal action="create" handleClose={onCreateClick} answerInfo={{ name: "", image: "", answerType: "flowchart" }} /> : <></> }
        </main> 
    )
}

export default TextAnswers;