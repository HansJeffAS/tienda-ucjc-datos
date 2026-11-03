import { beforeEach, describe, expect, it } from 'vitest';
import mod from './index.js';

describe('ucjc-pedidos (Datos A)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('exporta metadatos y registra CE canónico', () => {
    expect(mod).toEqual({ nombre: 'datos', version: '0.2.0' });
    expect(customElements.get('ucjc-pedidos')).toBeTruthy();
    expect(customElements.get('ucjc-datos')).toBeFalsy();
  });

  it('filtra pedidos por sesión', async () => {
    const el = document.createElement('ucjc-pedidos');
    document.body.appendChild(el);

    window.dispatchEvent(
      new CustomEvent('ucjc:identidad:sesion-cambiada@1', {
        detail: {
          autenticado: true,
          usuario: { id: 'u-1', email: 'a@ucjc.edu', nombre: 'Ana' },
        },
      })
    );
    window.dispatchEvent(
      new CustomEvent('ucjc:compra:pedido-confirmado@1', {
        detail: {
          pedidoId: 'PED-1',
          usuarioId: 'u-1',
          creadoEn: '2026-11-02T12:00:00Z',
          total: 19.99,
          lineas: [{ productoId: 'p1', nombre: 'Camiseta', precio: 19.99, cantidad: 1 }],
        },
      })
    );
    await Promise.resolve();
    expect(el.shadowRoot.textContent).toContain('PED-1');

    window.dispatchEvent(
      new CustomEvent('ucjc:identidad:sesion-cambiada@1', {
        detail: { autenticado: false, usuario: null },
      })
    );
    await Promise.resolve();
    expect(el.shadowRoot.textContent).toMatch(/Sin sesión|Inicia sesión/i);
  });
});
