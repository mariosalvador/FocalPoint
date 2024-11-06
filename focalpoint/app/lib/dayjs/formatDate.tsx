"use client";
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import style from '@/app/styles/formatted.module.scss';


dayjs.locale('pt-br');

export const FormattedDate = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());

    useEffect(() => {
        const now = dayjs();
        const startOfNextDay = now.add(1, 'day').startOf('day');
        const timeUntilNextDay = startOfNextDay.diff(now);

        const timeout = setTimeout(() => {
            setCurrentDate(dayjs());
        }, timeUntilNextDay);

        return () => clearTimeout(timeout);
    }, [currentDate]);

    const formattedDate = currentDate.format('dddd, DD [de] MMMM [de] YYYY');

    return <span className={style.span}>{formattedDate}</span>;
};
