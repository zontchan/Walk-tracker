export default function dateValidator(value) {
    const reDate = /^\d{2}\.\d{2}\.\d{4}$/i;
    const isValid = reDate.test(value);
    if(isValid){
    const arrD = value.split(".");
    arrD[1] -= 1;
    const d = new Date(arrD[2], arrD[1], arrD[0]);
    return (d.getFullYear() === Number(arrD[2])) && (d.getMonth() === Number(arrD[1])) && (d.getDate() === Number(arrD[0]));
    }
    else{
        return false;
    }
}