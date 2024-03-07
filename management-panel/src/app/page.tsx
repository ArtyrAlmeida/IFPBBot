import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Welcome() {
  const session = await getServerSession();
  if (!session) {
    redirect("/user/login")
  }
  console.log(session);
  
  return (
    <main className={styles.main}>
      <h1>Bem vindo {session ? session.user.name + "!" : ""}</h1>
    </main>
  );
}
