//CURP EJEMPLO GABA171221MGTRTLA7
/**
 * Curp regex
 * @type {RegExp}
 */
export const curpRegex: RegExp = new RegExp(
  '^[A-Z]{4}\\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\\d$',
);

/**
 * Valida un CURP y devuelve un objeto con el resultado y mensajes de error.
 * @param curp El CURP a validar
 * @returns Objeto con isValid (boolean) y messages (array de errores)
 */
export const validateCurp = (
  curp: string,
): { isValid: boolean; messages: string[] } => {
  const messages: string[] = [];
  let isValid = true;

  // Regla 1: Longitud total de 18 caracteres
  if (curp.length !== 18) {
    messages.push(
      `El CURP debe tener exactamente 18 caracteres (actual: ${curp.length}).`,
    );
    isValid = false;
    return { isValid, messages }; // Salir temprano si la longitud no coincide
  }

  // Regla 2: Primeros 4 caracteres deben ser letras mayúsculas
  if (!/^[A-Z]{4}/.test(curp.slice(0, 4))) {
    messages.push(
      'Los primeros 4 caracteres deben ser letras mayúsculas (A-Z).',
    );
    isValid = false;
  }

  // Regla 3: Siguientes 6 caracteres deben ser dígitos (fecha de nacimiento)
  if (!/^\d{6}/.test(curp.slice(4, 10))) {
    messages.push(
      'Los caracteres 5 al 10 deben ser dígitos (0-9) para la fecha de nacimiento (AAMMDD).',
    );
    isValid = false;
  }

  // Regla 4: Carácter 11 debe ser H o M (sexo)
  if (!/^[HM]/.test(curp.slice(10, 11))) {
    messages.push("El carácter 11 debe ser 'H' (hombre) o 'M' (mujer).");
    isValid = false;
  }

  // Regla 5: Caracteres 12 y 13 deben ser letras mayúsculas (estado)
  if (!/^[A-Z]{2}/.test(curp.slice(11, 13))) {
    messages.push(
      'Los caracteres 12 y 13 deben ser letras mayúsculas (A-Z) para el estado.',
    );
    isValid = false;
  }

  // Regla 6: Caracteres 14 al 16 deben ser consonantes válidas
  if (!/^[B-DF-HJ-NP-TV-Z]{3}/.test(curp.slice(13, 16))) {
    messages.push(
      'Los caracteres 14 al 16 deben ser consonantes válidas (B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z).',
    );
    isValid = false;
  }

  // Regla 7: Carácter 17 debe ser letra mayúscula o dígito
  if (!/^[A-Z0-9]/.test(curp.slice(16, 17))) {
    messages.push(
      'El carácter 17 debe ser una letra mayúscula (A-Z) o un dígito (0-9).',
    );
    isValid = false;
  }

  // Regla 8: Carácter 18 debe ser un dígito
  if (!/^\d/.test(curp.slice(17, 18))) {
    messages.push('El carácter 18 debe ser un dígito (0-9).');
    isValid = false;
  }

  // Validación completa con la regex original para asegurar consistencia
  if (!curpRegex.test(curp)) {
    isValid = false;
    if (messages.length === 0) {
      messages.push(
        'El CURP no cumple con el formato esperado. Asegúrate de seguir todas las reglas.',
      );
    }
  }

  return { isValid, messages };
};
