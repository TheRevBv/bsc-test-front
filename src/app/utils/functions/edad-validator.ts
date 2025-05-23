import { AbstractControl, ValidationErrors } from '@angular/forms';

export function edadValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const menorAMeses = control.get('edad.menorAMeses')?.value;
  const anios = control.get('edad.anios')?.value;
  const meses = control.get('edad.meses')?.value;

  // Cuando es menor a meses no se evalúa esta regla
  if (menorAMeses) {
    return null;
  }

  // Si no se cumple la regla: cuando años es 0, meses debe ser mayor a 0
  if (anios === 0 && meses <= 0) {
    return {
      edadInvalida:
        'Si la mascota tiene 0 años, se debe ingresar al menos 1 mes.',
    };
  }

  return null;
}
