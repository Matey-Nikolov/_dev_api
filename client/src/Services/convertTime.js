const timeConverter = (timestamp) => {
    const dateObj = new Date(timestamp);

    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; 
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
  
    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    return formattedDate;
};

export default timeConverter;