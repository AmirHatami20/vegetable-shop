export const toPersianNumber = (number, split = true) => {
    if (number == null) return "۰";

    if (split) {
        const withCommas = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
        return withCommas.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
    } else {
        return number.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
    }
};