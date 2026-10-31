class UcjcDatos extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <section style="padding: 1rem; border: 1px solid #ccc; font-family: sans-serif;">
        <p>Soy Datos</p>
      </section>
    `;
  }
}

if (!customElements.get('ucjc-datos')) {
  customElements.define('ucjc-datos', UcjcDatos);
}