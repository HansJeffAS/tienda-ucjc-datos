const EVT_PED = 'ucjc:compra:pedido-confirmado@1';
const EVT_SES = 'ucjc:identidad:sesion-cambiada@1';

const css = `
  :host { display:block; font:15px/1.45 system-ui,sans-serif; color:#152033; }
  .box { background:#f7f9fc; border:1px solid #d7dee8; border-radius:12px; padding:1rem 1.1rem; }
  h2 { margin:0 0 .35rem; font-size:1.1rem; }
  .meta { color:#5b677a; font-size:.85rem; margin-bottom:.6rem; }
  ul { margin:.3rem 0; padding-left:1.1rem; }
  li { margin:.35rem 0; }
  .badge { display:inline-block; background:#e8eef8; border-radius:999px; padding:.1rem .55rem; font-size:.75rem; }
  button { font:inherit; border:0; border-radius:8px; padding:.4rem .8rem; cursor:pointer; background:#e7ecf3; color:#152033; margin-top:.5rem; }
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
    window.addEventListener(EVT_SES, this.#onSes);
    this.#pintar();
  }

  disconnectedCallback() {
    window.removeEventListener(EVT_PED, this.#onPed);
    window.removeEventListener(EVT_SES, this.#onSes);
  }

  #visibles() {
    if (!this.#usuarioId) return [];
    return this.#pedidos.filter((p) => p.usuarioId === this.#usuarioId);
  }

  #pintar() {
    const visibles = this.#visibles();
    const filtro = this.#usuarioId
      ? `Usuario: <b>${this.#usuarioId}</b>${this.#email ? ` · ${this.#email}` : ''}`
      : 'Sin sesión — la lista se oculta (contrato `@1`)';
    const lista = !this.#usuarioId
      ? '<li><i>Inicia sesión para ver «Mis pedidos»</i></li>'
      : visibles.length
        ? visibles
            .map(
              (p) =>
                `<li><span class="badge">${p.pedidoId}</span> · <b>${p.total.toFixed(2)} €</b> · ${p.lineas.length} línea(s)<br><small>${p.creadoEn || ''}</small></li>`
            )
            .join('')
        : '<li><i>Aún no hay pedidos para este usuario</i></li>';

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      <div class="box">
        <h2>Datos · Mis pedidos</h2>
        <p class="meta">${filtro}</p>
        <ul>${lista}</ul>
        <button type="button" data-a="demo">Simular pedido (solo pruebas)</button>
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
          total: 19.99,
          lineas: [
            {
              productoId: 'prod-101',
              nombre: 'Camiseta UCJC',
              precio: 19.99,
              cantidad: 1,
            },
          ],
        },
      });
    };
  }
}

if (!customElements.get('ucjc-pedidos')) {
  customElements.define('ucjc-pedidos', UcjcPedidos);
}

export default { nombre: 'datos', version: '0.2.0' };
