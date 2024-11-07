import style from '@/app/styles/header.module.scss';
import { Logo } from '@/public/logo';
import { Avatar, AvatarImage } from '@/components/ui/avatar';


export const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.div}>
                <section>
                    <Logo />
                </section>

                <h2>Bem-vindo de volta, Mário</h2>

                <div className='flex items-center gap-3'>
                    <span>Mario Paunnnnnnnnnlo</span>
                    <Avatar className=''>

                        <AvatarImage src='http://github.com/mariosalvador.png'></AvatarImage>
                    </Avatar>
                </div>

            </div>
        </header>
    );
}
