export const dateFormat = (datetime) => {
    var date = new Date(datetime);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var formattedDay = day < 10 ? '0' + day : day;
    var formattedMonth = month < 10 ? '0' + month : month;
    var formattedHours = hours < 10 ? '0' + hours : hours;
    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedTime = `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    return (formattedTime)
}


export const reverseDate = (datetime) => {
    if (datetime.includes(' ')) {
        const parts = datetime.split(' ');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;
    }
    else {
        const newDate = datetime.split('-')
        return `${newDate[2]}-${newDate[1]}-${newDate[0]}`
    }
}