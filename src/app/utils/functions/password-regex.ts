export const passwordRegex: RegExp = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
);

/**
 * Valida una contraseña y devuelve un objeto con el resultado y mensajes de error.
 */
export const validatePassword = (
    password: string,
): { isValid: boolean; messages: string[] } => {
    const messages: string[] = [];
    let isValid = true;

    // Regla 1: Longitud mínima de 8 caracteres
    if (password.length < 8) {
        messages.push('La contraseña debe tener al menos 8 caracteres.');
        isValid = false;
    }

    // Regla 2: Al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
        messages.push(
            'La contraseña debe contener al menos una letra mayúscula.',
        );
        isValid = false;
    }

    // Regla 3: Al menos una letra minúscula
    if (!/[a-z]/.test(password)) {
        messages.push(
            'La contraseña debe contener al menos una letra minúscula.',
        );
        isValid = false;
    }

    // Regla 4: Al menos un dígito
    if (!/\d/.test(password)) {
        messages.push('La contraseña debe contener al menos un número.');
        isValid = false;
    }

    // Regla 5: Al menos un carácter especial
    if (!/[@$!%*?&]/.test(password)) {
        messages.push(
            'La contraseña debe contener al menos un carácter especial (@$!%*?&).',
        );
        isValid = false;
    }

    // Regla 6: Solo caracteres permitidos (letras, números y @$!%*?&)
    if (!/^[A-Za-z\d@$!%*?&]*$/.test(password)) {
        messages.push(
            'La contraseña solo puede contener letras, números y los caracteres @$!%*?&.',
        );
        isValid = false;
    }

    return { isValid, messages };
};
