import styles from "./About.module.css"

export default async function AboutPage () {
    return <>
    <div className={styles.aboutWrapper}>
        <h1 className="page-title">Sobre</h1>
        <div className={styles.container}>
            <p>
                O IFPBBot é um chatbot acadêmico planejado com o intuito de facilitar a comunicação de tópicos frequentes e simples no IFPB - Campus Cajazeiras. Construído utilizando a ferramenta de processamento natural DialogFlow, o IFPBBot entende frases e procura intenções de diálogo correspondentes para responder o usuário dentro dos temas definidos.
            </p>
            <p>
            Esta aplicação é o Painel de Gerência. Nessa aplicação, você poderá realizar upload de imagens de fluxogramas, que poderão ser renderizadas pelo bot no menu Fluxogramas, dentro da conversa. Para utilizar o sistema, você necessitará de uma conta de gerente, que pode ser criada a partir do botão de cadastro no topo da página. 
            </p>
        </div>

    </div>
    </>
}