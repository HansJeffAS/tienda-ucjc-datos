var x = (e) => {
  throw TypeError(e);
};
var E = (e, i, t) => i.has(e) || x("Cannot " + t);
var o = (e, i, t) => (E(e, i, "read from private field"), t ? t.call(e) : i.get(e)), c = (e, i, t) => i.has(e) ? x("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), n = (e, i, t, d) => (E(e, i, "write to private field"), d ? d.call(e, t) : i.set(e, t), t), u = (e, i, t) => (E(e, i, "access private method"), t);
const y = "ucjc:compra:pedido-confirmado@2", I = "ucjc:identidad:sesion-cambiada@1", k = `
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
var p, a, l, m, b, s, $, h;
class v extends HTMLElement {
  constructor() {
    super(...arguments);
    c(this, s);
    c(this, p, []);
    c(this, a, null);
    c(this, l, null);
    c(this, m, (t) => {
      const d = t.detail || {};
      d.pedidoId && (n(this, p, [
        {
          pedidoId: d.pedidoId,
          usuarioId: d.usuarioId,
          creadoEn: d.creadoEn,
          total: Number(d.total) || 0,
          moneda: d.moneda || d.monedas || "EUR",
          lineas: Array.isArray(d.lineas) ? d.lineas : []
        },
        ...o(this, p)
      ]), u(this, s, h).call(this));
    });
    c(this, b, (t) => {
      var f, r;
      const d = t.detail || {};
      if (!d.autenticado) {
        n(this, a, null), n(this, l, null), u(this, s, h).call(this);
        return;
      }
      n(this, a, ((f = d.usuario) == null ? void 0 : f.id) ?? null), n(this, l, ((r = d.usuario) == null ? void 0 : r.email) ?? null), u(this, s, h).call(this);
    });
  }
  connectedCallback() {
    this.attachShadow({ mode: "open" }), window.addEventListener(y, o(this, m)), window.addEventListener(I, o(this, b)), u(this, s, h).call(this);
  }
  disconnectedCallback() {
    window.removeEventListener(y, o(this, m)), window.removeEventListener(I, o(this, b));
  }
}
p = new WeakMap(), a = new WeakMap(), l = new WeakMap(), m = new WeakMap(), b = new WeakMap(), s = new WeakSet(), $ = function() {
  return o(this, a) ? o(this, p).filter((t) => t.usuarioId === o(this, a)) : [];
}, h = function() {
  const t = u(this, s, $).call(this), d = o(this, a) ? `👨‍🦱 Usuario: <b>${o(this, a)}</b> — ✉️ Email: <b>${o(this, l) ? ` ${o(this, l)}` : ""}</b>` : "Sin sesión — la lista se oculta (contrato `@2`)", f = o(this, a) ? t.length ? t.map((r) => {
    const w = r.lineas.length ? `<table class="productos-tabla">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio del Producto</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${r.lineas.map(
      (g) => `
                        <tr>
                          <td>${g.nombre || "—"}</td>
                          <td>${g.cantidad ?? 1}</td>
                          <td>${Number(g.precio || 0).toFixed(2)} ${r.moneda}</td>
                        </tr>`
    ).join("")}
                    </tbody>
                  </table>` : '<p class="sin-productos">Sin detalle de productos</p>';
    return `
                <li class="pedido-item">
                  <details>
                    <summary>
                      <span class="badge">${r.pedidoId}</span> · Total: <b>${r.total.toFixed(2)} ${r.moneda}</b> · ${r.lineas.length} Producto(s)
                    </summary>
                    ${w}
                    <span class="fecha">${r.creadoEn || ""}</span>
                  </details>
                </li>`;
  }).join("") : "<li><i>Aún no hay pedidos para este usuario</i></li>" : "<li><i>Inicia sesión para ver «Mis pedidos»</i></li>";
  this.shadowRoot.innerHTML = `
      <style>${k}</style>
      <div class="box">
        <h2>Mis pedidos</h2>
        <p class="meta">${d}</p>
        <div class="box2">
          <ul>${f}</ul>
          <button type="button" data-a="demo">Simular Pedido</button>
        </div>
      </div>`, this.shadowRoot.querySelector('[data-a="demo"]').onclick = () => {
    o(this, a) || (n(this, a, "u-demo"), n(this, l, "demo@alumno.ucjc.edu")), o(this, m).call(this, {
      detail: {
        pedidoId: `PED-DEMO-${Date.now()}`,
        usuarioId: o(this, a),
        creadoEn: (/* @__PURE__ */ new Date()).toISOString(),
        total: 35.99,
        moneda: "EUR",
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
    }), o(this, m).call(this, {
      detail: {
        pedidoId: `PED-DEMO-${Date.now()}`,
        usuarioId: o(this, a),
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
customElements.get("ucjc-pedidos") || customElements.define("ucjc-pedidos", v);
const C = { nombre: "datos", version: "0.2.4" };
export {
  C as default
};
