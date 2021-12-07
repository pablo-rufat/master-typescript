class CustomError {
    codigo: number;
    message: string;

    constructor(codigo: number, message: string) {
        this.codigo = codigo;
        this.message = message;
    }
}

export default CustomError;