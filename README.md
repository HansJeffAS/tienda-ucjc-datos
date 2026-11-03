# Micro-frontend: Datos

- **Pieza:** Datos (persistencia de pedidos y vista «Mis pedidos»)
- **Integrantes:** Hans Arauco Sanchez
- **Responsable:** Hans Arauco Sanchez
- **Custom Element:** `<ucjc-pedidos>`

---

## Contratos de Eventos (Versión 1 - Acordada en Hoja B)

### Eventos Consumidos
- **`order:confirmed`** (desde Compra): Recibe la orden finalizada para almacenarla (vía mock API/LocalStorage) y actualizar el listado de pedidos.
  - **Payload esperado:**
    ```json
    {
      "orderId": "string",
      "userId": "string",
      "items": [],
      "total": 0,
      "timestamp": "string"
    }
    ```
- **`auth:session-changed`** (desde Identidad): Permite filtrar y mostrar únicamente los pedidos correspondientes al `userId` autenticado.

Nuestra pieza **no emite eventos** hacia otros micro-frontends en esta fase; únicamente **consume** eventos del DOM (`window`).

#### 1. `ucjc:compra:pedido-confirmado`
* **Origen:** Pieza Compra.
* **Propósito:** Notifica que un pedido ha sido finalizado para almacenarlo en la persistencia y reflejarlo en el historial.
* **Campos (`event.detail`):**
  - `orderId` (string, obligatorio): Identificador único del pedido.
  - `userId` (string, obligatorio): Identificador del usuario que realizó la compra.
  - `total` (number, obligatorio): Importe total del pedido.
  - `createdAt` (string ISO, obligatorio): Marca de tiempo del pedido.
  - `items` (array, obligatorio): Lista de productos comprados. Cada elemento contiene:
    - `productId` (string, obligatorio)
    - `name` (string, obligatorio)
    - `price` (number, obligatorio)
    - `quantity` (number, obligatorio)

#### 2. `ucjc:identidad:sesion-cambiada`
* **Origen:** Pieza Identidad.
* **Propósito:** Informa del inicio o cierre de sesión para filtrar los pedidos visibles en «Mis pedidos» según el usuario conectado.
* **Campos (`event.detail`):**
  - `isAuthenticated` (boolean, obligatorio): Indica si hay una sesión activa.
  - `user` (object, opcional / obligatorio si `isAuthenticated` es true):
    - `id` (string, obligatorio)
    - `email` (string, obligatorio)

### Eventos Emitidos
- Ninguno obligatorio inicialmente.
## Cómo se publica (contrato de carga del shell)

Requisito: **Node ≥ 20** (el workflow usa Node 22). Custom element canónico: **`<ucjc-pedidos>`**.

1. `npm ci && npm run build` → genera `dist/remote.js` (ya no `index.js`).
2. Etiquetar y empujar: `git tag v0.2.0 && git push origin v0.2.0`.
3. El workflow `.github/workflows/release.yml` publica `dist/` en `gh-pages/v0.2.0/`.
4. *Settings → Pages* → rama **`gh-pages`**, carpeta **`/`**.
5. El repositorio debe ser **público** para que el shell pueda importar la URL por HTTPS.

URL esperada: `https://<usuario>.github.io/tienda-ucjc-datos/v0.2.0/remote.js`.

### Tests

```bash
npm test
```

Comprueban el custom element, el `export default` y el flujo mínimo de eventos `@1`.
