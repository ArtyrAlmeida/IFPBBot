"use client"
import { createRef } from "react";
import { useRouter } from "next/navigation";
import Input from "../../Input/Input";

interface CreateEditProps {
    action: "edit" | "create";
    id?: string;
    answerInfo: { name: string, text: string };
    handleClose: () => void;
}

const CreateEditModal = ({ action, id, answerInfo, handleClose }: CreateEditProps) => {
    const router = useRouter();
    const nameRef = createRef<HTMLInputElement>();
    const textRef = createRef<HTMLInputElement>();
    
    const actionMap = {
        title: action == "edit" ? "Editar" : "Criar",
        method: action == "edit" ? "PATCH" : "POST",
        idParam: action == "edit"
    }

    const url = `http://localhost:3000/api/textAnswer${actionMap.idParam ? `?id=${id}` : ""}`
    
    const performAction = async () => {
        const response = await fetch(url, {
            method: actionMap.method,
            body: JSON.stringify({
                name: nameRef.current?.value || "",
                text: textRef.current?.value || "",
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            window.location.reload()
        }
    }

    return <div style={{ backgroundColor: "white", position: "absolute", top: "50%", left: "50%", color: "black", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <h2>{actionMap.title}</h2>
        <form>
            <Input label={"Nome"} ref={nameRef} input={{ id: "name", type: "text", defaultValue: answerInfo.name }} />
            <Input label={"Texto"} ref={textRef} input={{ id: "text", type: "text", defaultValue: answerInfo.text }} />
        </form>
        <button onClick={performAction}>{actionMap.title}</button>
        <button onClick={handleClose}>Fechar</button>
    </div>
}

export default CreateEditModal;