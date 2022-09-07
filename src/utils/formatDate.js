export const formatDate = (date) => {
    const dateArr = date.split("-")
    const year = dateArr[0];
    const month = dateArr[1][0] === '0' ? dateArr[1][1] : dateArr[1];
    const day = dateArr[2][0] === '0' ? dateArr[2][1] : dateArr[2];
    return {
        day,
        month,
        year
    }
}