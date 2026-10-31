/**
 * ============================================================================
 *  JesusDecodedMindMap.jsx
 *  Interactive bilingual (English / Español) mind map — "The Messiah, in depth"
 * ============================================================================
 *
 *  WHAT IT DOES
 *  - Shows one central image (the root of the mind map).
 *  - Below it, 8 clickable image nodes (A–H), connected to the root by lines.
 *  - Clicking a node (or pressing Enter / Space on it) opens a "second level"
 *    panel with that topic's content. Escape, the Close button, or a click on
 *    the dark background closes it and returns focus to the node you came from.
 *
 *  DEPENDENCIES
 *  - React 16.8+ (hooks). Nothing else. No CSS files, no icon libraries.
 *
 *  HOW TO USE
 *      import JesusDecodedMindMap from "./JesusDecodedMindMap";
 *      <JesusDecodedMindMap />
 *
 *  OPTIONAL PROPS (all have defaults, you can ignore them)
 *      imageUrl     – URL of the central image (defaults to ROOT_IMAGE_URL below)
 *      nodes        – your own array of 8 nodes (defaults to NODES below)
 *      defaultLang  – "en" | "es" | "both"   (defaults to "en")
 *
 *  ABOUT THE IMAGE LINK (important!)
 *  A normal GitHub link ("github.com/.../blob/...") opens a web PAGE, not the
 *  picture, so it will not display inside <img>. Convert it to a RAW link:
 *      1) change   github.com            →  raw.githubusercontent.com
 *      2) remove   /blob                 (the word "blob" and its slash)
 *  Example:
 *    BEFORE: https://github.com/USER/REPO/blob/COMMIT/my%20image.png
 *    AFTER : https://raw.githubusercontent.com/USER/REPO/COMMIT/my%20image.png
 *  The repository must be PUBLIC for the image to load on other websites.
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from "react";

/* ============================================================================
 *  1) THE CENTRAL IMAGE
 *  Raw version of the GitHub link you provided.
 * ========================================================================== */
const ROOT_IMAGE_URL =
  "https://raw.githubusercontent.com/Maranathanow2033/ImgResources/6138a38dbb713c52372115ac017ab8382a2f1957/MIND%20MAP%20LEVEL%204%20for%20JD%20THE%20MESSIAH%20light%20-%20draft.png";

/* ============================================================================
 *  2) TRANSLATIONS — every piece of interface text lives here.
 *  To change a button label or message, edit it here (English + Spanish).
 *  (The lesson content for each topic is NOT here — it is in NODES, below.)
 * ========================================================================== */
const T = {
  en: {
    languageName: "English",
    mapAria: "Interactive mind map: The Messiah, in depth",
    rootImageAlt:
      "Jesus, Decoded. Part 4: The Messiah, in depth. Overview image with eight sub-topics, labelled A to H.",
    imageError:
      "The central image could not be loaded. Check that the image link is a raw link and that the repository is public.",
    nodesAria: "Eight topics. Select one to open it.",
    openTopic: "Open topic",
    hint: "Select any topic to explore it.",
    closeBtn: "Close",
    closeAria: "Close this topic and return to the map",
    dialogAria: "Topic details",
    placeholderBadge: "Placeholder",
    placeholderNote:
      "Placeholder content: replace it with your own lesson (see the NODES list in the code).",
    langGroup: "Choose language",
    langEnAria: "Show English only",
    langEsAria: "Show Spanish only",
    langBothAria: "Show English and Spanish together",
    sectionTitle: "Site map",
    sectionSubtitle: "Explore the contents of this website.",
  },
  es: {
    languageName: "Español",
    mapAria: "Mapa mental interactivo: El Mesías, en profundidad",
    rootImageAlt:
      "Jesús, Decodificado. Parte 4: El Mesías, en profundidad. Imagen general con ocho subtemas, rotulados de la A a la H.",
    imageError:
      "No se pudo cargar la imagen central. Verifica que el enlace de la imagen sea un enlace «raw» y que el repositorio sea público.",
    nodesAria: "Ocho temas. Selecciona uno para abrirlo.",
    openTopic: "Abrir tema",
    hint: "Selecciona cualquier tema para explorarlo.",
    closeBtn: "Cerrar",
    closeAria: "Cerrar este tema y volver al mapa",
    dialogAria: "Detalles del tema",
    placeholderBadge: "Marcador de posición",
    placeholderNote:
      "Contenido de ejemplo: reemplázalo con tu propia lección (consulta la lista NODES en el código).",
    langGroup: "Elegir idioma",
    langEnAria: "Mostrar solo en inglés",
    langEsAria: "Mostrar solo en español",
    langBothAria: "Mostrar inglés y español juntos",
    sectionTitle: "Mapa del sitio",
    sectionSubtitle: "Explora el contenido de este sitio web.",
  },
};

/* ============================================================================
 *  3) THE 8 NODES — THIS IS THE PART THE TEACHER EDITS
 *
 *  Each entry is one clickable node. Fields:
 *
 *    id            Unique short name (no spaces). Don't repeat it.
 *    thumbnail     Optional. URL of a small picture for the node.
 *                  Leave as "" to automatically use a crop of the central
 *                  image (the matching A–H tile), see `crop` below.
 *    crop          Which part of the central image to show as the thumbnail
 *                  when `thumbnail` is "". Values are fractions (0 to 1) of
 *                  the full image: x/y = top-left corner, w/h = size.
 *                  You can ignore this if you provide your own thumbnails.
 *    title         The node's name, in { en, es }.
 *    content       The lesson text, in { en: [...], es: [...] }.
 *                  Every item in the list is ONE paragraph.
 *    image         Optional. URL of an image shown above the text.
 *    imageAlt      Description of that image for screen readers { en, es }.
 *    isPlaceholder true = shows the "Placeholder" badge.
 *                  Change it to false (or delete the line) once you have
 *                  written the real content.
 *
 *  ✏️  Look for the "EDIT HERE" comments: replace the text between the quotes.
 * ========================================================================== */
const NODES = [
  {
    id: "rejected-by-jews",
    thumbnail: "",
    crop: { x: 0.069, y: 0.626, w: 0.176, h: 0.156 },
    title: { en: "Rejected by Jews", es: "Rechazado por los judíos" },
    isPlaceholder: true,
    image: "",
    imageAlt: { en: "", es: "" },
    content: {
      // ✏️ EDIT HERE (English paragraphs)
      en: [
        "PLACEHOLDER — Replace this text with your lesson on “Rejected by Jews”.",
        "Add as many paragraphs as you need. Each line in this list is one paragraph.",
      ],
      // ✏️ EDIT HERE (Spanish paragraphs)
      es: [
        "MARCADOR DE POSICIÓN — Reemplaza este texto con tu lección sobre «Rechazado por los judíos».",
        "Agrega todos los párrafos que necesites. Cada línea de esta lista es un párrafo.",
      ],
    },
  },
  {
    id: "in-torah",
    thumbnail: "",
    crop: { x: 0.26, y: 0.626, w: 0.176, h: 0.156 },
    title: { en: "In Torah", es: "En la Torá" },
    isPlaceholder: true,
    image: "",
    imageAlt: { en: "", es: "" },
    content: {
      // ✏️ EDIT HERE
      en: [
        "PLACEHOLDER — Replace this text with your lesson on “In Torah”.",
        "Add as many paragraphs as you need. Each line in this list is one paragraph.",
      ],
      es: [
        "MARCADOR DE POSICIÓN — Reemplaza este texto con tu lección sobre «En la Torá».",
        "Agrega todos los párrafos que necesites. Cada línea de esta lista es un párrafo.",
      ],
    },
  },
  {
    id: "isaiah-53",
    thumbnail: "",
    crop: { x: 0.438, y: 0.626, w: 0.176, h: 0.156 },
    title: { en: "Isaiah 53", es: "Isaías 53" },
    isPlaceholder: true,
    image: "",
    imageAlt: { en: "", es: "" },
    content: {
      // ✏️ EDIT HERE
      en: [
        "PLACEHOLDER — Replace this text with your lesson on “Isaiah 53”.",
        "Add as many paragraphs as you need. Each line in this list is one paragraph.",
      ],
      es: [
        "MARCADOR DE POSICIÓN — Reemplaza este texto con tu lección sobre «Isaías 53».",
        "Agrega todos los párrafos que necesites. Cada línea de esta lista es un párrafo.",
      ],
    },
  },
  {
    id: "psalm-22",
    thumbnail: "",
    crop: { x: 0.608, y: 0.626, w: 0.176, h: 0.156 },
    title: { en: "Psalm 22", es: "Salmo 22" },
    isPlaceholder: true,
    image: "",
    imageAlt: { en: "", es: "" },
    content: {
      // ✏️ EDIT HERE
      en: [
        "PLACEHOLDER — Replace this text with your lesson on “Psalm 22”.",
        "Add as many paragraphs as you need. Each line in this list is one paragraph.",
      ],
      es: [
        "MARCADOR DE POSICIÓN — Reemplaza este texto con tu lección sobre «Salmo 22».",
        "Agrega todos los párrafos que necesites. Cada línea de esta lista es un párrafo.",
      ],
    },
  },
  {
    id: "daniel-9",
    thumbnail: "",
    crop: { x: 0.776, y: 0.626, w: 0.176, h: 0.156 },
    title: { en: "Daniel 9", es: "Daniel 9" },
    isPlaceholder: true,
    image: "",
    imageAlt: { en: "", es: "" },
    content: {
      // ✏️ EDIT HERE
      en: [
        "PLACEHOLDER — Replace this text with your lesson on “Daniel 9”.",
        "Add as many paragraphs as you need. Each line in this list is one paragraph.",
      ],
      es: [
        "MARCADOR DE POSICIÓN — Reemplaza este texto con tu lección sobre «Daniel 9».",
        "Agrega todos los párrafos que necesites. Cada línea de esta lista es un párrafo.",
      ],
    },
  },
  {
    id: "the-branch",
    thumbnail: "",
    crop: { x: 0.069, y: 0.797, w: 0.176, h: 0.156 },
    title: { en: "The Branch", es: "El Renuevo" },
    isPlaceholder: true,
    image: "",
    imageAlt: { en: "", es: "" },
    content: {
      // ✏️ EDIT HERE
      en: [
        "PLACEHOLDER — Replace this text with your lesson on “The Branch”.",
        "Add as many paragraphs as you need. Each line in this list is one paragraph.",
      ],
      es: [
        "MARCADOR DE POSICIÓN — Reemplaza este texto con tu lección sobre «El Renuevo».",
        "Agrega todos los párrafos que necesites. Cada línea de esta lista es un párrafo.",
      ],
    },
  },
  {
    id: "emmanuel",
    thumbnail: "",
    crop: { x: 0.26, y: 0.797, w: 0.176, h: 0.156 },
    title: { en: "Emmanuel", es: "Emanuel" },
    isPlaceholder: true,
    image: "",
    imageAlt: { en: "", es: "" },
    content: {
      // ✏️ EDIT HERE
      en: [
        "PLACEHOLDER — Replace this text with your lesson on “Emmanuel”.",
        "Add as many paragraphs as you need. Each line in this list is one paragraph.",
      ],
      es: [
        "MARCADOR DE POSICIÓN — Reemplaza este texto con tu lección sobre «Emanuel».",
        "Agrega todos los párrafos que necesites. Cada línea de esta lista es un párrafo.",
      ],
    },
  },
  {
    id: "363",
    thumbnail: "",
    crop: { x: 0.438, y: 0.797, w: 0.176, h: 0.156 },
    title: { en: "363", es: "363" },
    isPlaceholder: true,
    image: "",
    imageAlt: { en: "", es: "" },
    content: {
      // ✏️ EDIT HERE
      en: [
        "PLACEHOLDER — Replace this text with your lesson on “363”.",
        "Add as many paragraphs as you need. Each line in this list is one paragraph.",
      ],
      es: [
        "MARCADOR DE POSICIÓN — Reemplaza este texto con tu lección sobre «363».",
        "Agrega todos los párrafos que necesites. Cada línea de esta lista es un párrafo.",
      ],
    },
  },
];

/* ============================================================================
 *  4) SMALL HELPERS (you don't need to edit these)
 * ========================================================================== */

/** Which languages to display, in order. English always comes first. */
const langsToShow = (lang) => (lang === "both" ? ["en", "es"] : [lang]);

/** Plain-text version of a UI string (used for aria-labels, alt text, etc.). */
const plain = (key, lang) =>
  lang === "both" ? `${T.en[key]} / ${T.es[key]}` : T[lang][key];

/** Plain-text version of a bilingual { en, es } object. */
const plainObj = (obj, lang) =>
  lang === "both" ? `${obj.en} / ${obj.es}` : obj[lang];

/** Visible text: one language, or English followed by Spanish. */
const bi = (en, es, lang) => {
  if (lang === "en") return <span lang="en">{en}</span>;
  if (lang === "es") return <span lang="es">{es}</span>;
  return (
    <>
      <span lang="en">{en}</span>
      <span lang="es" className="jdmm-alt">
        {es}
      </span>
    </>
  );
};

/** Visible UI string by key. */
const ui = (key, lang) => bi(T.en[key], T.es[key], lang);

/**
 * Builds the inline style for a node thumbnail.
 * - If the node has its own `thumbnail` URL, use that.
 * - Otherwise crop the matching tile out of the central image.
 */
function thumbStyle(node, rootImage) {
  if (node.thumbnail) {
    return { backgroundImage: `url("${node.thumbnail}")`, backgroundSize: "cover" };
  }
  if (node.crop && rootImage) {
    const { x, y, w, h } = node.crop;
    return {
      backgroundImage: `url("${rootImage}")`,
      backgroundSize: `${100 / w}% auto`,
      backgroundPosition: `${(x / (1 - w)) * 100}% ${(y / (1 - h)) * 100}%`,
      backgroundRepeat: "no-repeat",
    };
  }
  return null; // falls back to the node's letter
}

/* ============================================================================
 *  5) STYLES — every class starts with "jdmm-" so nothing leaks to (or is
 *  affected by) the rest of the website. Colours are CSS variables at the top.
 * ========================================================================== */
const CSS = `
.jdmm-root {
  --jdmm-ivory: #f6eedb;
  --jdmm-ivory-deep: #e9dcbc;
  --jdmm-ink: #2a1912;
  --jdmm-crimson: #7b1119;
  --jdmm-gold: #b78a2e;
  --jdmm-gap: 12px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
  background: var(--jdmm-ivory);
  color: var(--jdmm-ink);
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.5;
}
.jdmm-root *, .jdmm-root *::before, .jdmm-root *::after { box-sizing: border-box; }

/* ---- Language toggle ---- */
.jdmm-toolbar { display: flex; justify-content: flex-end; margin-bottom: 10px; }
.jdmm-lang { display: inline-flex; border: 1.5px solid var(--jdmm-gold); border-radius: 6px; overflow: hidden; }
.jdmm-lang button {
  font: inherit; font-size: 0.85rem; padding: 6px 12px; cursor: pointer;
  background: transparent; color: var(--jdmm-ink); border: 0;
}
.jdmm-lang button + button { border-left: 1.5px solid var(--jdmm-gold); }
.jdmm-lang button[aria-pressed="true"] { background: var(--jdmm-crimson); color: var(--jdmm-ivory); }

/* ---- Section heading ---- */
.jdmm-heading { margin: 0 0 14px; text-align: center; }
.jdmm-heading-title { margin: 0; font-size: 1.6rem; line-height: 1.2; font-weight: bold; color: var(--jdmm-crimson); }
.jdmm-heading-sub { margin: 4px 0 0; font-size: 1rem; }

/* ---- Root image ---- */
.jdmm-rootimg { display: block; width: 100%; height: auto; border: 2px solid var(--jdmm-gold); border-radius: 4px; }
.jdmm-error {
  padding: 24px; text-align: center; border: 2px dashed var(--jdmm-crimson);
  border-radius: 4px; color: var(--jdmm-crimson);
}

/* ---- Tree: stem + bar + drops connect the image to the 8 nodes ---- */
.jdmm-tree { position: relative; padding-top: 36px; }
.jdmm-tree::before {            /* vertical stem under the central image */
  content: ""; position: absolute; top: 0; left: 50%; width: 2px; height: 18px;
  margin-left: -1px; background: var(--jdmm-gold);
}
.jdmm-list {
  position: relative; display: grid; grid-template-columns: repeat(8, 1fr);
  gap: var(--jdmm-gap); list-style: none; margin: 0; padding: 0;
}
.jdmm-list::before {            /* horizontal bar across all 8 nodes */
  content: ""; position: absolute; top: -18px; height: 2px; background: var(--jdmm-gold);
  left: calc((100% - 7 * var(--jdmm-gap)) / 16);
  right: calc((100% - 7 * var(--jdmm-gap)) / 16);
}
.jdmm-item { position: relative; }
.jdmm-item::before {            /* short drop from the bar to each node */
  content: ""; position: absolute; top: -18px; left: 50%; width: 2px; height: 18px;
  margin-left: -1px; background: var(--jdmm-gold);
}

/* ---- Node button ---- */
.jdmm-node {
  display: block; width: 100%; padding: 0; margin: 0; border: 0; background: none;
  font: inherit; color: inherit; text-align: center; cursor: pointer;
}
.jdmm-thumb {
  display: flex; align-items: center; justify-content: center; width: 100%;
  aspect-ratio: 3 / 2; border: 2px solid var(--jdmm-gold); border-radius: 4px;
  background-color: var(--jdmm-ivory-deep); background-position: center;
  font-size: 1.6rem; font-weight: bold; color: var(--jdmm-crimson);
  transition: border-color 0.15s, transform 0.15s;
}
.jdmm-node:hover .jdmm-thumb { border-color: var(--jdmm-crimson); transform: translateY(-2px); }
.jdmm-node:focus-visible { outline: none; }
.jdmm-node:focus-visible .jdmm-thumb { outline: 3px solid var(--jdmm-crimson); outline-offset: 2px; }
.jdmm-label { display: block; margin-top: 6px; font-size: 0.85rem; line-height: 1.25; }
.jdmm-label span { display: block; }

.jdmm-hint { margin: 16px 0 0; text-align: center; font-size: 0.9rem; }
.jdmm-alt { display: block; font-style: italic; opacity: 0.85; }

/* ---- Second-level dialog ---- */
.jdmm-overlay {
  position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center;
  justify-content: center; padding: 16px; background: rgba(30, 10, 8, 0.75);
}
.jdmm-panel {
  display: flex; flex-direction: column; width: 100%; max-width: 760px; max-height: 90vh;
  background: var(--jdmm-ivory); color: var(--jdmm-ink);
  border: 3px double var(--jdmm-gold); border-radius: 6px; outline: none;
  font-family: Georgia, "Times New Roman", serif; line-height: 1.5;
}
.jdmm-panel *, .jdmm-panel *::before, .jdmm-panel *::after { box-sizing: border-box; }
.jdmm-panel-head {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 14px 18px; background: var(--jdmm-crimson); color: var(--jdmm-ivory);
}
.jdmm-panel-title { margin: 0; font-size: 1.35rem; line-height: 1.2; font-weight: bold; }
.jdmm-panel-title .jdmm-alt { font-size: 1rem; font-weight: normal; }
.jdmm-close {
  flex: none; font: inherit; font-size: 0.95rem; padding: 8px 14px; cursor: pointer;
  background: var(--jdmm-ivory); color: var(--jdmm-crimson);
  border: 2px solid var(--jdmm-gold); border-radius: 6px; text-align: center;
}
.jdmm-close:hover { background: var(--jdmm-ivory-deep); }
.jdmm-close:focus-visible { outline: 3px solid var(--jdmm-gold); outline-offset: 2px; }
.jdmm-panel-body { padding: 18px 22px 24px; overflow-y: auto; }
.jdmm-panel-body p { margin: 0 0 1em; max-width: 68ch; }
.jdmm-panel-body img { display: block; max-width: 100%; height: auto; margin: 0 0 1em; border-radius: 4px; }
.jdmm-section + .jdmm-section { margin-top: 1.5em; padding-top: 1em; border-top: 1px solid var(--jdmm-gold); }
.jdmm-section-label { margin: 0 0 0.5em; font-size: 0.85rem; font-style: italic; color: var(--jdmm-crimson); }
.jdmm-badge {
  display: inline-block; margin: 0 0 1em; padding: 4px 10px; font-size: 0.85rem;
  border: 1.5px dashed var(--jdmm-crimson); border-radius: 4px; color: var(--jdmm-crimson);
}
.jdmm-badge span { display: block; }

@media (prefers-reduced-motion: no-preference) {
  .jdmm-panel { animation: jdmm-open 0.18s ease-out; }
  @keyframes jdmm-open {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to   { opacity: 1; transform: none; }
  }
}
@media (prefers-reduced-motion: reduce) {
  .jdmm-thumb { transition: none; }
}

/* ---- Mobile: 4 nodes per row, 2 rows, single stem ---- */
@media (max-width: 720px) {
  .jdmm-tree::before { height: 36px; }
  .jdmm-list { grid-template-columns: repeat(4, 1fr); row-gap: 14px; }
  .jdmm-list::before, .jdmm-item::before { display: none; }
  .jdmm-label { font-size: 0.78rem; }
  .jdmm-panel-title { font-size: 1.15rem; }
}
@media (max-width: 420px) {
  .jdmm-root { padding: 10px; }
  .jdmm-thumb { font-size: 1.2rem; }
}
`;

/* ============================================================================
 *  6) THE COMPONENT
 * ========================================================================== */
export default function JesusDecodedMindMap({
  imageUrl = ROOT_IMAGE_URL,
  nodes = NODES,
  defaultLang = "en",
}) {
  const [lang, setLang] = useState(defaultLang); // "en" | "es" | "both"
  const [activeId, setActiveId] = useState(null); // which node is open (or null)
  const [imgFailed, setImgFailed] = useState(false);

  const triggerRef = useRef(null); // the node button that opened the dialog
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const uid = useRef("jdmm-" + Math.random().toString(36).slice(2, 8)).current;

  const active = nodes.find((n) => n.id === activeId) || null;

  /* Open a node. We remember the button so focus can go back to it later. */
  const openNode = (id, event) => {
    triggerRef.current = event.currentTarget;
    setActiveId(id);
  };
  const closeNode = () => setActiveId(null);

  /* Focus management: into the dialog when it opens, back to the node when it closes. */
  useEffect(() => {
    if (active && closeRef.current) {
      closeRef.current.focus();
    } else if (!active && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [active]);

  /* Keyboard inside the dialog: Escape closes; Tab stays inside the dialog. */
  const onDialogKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeNode();
      return;
    }
    if (event.key === "Tab" && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  /* ---------------------------------------------------------------- render */
  return (
    <section className="jdmm-root" aria-label={plain("mapAria", lang)}>
      <style>{CSS}</style>

      {/* Language toggle */}
      <div className="jdmm-toolbar">
        <div className="jdmm-lang" role="group" aria-label={plain("langGroup", lang)}>
          <button
            type="button"
            aria-pressed={lang === "en"}
            aria-label={plain("langEnAria", lang)}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            type="button"
            aria-pressed={lang === "es"}
            aria-label={plain("langEsAria", lang)}
            onClick={() => setLang("es")}
          >
            ES
          </button>
          <button
            type="button"
            aria-pressed={lang === "both"}
            aria-label={plain("langBothAria", lang)}
            onClick={() => setLang("both")}
          >
            EN + ES
          </button>
        </div>
      </div>

      {/* Section heading (translated with the language toggle) */}
      <header className="jdmm-heading">
        <h2 className="jdmm-heading-title">{ui("sectionTitle", lang)}</h2>
        <p className="jdmm-heading-sub">{ui("sectionSubtitle", lang)}</p>
      </header>

      {/* Root of the mind map: the central image */}
      {imgFailed ? (
        <div className="jdmm-error" role="alert">
          {ui("imageError", lang)}
        </div>
      ) : (
        <img
          className="jdmm-rootimg"
          src={imageUrl}
          alt={plain("rootImageAlt", lang)}
          onError={() => setImgFailed(true)}
        />
      )}

      {/* The 8 clickable nodes */}
      <nav className="jdmm-tree" aria-label={plain("nodesAria", lang)}>
        <ul className="jdmm-list">
          {nodes.map((node) => {
            const style = thumbStyle(node, imgFailed ? "" : imageUrl);
            return (
              <li className="jdmm-item" key={node.id}>
                {/* A real <button>: Enter and Space open it automatically */}
                <button
                  type="button"
                  className="jdmm-node"
                  aria-haspopup="dialog"
                  aria-label={`${plain("openTopic", lang)}: ${plainObj(node.title, lang)}`}
                  onClick={(e) => openNode(node.id, e)}
                >
                  <span className="jdmm-thumb" style={style || undefined} aria-hidden="true">
                    {!style && node.id.charAt(0).toUpperCase()}
                  </span>
                  <span className="jdmm-label">{bi(node.title.en, node.title.es, lang)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="jdmm-hint">{ui("hint", lang)}</p>

      {/* Second level: the topic panel */}
      {active && (
        <div
          className="jdmm-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeNode(); // click on dark background
          }}
          onKeyDown={onDialogKeyDown}
        >
          <div
            className="jdmm-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            aria-label={undefined}
            ref={dialogRef}
            tabIndex={-1}
          >
            <div className="jdmm-panel-head">
              <h2 className="jdmm-panel-title" id={`${uid}-title`}>
                {bi(active.title.en, active.title.es, lang)}
              </h2>
              <button
                type="button"
                className="jdmm-close"
                ref={closeRef}
                aria-label={plain("closeAria", lang)}
                onClick={closeNode}
              >
                {ui("closeBtn", lang)}
              </button>
            </div>

            <div className="jdmm-panel-body" role="document" aria-label={plain("dialogAria", lang)}>
              {active.isPlaceholder && (
                <p className="jdmm-badge">
                  <strong>{ui("placeholderBadge", lang)}</strong>
                  <span>{ui("placeholderNote", lang)}</span>
                </p>
              )}

              {active.image && (
                <img src={active.image} alt={plainObj(active.imageAlt || { en: "", es: "" }, lang)} />
              )}

              {langsToShow(lang).map((l) => (
                <div className="jdmm-section" lang={l} key={l}>
                  {lang === "both" && <p className="jdmm-section-label">{T[l].languageName}</p>}
                  {(active.content[l] || []).map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
