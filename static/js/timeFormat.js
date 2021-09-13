export function getDateString (date) {
    let formatDate = new Date(date)
    var year = formatDate.getFullYear().toString().padStart(4, "0");
    var month = (formatDate.getMonth() + 1).toString().padStart(2, "0");
    var day = formatDate.getDate().toString().padStart(2, "0");

    // var hour = date.getHours().toString().padStart(2, "0");
    // var minute = date.getMinutes().toString().padStart(2, "0");
    // var second = date.getSeconds().toString().padStart(2, "0");
    return `${year}年${month}月${day}日`;
}