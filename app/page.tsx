"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  images: string[];
  accent: "green" | "gold" | "red";
  badge: string;
  description: string;
  ingredients: string;
  facts: string[];
};

const products: Product[] = [
  {
    id: "fresh-pack",
    name: "Fresh Pack",
    subtitle: "5 porciones listas para licuar",
    price: 29.99,
    images: [
      "/images/fresh-pack-hero.jpeg",
      "/images/fresh-pack-hand.jpeg",
      "/images/fresh-pack-display.jpeg",
    ],
    accent: "green",
    badge: "El favorito",
    description:
      "Frutas y vegetales picados y congelados para que prepares tu jugo verde en minutos. Solo agrega agua, licúa y disfruta.",
    ingredients: "Piña, manzana verde, pepino, apio, espinaca y jengibre.",
    facts: ["5 porciones individuales", "Agrega 250 ml de agua", "Mantener congelado"],
  },
  {
    id: "golden-shot",
    name: "Golden Shot",
    subtitle: "Pack de 5 shots funcionales",
    price: 14.99,
    images: [
      "/images/golden-shot-pack.jpeg",
      "/images/golden-shot.jpeg",
      "/images/golden-shot-group.jpeg",
    ],
    accent: "gold",
    badge: "Energía natural",
    description:
      "Shot amarillo de cúrcuma y jengibre para comenzar la mañana con energía natural y apoyar una rutina activa.",
    ingredients: "Jengibre, cúrcuma, naranja y pimienta negra.",
    facts: ["Pack de 5 botellas", "2 oz por shot", "Pensado para tus mañanas"],
  },
  {
    id: "blood-shot",
    name: "Blood Shot",
    subtitle: "Pack de 5 shots funcionales",
    price: 14.99,
    images: [
      "/images/blood-shot-pack.jpeg",
      "/images/blood-shot.jpeg",
      "/images/blood-shot-group.jpeg",
    ],
    accent: "red",
    badge: "Vitalidad",
    description:
      "Shot rojo de remolacha y jengibre. Una mezcla refrescante pensada para acompañar tu bienestar cardiovascular y revitalizar tu piel.",
    ingredients: "Remolacha, manzana roja, jengibre y limón.",
    facts: ["Pack de 5 botellas", "2 oz por shot", "Con jengibre"],
  },
  {
    id: "sunrise",
    name: "Sunrise",
    subtitle: "Jugo natural de 500 ml",
    price: 10,
    images: [
      "/images/jugo-natural-orange.jpeg",
      "/images/sunrise-detail.jpeg",
    ],
    accent: "gold",
    badge: "Hidratación natural",
    description:
      "Una opción natural, fresca y sin conservantes para reemplazar bebidas procesadas y acompañar tus comidas.",
    ingredients: "Piña, naranja, cúrcuma, jengibre y limón.",
    facts: ["Botella de 500 ml", "Sin azúcar añadida", "Sin conservantes"],
  },
  {
    id: "red-energy",
    name: "Red Energy",
    subtitle: "Jugo natural de 500 ml",
    price: 10,
    images: [
      "/images/red-energy.jpeg",
      "/images/red-energy-full.jpeg",
      "/images/red-energy-group.jpeg",
    ],
    accent: "red",
    badge: "Refrescante",
    description:
      "Una bebida natural y refrescante, hecha con ingredientes frescos para acompañar tus comidas y sumar energía natural a tu día.",
    ingredients:
      "Remolacha, naranja, manzana roja, piña, jengibre y limón.",
    facts: ["Botella de 500 ml", "Ingredientes frescos", "Sin conservantes"],
  },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ProductCard({
  product,
  index,
  quantity,
  onChangeQuantity,
}: {
  product: Product;
  index: number;
  quantity: number;
  onChangeQuantity: (id: string, delta: number) => void;
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <article className={`product-card ${product.accent}`}>
      <div className="product-gallery">
        <div className="product-image">
          <img src={product.images[activeImage]} alt={`${product.name}, foto ${activeImage + 1}`} />
          <span className="product-number">0{index + 1}</span>
          <span className="product-badge">{product.badge}</span>
          <span className="photo-count">{activeImage + 1}/{product.images.length}</span>
        </div>
        <div className="product-thumbnails" aria-label={`Fotos de ${product.name}`}>
          {product.images.map((image, imageIndex) => (
            <button
              key={image}
              className={imageIndex === activeImage ? "active" : ""}
              onClick={() => setActiveImage(imageIndex)}
              aria-label={`Ver foto ${imageIndex + 1} de ${product.name}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="product-info">
        <div className="product-title">
          <div>
            <h3>{product.name}</h3>
            <p>{product.subtitle}</p>
          </div>
          <strong>{money.format(product.price)}</strong>
        </div>
        <p className="product-description">{product.description}</p>
        <ul className="product-facts">
          {product.facts.map((fact) => <li key={fact}>{fact}</li>)}
        </ul>
        <details>
          <summary>Ver ingredientes</summary>
          <p>{product.ingredients}</p>
        </details>
        {quantity ? (
          <div className="quantity-control">
            <button
              onClick={() => onChangeQuantity(product.id, -1)}
              aria-label={`Quitar un ${product.name}`}
            >
              −
            </button>
            <span>{quantity} en el carrito</span>
            <button
              onClick={() => onChangeQuantity(product.id, 1)}
              aria-label={`Agregar otro ${product.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button className="add-button" onClick={() => onChangeQuantity(product.id, 1)}>
            Agregar al pedido <span>+</span>
          </button>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [name, setName] = useState("");
  const [delivery, setDelivery] = useState("Pickup");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Zelle");
  const [notes, setNotes] = useState("");

  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = useMemo(
    () =>
      products.reduce(
        (sum, product) => sum + product.price * (cart[product.id] || 0),
        0,
      ),
    [cart],
  );

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = current;
        return rest;
      }
      return { ...current, [id]: next };
    });
  }

  function orderOnWhatsApp() {
    if (!itemCount) return;

    const lines = products
      .filter((product) => cart[product.id])
      .map(
        (product) =>
          `• ${cart[product.id]} × ${product.name} — ${money.format(product.price * cart[product.id])}`,
      );

    const message = [
      "Hola Vitalix 👋 Quiero realizar este pedido:",
      "",
      ...lines,
      "",
      `Total estimado: ${money.format(total)}`,
      `Entrega: ${delivery}`,
      delivery === "Delivery" && address ? `Dirección: ${address}` : "",
      `Método de pago: ${payment}`,
      name ? `Nombre: ${name}` : "",
      notes ? `Notas: ${notes}` : "",
      "",
      "¿Me confirman disponibilidad y el siguiente paso? 💚",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/18434808966?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Vitalix, inicio">
          <img src="/images/vitalix-logo.jpeg" alt="Vitalix" />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#productos">Productos</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#como-funciona">Cómo ordenar</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)}>
          <span>Mi pedido</span>
          <b>{itemCount}</b>
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">Nutrición real · Charleston, SC</span>
          <h1>
            Lo natural
            <br />
            <em>se siente mejor.</em>
          </h1>
          <p>
            Jugos frescos, shots funcionales y packs listos para licuar.
            Ingredientes reales para hacer tu rutina más fácil.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#productos">
              Ver productos <span>↗</span>
            </a>
            <a
              className="text-action"
              href="https://instagram.com/vitalixsc"
              target="_blank"
              rel="noreferrer"
            >
              @vitalixsc
            </a>
          </div>
          <div className="hero-points">
            <span>100% natural</span>
            <span>Sin conservantes</span>
            <span>Delivery disponible</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/images/fresh-pack-hero.jpeg"
            alt="Fresh Pack de Vitalix con frutas frescas"
          />
          <div className="hero-stamp">
            <strong>5</strong>
            <span>porciones<br />por pack</span>
          </div>
          <div className="leaf leaf-one" />
          <div className="leaf leaf-two" />
        </div>
      </section>

      <section className="ticker" aria-label="Beneficios">
        <div>
          <span>JUGOS QUE TE NUTREN</span><i>✦</i>
          <span>ENERGÍA QUE TE MUEVE</span><i>✦</i>
          <span>HECHO EN CHARLESTON</span><i>✦</i>
          <span>INGREDIENTES REALES</span>
        </div>
      </section>

      <section className="products-section" id="productos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Elige tu ritual</span>
            <h2>Bienestar que cabe<br />en tu rutina.</h2>
          </div>
          <p>
            Distintas presentaciones para hacer tus jugos energéticos más
            fáciles, sin complicaciones.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              quantity={cart[product.id] || 0}
              onChangeQuantity={changeQuantity}
            />
          ))}
        </div>
      </section>

      <section className="story-section" id="nosotros">
        <div className="story-image">
          <img src="/images/shots-duo.jpeg" alt="Golden Shot y Blood Shot Vitalix" />
          <span>Fresh · Natural · Vitalix</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">Nuestra filosofía</span>
          <h2>Creemos que lo natural sabe mejor.</h2>
          <p>
            Creamos opciones frescas, nutritivas y deliciosas para ayudarte a
            reemplazar las bebidas procesadas. Cada receta busca acompañar tus
            comidas, favorecer una rutina equilibrada y brindarte energía de
            forma natural.
          </p>
          <div className="story-stats">
            <div><strong>0</strong><span>azúcar añadida</span></div>
            <div><strong>0</strong><span>conservantes</span></div>
            <div><strong>100%</strong><span>ingredientes reales</span></div>
          </div>
        </div>
      </section>

      <section className="steps-section" id="como-funciona">
        <div className="section-heading light">
          <div>
            <span className="eyebrow">Simple y rápido</span>
            <h2>Tu pedido en<br />tres pasos.</h2>
          </div>
          <p>Sin cuentas, sin formularios complicados y con atención directa.</p>
        </div>
        <div className="steps">
          <article><b>01</b><h3>Elige</h3><p>Agrega tus productos favoritos y ajusta las cantidades.</p></article>
          <article><b>02</b><h3>Revisa</h3><p>Confirma tu pedido, modalidad de entrega y total estimado.</p></article>
          <article><b>03</b><h3>Ordena</h3><p>Enviamos tu lista por WhatsApp para confirmar disponibilidad.</p></article>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/images/vitalix-logo.jpeg" alt="Vitalix" />
          <p>Tu energía, tu cambio.</p>
        </div>
        <div>
          <span>Contacto</span>
          <a href="tel:+18434808966">+1 (843) 480-8966</a>
          <a href="https://instagram.com/vitalixsc">@vitalixsc</a>
        </div>
        <div>
          <span>Ubicación</span>
          <p>Charleston, South Carolina</p>
          <p>Pickup y delivery disponibles</p>
          <p>Pagos: Zelle · Cash App · Venmo</p>
        </div>
        <small>© 2026 Vitalix. Hecho para ti.</small>
      </footer>

      {itemCount > 0 && !cartOpen && (
        <button className="floating-cart" onClick={() => setCartOpen(true)}>
          <span><b>{itemCount}</b> Ver mi pedido</span>
          <strong>{money.format(total)}</strong>
        </button>
      )}

      <div
        className={`cart-overlay ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`cart-drawer ${cartOpen ? "open" : ""}`}
        aria-hidden={!cartOpen}
        aria-label="Tu pedido"
      >
        <div className="cart-header">
          <div><span className="eyebrow">Carrito</span><h2>Tu pedido</h2></div>
          <button onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">×</button>
        </div>

        {!itemCount ? (
          <div className="empty-cart">
            <span>🥬</span>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega algo fresco para comenzar tu pedido.</p>
            <button onClick={() => setCartOpen(false)}>Explorar productos</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {products
                .filter((product) => cart[product.id])
                .map((product) => (
                  <div className="cart-item" key={product.id}>
                    <img src={product.images[0]} alt="" />
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.subtitle} · {money.format(product.price)}</p>
                      <div className="mini-quantity">
                        <button onClick={() => changeQuantity(product.id, -1)}>−</button>
                        <span>{cart[product.id]}</span>
                        <button onClick={() => changeQuantity(product.id, 1)}>+</button>
                      </div>
                    </div>
                    <strong>{money.format(product.price * cart[product.id])}</strong>
                  </div>
                ))}
            </div>

            <div className="order-fields">
              <label>
                Tu nombre
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="¿Cómo te llamas?"
                />
              </label>
              <label>
                Modalidad
                <select value={delivery} onChange={(event) => setDelivery(event.target.value)}>
                  <option>Pickup</option>
                  <option>Delivery</option>
                </select>
              </label>
              {delivery === "Delivery" && (
                <label>
                  Dirección de entrega
                  <input
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Dirección y código postal"
                  />
                </label>
              )}
              <label>
                Método de pago
                <select value={payment} onChange={(event) => setPayment(event.target.value)}>
                  <option>Zelle</option>
                  <option>Cash App</option>
                  <option>Venmo</option>
                </select>
              </label>
              <label>
                Notas (opcional)
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Horario, dirección o indicaciones..."
                />
              </label>
            </div>

            <div className="cart-total">
              <span>Total estimado</span>
              <strong>{money.format(total)}</strong>
            </div>
            <div className="order-summary">
              <span>{delivery}</span>
              <span>{payment}</span>
              <span>Delivery por confirmar</span>
            </div>
            <button className="whatsapp-button" onClick={orderOnWhatsApp}>
              Enviar pedido por WhatsApp <span>↗</span>
            </button>
            <p className="cart-note">
              El precio de delivery se confirma por WhatsApp según tu ubicación.
            </p>
          </>
        )}
      </aside>
    </main>
  );
}
