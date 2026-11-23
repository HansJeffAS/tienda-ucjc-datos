const EVT_PED = 'ucjc:compra:pedido-confirmado@1';
const EVT_PED2 = 'ucjc:compra:pedido-confirmado@2'
const EVT_SES = 'ucjc:identidad:sesion-cambiada@1';

const css = `
  :host { display:block; font:15px/1.45 system-ui,sans-serif; color:#152033; }
  .box { background:#00409a; border:2px solid #00409a; border-radius:12px; padding:1rem 1.1rem; }
  .box2 { background:#ffffff; border:1px solid #ffffff; border-radius:12px; padding:1rem 1.1rem; }
  h2 { margin:0 0 .35rem; font-size:1.1rem; color: #fff; }
  .meta { color:#fff; font-size:.85rem; margin-bottom:.6rem; }
  ul { margin:.3rem 0; padding-left:0; list-style:none; }
  li.pedido-item { margin:.45rem 0; background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:.45rem .65rem; }
  .badge { display:inline-block; background:#00409a; border-radius:999px; padding:.1rem .55rem; font-size:.75rem; color: #fff; }
  button { font:inherit; border:0; border-radius:8px; padding:.4rem .8rem; cursor:pointer; background:#00409a; color:#fff; margin-top:.5rem; }
  button:hover { background:#3c74c3; }
  details summary { cursor:pointer; user-select:none; outline:none; }
  details summary::-webkit-details-marker { color:#5b677a; }
  .productos-tabla { width:100%; border-collapse:collapse; margin:.5rem 0 .3rem; font-size:.85rem; color:#334155; border-top:1px dashed #00409a; }
  .productos-tabla th, .productos-tabla td { padding:.4rem .5rem; border-bottom:1px solid #dcdcdc; }
  .productos-tabla th { background:#f1f1f1; color:#00409a; font-weight:600; text-align:left; }
  .productos-tabla th:nth-child(2), .productos-tabla td:nth-child(2) { text-align:center; }
  .productos-tabla th:nth-child(3), .productos-tabla td:nth-child(3) { text-align:right; }
  .sin-productos { font-size:.85rem; color:#64748b; margin:.4rem 0; font-style:italic; }
  .fecha { display:block; color: black; font-size:.75rem; margin-top:1rem; }
`;

class UcjcPedidos extends HTMLElement {
  #pedidos = [];
  #usuarioId = null;
  #email = null;

  #onPed = (e) => {
    const d = e.detail || {};
    if (!d.pedidoId) return;
    this.#pedidos = [
      {
        pedidoId: d.pedidoId,
        usuarioId: d.usuarioId,
        creadoEn: d.creadoEn,
        total: Number(d.total) || 0,
        moneda: d.moneda || d.monedas || 'EUR',
        lineas: Array.isArray(d.lineas) ? d.lineas : [],
      },
      ...this.#pedidos,
    ];
    this.#pintar();
  };

  #onSes = (e) => {
    const d = e.detail || {};
    if (!d.autenticado) {
      this.#usuarioId = null;
      this.#email = null;
      this.#pintar();
      return;
    }
    this.#usuarioId = d.usuario?.id ?? null;
    this.#email = d.usuario?.email ?? null;
    this.#pintar();
  };

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    window.addEventListener(EVT_PED, this.#onPed);
    window.addEventListener(EVT_PED2, this.#onPed);
    window.addEventListener(EVT_SES, this.#onSes);
    this.#pintar();
  }

  disconnectedCallback() {
    window.removeEventListener(EVT_PED, this.#onPed);
    window.removeEventListener(EVT_PED2, this.#onPed);
    window.removeEventListener(EVT_SES, this.#onSes);
  }

  #visibles() {
    if (!this.#usuarioId) return [];
    return this.#pedidos.filter((p) => p.usuarioId === this.#usuarioId);
  }

  #pintar() {
    const visibles = this.#visibles();
    const filtro = this.#usuarioId
      ? `👨‍🦱 Usuario: <b>${this.#usuarioId}</b> — ✉️ Email: <b>${this.#email ? ` ${this.#email}` : ''}</b>`
      : 'Sin sesión — la lista se oculta (contrato `@2`)';
    const lista = !this.#usuarioId
      ? '<li><i>Inicia sesión para ver «Mis pedidos»</i></li>'
      : visibles.length
        ? visibles
            .map((p) => {
              const itemsHtml = p.lineas.length
                ? `<table class="productos-tabla">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio del Producto</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${p.lineas
                        .map(
                          (l) => `
                        <tr>
                          <td>${l.nombre || '—'}</td>
                          <td>${l.cantidad ?? 1}</td>
                          <td>${Number(l.precio || 0).toFixed(2)} ${p.moneda}</td>
                        </tr>`
                        )
                        .join('')}
                    </tbody>
                  </table>`
                : '<p class="sin-productos">Sin detalle de productos</p>';

              return `
                <li class="pedido-item">
                  <details>
                    <summary>
                      <span class="badge">${p.pedidoId}</span> · Total: <b>${p.total.toFixed(2)} ${p.moneda}</b> · ${p.lineas.length} Producto(s)
                    </summary>
                    ${itemsHtml}
                    <span class="fecha">${p.creadoEn || ''}</span>
                  </details>
                </li>`;
            })
            .join('')
        : '<li><i>Aún no hay pedidos para este usuario</i></li>';
        
    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="box">
        <h2>Mis pedidos</h2>
        <p class="meta">${filtro}</p>
        <div class="box2">
          <ul>${lista}</ul>
          <button type="button" data-a="demo">Simular Pedido</button>
        </div>
      </div>`;

    this.shadowRoot.querySelector('[data-a="demo"]').onclick = () => {
      if (!this.#usuarioId) {
        this.#usuarioId = 'u-demo';
        this.#email = 'demo@alumno.ucjc.edu';
      }
      this.#onPed({
        detail: {
          pedidoId: `PED-DEMO-${Date.now()}`,
          usuarioId: this.#usuarioId,
          creadoEn: new Date().toISOString(),
          total: 35.99,
          moneda: 'EUR',
          lineas: [
            {
              productoId: 'prod-101',
              nombre: 'Camiseta UCJC',
              precio: 15.99,
              moneda: 'EUR',
              cantidad: 1,
            },
            {
              productoId: 'prod-102',
              nombre: 'Tasa UCJC',
              precio: 20.00,
              moneda: 'EUR',
              cantidad: 1,
            }
          ],
        },
      });
      this.#onPed({
        detail: {
          pedidoId: `PED-DEMO-${Date.now()}`,
          usuarioId: this.#usuarioId,
          creadoEn: new Date().toISOString(),
          total: 35.99,
          moneda: 'USD',
          lineas: [
            {
              productoId: 'prod-101',
              nombre: 'Camiseta UCJC',
              precio: 15.99,
              moneda: 'USD',
              cantidad: 1,
            },
            {
              productoId: 'prod-102',
              nombre: 'Tasa UCJC',
              precio: 20.00,
              moneda: 'USD',
              cantidad: 1,
            }
          ],
        },
      });
    };
  }
}

if (!customElements.get('ucjc-pedidos')) {
  customElements.define('ucjc-pedidos', UcjcPedidos);
}

export default { nombre: 'datos', version: '0.2.4' };
