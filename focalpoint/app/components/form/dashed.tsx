import style from '@/app/styles/form.module.scss';

interface IDashedProps{
    label:string;
    binIcon?:React.ReactNode;
    squareIcon?:React.ReactNode;
    squareCheckedIcon?:React.ReactNode;
    checked?:()=>void;
    bin?:()=>void;
}

export const Dashed = ({label,bin,checked,binIcon,squareIcon,squareCheckedIcon}:IDashedProps) => {
    return (
        <div className={style.dash}>
            <div>
                <span  onClick={checked}>{squareIcon??squareCheckedIcon }</span>
                <label htmlFor="">{label}</label>
            </div>

            <div className={style.span} onClick={bin} >{binIcon }</div>
        </div>
    )
} 