import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Welcome() {
  const session = await getServerSession();
  if (!session) {
    redirect("/user/login")
  }
  console.log(session);
  
  return (
    <>
      <div className={styles.navBox}>
        <a className={styles.linkBox} href="/chartAnswers">
          <Image src="./chart-icon.svg" alt="Ícone para navegação para fluxogramas" width={74} height={74}/>
          <h2>Fluxogramas</h2>
        </a>
        <a className={styles.linkBox} href="/about">
          <Image src="./chart-icon.svg" alt="Ícone para navegação para fluxogramas" width={74} height={74}/>
          <h2>Sobre</h2>
        </a>
        <a className={styles.linkBox} href="https://www.ifpb.edu.br/">
          <Image src="./chart-icon.svg" alt="Ícone para navegação para fluxogramas" width={74} height={74}/>
          <h2>Site do IFPB</h2>
        </a>
      </div>
    </>
  );
}
