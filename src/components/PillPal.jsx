/*
  PillPal, the mascot.

  The art comes from the brand and pose sheets. Every pose is drawn on the same
  200x240 viewBox with the same capsule, so the character stays recognisably
  itself from one pose to the next.

  Colours here are the literal brand hexes rather than theme tokens. PillPal is
  a character, not a UI surface: he is the same teal capsule in light mode and
  dark mode, the way a logo is. The one thing that does adapt is the eyes, which
  are near black and would sink into the dark surface, so they pick up a lighter
  fill through CSS. See the .pillpal-eye rule in index.css.

  Rules from the PRD that outlive any redesign: PillPal carries warmth, never
  gives advice, and never appears beside a disclaimer, so friendliness is never
  read as medical reassurance.
*/

/*
  Scale rules from the brand sheet. The detail work is drawn for a large mark
  and turns to mud when it is shrunk, so small sizes drop it progressively
  rather than rendering a smudge:

    below 24px  no cheeks, no shine, no eye highlights
    at 16px     no mouth either, just the capsule and two eyes

  The detail lives in its own group so a single rule can hide the lot.
*/
const DETAIL_HIDDEN_BELOW = 24
const MOUTH_HIDDEN_AT_OR_BELOW = 16

const POSES = {
  waving: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M78,114 Q100,135 122,114" stroke="#3B8FA5" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Left arm relaxed */}
      <line x1="68" y1="100" x2="46" y2="128" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="43" cy="132" r="9" fill="#4A9FB5"/>
      {/* Right arm raised waving */}
      <line x1="132" y1="88" x2="172" y2="50" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="175" cy="46" r="9" fill="#4A9FB5"/>
      <line x1="181" y1="38" x2="191" y2="30" stroke="#4A9FB5" strokeWidth="3" strokeLinecap="round"/>
      <line x1="183" y1="49" x2="195" y2="45" stroke="#4A9FB5" strokeWidth="3" strokeLinecap="round"/>
      <line x1="179" y1="57" x2="190" y2="58" stroke="#4A9FB5" strokeWidth="2.5" strokeLinecap="round"/>
    </>
  ),
  thumbsUp: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M78,114 Q100,135 122,114" stroke="#3B8FA5" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Left arm relaxed */}
      <line x1="68" y1="100" x2="48" y2="126" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="45" cy="130" r="9" fill="#4A9FB5"/>
      {/* Right arm + fist + thumb */}
      <line x1="132" y1="100" x2="166" y2="114" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <rect x="160" y="108" width="18" height="20" rx="6" fill="#4A9FB5"/>
      <line x1="165" y1="108" x2="165" y2="87" stroke="#4A9FB5" strokeWidth="11" strokeLinecap="round"/>
      <ellipse cx="165" cy="86" rx="7" ry="8" fill="#4A9FB5"/>
    </>
  ),
  holdingClipboard: (
    <>
      <ellipse cx="100" cy="215" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M87,120 Q100,128 113,120" stroke="#3B8FA5" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Arms holding clipboard */}
      <line x1="68" y1="104" x2="76" y2="156" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <line x1="132" y1="104" x2="124" y2="156" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      {/* Clipboard */}
      <rect x="68" y="148" width="64" height="76" rx="5" fill="#F0F8FB" stroke="#B0CDD8" strokeWidth="1.5"/>
      <rect x="68" y="148" width="64" height="18" rx="5" fill="#4A9FB5"/>
      <rect x="85" y="144" width="30" height="11" rx="4" fill="#3B8FA5"/>
      <line x1="78" y1="178" x2="122" y2="178" stroke="#B0CDD8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="78" y1="188" x2="122" y2="188" stroke="#B0CDD8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="78" y1="198" x2="108" y2="198" stroke="#B0CDD8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="78" y1="208" x2="115" y2="208" stroke="#B0CDD8" strokeWidth="2" strokeLinecap="round"/>
    </>
  ),
  pointing: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M84,116 Q100,132 116,116" stroke="#3B8FA5" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Left arm relaxed */}
      <line x1="68" y1="100" x2="48" y2="126" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="45" cy="130" r="9" fill="#4A9FB5"/>
      {/* Right arm pointing far right */}
      <line x1="132" y1="92" x2="184" y2="90" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="188" cy="90" r="9" fill="#4A9FB5"/>
      {/* Pointing finger */}
      <line x1="190" y1="90" x2="199" y2="90" stroke="#4A9FB5" strokeWidth="7" strokeLinecap="round"/>
    </>
  ),
  thinking: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M88,120 Q100,126 112,120" stroke="#3B8FA5" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Thought bubble */}
      <circle cx="148" cy="34" r="12" fill="white" stroke="#D6EEF4" strokeWidth="1.5" opacity="0.9"/>
      <circle cx="140" cy="48" r="7" fill="white" stroke="#D6EEF4" strokeWidth="1.5" opacity="0.9"/>
      <circle cx="134" cy="58" r="4" fill="white" stroke="#D6EEF4" strokeWidth="1.5" opacity="0.9"/>
      <text x="148" y="39" textAnchor="middle" fontSize="11" fill="#8AABB8" fontWeight="900" fontFamily="var(--font-sans)">?</text>
      {/* Left arm crossed/relaxed */}
      <line x1="68" y1="100" x2="50" y2="124" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="47" cy="128" r="9" fill="#4A9FB5"/>
      {/* Right arm up to chin */}
      <line x1="132" y1="96" x2="112" y2="80" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="108" cy="76" r="9" fill="#4A9FB5"/>
    </>
  ),
  reading: (
    <>
      <ellipse cx="100" cy="215" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M88,120 Q100,127 112,120" stroke="#3B8FA5" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Arms holding document */}
      <line x1="68" y1="104" x2="74" y2="158" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <line x1="132" y1="104" x2="126" y2="158" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      {/* Document */}
      <rect x="68" y="150" width="64" height="78" rx="5" fill="white" stroke="#B0CDD8" strokeWidth="1.5"/>
      <line x1="78" y1="165" x2="122" y2="165" stroke="#C0D8E4" strokeWidth="2" strokeLinecap="round"/>
      <line x1="78" y1="175" x2="122" y2="175" stroke="#C0D8E4" strokeWidth="2" strokeLinecap="round"/>
      <line x1="78" y1="185" x2="118" y2="185" stroke="#C0D8E4" strokeWidth="2" strokeLinecap="round"/>
      <line x1="78" y1="195" x2="122" y2="195" stroke="#C0D8E4" strokeWidth="2" strokeLinecap="round"/>
      <line x1="78" y1="205" x2="110" y2="205" stroke="#C0D8E4" strokeWidth="2" strokeLinecap="round"/>
    </>
  ),
  talking: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      {/* Open mouth */}
      <ellipse className="pillpal-mouth pillpal-eye" cx="100" cy="121" rx="10" ry="8" fill="#1C3D4A" opacity="0.75"/>
      <ellipse className="pillpal-mouth" cx="100" cy="120" rx="7" ry="4.5" fill="white" opacity="0.15"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Left arm relaxed */}
      <line x1="68" y1="100" x2="50" y2="126" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="47" cy="130" r="9" fill="#4A9FB5"/>
      {/* Right arm raised gesture */}
      <line x1="132" y1="88" x2="168" y2="58" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="171" cy="55" r="9" fill="#4A9FB5"/>
      {/* Speech dot lines */}
      <circle cx="24" cy="60" r="3.5" fill="#D6EEF4"/>
      <circle cx="34" cy="50" r="5" fill="#D6EEF4"/>
      <circle cx="46" cy="42" r="7" fill="#D6EEF4"/>
    </>
  ),
  reassuring: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M82,116 Q100,134 118,116" stroke="#3B8FA5" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.28"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.28"/>
      {/* Both arms open wide, gentle angle */}
      <line x1="68" y1="94" x2="32" y2="110" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="28" cy="113" r="9" fill="#4A9FB5"/>
      <line x1="132" y1="94" x2="168" y2="110" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="172" cy="113" r="9" fill="#4A9FB5"/>
      {/* Soft glow rings */}
      <circle cx="100" cy="130" r="46" fill="none" stroke="#4A9FB5" strokeWidth="1" opacity="0.12"/>
      <circle cx="100" cy="130" r="58" fill="none" stroke="#4A9FB5" strokeWidth="1" opacity="0.07"/>
    </>
  ),
  celebrating: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M76,112 Q100,138 124,112" stroke="#3B8FA5" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.32"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.32"/>
      {/* Both arms raised high */}
      <line x1="68" y1="85" x2="33" y2="47" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="30" cy="43" r="9" fill="#4A9FB5"/>
      <line x1="132" y1="85" x2="167" y2="47" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="170" cy="43" r="9" fill="#4A9FB5"/>
      {/* Sparkles */}
      <line x1="18" y1="56" x2="18" y2="68" stroke="#C47A3A" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="12" y1="62" x2="24" y2="62" stroke="#C47A3A" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="14" y1="58" x2="22" y2="66" stroke="#C47A3A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="58" x2="14" y2="66" stroke="#C47A3A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="178" y1="30" x2="178" y2="40" stroke="#4A9FB5" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="173" y1="35" x2="183" y2="35" stroke="#4A9FB5" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="170" cy="72" r="3" fill="#C47A3A" opacity="0.7"/>
      <circle cx="30" cy="25" r="2.5" fill="#4A9FB5" opacity="0.7"/>
      <circle cx="185" cy="18" r="4" fill="#C47A3A" opacity="0.5"/>
      <circle cx="10" cy="40" r="2" fill="#4A9FB5" opacity="0.6"/>
    </>
  ),
  shrugging: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      {/* Raised eyebrows */}
      <path className="pillpal-eye-stroke" d="M79,57 Q86,52 93,57" stroke="#1C3D4A" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path className="pillpal-eye-stroke" d="M107,57 Q114,52 121,57" stroke="#1C3D4A" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Frown */}
      <path className="pillpal-mouth" d="M86,124 Q100,118 114,124" stroke="#3B8FA5" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.18"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.18"/>
      {/* Both arms raised to sides, shrug */}
      <line x1="68" y1="90" x2="32" y2="76" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="28" cy="74" r="9" fill="#4A9FB5"/>
      <line x1="132" y1="90" x2="168" y2="76" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="172" cy="74" r="9" fill="#4A9FB5"/>
    </>
  ),
  sitting: (
    <>
      {/* Bench */}
      <rect x="35" y="192" width="130" height="13" rx="6" fill="#D6EEF4"/>
      <rect x="35" y="192" width="130" height="5" rx="3" fill="#B0CDD8"/>
      {/* Legs */}
      <line x1="86" y1="165" x2="76" y2="192" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <line x1="114" y1="165" x2="124" y2="192" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <ellipse cx="100" cy="207" rx="40" ry="6" fill="#4A9FB5" opacity="0.08"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M84,116 Q100,132 116,116" stroke="#3B8FA5" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Arms resting on lap / knees */}
      <line x1="68" y1="102" x2="54" y2="134" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="52" cy="138" r="9" fill="#4A9FB5"/>
      <line x1="132" y1="102" x2="146" y2="134" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="148" cy="138" r="9" fill="#4A9FB5"/>
    </>
  ),
  magnifying: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M84,116 Q100,132 116,116" stroke="#3B8FA5" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Left arm relaxed */}
      <line x1="68" y1="100" x2="50" y2="126" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="47" cy="130" r="9" fill="#4A9FB5"/>
      {/* Right arm toward magnifying glass handle */}
      <line x1="132" y1="93" x2="164" y2="84" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      {/* Magnifying glass handle */}
      <line x1="185" y1="104" x2="166" y2="82" stroke="#3B8FA5" strokeWidth="8" strokeLinecap="round"/>
      {/* Magnifying glass lens */}
      <circle cx="175" cy="67" r="21" fill="white" fillOpacity="0.9" stroke="#3B8FA5" strokeWidth="4"/>
      <circle cx="175" cy="67" r="14" fill="#EAF6FA" fillOpacity="0.7"/>
      {/* Shine on glass */}
      <ellipse cx="168" cy="60" rx="5" ry="3" fill="white" opacity="0.6" transform="rotate(-30,168,60)"/>
      {/* Hand connecting arm to handle */}
      <circle cx="167" cy="85" r="9" fill="#4A9FB5"/>
    </>
  ),
  presentingChart: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M84,116 Q100,132 116,116" stroke="#3B8FA5" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Chart board (to the right, drawn first) */}
      <rect x="136" y="85" width="58" height="68" rx="5" fill="white" stroke="#C0D8E4" strokeWidth="1.5"/>
      {/* Chart bars */}
      <rect x="145" y="125" width="10" height="22" rx="2" fill="#4A9FB5"/>
      <rect x="158" y="115" width="10" height="32" rx="2" fill="#7EC8D8"/>
      <rect x="171" y="105" width="10" height="42" rx="2" fill="#C47A3A" opacity="0.8"/>
      {/* Chart baseline */}
      <line x1="142" y1="147" x2="184" y2="147" stroke="#C0D8E4" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Right arm pointing at chart */}
      <line x1="132" y1="95" x2="142" y2="106" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="145" cy="109" r="9" fill="#4A9FB5"/>
      {/* Pointer finger */}
      <line x1="148" y1="106" x2="152" y2="100" stroke="#4A9FB5" strokeWidth="7" strokeLinecap="round"/>
      {/* Left arm behind back (relaxed) */}
      <line x1="68" y1="100" x2="52" y2="128" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="49" cy="132" r="9" fill="#4A9FB5"/>
    </>
  ),
  sleeping: (
    <>
      <ellipse cx="100" cy="207" rx="30" ry="6" fill="#4A9FB5" opacity="0.10"/>
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      {/* Closed eyes */}
      <path className="pillpal-eye-stroke" d="M79,68 Q86,76 93,68" stroke="#1C3D4A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path className="pillpal-eye-stroke" d="M107,68 Q114,76 121,68" stroke="#1C3D4A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Peaceful mouth */}
      <path className="pillpal-mouth" d="M88,120 Q100,122 112,120" stroke="#3B8FA5" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Bigger cheeks for sleeping cuteness */}
      <ellipse cx="74" cy="83" rx="9" ry="5.5" className="pillpal-detail" fill="#C47A3A" opacity="0.28"/>
      <ellipse cx="126" cy="83" rx="9" ry="5.5" className="pillpal-detail" fill="#C47A3A" opacity="0.28"/>
      {/* Arms relaxed down */}
      <line x1="68" y1="102" x2="50" y2="130" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="47" cy="134" r="9" fill="#4A9FB5"/>
      <line x1="132" y1="102" x2="150" y2="130" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="153" cy="134" r="9" fill="#4A9FB5"/>
      {/* ZZZ */}
      <text x="138" y="58" fontSize="13" fontWeight="900" fill="#8AABB8" fontFamily="var(--font-sans)" opacity="0.7">z</text>
      <text x="149" y="43" fontSize="17" fontWeight="900" fill="#8AABB8" fontFamily="var(--font-sans)" opacity="0.7">z</text>
      <text x="162" y="26" fontSize="21" fontWeight="900" fill="#8AABB8" fontFamily="var(--font-sans)" opacity="0.7">z</text>
    </>
  ),
  walking: (
    <>
      {/* Legs (drawn before body) */}
      <line x1="86" y1="165" x2="68" y2="206" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="65" cy="210" r="9" fill="#4A9FB5"/>
      <line x1="114" y1="165" x2="132" y2="202" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="135" cy="206" r="9" fill="#4A9FB5"/>
      <ellipse cx="100" cy="215" rx="38" ry="6" fill="#4A9FB5" opacity="0.08"/>
      {/* Body (slight forward tilt via transform) */}
      <g transform="rotate(5,100,130)">
      <path d="M68,95 L68,132 Q68,165 100,165 Q132,165 132,132 L132,95 Z" fill="#D6EEF4"/>
      <path d="M68,95 L68,58 Q68,25 100,25 Q132,25 132,58 L132,95 Z" fill="#4A9FB5"/>
      <rect x="68" y="93" width="64" height="4" fill="#3B8FA5"/>
      <ellipse cx="118" cy="38" rx="10" ry="6" className="pillpal-detail" fill="white" opacity="0.18" transform="rotate(-35,118,38)"/>
      <circle cx="86" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="84" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <circle cx="114" cy="68" r="7" className="pillpal-eye" fill="#1C3D4A"/><circle cx="112" cy="66" r="2.5" className="pillpal-detail" fill="white" opacity="0.65"/>
      <path className="pillpal-mouth" d="M82,116 Q100,133 118,116" stroke="#3B8FA5" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      <ellipse cx="126" cy="83" rx="7" ry="4.5" className="pillpal-detail" fill="#C47A3A" opacity="0.22"/>
      {/* Left arm swinging forward */}
      <line x1="68" y1="92" x2="44" y2="65" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="41" cy="61" r="9" fill="#4A9FB5"/>
      {/* Right arm swinging back */}
      <line x1="132" y1="92" x2="152" y2="118" stroke="#4A9FB5" strokeWidth="13" strokeLinecap="round"/>
      <circle cx="154" cy="122" r="9" fill="#4A9FB5"/>
      </g>
      {/* Motion lines */}
      <line x1="14" y1="95" x2="30" y2="95" stroke="#D6EEF4" strokeWidth="3" strokeLinecap="round"/>
      <line x1="10" y1="110" x2="28" y2="110" stroke="#D6EEF4" strokeWidth="3" strokeLinecap="round"/>
      <line x1="16" y1="125" x2="30" y2="125" stroke="#D6EEF4" strokeWidth="2.5" strokeLinecap="round"/>
    </>
  ),
}

export const PILLPAL_POSES = Object.keys(POSES)

export default function PillPal({
  pose = 'reassuring',
  size = 48,
  className = '',
  title = 'PillPal, the MyPillPal mascot',
  decorative = false,
}) {
  const art = POSES[pose] ?? POSES.reassuring

  /*
    The art is 200 wide by 240 tall. Callers think in a single number, so the
    height is derived from the aspect ratio and the mark never distorts.
  */
  const height = Math.round((size * 240) / 200)

  const showDetail = size >= DETAIL_HIDDEN_BELOW
  const showMouth = size > MOUTH_HIDDEN_AT_OR_BELOW

  /*
    Decorative marks are hidden from assistive tech entirely. A labelled mark
    beside the word "MyPillPal" would otherwise be read out twice.
  */
  const label = decorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': title }

  return (
    <svg
      viewBox="0 0 200 240"
      width={size}
      height={height}
      className={[
        'pillpal',
        showDetail ? '' : 'pillpal-plain',
        showMouth ? '' : 'pillpal-mute',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...label}
    >
      {art}
    </svg>
  )
}
