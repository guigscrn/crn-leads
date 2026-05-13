import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#0F1D35",
  primaryLight: "#1B2A4A",
  accent: "#D4A72C",
  accentHover: "#E8B931",
  accentSoft: "rgba(212, 167, 44, 0.08)",
  white: "#FFFFFF",
  offWhite: "#F8F9FB",
  gray100: "#F1F3F6",
  gray200: "#E2E6EC",
  gray400: "#9BA3B0",
  gray600: "#5A6476",
  gray800: "#2D3648",
  success: "#22B05B",
  successSoft: "rgba(34, 176, 91, 0.1)",
};

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 10.5L8 14.5L16 6.5" stroke={COLORS.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HouseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M5 13L14 5L23 13V23C23 23.5304 22.7893 24.0391 22.4142 24.4142C22.0391 24.7893 21.5304 25 21 25H7C6.46957 25 5.96086 24.7893 5.58579 24.4142C5.21071 24.0391 5 23.5304 5 23V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 25V15H17V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="4" y="4" width="20" height="22" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="9" y="8" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="15" y="8" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="15" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="15" y="15" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="11" y="22" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const OtherIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M14 10V14L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2L3 5V9C3 12.87 5.56 16.47 9 17.5C12.44 16.47 15 12.87 15 9V5L9 2Z" stroke={COLORS.success} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 9L8.5 11L12 7" stroke={COLORS.success} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1L9.854 5.586H14.657L10.9 8.328L12.236 13L8 10.328L3.764 13L5.1 8.328L1.343 5.586H6.146L8 1Z"
      fill={filled ? COLORS.accent : COLORS.gray200}
      stroke={filled ? COLORS.accent : COLORS.gray200}
      strokeWidth="0.5"
    />
  </svg>
);

const ProgressBar = ({ step, total }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
    <div style={{ flex: 1, height: 4, borderRadius: 3, background: COLORS.gray200, overflow: "hidden" }}>
      <div style={{
        width: `${(step / total) * 100}%`,
        height: "100%",
        borderRadius: 3,
        background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentHover})`,
        transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
    <span style={{ fontSize: 12, color: COLORS.gray400, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>
      Etape {step}/{total}
    </span>
  </div>
);

const TESTIMONIALS = [
  { name: "Marie T.", city: "Saint-Etienne", text: "Estimation recue en moins de 24h, tres professionnel. J'ai pu vendre au bon prix grace a leur conseil.", stars: 5 },
  { name: "Jean-Luc B.", city: "Firminy", text: "Service rapide et gratuit. L'expert connaissait tres bien le marche local. Je recommande.", stars: 5 },
  { name: "Sophie M.", city: "Saint-Chamond", text: "Super experience ! Le formulaire prend 2 minutes et l'estimation etait tres precise.", stars: 5 },
  { name: "Patrick D.", city: "Saint-Etienne", text: "J'etais sceptique mais l'estimation correspondait exactement au prix de vente final. Merci !", stars: 5 },
  { name: "Nathalie R.", city: "Rive-de-Gier", text: "Tres reactive et professionnelle. Bien plus pratique qu'appeler plusieurs agences.", stars: 5 },
  { name: "Michel F.", city: "Saint-Etienne", text: "Estimation gratuite et sans pression. L'expert m'a rappele rapidement et etait tres disponible.", stars: 5 },
];

const TestimonialsCarousel = ({ font }) => {
  const [offset, setOffset] = useState(0);
  const cardWidth = 300 + 16;
  const totalWidth = cardWidth * TESTIMONIALS.length;
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => {
        const next = prev - 1;
        return Math.abs(next) >= totalWidth ? 0 : next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [totalWidth]);

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div style={{ display: "flex", gap: 16, transform: `translateX(${offset}px)`, width: "max-content" }}>
        {doubled.map((t, i) => (
          <div key={i} style={{
            width: 300, background: COLORS.white, borderRadius: 16,
            padding: "24px 20px", border: `1px solid ${COLORS.gray200}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)", flexShrink: 0,
          }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
              {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= t.stars} />)}
            </div>
            <p style={{ fontSize: 14, color: COLORS.gray600, lineHeight: 1.6, margin: "0 0 16px", fontFamily: font, fontStyle: "italic" }}>
              "{t.text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, color: COLORS.primary, fontFamily: font,
              }}>
                {t.name.charAt(0)}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.primary, fontFamily: font }}>{t.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: COLORS.gray400, fontFamily: font }}>{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function PrezimoLanding() {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    typeBien: "", ville: "", delai: "",
    prenom: "", nom: "", telephone: "", email: "",
  });
  const [errors, setErrors] = useState({});
  const [heroVisible, setHeroVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [showCookies, setShowCookies] = useState(true);
  const [showLegal, setShowLegal] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [sending, setSending] = useState(false);
  const stepsRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setStepsVisible(true); }); },
      { threshold: 0.2 }
    );
    if (stepsRef.current) observer.observe(stepsRef.current);
    return () => observer.disconnect();
  }, []);

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.typeBien) newErrors.typeBien = "Selectionnez un type de bien";
      if (!formData.ville.trim()) newErrors.ville = "Indiquez votre ville ou quartier";
    } else if (step === 2) {
      if (!formData.delai) newErrors.delai = "Selectionnez un delai";
    } else if (step === 3) {
      if (!formData.prenom.trim()) newErrors.prenom = "Requis";
      if (!formData.nom.trim()) newErrors.nom = "Requis";
      if (!formData.telephone.trim()) newErrors.telephone = "Requis";
      else if (!/^[\d\s+]{10,}$/.test(formData.telephone.trim())) newErrors.telephone = "Numero invalide";
      if (!formData.email.trim()) newErrors.email = "Requis";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (validateStep(formStep)) {
      if (formStep === 3) {
        setSending(true);
        try {
          const iframe = document.createElement("iframe");
          iframe.name = "hidden_iframe";
          iframe.style.display = "none";
          document.body.appendChild(iframe);
          const form = document.createElement("form");
          form.method = "POST";
          form.action = "https://hook.eu1.make.com/w1ckb67cots00k4txhc1tmofpmyy7ti3";
          form.target = "hidden_iframe";
          const fields = {
            prenom: formData.prenom, nom: formData.nom,
            telephone: formData.telephone, email: formData.email,
            type_bien: formData.typeBien, ville: formData.ville,
            delai: formData.delai, source: "landing-page-saint-etienne",
            date: new Date().toISOString(),
          };
          Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden"; input.name = key; input.value = value;
            form.appendChild(input);
          });
          document.body.appendChild(form);
          form.submit();
          setTimeout(() => {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
          }, 2000);
        } catch (e) {}
        setSending(false);
        if (window.fbq) {
          window.fbq('track', 'Lead', { content_name: 'estimation-saint-etienne', content_category: 'vendeur' });
        }
        setSubmitted(true);
      } else {
        setFormStep(formStep + 1);
      }
    }
  };

  const prevStep = () => { if (formStep > 1) setFormStep(formStep - 1); };
  const font = "'DM Sans', sans-serif";
  const displayFont = "'Playfair Display', serif";

  const ChoiceButton = ({ selected, onClick, icon, label }) => (
    <button onClick={onClick} style={{
      flex: 1, minWidth: 90, padding: "14px 8px",
      border: `2px solid ${selected ? COLORS.accent : COLORS.gray200}`,
      borderRadius: 12, background: selected ? COLORS.accentSoft : COLORS.white,
      cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      transition: "all 0.25s ease", color: selected ? COLORS.primary : COLORS.gray600,
      boxShadow: selected ? `0 0 0 1px ${COLORS.accent}` : "none",
    }}>
      {icon}
      <span style={{ fontSize: 13, fontWeight: 600, fontFamily: font }}>{label}</span>
    </button>
  );

  const DelayButton = ({ value, label, selected }) => (
    <button onClick={() => setFormData({ ...formData, delai: value })} style={{
      width: "100%", padding: "13px 16px",
      border: `2px solid ${selected ? COLORS.accent : COLORS.gray200}`,
      borderRadius: 10, background: selected ? COLORS.accentSoft : COLORS.white,
      cursor: "pointer", fontSize: 14, fontWeight: selected ? 600 : 500,
      fontFamily: font, color: selected ? COLORS.primary : COLORS.gray600,
      textAlign: "left", transition: "all 0.25s ease",
      boxShadow: selected ? `0 0 0 1px ${COLORS.accent}` : "none",
    }}>
      {label}
    </button>
  );

  const renderInput = (label, name, type = "text", placeholder, half) => (
    <div key={name} style={{ flex: half ? "1 1 45%" : "1 1 100%", minWidth: half ? 120 : "auto" }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.gray800, marginBottom: 5, fontFamily: font }}>
        {label}
      </label>
      <input
        key={`input-${name}`}
        type={type}
        value={formData[name]}
        onChange={(e) => { setFormData(prev => ({ ...prev, [name]: e.target.value })); setErrors(prev => ({ ...prev, [name]: "" })); }}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 14px",
          border: `2px solid ${errors[name] ? "#E53E3E" : COLORS.gray200}`,
          borderRadius: 10, fontSize: 14, fontFamily: font,
          color: COLORS.gray800, background: COLORS.white,
          outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
        }}
        onFocus={(e) => { e.target.style.borderColor = COLORS.accent; }}
        onBlur={(e) => { if (!errors[name]) e.target.style.borderColor = COLORS.gray200; }}
      />
      {errors[name] && <span style={{ fontSize: 11, color: "#E53E3E", marginTop: 3, display: "block", fontFamily: font }}>{errors[name]}</span>}
    </div>
  );

  const renderFormContent = () => {
    if (formStep === 1) {
      return (
        <div>
          <h3 style={{ fontFamily: displayFont, fontSize: 20, color: COLORS.primary, marginBottom: 4, marginTop: 0 }}>Votre bien</h3>
          <p style={{ fontSize: 13, color: COLORS.gray400, marginBottom: 16 }}>Quel type de bien souhaitez-vous vendre ?</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <ChoiceButton selected={formData.typeBien === "appartement"} onClick={() => { setFormData({ ...formData, typeBien: "appartement" }); setErrors({ ...errors, typeBien: "" }); }} icon={<BuildingIcon />} label="Appartement" />
            <ChoiceButton selected={formData.typeBien === "maison"} onClick={() => { setFormData({ ...formData, typeBien: "maison" }); setErrors({ ...errors, typeBien: "" }); }} icon={<HouseIcon />} label="Maison" />
            <ChoiceButton selected={formData.typeBien === "autre"} onClick={() => { setFormData({ ...formData, typeBien: "autre" }); setErrors({ ...errors, typeBien: "" }); }} icon={<OtherIcon />} label="Autre" />
          </div>
          {errors.typeBien && <p style={{ fontSize: 11, color: "#E53E3E", fontFamily: font, margin: "0 0 8px" }}>{errors.typeBien}</p>}
          {renderInput("Ville / Quartier", "ville", "text", "Ex : Saint-Etienne centre, Firminy...")}
        </div>
      );
    }
    if (formStep === 2) {
      return (
        <div>
          <h3 style={{ fontFamily: displayFont, fontSize: 20, color: COLORS.primary, marginBottom: 4, marginTop: 0 }}>Votre projet</h3>
          <p style={{ fontSize: 13, color: COLORS.gray400, marginBottom: 16 }}>Dans quel delai souhaitez-vous vendre ?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DelayButton value="<3mois" label="Moins de 3 mois" selected={formData.delai === "<3mois"} />
            <DelayButton value="3-6mois" label="3 a 6 mois" selected={formData.delai === "3-6mois"} />
            <DelayButton value=">6mois" label="Plus de 6 mois" selected={formData.delai === ">6mois"} />
            <DelayButton value="renseigne" label="Je me renseigne simplement" selected={formData.delai === "renseigne"} />
          </div>
          {errors.delai && <p style={{ fontSize: 11, color: "#E53E3E", fontFamily: font, marginTop: 8 }}>{errors.delai}</p>}
        </div>
      );
    }
    if (formStep === 3) {
      return (
        <div>
          <h3 style={{ fontFamily: displayFont, fontSize: 20, color: COLORS.primary, marginBottom: 4, marginTop: 0 }}>Vos coordonnees</h3>
          <p style={{ fontSize: 13, color: COLORS.gray400, marginBottom: 16 }}>Ou souhaitez-vous recevoir votre estimation ?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {renderInput("Prenom", "prenom", "text", "Jean", true)}
            {renderInput("Nom", "nom", "text", "Dupont", true)}
            {renderInput("Telephone", "telephone", "tel", "06 12 34 56 78")}
            {renderInput("Email", "email", "email", "jean.dupont@email.com")}
          </div>
          <p style={{ fontSize: 11, color: COLORS.gray400, margin: "8px 0 0", fontFamily: font }}>
            Vos donnees sont protegees — aucun spam.
          </p>
        </div>
      );
    }
  };

  if (submitted) {
    return (
      <div style={{ fontFamily: font, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.offWhite, padding: 20 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet" />
        <div style={{ background: COLORS.white, borderRadius: 24, padding: "48px 40px", maxWidth: 520, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: COLORS.successSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18L15 25L28 12" stroke={COLORS.success} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: displayFont, fontSize: 28, color: COLORS.primary, marginBottom: 12 }}>Demande envoyee !</h2>
          <p style={{ fontSize: 16, color: COLORS.gray600, lineHeight: 1.6 }}>
            Merci <strong style={{ color: COLORS.primary }}>{formData.prenom}</strong>. Un expert immobilier vous contactera dans les <strong style={{ color: COLORS.primary }}>24 heures</strong> pour votre estimation.
          </p>
        </div>
      </div>
    );
  }

  const steps = [
    { num: "01", title: "Formulaire", desc: "Remplissez en 30 secondes" },
    { num: "02", title: "Analyse", desc: "Un expert etudie votre bien" },
    { num: "03", title: "Estimation", desc: "Resultat sous 24h" },
  ];

  return (
    <div style={{ fontFamily: font, background: COLORS.offWhite, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(15,29,53,0.92)", backdropFilter: "blur(12px)",
        padding: "0 24px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, border: `2px solid ${COLORS.accent}`, position: "relative" }}>
            <div style={{ position: "absolute", top: "20%", left: "20%", width: 9, height: 9, borderRadius: 2, background: COLORS.accent }} />
            <div style={{ position: "absolute", bottom: "16%", right: "16%", width: 5, height: 5, borderRadius: "50%", background: COLORS.success }} />
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", color: COLORS.white, fontSize: 18, fontWeight: 700, letterSpacing: 0.5 }}>
            Prez<span style={{ color: COLORS.accent }}>imo</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {[1,2,3,4,5].map(s => <StarIcon key={s} filled />)}
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: font }}>4.9/5 — 50+ avis</span>
        </div>
      </nav>

      {/* HERO — photo + formulaire inline */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "72px 20px 48px",
        overflow: "hidden",
      }}>
        {/* Photo Saint-Etienne */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/saint-etienne.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }} />
        {/* Overlay sombre pour lisibilite */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(8,15,30,0.90) 0%, rgba(15,29,53,0.85) 50%, rgba(18,35,65,0.80) 100%)",
        }} />
        {/* Lueur dorée subtile */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 75% 25%, rgba(212,167,44,0.07) 0%, transparent 55%)",
        }} />

        {/* Layout 2 colonnes */}
        <div style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 1020,
          display: "flex", gap: 48, alignItems: "center",
          flexWrap: "wrap",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(.4,0,.2,1)",
        }}>

          {/* Gauche — texte */}
          <div style={{ flex: "1 1 340px", order: 2 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(212,167,44,0.12)", border: "1px solid rgba(212,167,44,0.25)",
              borderRadius: 100, padding: "7px 16px", marginBottom: 24,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.success, boxShadow: `0 0 8px ${COLORS.success}` }} />
              <span style={{ fontSize: 13, color: COLORS.accentHover, fontWeight: 600 }}>Saint-Etienne & alentours</span>
            </div>

            <h1 style={{
              fontFamily: displayFont,
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800, color: COLORS.white,
              lineHeight: 1.12, margin: "0 0 18px", letterSpacing: -0.5,
            }}>
              Combien vaut<br />votre bien{" "}
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                vraiment ?
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.6vw, 17px)",
              color: "rgba(255,255,255,0.68)", lineHeight: 1.65,
              margin: "0 0 32px", maxWidth: 400,
            }}>
              Recevez une estimation gratuite de votre bien en 24h par un expert immobilier local. Sans deplacement, sans engagement.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 36, marginBottom: 28, flexWrap: "wrap" }}>
              {[
                { num: "100+", label: "Estimations" },
                { num: "24h", label: "Delai reponse" },
                { num: "98%", label: "Satisfaits" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: displayFont, fontSize: 26, fontWeight: 800,
                    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 1 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["100% gratuit et sans engagement", "Expert qui connait votre quartier", "Vos donnees sont protegees — RGPD"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckIcon />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.58)", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Droite — formulaire */}
          <div style={{ flex: "1 1 320px", maxWidth: 420, order: 1 }}>
            <div style={{
              background: COLORS.white,
              borderRadius: 20,
              padding: "26px 22px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
            }}>
              <div style={{ textAlign: "center", marginBottom: 18 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 3px" }}>
                  Estimation gratuite
                </p>
                <p style={{ fontSize: 13, color: COLORS.gray400, margin: 0 }}>Reponse sous 24h — Sans engagement</p>
              </div>

              <ProgressBar step={formStep} total={3} />
              {renderFormContent()}

              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                {formStep > 1 && (
                  <button onClick={prevStep} style={{
                    padding: "12px 18px", borderRadius: 10,
                    background: "transparent", border: `2px solid ${COLORS.gray200}`,
                    color: COLORS.gray600, fontSize: 14, fontWeight: 600,
                    fontFamily: font, cursor: "pointer",
                  }}>Retour</button>
                )}
                <button onClick={nextStep} style={{
                  flex: 1, padding: "14px 16px", borderRadius: 10,
                  background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
                  border: "none", color: COLORS.primary,
                  fontSize: 15, fontWeight: 700, fontFamily: font, cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(212,167,44,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  {sending ? "Envoi..." : formStep === 3 ? "Recevoir mon estimation" : "Continuer"}
                  {!sending && <ArrowRight />}
                </button>
              </div>

              <p style={{ textAlign: "center", fontSize: 11, color: COLORS.gray400, margin: "10px 0 0", fontFamily: font, lineHeight: 1.5 }}>
                Un expert immobilier local vous rappelle pour realiser votre estimation et vous accompagner dans votre projet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section ref={stepsRef} style={{ padding: "64px 24px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{
          textAlign: "center", marginBottom: 44,
          opacity: stepsVisible ? 1 : 0,
          transform: stepsVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Simple & Rapide</p>
          <h2 style={{ fontFamily: displayFont, fontSize: "clamp(24px, 3.5vw, 36px)", color: COLORS.primary, margin: 0 }}>Comment ca marche</h2>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              flex: "1 1 200px", maxWidth: 240,
              background: COLORS.white, borderRadius: 18, padding: "28px 22px", textAlign: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)", border: `1px solid ${COLORS.gray200}`,
              opacity: stepsVisible ? 1 : 0,
              transform: stepsVisible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.6s ease ${i * 0.15}s`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px", color: COLORS.primary, fontSize: 15, fontWeight: 800, fontFamily: font,
              }}>{step.num}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.primary, marginBottom: 6, fontFamily: font }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: COLORS.gray400, margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "60px 0 80px", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 36, padding: "0 24px" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Ils nous font confiance</p>
          <h2 style={{ fontFamily: displayFont, fontSize: "clamp(22px, 3vw, 34px)", color: COLORS.primary, margin: "0 0 10px" }}>Ce que disent nos clients</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, alignItems: "center" }}>
            {[1,2,3,4,5].map(s => <StarIcon key={s} filled />)}
            <span style={{ fontSize: 14, color: COLORS.gray600, marginLeft: 8, fontFamily: font }}>4.9/5 — 50+ avis</span>
          </div>
        </div>
        <TestimonialsCarousel font={font} />
      </section>

      {/* TRUST */}
      <section style={{ padding: "0 24px 80px", maxWidth: 600, margin: "0 auto" }}>
        <div style={{ background: COLORS.white, borderRadius: 20, padding: "32px 28px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)", border: `1px solid ${COLORS.gray200}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <ShieldIcon />
            <h3 style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: COLORS.primary, margin: 0 }}>Nos engagements</h3>
          </div>
          {[
            { title: "100% gratuit et sans engagement", desc: "Aucun frais cache, aucune obligation de vente." },
            { title: "Estimation par un expert local", desc: "Un professionnel qui connait le marche stephanois." },
            { title: "Donnees confidentielles", desc: "Vos informations ne sont jamais revendues. Conformite RGPD." },
            { title: "Reponse sous 24h", desc: "Un expert vous rappelle rapidement pour votre estimation." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < 3 ? `1px solid ${COLORS.gray100}` : "none" }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}><CheckIcon /></div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: COLORS.primary, margin: "0 0 2px", fontFamily: font }}>{item.title}</p>
                <p style={{ fontSize: 13, color: COLORS.gray400, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.primary, padding: "36px 24px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${COLORS.accent}`, position: "relative" }}>
            <div style={{ position: "absolute", top: "20%", left: "20%", width: 7, height: 7, borderRadius: 2, background: COLORS.accent }} />
            <div style={{ position: "absolute", bottom: "16%", right: "16%", width: 4, height: 4, borderRadius: "50%", background: COLORS.success }} />
          </div>
          <span style={{ fontFamily: "'Outfit', sans-serif", color: COLORS.white, fontSize: 16, fontWeight: 700 }}>
            Prez<span style={{ color: COLORS.accent }}>imo</span>
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginBottom: 14 }}>2026 Prezimo — Tous droits reserves</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          <button onClick={() => setShowLegal(true)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 11, cursor: "pointer", fontFamily: font, textDecoration: "underline" }}>Mentions legales</button>
          <button onClick={() => setShowPrivacy(true)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 11, cursor: "pointer", fontFamily: font, textDecoration: "underline" }}>Politique de confidentialite</button>
        </div>
      </footer>

      {/* COOKIE BANNER discret */}
      {showCookies && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
          background: "rgba(15,29,53,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
        }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: font, margin: 0 }}>
            Ce site utilise des cookies pour mesurer les performances.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowCookies(false)} style={{ padding: "4px 14px", borderRadius: 6, background: COLORS.accent, border: "none", color: COLORS.primary, fontSize: 11, fontWeight: 700, fontFamily: font, cursor: "pointer" }}>OK</button>
            <button onClick={() => setShowCookies(false)} style={{ padding: "4px 14px", borderRadius: 6, background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: font, cursor: "pointer" }}>Refuser</button>
          </div>
        </div>
      )}

      {/* MODAL MENTIONS LEGALES */}
      {showLegal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowLegal(false)}>
          <div style={{ background: COLORS.white, borderRadius: 16, padding: "32px 28px", maxWidth: 560, width: "100%", maxHeight: "80vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: displayFont, fontSize: 22, color: COLORS.primary, marginBottom: 16 }}>Mentions legales</h2>
            <div style={{ fontSize: 13, color: COLORS.gray600, lineHeight: 1.7, fontFamily: font }}>
              <p><strong>Editeur :</strong> Prezimo — Service d'estimation immobiliere en ligne.</p>
              <p><strong>Responsable :</strong> [Votre nom complet]</p>
              <p><strong>Adresse :</strong> [Votre adresse]</p>
              <p><strong>Email :</strong> contact@prezimo.fr</p>
              <p><strong>Hebergeur :</strong> Vercel Inc. — https://vercel.com</p>
              <p><strong>SIRET :</strong> [Votre numero SIRET]</p>
            </div>
            <button onClick={() => setShowLegal(false)} style={{ marginTop: 20, padding: "10px 24px", borderRadius: 8, background: COLORS.primary, border: "none", color: COLORS.white, fontSize: 13, fontWeight: 600, fontFamily: font, cursor: "pointer" }}>Fermer</button>
          </div>
        </div>
      )}

      {/* MODAL CONFIDENTIALITE */}
      {showPrivacy && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowPrivacy(false)}>
          <div style={{ background: COLORS.white, borderRadius: 16, padding: "32px 28px", maxWidth: 560, width: "100%", maxHeight: "80vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: displayFont, fontSize: 22, color: COLORS.primary, marginBottom: 16 }}>Politique de confidentialite</h2>
            <div style={{ fontSize: 13, color: COLORS.gray600, lineHeight: 1.7, fontFamily: font }}>
              <p><strong>Derniere mise a jour :</strong> Mai 2026</p>
              <h3 style={{ fontSize: 15, color: COLORS.primary, marginTop: 16, marginBottom: 6 }}>1. Donnees collectees</h3>
              <p>Prenom, nom, telephone, email, type de bien, ville, delai de vente.</p>
              <h3 style={{ fontSize: 15, color: COLORS.primary, marginTop: 16, marginBottom: 6 }}>2. Finalite</h3>
              <p>Mise en relation avec un professionnel immobilier pour une estimation gratuite.</p>
              <h3 style={{ fontSize: 15, color: COLORS.primary, marginTop: 16, marginBottom: 6 }}>3. Base legale</h3>
              <p>Consentement de l'utilisateur (article 6.1.a du RGPD).</p>
              <h3 style={{ fontSize: 15, color: COLORS.primary, marginTop: 16, marginBottom: 6 }}>4. Destinataires</h3>
              <p>Agent immobilier partenaire de votre secteur. Jamais revendues a des tiers.</p>
              <h3 style={{ fontSize: 15, color: COLORS.primary, marginTop: 16, marginBottom: 6 }}>5. Conservation</h3>
              <p>12 mois maximum.</p>
              <h3 style={{ fontSize: 15, color: COLORS.primary, marginTop: 16, marginBottom: 6 }}>6. Vos droits</h3>
              <p>Acces, rectification, suppression : contact@prezimo.fr</p>
              <h3 style={{ fontSize: 15, color: COLORS.primary, marginTop: 16, marginBottom: 6 }}>7. Reclamation</h3>
              <p>CNIL : www.cnil.fr</p>
            </div>
            <button onClick={() => setShowPrivacy(false)} style={{ marginTop: 20, padding: "10px 24px", borderRadius: 8, background: COLORS.primary, border: "none", color: COLORS.white, fontSize: 13, fontWeight: 600, fontFamily: font, cursor: "pointer" }}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
