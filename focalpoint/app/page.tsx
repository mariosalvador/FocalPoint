import { Header } from "./components/header/header";
import style from '@/app/styles/home.module.scss';


export default function Home() {
  return (
    <main className={style.home}>
       <Header/>
    </main>
  );
}
