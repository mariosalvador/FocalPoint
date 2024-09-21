import { Form } from "./components/form/form";
import { Header } from "./components/header/header";
import style from '@/app/styles/home.module.scss';


export default function Home() {
  return (
    <main className={style.home}>
      <section className={style.section}>
        <Header />
        <Form />
      </section>
    </main>
  );
}
