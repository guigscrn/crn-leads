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

const ProgressBar = ({ step, total }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
    <div style={{ flex: 1, height: 5, borderRadius: 3, background: COLORS.gray200, overflow: "hidden" }}>
      <div style={{
        width: `${(step / total) * 100}%`,
        height: "100%",
        borderRadius: 3,
        background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentHover})`,
        transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
    <span style={{ fontSize: 12, color: COLORS.gray400, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>
      Étape {step}/{total}
    </span>
  </div>
);

export default function CRNLeadsLanding() {
  const [formStep, setFormStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    typeBien: "",
    ville: "",
    delai: "",
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [heroVisible, setHeroVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const formRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    // Meta Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', '800182638159222');
    window.fbq('track', 'PageView');

    setTimeout(() => setHeroVisible(true), 100);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setStepsVisible(true); }); },
      { threshold: 0.2 }
    );
    if (stepsRef.current) observer.observe(stepsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.typeBien) newErrors.typeBien = "Sélectionnez un type de bien";
      if (!formData.ville.trim()) newErrors.ville = "Indiquez votre ville ou quartier";
    } else if (step === 2) {
      if (!formData.delai) newErrors.delai = "Sélectionnez un délai";
    } else if (step === 3) {
      if (!formData.prenom.trim()) newErrors.prenom = "Requis";
      if (!formData.nom.trim()) newErrors.nom = "Requis";
      if (!formData.telephone.trim()) newErrors.telephone = "Requis";
      else if (!/^[\d\s+]{10,}$/.test(formData.telephone.trim())) newErrors.telephone = "Numéro invalide";
      if (!formData.email.trim()) newErrors.email = "Requis";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [sending, setSending] = useState(false);

  const nextStep = async () => {
    if (validateStep(formStep)) {
      if (formStep === 3) {
        setSending(true);
        try {
          // Create a hidden form that submits to an iframe (bypasses CORS)
          const iframe = document.createElement("iframe");
          iframe.name = "hidden_iframe";
          iframe.style.display = "none";
          document.body.appendChild(iframe);

          const form = document.createElement("form");
          form.method = "POST";
          form.action = "https://hook.eu1.make.com/w1ckb67cots00k4txhc1tmofpmyy7ti3";
          form.target = "hidden_iframe";

          const fields = {
            prenom: formData.prenom,
            nom: formData.nom,
            telephone: formData.telephone,
            email: formData.email,
            type_bien: formData.typeBien,
            ville: formData.ville,
            delai: formData.delai,
            source: "landing-page-saint-etienne",
            date: new Date().toISOString(),
          };

          Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();

          // Cleanup after a short delay
          setTimeout(() => {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
          }, 2000);
        } catch (e) {
          // silently continue
        }
        setSending(false);
        // Track Lead event for Meta Pixel
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'estimation-saint-etienne',
            content_category: 'vendeur',
          });
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
      flex: 1,
      minWidth: 100,
      padding: "18px 12px",
      border: `2px solid ${selected ? COLORS.accent : COLORS.gray200}`,
      borderRadius: 14,
      background: selected ? COLORS.accentSoft : COLORS.white,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      transition: "all 0.25s ease",
      color: selected ? COLORS.primary : COLORS.gray600,
      boxShadow: selected ? `0 0 0 1px ${COLORS.accent}` : "none",
    }}>
      {icon}
      <span style={{ fontSize: 14, fontWeight: 600, fontFamily: font }}>{label}</span>
    </button>
  );

  const DelayButton = ({ value, label, selected }) => (
    <button onClick={() => setFormData({ ...formData, delai: value })} style={{
      width: "100%",
      padding: "15px 20px",
      border: `2px solid ${selected ? COLORS.accent : COLORS.gray200}`,
      borderRadius: 12,
      background: selected ? COLORS.accentSoft : COLORS.white,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: selected ? 600 : 500,
      fontFamily: font,
      color: selected ? COLORS.primary : COLORS.gray600,
      textAlign: "left",
      transition: "all 0.25s ease",
      boxShadow: selected ? `0 0 0 1px ${COLORS.accent}` : "none",
    }}>
      {label}
    </button>
  );

  const renderInput = (label, name, type = "text", placeholder, half) => (
    <div key={name} style={{ flex: half ? "1 1 45%" : "1 1 100%", minWidth: half ? 140 : "auto" }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.gray800, marginBottom: 6, fontFamily: font }}>
        {label}
      </label>
      <input
        key={`input-${name}`}
        type={type}
        value={formData[name]}
        onChange={(e) => { setFormData(prev => ({ ...prev, [name]: e.target.value })); setErrors(prev => ({ ...prev, [name]: "" })); }}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "14px 16px",
          border: `2px solid ${errors[name] ? "#E53E3E" : COLORS.gray200}`,
          borderRadius: 10,
          fontSize: 15,
          fontFamily: font,
          color: COLORS.gray800,
          background: COLORS.white,
          outline: "none",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.target.style.borderColor = COLORS.accent; }}
        onBlur={(e) => { if (!errors[name]) e.target.style.borderColor = COLORS.gray200; }}
      />
      {errors[name] && <span style={{ fontSize: 12, color: "#E53E3E", marginTop: 4, display: "block", fontFamily: font }}>{errors[name]}</span>}
    </div>
  );

  const CTAButton = ({ children, onClick, secondary, fullWidth, style: extraStyle }) => (
    <button onClick={onClick} style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: secondary ? "14px 28px" : "16px 36px",
      background: secondary ? "transparent" : `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
      color: secondary ? COLORS.gray600 : COLORS.primary,
      border: secondary ? `2px solid ${COLORS.gray200}` : "none",
      borderRadius: 12,
      fontSize: secondary ? 14 : 16,
      fontWeight: 700,
      fontFamily: font,
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: secondary ? "none" : "0 4px 20px rgba(212, 167, 44, 0.35)",
      width: fullWidth ? "100%" : "auto",
      letterSpacing: 0.3,
      ...extraStyle,
    }}>
      {children}
    </button>
  );

  if (submitted) {
    return (
      <div style={{ fontFamily: font, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.offWhite, padding: 20 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <div style={{
          background: COLORS.white,
          borderRadius: 24,
          padding: "48px 40px",
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: COLORS.successSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18L15 25L28 12" stroke={COLORS.success} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: displayFont, fontSize: 28, color: COLORS.primary, marginBottom: 12 }}>
            Demande envoyée !
          </h2>
          <p style={{ fontSize: 16, color: COLORS.gray600, lineHeight: 1.6, marginBottom: 8 }}>
            Merci <strong style={{ color: COLORS.primary }}>{formData.prenom}</strong>. Un expert immobilier vous contactera dans les <strong style={{ color: COLORS.primary }}>24 heures</strong> pour vous communiquer l'estimation de votre bien.
          </p>
          <div style={{ marginTop: 24, padding: "16px 20px", background: COLORS.accentSoft, borderRadius: 12, border: `1px solid ${COLORS.accent}22` }}>
            <p style={{ fontSize: 14, color: COLORS.gray600, margin: 0 }}>
              Vous souhaitez accélérer ? Appelez-nous au <strong style={{ color: COLORS.primary }}>04 XX XX XX XX</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderFormContent = () => {
    if (formStep === 0) return null;

    if (formStep === 1) {
      return (
        <div>
          <h3 style={{ fontFamily: displayFont, fontSize: 22, color: COLORS.primary, marginBottom: 6 }}>Votre bien</h3>
          <p style={{ fontSize: 14, color: COLORS.gray400, marginBottom: 24 }}>Quel type de bien souhaitez-vous vendre ?</p>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <ChoiceButton selected={formData.typeBien === "appartement"} onClick={() => { setFormData({ ...formData, typeBien: "appartement" }); setErrors({ ...errors, typeBien: "" }); }} icon={<BuildingIcon />} label="Appartement" />
            <ChoiceButton selected={formData.typeBien === "maison"} onClick={() => { setFormData({ ...formData, typeBien: "maison" }); setErrors({ ...errors, typeBien: "" }); }} icon={<HouseIcon />} label="Maison" />
            <ChoiceButton selected={formData.typeBien === "autre"} onClick={() => { setFormData({ ...formData, typeBien: "autre" }); setErrors({ ...errors, typeBien: "" }); }} icon={<OtherIcon />} label="Autre" />
          </div>
          {errors.typeBien && <p style={{ fontSize: 12, color: "#E53E3E", fontFamily: font }}>{errors.typeBien}</p>}
          {renderInput("Ville / Quartier", "ville", "text", "Ex : Saint-Étienne centre, Firminy, Montreynaud...")}
        </div>
      );
    }

    if (formStep === 2) {
      return (
        <div>
          <h3 style={{ fontFamily: displayFont, fontSize: 22, color: COLORS.primary, marginBottom: 6 }}>Votre projet</h3>
          <p style={{ fontSize: 14, color: COLORS.gray400, marginBottom: 24 }}>Dans quel délai souhaitez-vous vendre ?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <DelayButton value="<3mois" label="Moins de 3 mois" selected={formData.delai === "<3mois"} />
            <DelayButton value="3-6mois" label="3 à 6 mois" selected={formData.delai === "3-6mois"} />
            <DelayButton value=">6mois" label="Plus de 6 mois" selected={formData.delai === ">6mois"} />
            <DelayButton value="renseigne" label="Je me renseigne simplement" selected={formData.delai === "renseigne"} />
          </div>
          {errors.delai && <p style={{ fontSize: 12, color: "#E53E3E", fontFamily: font, marginTop: 8 }}>{errors.delai}</p>}
        </div>
      );
    }

    if (formStep === 3) {
      return (
        <div>
          <h3 style={{ fontFamily: displayFont, fontSize: 22, color: COLORS.primary, marginBottom: 6 }}>Vos coordonnées</h3>
          <p style={{ fontSize: 14, color: COLORS.gray400, marginBottom: 24 }}>Où souhaitez-vous recevoir votre estimation ?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {renderInput("Prénom", "prenom", "text", "Jean", true)}
            {renderInput("Nom", "nom", "text", "Dupont", true)}
            {renderInput("Téléphone", "telephone", "tel", "06 12 34 56 78")}
            {renderInput("Email", "email", "email", "jean.dupont@email.com")}
          </div>
        </div>
      );
    }
  };

  const steps = [
    { num: "01", title: "Formulaire", desc: "Remplissez en 30 secondes" },
    { num: "02", title: "Analyse", desc: "Un expert étudie votre bien" },
    { num: "03", title: "Estimation", desc: "Résultat sous 24h" },
  ];

  const trustItems = [
    "100% gratuit et sans engagement",
    "Estimation par un professionnel local",
    "Vos données restent confidentielles",
  ];

  return (
    <div style={{ fontFamily: font, background: COLORS.offWhite, minHeight: "100vh", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(15, 29, 53, 0.95)",
        backdropFilter: "blur(12px)",
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ color: COLORS.primary, fontWeight: 800, fontSize: 14, fontFamily: font }}>C</span>
          </div>
          <span style={{ color: COLORS.white, fontSize: 17, fontWeight: 700, letterSpacing: 1.5 }}>
            CRN <span style={{ color: COLORS.accent }}>LEADS</span>
          </span>
        </div>
        <button onClick={scrollToForm} style={{
          padding: "8px 20px",
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
          border: "none",
          borderRadius: 8,
          color: COLORS.primary,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: font,
          cursor: "pointer",
          letterSpacing: 0.3,
        }}>
          Estimer mon bien
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(165deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 50%, #243352 100%)`,
        padding: "80px 24px 60px",
        overflow: "hidden",
      }}>
        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(212,167,44,0.08) 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(212,167,44,0.05) 0%, transparent 70%)`,
        }} />
        <div style={{
          position: "absolute",
          top: "15%",
          left: "8%",
          width: 1,
          height: 120,
          background: `linear-gradient(to bottom, transparent, ${COLORS.accent}33, transparent)`,
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          right: "12%",
          width: 1,
          height: 80,
          background: `linear-gradient(to bottom, transparent, ${COLORS.accent}22, transparent)`,
        }} />

        <div style={{
          maxWidth: 680,
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(212, 167, 44, 0.1)",
            border: "1px solid rgba(212, 167, 44, 0.2)",
            borderRadius: 100,
            padding: "8px 18px",
            marginBottom: 28,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.success, boxShadow: `0 0 8px ${COLORS.success}` }} />
            <span style={{ fontSize: 13, color: COLORS.accentHover, fontWeight: 600, letterSpacing: 0.5 }}>
              Saint-Étienne & alentours
            </span>
          </div>

          <h1 style={{
            fontFamily: displayFont,
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            color: COLORS.white,
            lineHeight: 1.15,
            margin: "0 0 20px",
            letterSpacing: -0.5,
          }}>
            Vendez votre bien au{" "}
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              meilleur prix
            </span>
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            margin: "0 0 36px",
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Recevez une estimation gratuite de votre bien en 24h par un expert immobilier local.
          </p>

          <CTAButton onClick={() => { setFormStep(1); setTimeout(scrollToForm, 100); }}>
            Estimer mon bien gratuitement <ArrowRight />
          </CTAButton>

          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 32, flexWrap: "wrap" }}>
            {trustItems.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CheckIcon />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section ref={stepsRef} style={{
        padding: "72px 24px",
        maxWidth: 800,
        margin: "0 auto",
      }}>
        <div style={{
          textAlign: "center",
          marginBottom: 48,
          opacity: stepsVisible ? 1 : 0,
          transform: stepsVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
            Simple & Rapide
          </p>
          <h2 style={{ fontFamily: displayFont, fontSize: "clamp(24px, 3.5vw, 36px)", color: COLORS.primary, margin: 0 }}>
            Comment ça marche
          </h2>
        </div>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              flex: "1 1 200px",
              maxWidth: 240,
              background: COLORS.white,
              borderRadius: 18,
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              border: `1px solid ${COLORS.gray200}`,
              opacity: stepsVisible ? 1 : 0,
              transform: stepsVisible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.6s ease ${i * 0.15}s`,
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentHover})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: COLORS.primary,
                fontSize: 16,
                fontWeight: 800,
                fontFamily: font,
              }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.primary, marginBottom: 6, fontFamily: font }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: COLORS.gray400, margin: 0, lineHeight: 1.5 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM SECTION */}
      <section ref={formRef} style={{
        padding: "60px 24px 80px",
        maxWidth: 560,
        margin: "0 auto",
      }}>
        {formStep > 0 && (
          <div style={{
            background: COLORS.white,
            borderRadius: 24,
            padding: "36px 32px 32px",
            boxShadow: "0 12px 48px rgba(0,0,0,0.06)",
            border: `1px solid ${COLORS.gray200}`,
          }}>
            <ProgressBar step={formStep} total={3} />

            {renderFormContent()}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 12 }}>
              {formStep > 1 && (
                <CTAButton secondary onClick={prevStep}>Retour</CTAButton>
              )}
              <CTAButton fullWidth={formStep === 1} onClick={nextStep} style={{ marginLeft: formStep === 1 ? 0 : "auto" }}>
                {sending ? "Envoi en cours..." : formStep === 3 ? "Recevoir mon estimation gratuite" : "Continuer"} {!sending && <ArrowRight />}
              </CTAButton>
            </div>
          </div>
        )}

        {formStep === 0 && (
          <div style={{ textAlign: "center" }}>
            <CTAButton onClick={() => { setFormStep(1); }}>
              Estimer mon bien gratuitement <ArrowRight />
            </CTAButton>
          </div>
        )}
      </section>

      {/* TRUST SECTION */}
      <section style={{
        padding: "60px 24px 80px",
        maxWidth: 600,
        margin: "0 auto",
      }}>
        <div style={{
          background: COLORS.white,
          borderRadius: 20,
          padding: "36px 32px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          border: `1px solid ${COLORS.gray200}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <ShieldIcon />
            <h3 style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: COLORS.primary, margin: 0 }}>
              Nos engagements
            </h3>
          </div>
          {[
            { title: "100% gratuit et sans engagement", desc: "Aucun frais caché, aucune obligation de vente." },
            { title: "Estimation par un expert local", desc: "Un professionnel qui connaît le marché stéphanois." },
            { title: "Données confidentielles", desc: "Vos informations ne sont jamais revendues. Conformité RGPD." },
            { title: "Réponse sous 24h", desc: "Un expert vous rappelle rapidement pour votre estimation." },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex",
              gap: 14,
              padding: "14px 0",
              borderBottom: i < 3 ? `1px solid ${COLORS.gray100}` : "none",
            }}>
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
      <footer style={{
        background: COLORS.primary,
        padding: "32px 24px",
        textAlign: "center",
      }}>
        <span style={{ color: COLORS.accent, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, fontFamily: font }}>
          CRN LEADS
        </span>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 8 }}>
          © 2026 CRN Leads — Tous droits réservés
        </p>
      </footer>
    </div>
  );
}
