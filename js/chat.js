document.addEventListener("DOMContentLoaded", () => {
  // Respuestas predefinidas
  const responses = {
    hola: "¡Hola! ¿Cómo estás?",
    "buenos dias": "¡Buenos días! ¿Planeas visitar el parque hoy?",
    "buenas tardes": "¡Buenas tardes! ¿En qué puedo ayudarte?",
    "buenas noches": "¡Buenas noches! Espero que tu día haya sido jurásico",
    adiós: "¡Adiós! Que tengas un gran día",
    gracias: "¡De nada!",
    "cómo estás": "Estoy bien, gracias por preguntar.",
    "como estas": "Estoy bien, gracias por preguntar.",
    "quien eres":
      "Soy el asistente virtual de Jurassic World. Puedo ayudarte con información del parque.",
    "que puedes hacer":
      "Puedo responder preguntas sobre el parque, reservas, paquetes y atracciones.",
    "qué puedes hacer":
      "Puedo responder preguntas sobre el parque, reservas, paquetes y atracciones.",
    "donde estas": "Estoy en el parque Jurassic World, en la Isla Nublar",
    "donde se ubican":
      "Estamos ubicados en la Isla Nublar, cerca de Costa Rica",
    "cual es el precio de entrada":
      'El precio depende del paquete que elijas. Puedes verlos en la sección "Paquetes y Reservas".',
    "hay descuentos":
      "Sí, tenemos descuentos por grupos y promociones especiales en temporada baja.",
    clima:
      "El clima suele ser tropical, cálido y húmedo. ¡Perfecto para una aventura jurásica!",
    dinosaurios:
      "Tenemos más de 30 especies, incluyendo T-Rex, Velociraptors y Brachiosaurios.",
    atracciones:
      "Contamos con tours en girosferas, zonas de observación y experiencias con dinosaurios.",
    paquetes:
      "Ofrecemos paquetes estándar, premium y de lujo. Cada uno con diferentes beneficios.",
    comida:
      'Tenemos restaurantes temáticos como el "Raptor Café" y el "T-Rex Grill".',
    hotel:
      "Nuestro Hotel Jurásico ofrece estancias de 3 a 5 noches con vista al parque.",
    seguridad:
      "¡Tu seguridad es prioridad! Contamos con sistemas de contención y personal entrenado.",
    contacto:
      "Puedes contactarnos desde la página oficial o en el área de atención al cliente del parque.",
    emergencia:
      "En caso de emergencia, dirígete a la zona segura más cercana o contacta a un guardia del parque.",
    horario: "El parque abre de 8:00 a 18:00 todos los días.",
    precios:
      "Los precios varían según el paquete. Visita nuestra sección de Paquetes para más detalles.",
    "edad minima":
      "Algunas atracciones tienen edad mínima de 12 años. Verifica las especificaciones antes de reservar.",
    mascotas: "Por seguridad, no se permiten mascotas dentro del parque.",
    wifi: "Sí, tenemos Wi-Fi gratuito en áreas seleccionadas del parque.",
    mapa: "Puedes consultar el mapa interactivo en la página oficial o descargarlo desde la app.",
  };

  // Elementos del DOM
  const fab = document.getElementById("chatbotFab");
  const panel = document.getElementById("chatbotPanel");
  const closeBtn = document.getElementById("chatbotClose");
  const messagesContainer = document.getElementById("chatbotMessages");
  const input = document.getElementById("chatbotInput");
  const sendBtn = document.getElementById("chatbotSend");

  if (!fab || !panel || !messagesContainer || !input || !sendBtn) {
    console.warn(
      "Chatbot: elementos del DOM incompletos. Verifica que los IDs existan en el HTML."
    );
    return;
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function addUserMessage(text) {
    const el = document.createElement("div");
    el.className = "msg user";
    el.textContent = text;
    messagesContainer.appendChild(el);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const el = document.createElement("div");
    el.className = "msg bot";
    el.textContent = "...";
    messagesContainer.appendChild(el);
    scrollToBottom();

    setTimeout(() => {
      el.textContent = text;
      scrollToBottom();
    }, 600 + Math.random() * 700);
  }

  function normalize(text) {
    return text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  function generateResponse(userText) {
    const key = normalize(userText);

    // Respuesta exacta
    if (responses[key]) return responses[key];

    // Inclusiva
    for (const k in responses) {
      if (key.includes(k)) return responses[k];
    }

    // Casos especiales
    if (key.includes("reserva") || key.includes("reservar")) {
      return 'Puedes reservar tu experiencia desde la página oficial en la sección "Reservas". ¿Quieres que te abra el enlace?';
    }

    if (key.includes("precio") || key.includes("cuanto cuesta")) {
      return 'Los precios varían según el paquete que elijas. Puedes verlos en la sección de "Paquetes y Reservas".';
    }

    if (key.includes("horario") || key.includes("horarios")) {
      return "El parque abre de 8:00 a 18:00 todos los días. Algunos tours tienen horarios especiales.";
    }

    if (key.includes("atraccion") || key.includes("atracciones")) {
      return "Tenemos atracciones como el tour en girosferas, zonas de observación y experiencias con dinosaurios.";
    }

    if (key.includes("ayuda")) {
      return "Claro, puedo ayudarte con información del parque, reservas o atracciones. ¿Qué deseas saber?";
    }

    return 'Lo siento, no entendí bien. Puedes probar con: "horarios", "reservas", "paquetes", "dinosaurios" o "hotel".';
  }

  let greeted = false;
  function ensureGreeting() {
    if (
      !greeted &&
      messagesContainer &&
      messagesContainer.children.length === 0
    ) {
      addBotMessage(
        "¡Hola! Soy el asistente de Jurassic World. Pregunta sobre reservas, atracciones, horarios o precios."
      );
      greeted = true;
    }
  }

  function openPanel() {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    input.focus();
    ensureGreeting();
  }

  function closePanel() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    fab.focus();
  }

  function togglePanel(open) {
    if (open) openPanel();
    else closePanel();
  }

  fab.addEventListener("click", () => togglePanel(true));
  closeBtn && closeBtn.addEventListener("click", () => togglePanel(false));

  function sendMessage() {
    const text = input.value;
    if (!text || !text.trim()) return;
    addUserMessage(text);
    input.value = "";
    sendBtn.disabled = true;

    const reply = generateResponse(text);

    setTimeout(() => {
      addBotMessage(reply);
      sendBtn.disabled = false;
    }, 300);
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) {
      closePanel();
    }
  });

  fab.style.display = "flex";
});
