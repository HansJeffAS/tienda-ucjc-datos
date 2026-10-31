# Micro-frontend: Datos

- **Pieza:** Datos (persistencia de pedidos y vista «Mis pedidos»)
- **Integrantes:** Hans Arauco Sanchez
- **Responsable:** Hans Arauco Sanchez
- **Custom Element:** `<ucjc-datos>`

---

## Borrador de Contratos de Eventos (v0.1)

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

### Eventos Emitidos
- Ninguno obligatorio inicialmente.