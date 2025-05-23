import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  // Mapa para almacenar los signals asociados a cada clave.
  private signals = new Map<string, WritableSignal<any>>();

  constructor() {
    // Escucha los eventos de cambio en sessionStorage (por ejemplo, desde otra pestaña)
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key && this.signals.has(event.key)) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        this.signals.get(event.key)?.set(newValue);
      }
    });
  }

  // Guarda un valor en sessionStorage y actualiza el signal asociado.
  public setItem(key: string, value: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      if (this.signals.has(key)) {
        this.signals.get(key)?.set(value);
      } else {
        // Si no existe el signal, se crea uno nuevo.
        this.signals.set(key, signal(value));
      }
    } catch (error) {
      console.error(
        `Error al guardar la clave ${key} en sessionStorage:`,
        error,
      );
    }
  }

  // Recupera un valor de sessionStorage y actualiza el signal si ya existe.
  public getItem(key: string): any {
    try {
      const item = sessionStorage.getItem(key);
      const value = item ? JSON.parse(item) : null;
      if (this.signals.has(key)) {
        this.signals.get(key)?.set(value);
      }
      return value;
    } catch (error) {
      console.error(
        `Error al obtener la clave ${key} del sessionStorage:`,
        error,
      );
      return null;
    }
  }

  // Elimina un valor de sessionStorage y actualiza el signal asociado.
  public removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
      if (this.signals.has(key)) {
        this.signals.get(key)?.set(null);
      }
    } catch (error) {
      console.error(
        `Error al eliminar la clave ${key} del sessionStorage:`,
        error,
      );
    }
  }

  // Limpia todo el sessionStorage y reinicia todos los signals.
  public clear(): void {
    try {
      sessionStorage.clear();
      this.signals.forEach((sig) => sig.set(null));
    } catch (error) {
      console.error('Error al limpiar el sessionStorage:', error);
    }
  }

  // Devuelve un signal para una clave específica. Si el signal no existe, se crea
  // inicializándolo con el valor actual almacenado en sessionStorage.
  public watchItem<T>(key: string): WritableSignal<T | null> {
    if (!this.signals.has(key)) {
      const initial = this.getItem(key);
      this.signals.set(key, signal<T | null>(initial));
    }
    return this.signals.get(key) as WritableSignal<T | null>;
  }
}
