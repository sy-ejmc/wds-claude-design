/* global React */
const { useState } = React;

// Tokens from colors_and_type.css — all values via CSS vars.
const T = {
  // colors
  primaryNormal: "var(--color-primary-normal)",   // green-500 #18A19A
  primaryLight:  "var(--color-primary-light)",
  primaryStrong: "var(--color-primary-strong)",
  primaryHeavy:  "var(--color-primary-heavy)",
  bgWhite:       "var(--color-bg-white)",
  bg50:          "var(--color-bg-50)",
  bg100:         "var(--color-bg-100)",
  labelStrong:   "var(--color-label-strong)",
  labelNormal:   "var(--color-label-normal)",
  labelNeutral:  "var(--color-label-neutral)",
  labelAlt:      "var(--color-label-alternative)",
  labelAssist:   "var(--color-label-assistive)",
  labelDisabled: "var(--color-label-disable)",
  labelWhite:    "var(--color-label-white)",
  fillNormal:    "var(--color-fill-normal)",
  fillAlt:       "var(--color-fill-alternative)",
  fillStrong:    "var(--color-fill-strong)",
  line:          "var(--color-line-normal)",
  error:         "var(--color-status-error)",
  disableBg:     "var(--color-interaction-disable)",
  // font
  family:        "var(--font-family)",
  // radii / spacing
  rS: "var(--radius-s)", rM: "var(--radius-m)", rFull: "var(--radius-full)",
};

// ============ BUTTON (mirrors packages/ui/src/Button.tsx) ============
function Button({ variant = "primary", onClick, disabled, children, full, size = "md" }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pad = size === "lg" ? { pb: "14px", pi: "28px", fs: "var(--font-size-lg)", lh: "var(--line-height-lg)" }
                            : { pb: "var(--padding-xs)", pi: "var(--padding-l)", fs: "var(--font-size-md)", lh: "var(--line-height-md)" };
  const isPrimary = variant === "primary";
  const bg = isPrimary
    ? (hover || press ? T.primaryStrong : T.primaryNormal)
    : (hover || press ? T.fillAlt : T.bgWhite);
  const border = isPrimary ? bg : T.line;
  const color = isPrimary ? T.labelWhite : T.labelNormal;
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: full ? "100%" : "auto",
        paddingBlock: pad.pb, paddingInline: pad.pi,
        fontFamily: T.family,
        fontSize: pad.fs, lineHeight: pad.lh, fontWeight: 500, letterSpacing: 0,
        borderRadius: T.rM, border: `1px solid ${border}`,
        background: bg, color,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transform: press && !disabled ? "scale(0.985)" : "scale(1)",
        transition: "background 150ms ease-out, transform 80ms ease-out",
      }}
    >{children}</button>
  );
}

// ============ INPUT ============
function TextField({ label, value, onChange, placeholder, type = "text", hint, error }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: "var(--font-size-md)", fontWeight: 500, color: T.labelNormal }}>{label}</label>}
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: T.family, fontSize: "var(--font-size-md)", lineHeight: "var(--line-height-md)",
          padding: "12px 14px",
          border: `1.5px solid ${error ? T.error : focus ? T.primaryNormal : T.line}`,
          borderRadius: T.rS, background: T.bgWhite, color: T.labelNormal, outline: "none",
          transition: "border-color 150ms ease-out",
        }}
      />
      {hint && !error && <div style={{ fontSize: "var(--font-size-sm)", color: T.labelAlt }}>{hint}</div>}
      {error && <div style={{ fontSize: "var(--font-size-sm)", color: T.error }}>{error}</div>}
    </div>
  );
}

// ============ CARD ============
function Card({ children, padding = "var(--padding-l)", tinted, style }) {
  return (
    <div style={{
      background: tinted ? T.primaryLight : T.bgWhite,
      border: `1px solid ${tinted ? T.primaryNormal : T.line}`,
      borderRadius: T.rM, padding,
      ...style,
    }}>{children}</div>
  );
}

// ============ ICON ============
function Icon({ name, size = 24, color = "currentColor" }) {
  return <i data-lucide={name} style={{ width: size, height: size, color, display: "inline-flex" }}></i>;
}

// ============ SCALE SWITCHER (DS-C3) ============
function ScaleSwitcher({ scale, setScale }) {
  const options = [
    { id: "normal", label: "일반 보기" },
    { id: "large", label: "크게 보기" },
    { id: "x-large", label: "더 크게 보기" },
  ];
  return (
    <div style={{ display: "flex", border: `1px solid ${T.line}`, borderRadius: T.rS, overflow: "hidden", background: T.bgWhite }}>
      {options.map((o, i) => (
        <button key={o.id} onClick={() => setScale(o.id)}
          style={{
            flex: 1, padding: "10px 12px", border: "none", cursor: "pointer",
            background: scale === o.id ? T.primaryNormal : T.bgWhite,
            color: scale === o.id ? T.labelWhite : T.labelNormal,
            fontFamily: T.family, fontSize: "var(--font-size-sm)", fontWeight: 500,
            borderRight: i < options.length - 1 ? `1px solid ${T.line}` : "none",
          }}>{o.label}</button>
      ))}
    </div>
  );
}

// ============ TOP BAR ============
function TopBar({ title, onBack, right }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "16px 20px", background: T.bgWhite,
      borderBottom: `1px solid ${T.line}`, minHeight: 64,
    }}>
      {onBack && (
        <button onClick={onBack} aria-label="뒤로" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 44, height: 44, borderRadius: T.rFull, border: "none", background: "transparent", cursor: "pointer", color: T.labelNormal
        }}><Icon name="chevron-left" size={28} /></button>
      )}
      <div style={{ fontSize: "var(--font-size-xl)", fontWeight: 600, color: T.labelNormal, flex: 1 }}>{title}</div>
      {right}
    </div>
  );
}

// ============ BOTTOM NAV ============
function BottomNav({ current, onChange }) {
  const tabs = [
    { id: "home", label: "홈", icon: "home" },
    { id: "family", label: "가족", icon: "users" },
    { id: "health", label: "건강", icon: "heart" },
    { id: "settings", label: "설정", icon: "settings" },
  ];
  return (
    <div style={{ display: "flex", borderTop: `1px solid ${T.line}`, background: T.bgWhite }}>
      {tabs.map(t => {
        const active = t.id === current;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{
              flex: 1, padding: "12px 8px 16px", border: "none", background: "transparent",
              cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4,
              color: active ? T.primaryNormal : T.labelAlt,
              fontFamily: T.family, fontSize: "var(--font-size-sm)", fontWeight: active ? 600 : 500,
            }}>
            <Icon name={t.icon} size={26} color={active ? "var(--color-primary-normal)" : "var(--color-label-alternative)"} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============ LIST ITEM ============
function ListItem({ icon, title, subtitle, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 16, width: "100%",
      padding: "16px 20px", border: "none", background: T.bgWhite,
      borderBottom: `1px solid ${T.line}`, cursor: onClick ? "pointer" : "default",
      textAlign: "left", fontFamily: T.family,
    }}>
      {icon && (
        <div style={{
          width: 44, height: 44, borderRadius: T.rFull,
          background: accent ? T.primaryLight : T.fillNormal,
          color: accent ? "var(--color-primary-strong)" : "var(--color-label-neutral)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}><Icon name={icon} size={22} /></div>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "var(--font-size-lg)", fontWeight: 500, color: T.labelNormal }}>{title}</div>
        {subtitle && <div style={{ fontSize: "var(--font-size-sm)", color: T.labelAlt, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {onClick && <Icon name="chevron-right" size={22} color="var(--color-label-assistive)" />}
    </button>
  );
}

Object.assign(window, { Button, TextField, Card, Icon, ScaleSwitcher, TopBar, BottomNav, ListItem });
