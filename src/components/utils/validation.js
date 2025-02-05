export const password = {
    required: true,
    minLength: {
        value: 5,
        message: 'Mínimo de caráracteres permitidos es 5',
    },
    maxLength: {
        value: 8,
        message: 'Máximo de caráracteres permitidos es 8',
    },
}

export const usernmae = {
    required: true,
    minLength: {
        value: 4,
        message: 'Mínimo de caráracteres permitidos es 4',
    },
    maxLength: {
        value: 8,
        message: 'Máximo de caráracteres permitidos es 8',
    },
}

export const email = {
    required: true,
    // pattern: {
    //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    //     message: 'Correo invalido',
    // },
}