export const validMail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


export const formatValor = (num: string): number | string => {
    if (num == null) return '';
    return num.replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
}

export const dataBrasil = (data: string): string => {
    let separador: any;
    if (data != null && data != '') {
        if (data.trim() === '') {
            return '';
        }
        if (data.search('-') > 0) {
            separador = '-';
        }
        if (data.search('/') > 0) {
            separador = '/';
        }
        if (data.search('.') > 0) {
            separador = '.';
        }

        //2014/12/01
        let rt = data.split(separador);
        let dt = rt[2] + '/' + rt[1] + '/' + rt[0];
        return dt;
    } else {
        return '';
    }
}

export default {
    validMail,
    formatValor,
    dataBrasil
}