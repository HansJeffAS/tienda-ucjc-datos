class UcjcPedidos extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <section style="padding: 1rem; border: 1px solid #ccc; font-family: sans-serif;">
        <p>Soy Datos</p>
      </section>
    `;
  }
}

if (!customElements.get('ucjc-pedidos')) {
  customElements.define('ucjc-pedidos', UcjcPedidos);
}

export default { nombre: 'datos', version: '0.2.0' };
