import style from '@/app/styles/form.module.scss';

interface IDashedProps{
    label:string;
    checked?:()=>void;
    bin?:()=>void;
}

export const Dashed = ({label,bin,checked}:IDashedProps) => {
    return (
        <div className={style.dash}>
            <div>
                <span className={style.span} onClick={checked}></span>
                <label htmlFor="">{label}</label>
            </div>

            <div className={style.span} onClick={bin}></div>
        </div>
    )
}