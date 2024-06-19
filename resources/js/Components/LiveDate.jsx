// src/Clock.js

import React, { useState, useEffect } from 'react';

const Clock = ({ timezone }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = () => {
        setTime(new Date());
    };

    const formatTime = (date, timezone) => {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            timeZone: timezone,
        };
        const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);

        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: timezone,
            hour12: false,
        };
        const formattedTime = new Intl.DateTimeFormat('id-ID', timeOptions).format(date);

        const timeParts = formattedTime.split('.');
        const formattedTimeWithColons = timeParts.join(':');

        const timeZoneName = new Intl.DateTimeFormat('id-ID', {
            timeZoneName: 'short',
            timeZone: timezone,
        }).formatToParts(date).find(part => part.type === 'timeZoneName').value;

        return `${formattedDate} ${formattedTimeWithColons} ${timeZoneName}`;
    };

    return (
        <div className='max-sm:hidden'>
            <p>{formatTime(time, timezone)}</p>
        </div>
    );
};

export default Clock;
