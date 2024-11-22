export const generateCode = () => {
    const length = 8;
    const characters = '0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}


export const createUser = (email, password, username) => {
    const resObj = {
        email,
        password,
        username,
        globalTotal: 0,
        weekTotal: 0,
        isMonthly: true,
        userHistory: [],
        calendar:  [
            { date: 22, fullData: '22.12.2023', total: 0, messages: [] },
            { date: 23, fullData: '23.12.2023', total: 0, messages: [] },
            { date: 24, fullData: '24.12.2023', total: 0, messages: [] },
            { date: 25, fullData: '25.12.2023', total: 0, messages: [] },
            { date: 26, fullData: '26.12.2023', total: 0, messages: [] },
            { date: 27, fullData: '27.12.2023', total: 0, messages: [] },
            { date: 28, fullData: '28.12.2023', total: 0, messages: [] },
            { date: 29, fullData: '29.12.2023', total: 0, messages: [] },
            { date: 30, fullData: '30.12.2023', total: 0, messages: [] },
            { date: 31, fullData: '31.12.2023', total: 0, messages: [] },
            { date: 1, fullData: '1.01.2024', total: 0, messages: [] },
            { date: 2, fullData: '2.01.2024', total: 0, messages: [] },
            { date: 3, fullData: '3.01.2024', total: 0, messages: [] },
            { date: 4, fullData: '4.01.2024', total: 0, messages: [] },
            { date: 5, fullData: '5.01.2024', total: 0, messages: [] },
            { date: 6, fullData: '6.01.2024', total: 0, messages: [] },
            { date: 7, fullData: '7.01.2024', total: 0, messages: [] },
            { date: 8, fullData: '8.01.2024', total: 0, messages: [] },
            { date: 9, fullData: '9.01.2024', total: 0, messages: [] },
            { date: 10, fullData: '10.01.2024', total: 0, messages: [] },
            { date: 11, fullData: '11.01.2024', total: 0, messages: [] },
            { date: 12, fullData: '12.01.2024', total: 0, messages: [] },
            { date: 13, fullData: '13.01.2024', total: 0, messages: [] },
            { date: 14, fullData: '14.01.2024', total: 0, messages: [] },
            { date: 15, fullData: '15.01.2024', total: 0, messages: [] },
            { date: 16, fullData: '16.01.2024', total: 0, messages: [] },
            { date: 17, fullData: '17.01.2024', total: 0, messages: [] },
            { date: 18, fullData: '18.01.2024', total: 0, messages: [] },
            { date: 19, fullData: '19.01.2024', total: 0, messages: [] },
            { date: 20, fullData: '20.01.2024', total: 0, messages: [] },
            { date: 21, fullData: '21.01.2024', total: 0, messages: [] },
            { date: 22, fullData: '22.01.2024', total: 0, messages: [] },
            { date: 23, fullData: '23.01.2024', total: 0, messages: [] },
            { date: 24, fullData: '24.01.2024', total: 0, messages: [] },
            { date: 25, fullData: '25.01.2024', total: 0, messages: [] },
        ]
    }
    return resObj
}

export const updateCalendarData = (calendar) => {
    let global = 0
    let week = 0
    const today = new Date();
    let formattedDate = `${today.getDate() < 10 ? '0' : ''}${today.getDate()}.${(today.getMonth() + 1) < 10 ? '0' : ''}${today.getMonth() + 1}.${today.getFullYear()}`;

    let newCalendar = [];

    for (let i = 0; i <= 34; i++) {
        const originalDate = new Date(formattedDate.split('.').reverse().join('-'));
        newCalendar.push({
            date: originalDate.getDate(),
            fullData: formattedDate,
            total: 0,
            messages: []
        });
        calendar.forEach(elem => {
            if (elem.fullData === formattedDate) {
                newCalendar[i].total = elem.total
                newCalendar[i].messages = JSON.parse(JSON.stringify(elem.messages));
                if (elem.total > 0) {
                    global += elem.total
                } else {
                    global += elem.total
                }
            }
        });
        const prevDay = new Date(originalDate);
        prevDay.setDate(originalDate.getDate() - 1);
        formattedDate = `${prevDay.getDate() < 10 ? '0' : ''}${prevDay.getDate()}.${(prevDay.getMonth() + 1) < 10 ? '0' : ''}${prevDay.getMonth() + 1}.${prevDay.getFullYear()}`;
    }
    let i = 0
    while(i < 7) {
        week += newCalendar[i].total
        i++
    }

    return [newCalendar.reverse(), global, week]
}