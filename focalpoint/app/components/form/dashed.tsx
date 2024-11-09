import style from '@/app/styles/form.module.scss';

interface IDashedProps {
    label?: string;
    binIcon?: React.ReactNode;
    squareIcon?: React.ReactNode;
    squareCheckedIcon?: React.ReactNode;
    checked?: () => void;
    bin?: () => void;
}

export const Dashed = ({ label, bin, checked, binIcon, squareIcon, squareCheckedIcon }: IDashedProps) => {
    return (
        <div className={"w-full max-w-[500px] h-[50px] min-h-max  outline-dashed outline-[2px] outline-[#D7DDE9] rounded-lg justify-between items-center px-4 py-2 flex flex-wrap"}>
            <span onClick={checked}>{squareIcon ?? squareCheckedIcon}</span>

            <label className="w-[80%] h-full p-1 whitespace-nowrap text-ellipsis overflow-hidden flex break-words ">
                {label}
            </label>

            <div className={style.span} onClick={bin}>
                {binIcon}
            </div>
        </div>
    );
};



// &:hover {
//     background-color: #F7F9FD;
//     outline-style: none;
//     transition: 0.5s;
// }
{/*

            <label className={` ${style.lb} ${squareCheckedIcon ? style.label : ''} `}>{label}</label>
*/}