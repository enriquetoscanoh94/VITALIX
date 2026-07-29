"use client";

import { useEffect, useMemo, useState } from "react";
import { FaInstagram } from "react-icons/fa6";

type Language = "es" | "en";
type Localized = Record<Language, string>;

type Product = {
  id: string;
  name: string;
  subtitle: Localized;
  price: number;
  images: string[];
  accent: "green" | "gold" | "red";
  badge: Localized;
  description: Localized;
  ingredients: Localized;
  facts: Record<Language, string[]>;
};

const products: Product[] = [
  {
    id: "fresh-pack",
    name: "Fresh Pack",
    subtitle: {
      es: "5 porciones listas para licuar",
      en: "5 ready-to-blend portions",
    },
    price: 29.99,
    images: [
      "/images/fresh-pack-hero.jpeg",
      "/images/fresh-pack-hand.jpeg",
      "/images/fresh-pack-display.jpeg",
    ],
    accent: "green",
    badge: { es: "El favorito", en: "The favorite" },
    description: {
      es: "Frutas y vegetales picados y congelados para que prepares tu jugo verde en minutos. Solo agrega agua, licúa y disfruta.",
      en: "Chopped and frozen fruits and vegetables so you can prepare your green juice in minutes. Just add water, blend and enjoy.",
    },
    ingredients: {
      es: "Piña, manzana verde, pepino, apio, espinaca y jengibre.",
      en: "Pineapple, green apple, cucumber, celery, spinach and ginger.",
    },
    facts: {
      es: ["5 porciones individuales", "Agrega 250 ml de agua", "Sin conservantes"],
      en: ["5 individual portions", "Add 250 ml of water", "No preservatives"],
    },
  },
  {
    id: "golden-shot",
    name: "Golden Shot",
    subtitle: {
      es: "Pack de 5 shots funcionales",
      en: "Pack of 5 functional shots",
    },
    price: 14.99,
    images: [
      "/images/golden-shot-pack.jpeg",
      "/images/golden-shot.jpeg",
      "/images/golden-shot-group.jpeg",
    ],
    accent: "gold",
    badge: { es: "Energía natural", en: "Natural energy" },
    description: {
      es: "Shot amarillo de cúrcuma y jengibre para comenzar la mañana con energía natural y apoyar una rutina activa.",
      en: "A yellow turmeric and ginger shot to start the morning with natural energy and support an active routine.",
    },
    ingredients: {
      es: "Jengibre, cúrcuma, naranja y pimienta negra.",
      en: "Ginger, turmeric, orange and black pepper.",
    },
    facts: {
      es: ["Pack de 5 botellas", "2 oz por shot", "Pensado para tus mañanas"],
      en: ["Pack of 5 bottles", "2 oz per shot", "Made for your mornings"],
    },
  },
  {
    id: "blood-shot",
    name: "Blood Shot",
    subtitle: {
      es: "Pack de 5 shots funcionales",
      en: "Pack of 5 functional shots",
    },
    price: 14.99,
    images: [
      "/images/blood-shot-pack.jpeg",
      "/images/blood-shot.jpeg",
      "/images/blood-shot-group.jpeg",
    ],
    accent: "red",
    badge: { es: "Vitalidad", en: "Vitality" },
    description: {
      es: "Shot rojo de remolacha y jengibre. Una mezcla refrescante pensada para acompañar tu bienestar cardiovascular y revitalizar tu piel.",
      en: "A red beet and ginger shot. A refreshing blend designed to support cardiovascular wellness and revitalize your skin.",
    },
    ingredients: {
      es: "Remolacha, manzana roja, jengibre y limón.",
      en: "Beet, red apple, ginger and lemon.",
    },
    facts: {
      es: ["Pack de 5 botellas", "2 oz por shot", "Con jengibre"],
      en: ["Pack of 5 bottles", "2 oz per shot", "Made with ginger"],
    },
  },
  {
    id: "sunrise",
    name: "Sunrise",
    subtitle: {
      es: "Jugo natural de 500 ml",
      en: "500 ml natural juice",
    },
    price: 10,
    images: [
      "/images/jugo-natural-orange.jpeg",
      "/images/sunrise-detail.jpeg",
    ],
    accent: "gold",
    badge: { es: "Hidratación natural", en: "Natural hydration" },
    description: {
      es: "Una opción natural, fresca y sin conservantes para reemplazar bebidas procesadas y acompañar tus comidas.",
      en: "A natural, fresh and preservative-free option to replace processed drinks and pair with your meals.",
    },
    ingredients: {
      es: "Piña, naranja, cúrcuma, jengibre y limón.",
      en: "Pineapple, orange, turmeric, ginger and lemon.",
    },
    facts: {
      es: ["Botella de 500 ml", "Sin azúcar añadida", "Sin conservantes"],
      en: ["500 ml bottle", "No added sugar", "No preservatives"],
    },
  },
  {
    id: "red-energy",
    name: "Red Energy",
    subtitle: {
      es: "Jugo natural de 500 ml",
      en: "500 ml natural juice",
    },
    price: 10,
    images: [
      "/images/red-energy.jpeg",
      "/images/red-energy-full.jpeg",
      "/images/red-energy-group.jpeg",
    ],
    accent: "red",
    badge: { es: "Refrescante", en: "Refreshing" },
    description: {
      es: "Una bebida natural y refrescante, hecha con ingredientes frescos para acompañar tus comidas y sumar energía natural a tu día.",
      en: "A natural and refreshing drink made with fresh ingredients to pair with your meals and add natural energy to your day.",
    },
    ingredients: {
      es: "Remolacha, naranja, manzana roja, piña, jengibre y limón.",
      en: "Beet, orange, red apple, pineapple, ginger and lemon.",
    },
    facts: {
      es: ["Botella de 500 ml", "Ingredientes frescos", "Sin conservantes"],
      en: ["500 ml bottle", "Fresh ingredients", "No preservatives"],
    },
  },
];

const content = {
  es: {
    navProducts: "Productos",
    navAbout: "Nosotros",
    navOrder: "Cómo ordenar",
    myOrder: "Mi pedido",
    heroEyebrow: "Nutrición real · Charleston, SC",
    heroTitle: "Lo natural",
    heroEmphasis: "se siente mejor.",
    heroDescription:
      "Jugos frescos, shots funcionales y packs listos para licuar. Ingredientes reales para hacer tu rutina más fácil.",
    viewProducts: "Ver productos",
    natural: "100% natural",
    noPreservatives: "Sin conservantes",
    deliveryAvailable: "Delivery disponible",
    portions: "porciones\npor pack",
    ticker: [
      "SIN CONSERVANTES",
      "NUEVOS PRODUCTOS PRÓXIMAMENTE",
      "ENERGÍA QUE TE MUEVE",
      "HECHO EN CHARLESTON",
      "INGREDIENTES REALES",
    ],
    productsEyebrow: "Elige tu ritual",
    productsTitle: "Bienestar que cabe\nen tu rutina.",
    productsDescription:
      "Distintas presentaciones para hacer tus jugos energéticos más fáciles, sin complicaciones.",
    comingEyebrow: "Seguimos creando",
    comingTitle: "Nuevos productos\nmuy pronto.",
    comingDescription:
      "Estamos preparando nuevas opciones Vitalix. Escríbenos por WhatsApp para conocer las novedades y disponibilidad.",
    askWhatsApp: "Preguntar por WhatsApp",
    philosophy: "Nuestra filosofía",
    philosophyTitle: "Creemos que lo natural sabe mejor.",
    philosophyDescription:
      "Creamos opciones frescas, nutritivas y deliciosas para ayudarte a reemplazar las bebidas procesadas. Cada receta busca acompañar tus comidas, favorecer una rutina equilibrada y brindarte energía de forma natural.",
    addedSugar: "azúcar añadida",
    preservatives: "conservantes",
    realIngredients: "ingredientes reales",
    simpleFast: "Simple y rápido",
    stepsTitle: "Tu pedido en\ntres pasos.",
    stepsDescription: "Sin cuentas, sin formularios complicados y con atención directa.",
    choose: "Elige",
    chooseDescription: "Agrega tus productos favoritos y ajusta las cantidades.",
    review: "Revisa",
    reviewDescription: "Confirma tu pedido, modalidad de entrega y total estimado.",
    order: "Ordena",
    orderDescription: "Enviamos tu lista por WhatsApp para confirmar disponibilidad.",
    tagline: "Tu energía, tu cambio.",
    contact: "Contacto",
    location: "Ubicación",
    pickupDelivery: "Pickup y delivery disponibles",
    payments: "Pagos: Zelle · Cash App · Venmo",
    madeForYou: "© 2026 Vitalix. Hecho para ti.",
    viewOrder: "Ver mi pedido",
    cart: "Carrito",
    yourOrder: "Tu pedido",
    closeCart: "Cerrar carrito",
    emptyCart: "Tu carrito está vacío",
    emptyDescription: "Agrega algo fresco para comenzar tu pedido.",
    exploreProducts: "Explorar productos",
    yourName: "Tu nombre",
    namePlaceholder: "¿Cómo te llamas?",
    method: "Modalidad",
    deliveryAddress: "Dirección de entrega",
    addressPlaceholder: "Dirección y código postal",
    paymentMethod: "Método de pago",
    notes: "Notas (opcional)",
    notesPlaceholder: "Horario, dirección o indicaciones...",
    estimatedTotal: "Total estimado",
    deliveryToConfirm: "Delivery por confirmar",
    sendWhatsApp: "Enviar pedido por WhatsApp",
    deliveryNote: "El precio de delivery se confirma por WhatsApp según tu ubicación.",
    addOrder: "Agregar al pedido",
    ingredients: "Ver ingredientes",
    inCart: "en el carrito",
    photo: "foto",
    photosOf: "Fotos de",
    seePhoto: "Ver foto",
    removeOne: "Quitar un",
    addAnother: "Agregar otro",
    whatsappLabel: "Hablar con Vitalix por WhatsApp",
    whatsappGreeting: "Hola Vitalix 👋 Quiero realizar este pedido:",
    whatsappDelivery: "Entrega",
    whatsappAddress: "Dirección",
    whatsappPayment: "Método de pago",
    whatsappName: "Nombre",
    whatsappNotes: "Notas",
    whatsappConfirmation: "¿Me confirman disponibilidad y el siguiente paso? 💚",
  },
  en: {
    navProducts: "Products",
    navAbout: "About",
    navOrder: "How to order",
    myOrder: "My order",
    heroEyebrow: "Real nutrition · Charleston, SC",
    heroTitle: "Natural feels",
    heroEmphasis: "better.",
    heroDescription:
      "Fresh juices, functional shots and ready-to-blend packs. Real ingredients to make your routine easier.",
    viewProducts: "View products",
    natural: "100% natural",
    noPreservatives: "No preservatives",
    deliveryAvailable: "Delivery available",
    portions: "portions\nper pack",
    ticker: [
      "NO PRESERVATIVES",
      "NEW PRODUCTS COMING SOON",
      "ENERGY THAT MOVES YOU",
      "MADE IN CHARLESTON",
      "REAL INGREDIENTS",
    ],
    productsEyebrow: "Choose your ritual",
    productsTitle: "Wellness that fits\nyour routine.",
    productsDescription:
      "Different formats that make your energizing juices easier, without complications.",
    comingEyebrow: "We keep creating",
    comingTitle: "New products\ncoming soon.",
    comingDescription:
      "We are preparing new Vitalix options. Message us on WhatsApp to learn about new releases and availability.",
    askWhatsApp: "Ask on WhatsApp",
    philosophy: "Our philosophy",
    philosophyTitle: "We believe natural tastes better.",
    philosophyDescription:
      "We create fresh, nutritious and delicious options to help you replace processed drinks. Each recipe is designed to pair with your meals, support a balanced routine and provide natural energy.",
    addedSugar: "added sugar",
    preservatives: "preservatives",
    realIngredients: "real ingredients",
    simpleFast: "Simple and fast",
    stepsTitle: "Your order in\nthree steps.",
    stepsDescription: "No accounts, no complicated forms and direct service.",
    choose: "Choose",
    chooseDescription: "Add your favorite products and adjust the quantities.",
    review: "Review",
    reviewDescription: "Confirm your order, delivery method and estimated total.",
    order: "Order",
    orderDescription: "We send your list through WhatsApp to confirm availability.",
    tagline: "Your energy, your change.",
    contact: "Contact",
    location: "Location",
    pickupDelivery: "Pickup and delivery available",
    payments: "Payments: Zelle · Cash App · Venmo",
    madeForYou: "© 2026 Vitalix. Made for you.",
    viewOrder: "View my order",
    cart: "Cart",
    yourOrder: "Your order",
    closeCart: "Close cart",
    emptyCart: "Your cart is empty",
    emptyDescription: "Add something fresh to start your order.",
    exploreProducts: "Explore products",
    yourName: "Your name",
    namePlaceholder: "What is your name?",
    method: "Method",
    deliveryAddress: "Delivery address",
    addressPlaceholder: "Address and ZIP code",
    paymentMethod: "Payment method",
    notes: "Notes (optional)",
    notesPlaceholder: "Time, address or instructions...",
    estimatedTotal: "Estimated total",
    deliveryToConfirm: "Delivery to be confirmed",
    sendWhatsApp: "Send order on WhatsApp",
    deliveryNote: "The delivery price is confirmed on WhatsApp based on your location.",
    addOrder: "Add to order",
    ingredients: "View ingredients",
    inCart: "in cart",
    photo: "photo",
    photosOf: "Photos of",
    seePhoto: "View photo",
    removeOne: "Remove one",
    addAnother: "Add another",
    whatsappLabel: "Chat with Vitalix on WhatsApp",
    whatsappGreeting: "Hi Vitalix 👋 I would like to place this order:",
    whatsappDelivery: "Delivery",
    whatsappAddress: "Address",
    whatsappPayment: "Payment method",
    whatsappName: "Name",
    whatsappNotes: "Notes",
    whatsappConfirmation: "Can you confirm availability and the next step? 💚",
  },
} as const;

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ProductCard({
  product,
  index,
  quantity,
  language,
  onChangeQuantity,
}: {
  product: Product;
  index: number;
  quantity: number;
  language: Language;
  onChangeQuantity: (id: string, delta: number) => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const t = content[language];

  return (
    <article className={`product-card ${product.accent}`}>
      <div className="product-gallery">
        <div className="product-image">
          <img src={product.images[activeImage]} alt={`${product.name}, ${t.photo} ${activeImage + 1}`} />
          <span className="product-number">0{index + 1}</span>
          <span className="product-badge">{product.badge[language]}</span>
          <span className="photo-count">{activeImage + 1}/{product.images.length}</span>
        </div>
        <div className="product-thumbnails" aria-label={`${t.photosOf} ${product.name}`}>
          {product.images.map((image, imageIndex) => (
            <button
              key={image}
              className={imageIndex === activeImage ? "active" : ""}
              onClick={() => setActiveImage(imageIndex)}
              aria-label={`${t.seePhoto} ${imageIndex + 1} — ${product.name}`}
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
            <p>{product.subtitle[language]}</p>
          </div>
          <strong>{money.format(product.price)}</strong>
        </div>
        <p className="product-description">{product.description[language]}</p>
        <ul className="product-facts">
          {product.facts[language].map((fact) => <li key={fact}>{fact}</li>)}
        </ul>
        <details>
          <summary>{t.ingredients}</summary>
          <p>{product.ingredients[language]}</p>
        </details>
        {quantity ? (
          <div className="quantity-control">
            <button
              onClick={() => onChangeQuantity(product.id, -1)}
              aria-label={`${t.removeOne} ${product.name}`}
            >
              −
            </button>
            <span>{quantity} {t.inCart}</span>
            <button
              onClick={() => onChangeQuantity(product.id, 1)}
              aria-label={`${t.addAnother} ${product.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button className="add-button" onClick={() => onChangeQuantity(product.id, 1)}>
            {t.addOrder} <span>+</span>
          </button>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [name, setName] = useState("");
  const [delivery, setDelivery] = useState("Pickup");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Zelle");
  const [notes, setNotes] = useState("");
  const t = content[language];
  const directWhatsAppUrl =
    language === "es"
      ? "https://wa.me/18434808966?text=Hola%20Vitalix%20%F0%9F%91%8B%20Quiero%20conocer%20sus%20productos."
      : "https://wa.me/18434808966?text=Hi%20Vitalix%20%F0%9F%91%8B%20I%20would%20like%20to%20learn%20about%20your%20products.";

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
      t.whatsappGreeting,
      "",
      ...lines,
      "",
      `${t.estimatedTotal}: ${money.format(total)}`,
      `${t.whatsappDelivery}: ${delivery}`,
      delivery === "Delivery" && address ? `${t.whatsappAddress}: ${address}` : "",
      `${t.whatsappPayment}: ${payment}`,
      name ? `${t.whatsappName}: ${name}` : "",
      notes ? `${t.whatsappNotes}: ${notes}` : "",
      "",
      t.whatsappConfirmation,
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
        <a className="brand" href="#inicio" aria-label="Vitalix">
          <img src="/images/vitalix-logo.jpeg" alt="Vitalix" />
        </a>
        <nav aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
          <a href="#productos">{t.navProducts}</a>
          <a href="#nosotros">{t.navAbout}</a>
          <a href="#como-funciona">{t.navOrder}</a>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language selector">
            <button
              className={language === "es" ? "active" : ""}
              onClick={() => setLanguage("es")}
              aria-pressed={language === "es"}
            >
              ES
            </button>
            <button
              className={language === "en" ? "active" : ""}
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
          </div>
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            <span>{t.myOrder}</span>
            <b>{itemCount}</b>
          </button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">{t.heroEyebrow}</span>
          <h1>
            {t.heroTitle}
            <br />
            <em>{t.heroEmphasis}</em>
          </h1>
          <p>{t.heroDescription}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#productos">
              {t.viewProducts} <span>↗</span>
            </a>
            <a
              className="text-action"
              href="https://instagram.com/vitalixsc"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram aria-hidden="true" />
              <span>@vitalixsc</span>
            </a>
          </div>
          <div className="hero-points">
            <span>{t.natural}</span>
            <span>{t.noPreservatives}</span>
            <span>{t.deliveryAvailable}</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/images/fresh-pack-hero.jpeg"
            alt="Fresh Pack de Vitalix con frutas frescas"
          />
          <div className="hero-stamp">
            <strong>5</strong>
            <span>
              {t.portions.split("\n")[0]}<br />
              {t.portions.split("\n")[1]}
            </span>
          </div>
          <div className="leaf leaf-one" />
          <div className="leaf leaf-two" />
        </div>
      </section>

      <section className="ticker" aria-label={language === "es" ? "Novedades y beneficios" : "News and benefits"}>
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <div className="ticker-group" aria-hidden={group === 1} key={group}>
              {t.ticker.map((item) => (
                <span className="ticker-item" key={item}>
                  {item}<i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="products-section" id="productos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t.productsEyebrow}</span>
            <h2>
              {t.productsTitle.split("\n")[0]}<br />
              {t.productsTitle.split("\n")[1]}
            </h2>
          </div>
          <p>{t.productsDescription}</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              quantity={cart[product.id] || 0}
              language={language}
              onChangeQuantity={changeQuantity}
            />
          ))}
        </div>
      </section>

      <section className="coming-soon">
        <div>
          <span className="eyebrow">{t.comingEyebrow}</span>
          <h2>
            {t.comingTitle.split("\n")[0]}<br />
            <em>{t.comingTitle.split("\n")[1]}</em>
          </h2>
        </div>
        <div>
          <p>{t.comingDescription}</p>
          <a href={directWhatsAppUrl} target="_blank" rel="noreferrer">
            {t.askWhatsApp}<span>↗</span>
          </a>
        </div>
      </section>

      <section className="story-section" id="nosotros">
        <div className="story-image">
          <img src="/images/shots-duo.jpeg" alt="Golden Shot y Blood Shot Vitalix" />
          <span>Fresh · Natural · Vitalix</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">{t.philosophy}</span>
          <h2>{t.philosophyTitle}</h2>
          <p>{t.philosophyDescription}</p>
          <div className="story-stats">
            <div><strong>0</strong><span>{t.addedSugar}</span></div>
            <div><strong>0</strong><span>{t.preservatives}</span></div>
            <div><strong>100%</strong><span>{t.realIngredients}</span></div>
          </div>
        </div>
      </section>

      <section className="steps-section" id="como-funciona">
        <div className="section-heading light">
          <div>
            <span className="eyebrow">{t.simpleFast}</span>
            <h2>
              {t.stepsTitle.split("\n")[0]}<br />
              {t.stepsTitle.split("\n")[1]}
            </h2>
          </div>
          <p>{t.stepsDescription}</p>
        </div>
        <div className="steps">
          <article><b>01</b><h3>{t.choose}</h3><p>{t.chooseDescription}</p></article>
          <article><b>02</b><h3>{t.review}</h3><p>{t.reviewDescription}</p></article>
          <article><b>03</b><h3>{t.order}</h3><p>{t.orderDescription}</p></article>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/images/vitalix-logo.jpeg" alt="Vitalix" />
          <p>{t.tagline}</p>
        </div>
        <div>
          <span>{t.contact}</span>
          <a href="tel:+18434808966">+1 (843) 480-8966</a>
          <a
            className="instagram-link"
            href="https://instagram.com/vitalixsc"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram aria-hidden="true" />
            <span>@vitalixsc</span>
          </a>
        </div>
        <div>
          <span>{t.location}</span>
          <p>Charleston, South Carolina</p>
          <p>{t.pickupDelivery}</p>
          <p>{t.payments}</p>
        </div>
        <small>{t.madeForYou}</small>
      </footer>

      {itemCount > 0 && !cartOpen && (
        <button className="floating-cart" onClick={() => setCartOpen(true)}>
          <span><b>{itemCount}</b> {t.viewOrder}</span>
          <strong>{money.format(total)}</strong>
        </button>
      )}

      <a
        className="whatsapp-fab"
        href={directWhatsAppUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={t.whatsappLabel}
      >
        <span>WhatsApp</span><b>↗</b>
      </a>

      <div
        className={`cart-overlay ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`cart-drawer ${cartOpen ? "open" : ""}`}
        aria-hidden={!cartOpen}
        aria-label={t.yourOrder}
      >
        <div className="cart-header">
          <div><span className="eyebrow">{t.cart}</span><h2>{t.yourOrder}</h2></div>
          <button onClick={() => setCartOpen(false)} aria-label={t.closeCart}>×</button>
        </div>

        {!itemCount ? (
          <div className="empty-cart">
            <span>🥬</span>
            <h3>{t.emptyCart}</h3>
            <p>{t.emptyDescription}</p>
            <button onClick={() => setCartOpen(false)}>{t.exploreProducts}</button>
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
                      <p>{product.subtitle[language]} · {money.format(product.price)}</p>
                      <div className="mini-quantity">
                        <button
                          onClick={() => changeQuantity(product.id, -1)}
                          aria-label={`${t.removeOne} ${product.name}`}
                        >
                          −
                        </button>
                        <span>{cart[product.id]}</span>
                        <button
                          onClick={() => changeQuantity(product.id, 1)}
                          aria-label={`${t.addAnother} ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <strong>{money.format(product.price * cart[product.id])}</strong>
                  </div>
                ))}
            </div>

            <div className="order-fields">
              <label>
                {t.yourName}
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t.namePlaceholder}
                />
              </label>
              <label>
                {t.method}
                <select value={delivery} onChange={(event) => setDelivery(event.target.value)}>
                  <option>Pickup</option>
                  <option>Delivery</option>
                </select>
              </label>
              {delivery === "Delivery" && (
                <label>
                  {t.deliveryAddress}
                  <input
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder={t.addressPlaceholder}
                  />
                </label>
              )}
              <label>
                {t.paymentMethod}
                <select value={payment} onChange={(event) => setPayment(event.target.value)}>
                  <option>Zelle</option>
                  <option>Cash App</option>
                  <option>Venmo</option>
                </select>
              </label>
              <label>
                {t.notes}
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder={t.notesPlaceholder}
                />
              </label>
            </div>

            <div className="cart-total">
              <span>{t.estimatedTotal}</span>
              <strong>{money.format(total)}</strong>
            </div>
            <div className="order-summary">
              <span>{delivery}</span>
              <span>{payment}</span>
              <span>{t.deliveryToConfirm}</span>
            </div>
            <button className="whatsapp-button" onClick={orderOnWhatsApp}>
              {t.sendWhatsApp} <span>↗</span>
            </button>
            <p className="cart-note">{t.deliveryNote}</p>
          </>
        )}
      </aside>
    </main>
  );
}
