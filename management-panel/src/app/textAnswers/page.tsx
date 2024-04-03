"use client"
import { ITextAnswer } from '@/interfaces';
import { NextPage } from 'next';
import TextAnswer from '../components/Answers/TextAnswer/TextAnswer';
import { useEffect, useState } from 'react';
import CreateEditModal from '../components/Answers/TextAnswer/CreateEditModal';

const TextAnswers: NextPage = () => {
    const [textAnswers, setTextAnswers] = useState<ITextAnswer[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [isCreateModalActive, setIsCreateModalActive] = useState<boolean>(false);

    const fetchTextAnswers = async () => {
        const response = await fetch("http://localhost:3000/api/textAnswer");
        if (response.ok) {
            const body: ITextAnswer[] = await response.json();
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
                {textAnswers.map(e => <TextAnswer key={e._id!} id={e._id!} name={e.name} text={e.text} />)}
            </div>
            { isCreateModalActive ? <CreateEditModal action="create" handleClose={onCreateClick} answerInfo={{ name: "", text: "" }} /> : <></> }
        </main> 
    )
}

export default TextAnswers;