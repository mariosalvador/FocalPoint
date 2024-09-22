import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importa o idioma português
import style from '@/app/styles/formatted.module.scss'

export const FormattedDate = () => {
    // Configura o locale para português
    dayjs.locale('pt-br');

    // Pega a data atual
    const currentDate = dayjs();

    // Formata a data para "Segunda, 01 de dezembro de 2025"
    const formattedDate = currentDate.format('dddd, DD [de] MMMM [de] YYYY');

    return <span className={style.span}>{formattedDate}</span>;
};
