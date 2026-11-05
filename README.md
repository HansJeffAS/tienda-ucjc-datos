# Micro-frontend: Datos

- **Pieza:** Datos (persistencia de pedidos y vista «Mis pedidos»)
- **Integrantes:** Hans Arauco Sanchez
- **Responsable:** Hans Arauco Sanchez
- **Custom Element:** `<ucjc-pedidos>`

---

## Contratos de Eventos (Versión 1 - Acordada en Hoja B)

#### 1. `ucjc:compra:pedido-confirmado@1`
* **Origen:** Pieza Compra.
* **Propósito:** Notifica que un pedido ha sido finalizado para almacenarlo en la persistencia y reflejarlo en el historial.
* **Campos (`event.detail`):**
  - `pedidoId` (string, obligatorio): Identificador único del pedido.
  - `usuarioId` (string, obligatorio): Identificador del usuario que realizó la compra.
  - `creadoEn` (string ISO, obligatorio): Marca de tiempo del pedido.
  - `total` (number, obligatorio): Importe total del pedido.
  - `lineas` (array, obligatorio): Lista de productos comprados. Cada elemento contiene:
    - `productId` (string, obligatorio)
    - `nombre` (string, obligatorio)
    - `precio` (number, obligatorio)
    - `cantidad` (number, obligatorio)

#### 2. `ucjc:identidad:sesion-cambiada@1`
* **Origen:** Pieza Identidad.
* **Propósito:** Informa del inicio o cierre de sesión para filtrar los pedidos visibles en «Mis pedidos» según el usuario conectado.
* **Campos (`event.detail`):**
  - `autenticado` (boolean, obligatorio): Indica si hay una sesión activa.
  - `usuario` (object, opcional / obligatorio si `isAuthenticated` es true):
    - `usuario.id` (string, obligatorio)
    - `usuario.email` (string, obligatorio)

### Eventos Emitidos
- Ninguno obligatorio inicialmente.

### Tests

```bash
npm test
```

Comprueban el custom element, el `export default` y el flujo mínimo de eventos `@1`.
