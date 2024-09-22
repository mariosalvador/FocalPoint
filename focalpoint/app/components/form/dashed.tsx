import style from '@/app/styles/form.module.scss';

interface IDashedProps {
    label: string;
    binIcon?: React.ReactNode;
    squareIcon?: React.ReactNode;
    squareCheckedIcon?: React.ReactNode;
    checked?: () => void;
    bin?: () => void;
}

export const Dashed = ({ label, bin, checked, binIcon, squareIcon, squareCheckedIcon }: IDashedProps) => {
    return (
        <div className={style.dash}>

            <span onClick={checked}>{squareIcon ?? squareCheckedIcon}</span>

            <label className={` ${style.lb} ${squareCheckedIcon ? style.label : ''} `}>{label}</label>


            <div className={style.span} onClick={bin}>
                {binIcon}
            </div>
        </div>
    );
};
