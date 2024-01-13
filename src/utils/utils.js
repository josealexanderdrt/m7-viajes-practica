import ERRORS from "../helpers/erros.js";

const findError = (code)=>{
    return ERRORS.filter((err) => err.code == code)};

export  {findError}; 