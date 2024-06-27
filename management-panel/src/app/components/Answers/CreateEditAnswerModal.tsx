"use client"
import { createRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../Input/TextInput";
import ImageInput from "../Input/ImageInput";

interface CreateEditProps {
    action: "edit" | "create";
    id?: string;
    answerInfo: { name: string, answerType: "text", text: string } | { name: string, answerType: "flowchart", image: string };
    handleClose: () => void;
}

const CreateEditTextAnswerModal = ({ action, id, answerInfo, handleClose }: CreateEditProps) => {
    const router = useRouter();
    const nameRef = createRef<HTMLInputElement>();
    const inputRef = createRef<HTMLInputElement>();

    const [image, setImage] = useState<File>()

    useEffect(() => {
        console.log(image);
        
    }, [image])

    const handleImageChange = (imageFile: File) => {
        setImage(imageFile)
    }
    
    const actionMap = {
        title: action == "edit" ? "Editar" : "Criar",
        method: action == "edit" ? "PATCH" : "POST",
        idParam: action == "edit"
    }

    const url = `http://localhost:3000/api/chartAnswer${actionMap.idParam ? `?id=${id}` : ""}`
    
    const performAction = async () => {
        const formData = new FormData();
        formData.append("name", nameRef.current?.value || "");
        if (image && answerInfo.answerType == "flowchart") formData.append("data", image);
        else formData.append("data", inputRef.current?.value || "");
        
        formData.append("type", answerInfo.answerType)
        const response = await fetch(url, {
            method: actionMap.method,
            body: formData,
        });

        if (response.ok) {
            window.location.reload()
        }
    }

    return <div>
        <h2>{actionMap.title}</h2>
        <form>
            <Input label={"Nome"} ref={nameRef} input={{ id: "name", type: "text", defaultValue: answerInfo.name }} />
            { answerInfo.answerType == "text" ?
                <Input label={"Texto"} ref={inputRef} input={{ id: "text", type: "text", defaultValue: answerInfo.text }} />
              :
                <ImageInput label="Imagem do Fluxograma" onImageInputChange={handleImageChange} input={{ id: "flowchart" }} />
            }
        </form>
        <button onClick={performAction}>{actionMap.title}</button>
        <button onClick={handleClose}>Fechar</button>
    </div>
}

export default CreateEditTextAnswerModal;