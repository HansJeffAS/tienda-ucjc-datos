var E = (e) => {
  throw TypeError(e);
};
var g = (e, o, i) => o.has(e) || E("Cannot " + i);
var s = (e, o, i) => (g(e, o, "read from private field"), i ? i.call(e) : o.get(e)), c = (e, o, i) => o.has(e) ? E("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, i), n = (e, o, i, t) => (g(e, o, "write to private field"), t ? t.call(e, i) : o.set(e, i), i), u = (e, o, i) => (g(e, o, "access private method"), i);
const w = "ucjc:compra:pedido-confirmado@1", I = "ucjc:identidad:sesion-cambiada@1", x = `
  :host { display:block; font:15px/1.45 system-ui,sans-serif; color:#152033; }
  .box { background:#f7f9fc; border:1px solid #d7dee8; border-radius:12px; padding:1rem 1.1rem; }
  h2 { margin:0 0 .35rem; font-size:1.1rem; }
  .meta { color:#5b677a; font-size:.85rem; margin-bottom:.6rem; }
  ul { margin:.3rem 0; padding-left:1.1rem; }
  li { margin:.35rem 0; }
  .badge { display:inline-block; background:#e8eef8; border-radius:999px; padding:.1rem .55rem; font-size:.75rem; }
  button { font:inherit; border:0; border-radius:8px; padding:.4rem .8rem; cursor:pointer; background:#e7ecf3; color:#152033; margin-top:.5rem; }
`;
var m, d, r, h, b, a, v, p;
class $ extends HTMLElement {
  constructor() {
    super(...arguments);
    c(this, a);
    c(this, m, []);
    c(this, d, null);
    c(this, r, null);
    c(this, h, (i) => {
      const t = i.detail || {};
      t.pedidoId && (n(this, m, [
        {
          pedidoId: t.pedidoId,
          usuarioId: t.usuarioId,
          creadoEn: t.creadoEn,
          total: Number(t.total) || 0,
          lineas: Array.isArray(t.lineas) ? t.lineas : []
        },
        ...s(this, m)
      ]), u(this, a, p).call(this));
    });
    c(this, b, (i) => {
      var f, l;
      const t = i.detail || {};
      if (!t.autenticado) {
        n(this, d, null), n(this, r, null), u(this, a, p).call(this);
        return;
      }
      n(this, d, ((f = t.usuario) == null ? void 0 : f.id) ?? null), n(this, r, ((l = t.usuario) == null ? void 0 : l.email) ?? null), u(this, a, p).call(this);
    });
  }
  connectedCallback() {
    this.attachShadow({ mode: "open" }), window.addEventListener(w, s(this, h)), window.addEventListener(I, s(this, b)), u(this, a, p).call(this);
  }
  disconnectedCallback() {
    window.removeEventListener(w, s(this, h)), window.removeEventListener(I, s(this, b));
  }
}
m = new WeakMap(), d = new WeakMap(), r = new WeakMap(), h = new WeakMap(), b = new WeakMap(), a = new WeakSet(), v = function() {
  return s(this, d) ? s(this, m).filter((i) => i.usuarioId === s(this, d)) : [];
}, p = function() {
  const i = u(this, a, v).call(this), t = s(this, d) ? `Usuario: <b>${s(this, d)}</b>${s(this, r) ? ` · ${s(this, r)}` : ""}` : "Sin sesión — la lista se oculta (contrato `@1`)", f = s(this, d) ? i.length ? i.map(
    (l) => `<li><span class="badge">${l.pedidoId}</span> · <b>${l.total.toFixed(2)} €</b> · ${l.lineas.length} línea(s)<br><small>${l.creadoEn || ""}</small></li>`
  ).join("") : "<li><i>Aún no hay pedidos para este usuario</i></li>" : "<li><i>Inicia sesión para ver «Mis pedidos»</i></li>";
  this.shadowRoot.innerHTML = `
      <style>${x}</style>
      <div class="box">
        <h2>Datos · Mis pedidos</h2>
        <p class="meta">${t}</p>
        <ul>${f}</ul>
        <button type="button" data-a="demo">Simular pedido (solo pruebas)</button>
      </div>`, this.shadowRoot.querySelector('[data-a="demo"]').onclick = () => {
    s(this, d) || (n(this, d, "u-demo"), n(this, r, "demo@alumno.ucjc.edu")), s(this, h).call(this, {
      detail: {
        pedidoId: `PED-DEMO-${Date.now()}`,
        usuarioId: s(this, d),
        creadoEn: (/* @__PURE__ */ new Date()).toISOString(),
        total: 19.99,
        lineas: [
          {
            productoId: "prod-101",
            nombre: "Camiseta UCJC",
            precio: 19.99,
            cantidad: 1
          }
        ]
      }
    });
  };
};
customElements.get("ucjc-pedidos") || customElements.define("ucjc-pedidos", $);
const S = { nombre: "datos", version: "0.2.0" };
export {
  S as default
};
