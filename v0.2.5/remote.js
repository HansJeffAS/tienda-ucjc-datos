var x = (e) => {
  throw TypeError(e);
};
var w = (e, d, a) => d.has(e) || x("Cannot " + a);
var t = (e, d, a) => (w(e, d, "read from private field"), a ? a.call(e) : d.get(e)), l = (e, d, a) => d.has(e) ? x("Cannot add the same private member more than once") : d instanceof WeakSet ? d.add(e) : d.set(e, a), n = (e, d, a, o) => (w(e, d, "write to private field"), o ? o.call(e, a) : d.set(e, a), a), u = (e, d, a) => (w(e, d, "access private method"), a);
const y = "ucjc:compra:pedido-confirmado@1", $ = "ucjc:compra:pedido-confirmado@2", I = "ucjc:identidad:sesion-cambiada@1", S = `
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
var b, i, m, p, c, f, r, k, h;
class C extends HTMLElement {
  constructor() {
    super(...arguments);
    l(this, r);
    l(this, b, []);
    l(this, i, null);
    l(this, m, null);
    l(this, p, !0);
    l(this, c, (a) => {
      const o = a.detail || {};
      o.pedidoId && (n(this, b, [
        {
          pedidoId: o.pedidoId,
          usuarioId: o.usuarioId,
          creadoEn: o.creadoEn,
          total: Number(o.total) || 0,
          moneda: o.moneda || o.monedas || "EUR",
          campaña: o.campaña || null,
          lineas: Array.isArray(o.lineas) ? o.lineas : []
        },
        ...t(this, b)
      ]), u(this, r, h).call(this));
    });
    l(this, f, (a) => {
      var g, s;
      const o = a.detail || {};
      if (!o.autenticado) {
        n(this, i, null), n(this, m, null), u(this, r, h).call(this);
        return;
      }
      n(this, i, ((g = o.usuario) == null ? void 0 : g.id) ?? null), n(this, m, ((s = o.usuario) == null ? void 0 : s.email) ?? null), u(this, r, h).call(this);
    });
  }
  connectedCallback() {
    this.attachShadow({ mode: "open" }), window.addEventListener(y, t(this, c)), window.addEventListener($, t(this, c)), window.addEventListener(I, t(this, f)), u(this, r, h).call(this);
  }
  disconnectedCallback() {
    window.removeEventListener(y, t(this, c)), window.removeEventListener($, t(this, c)), window.removeEventListener(I, t(this, f));
  }
}
b = new WeakMap(), i = new WeakMap(), m = new WeakMap(), p = new WeakMap(), c = new WeakMap(), f = new WeakMap(), r = new WeakSet(), k = function() {
  return t(this, i) ? t(this, b).filter((a) => a.usuarioId === t(this, i)) : [];
}, h = function() {
  const a = u(this, r, k).call(this), o = t(this, i) ? `👨‍🦱 Usuario: <b>${t(this, i)}</b> — ✉️ Email: <b>${t(this, m) ? ` ${t(this, m)}` : ""}</b>` : "Sin sesión — la lista se oculta (contrato `@2`)", g = t(this, i) ? a.length ? a.map((s) => {
    const v = s.lineas.length ? `<table class="productos-tabla">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio del Producto</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${s.lineas.map(
      (E) => `
                        <tr>
                          <td>${E.nombre || "—"}</td>
                          <td>${E.cantidad ?? 1}</td>
                          <td>${Number(E.precio || 0).toFixed(2)} ${s.moneda}</td>
                        </tr>`
    ).join("")}
                    </tbody>
                  </table>` : '<p class="sin-productos">Sin detalle de productos</p>';
    return `
                <li class="pedido-item">
                  <details>
                    <summary>
                      <span class="badge">${s.pedidoId}</span> · Total: <b>${s.total.toFixed(2)} ${s.moneda}</b> · ${s.lineas.length} Producto(s)${t(this, p) && s.campaña ? ` · <span class="campana">Campaña: <b>${s.campaña}</b></span>` : ""}
                    </summary>
                    ${v}
                    <span class="fecha">${s.creadoEn || ""}</span>
                  </details>
                </li>`;
  }).join("") : "<li><i>Aún no hay pedidos confirmados para este usuario</i></li>" : "<li><i>Inicia sesión para ver «Mis pedidos»</i></li>";
  this.shadowRoot.innerHTML = `
      <style>${S}</style>
      <div class="box">
        <h2>Mis pedidos</h2>
        <p class="meta">${o}</p>
        <div class="box2">
          <ul>${g}</ul>
          <button type="button" data-a="demo">Simular Pedido</button>
          <button type="button" data-a="toggle-campana">${t(this, p) ? "Ocultar campaña" : "Mostrar campaña"}</button>
        </div>
      </div>`, this.shadowRoot.querySelector('[data-a="toggle-campana"]').onclick = () => {
    n(this, p, !t(this, p)), u(this, r, h).call(this);
  }, this.shadowRoot.querySelector('[data-a="demo"]').onclick = () => {
    t(this, i) || (n(this, i, "u-demo"), n(this, m, "demo@alumno.ucjc.edu")), t(this, c).call(this, {
      detail: {
        pedidoId: `PED-DEMO-${Date.now()}`,
        usuarioId: t(this, i),
        creadoEn: (/* @__PURE__ */ new Date()).toISOString(),
        total: 35.99,
        moneda: "EUR",
        campaña: "BlackFriday",
        lineas: [
          {
            productoId: "prod-101",
            nombre: "Camiseta UCJC",
            precio: 15.99,
            moneda: "EUR",
            cantidad: 1
          },
          {
            productoId: "prod-102",
            nombre: "Tasa UCJC",
            precio: 20,
            moneda: "EUR",
            cantidad: 1
          }
        ]
      }
    }), t(this, c).call(this, {
      detail: {
        pedidoId: `PED-DEMO-${Date.now()}`,
        usuarioId: t(this, i),
        creadoEn: (/* @__PURE__ */ new Date()).toISOString(),
        total: 35.99,
        moneda: "USD",
        lineas: [
          {
            productoId: "prod-101",
            nombre: "Camiseta UCJC",
            precio: 15.99,
            moneda: "USD",
            cantidad: 1
          },
          {
            productoId: "prod-102",
            nombre: "Tasa UCJC",
            precio: 20,
            moneda: "USD",
            cantidad: 1
          }
        ]
      }
    });
  };
};
customElements.get("ucjc-pedidos") || customElements.define("ucjc-pedidos", C);
const U = { nombre: "datos", version: "0.2.5" };
export {
  U as default
};
