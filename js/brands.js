/* =========================================================
   POSH IMPERIAL — brand list
   To add a brand, copy one line and edit it.
   cats: polish | chem | coat | tools   (a brand can have several)
   Only list brands you actually stock or can source legitimately.
   Items marked  // VERIFY  have a spelling or description I could not
   confirm — please check them against the real brand.
   ========================================================= */
window.CATS = {
  polish: "Polishing & compounds",
  chem:   "Wash & chemicals",
  coat:   "Coatings & protection",
  tools:  "Tools & accessories"
};

window.BRANDS = [
  { name: "RUPES",         country: "Italy",       cats: ["polish", "tools"], desc: "Polishing machines, pads and compounds, including the Bigfoot range." },
  { name: "Mafra",         country: "",            cats: ["polish"],          desc: "Polishing pads and compounds for cutting, polishing and finishing." },
  { name: "Menzerna",      country: "Germany",     cats: ["polish"],          desc: "Compounds and polishes for paint correction, from heavy cut to final finish." }, // corrected from "Mensena"
  { name: "Vonixx",        country: "Brazil",      cats: ["chem", "coat"],    desc: "Brazilian car care range covering shampoos, waxes, sealants and coatings." },
  { name: "3M",            country: "USA",         cats: ["polish", "tools"], desc: "Compounds, abrasives, polishing pads and automotive care products." },
  { name: "Koch-Chemie",   country: "Germany",     cats: ["chem", "polish"],  desc: "Professional German cleaners, polishes and care products." },
  { name: "Turtle Wax",    country: "USA",         cats: ["chem", "coat"],    desc: "Household-name waxes, washes and appearance products, made since the 1940s." }, // corrected from "Turtile Wax"
  { name: "Jopasu",        country: "",            cats: ["tools"],           desc: "Car dusters for lifting loose dust between washes." }, // corrected from "Japasu" - VERIFY
  { name: "Nano Protech",  country: "",            cats: ["coat"],            desc: "Nano protection products for paint and glass." }, // VERIFY spelling + description
  { name: "Autocurve",     country: "",            cats: ["chem"],            desc: "Car care and detailing products." }, // VERIFY spelling + description
  { name: "Shine Mate",    country: "",            cats: ["chem"],            desc: "Everyday car care: shampoos, polishes and dressings." }, // VERIFY description
  { name: "Northwolf",     country: "",            cats: ["tools"],           desc: "Detailing supplies and accessories." }, // corrected from "North Wolf" - VERIFY

  /* ---- extra brands added by suggestion (remove any you don't stock) ---- */
  { name: "Meguiar's",     country: "USA",         cats: ["chem", "polish"],  desc: "Long-established American range of polishes, waxes and washes." },
  { name: "Gyeon",         country: "South Korea", cats: ["coat", "chem"],    desc: "Ceramic coatings and maintenance products." },
  { name: "CarPro",        country: "South Korea", cats: ["coat", "chem"],    desc: "Coatings, decontamination and wash products, including CQuartz." },
  { name: "Gtechniq",      country: "UK",          cats: ["coat"],            desc: "Coatings and surface protection for paint, glass, wheels and interiors." },
  { name: "Sonax",         country: "Germany",     cats: ["chem", "polish"],  desc: "Wash, polish and care products for paint, glass and interiors." },
  { name: "Chemical Guys", country: "USA",         cats: ["chem"],            desc: "Washes, detail sprays and care products for enthusiasts." },
  { name: "Soft99",        country: "Japan",       cats: ["coat", "chem"],    desc: "Japanese waxes and glass coatings, known for Fusso Coat and Ultra Glaco." }
];
