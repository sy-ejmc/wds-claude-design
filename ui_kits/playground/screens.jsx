/* global React, Button, TextField, Card, Icon, ScaleSwitcher, TopBar, BottomNav, ListItem */
const { useEffect } = React;

// Local token shorthand (mirrors what components.jsx defines).
const S = {
  primaryNormal: "var(--color-primary-normal)",
  primaryStrong: "var(--color-primary-strong)",
  primaryHeavy:  "var(--color-primary-heavy)",
  primaryLight:  "var(--color-primary-light)",
  bgWhite:       "var(--color-bg-white)",
  bg50:          "var(--color-bg-50)",
  bg100:         "var(--color-bg-100)",
  labelStrong:   "var(--color-label-strong)",
  labelNormal:   "var(--color-label-normal)",
  labelNeutral:  "var(--color-label-neutral)",
  labelAlt:      "var(--color-label-alternative)",
  labelAssist:   "var(--color-label-assistive)",
  labelWhite:    "var(--color-label-white)",
  fillNormal:    "var(--color-fill-normal)",
  fillAlt:       "var(--color-fill-alternative)",
  line:          "var(--color-line-normal)",
  family:        "var(--font-family)",
};

// ========== SCREENS ==========

function LoginScreen({ onLogin }) {
  const [phone, setPhone] = useState("010-1234-5678");
  const [pw, setPw] = useState("");
  return (
    <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 24, marginBottom: 8 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "var(--radius-s)", background: S.primaryNormal, color: "white",
            display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>우</div>
          <div style={{ fontWeight: 700, fontSize: "var(--font-size-3xl)", letterSpacing: "-0.02em", color: S.labelNormal }}>우리가</div>
        </div>
        <div style={{ fontSize: "var(--font-size-lg)", color: S.labelNeutral, lineHeight: "var(--line-height-lg)", marginTop: 8 }}>
          가족과 함께 쓰는 하루.<br/>오늘도 편하게 시작하세요.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TextField label="전화번호" value={phone} onChange={setPhone} type="tel" />
        <TextField label="비밀번호" value={pw} onChange={setPw} type="password" hint="처음이시면 '시작하기'를 눌러 주세요." />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
        <Button variant="primary" size="lg" full onClick={onLogin}>로그인</Button>
        <Button variant="secondary" size="lg" full onClick={onLogin}>시작하기</Button>
      </div>
    </div>
  );
}

function HomeScreen({ scale, setScale, onOpen }) {
  return (
    <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 20, flex: 1, overflowY: "auto" }}>
      <div>
        <div style={{ fontSize: "var(--font-size-sm)", color: S.labelAlt, fontWeight: 600 }}>2026년 4월 22일 수요일</div>
        <div style={{ fontSize: "var(--font-size-3xl)", fontWeight: 700, color: S.labelNormal, marginTop: 4 }}>
          안녕하세요, 영수님
        </div>
      </div>

      <Card tinted padding="20px">
        <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: S.primaryStrong }}>오늘의 안부</div>
        <div style={{ fontSize: "var(--font-size-xl)", fontWeight: 600, color: S.primaryHeavy, marginTop: 6, lineHeight: "var(--line-height-xl)" }}>
          딸 지혜 씨가 오늘 안부를 기다리고 있어요.
        </div>
        <div style={{ marginTop: 14 }}>
          <Button variant="primary" onClick={() => onOpen("family")}>안부 전하기</Button>
        </div>
      </Card>

      <div>
        <div style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, color: S.labelNormal, marginBottom: 10 }}>오늘 할 일</div>
        <Card padding="0" style={{ overflow: "hidden" }}>
          <ListItem icon="pill" title="혈압약 드시기" subtitle="오후 2시" onClick={() => onOpen("health")} accent />
          <ListItem icon="phone" title="정형외과 예약 확인" subtitle="내일 오전 10시" onClick={() => onOpen("health")} />
          <ListItem icon="message-circle" title="손자 민준이 생일 축하" subtitle="오후 6시" onClick={() => onOpen("family")} />
        </Card>
      </div>

      <div>
        <div style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, color: S.labelNormal, marginBottom: 10 }}>글씨 크기</div>
        <ScaleSwitcher scale={scale} setScale={setScale} />
      </div>
    </div>
  );
}

function FamilyScreen() {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("오늘도 건강하게 잘 지내고 있어. 밥 잘 챙겨 먹어.");
  return (
    <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 20, flex: 1, overflowY: "auto" }}>
      <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, color: S.labelNormal }}>가족에게 안부 전하기</div>
      <div style={{ display: "flex", gap: 16 }}>
        {[
          { name: "딸 지혜", active: true },
          { name: "아들 준호", active: false },
          { name: "손자 민준", active: false },
        ].map((p, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 9999,
              background: p.active ? S.primaryLight : S.fillNormal,
              color: p.active ? S.primaryStrong : S.labelNeutral,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: "var(--font-size-xl)", fontWeight: 700,
              border: p.active ? `2px solid ${S.primaryNormal}` : "none",
            }}>{p.name.slice(-1)}</div>
            <div style={{ fontSize: "var(--font-size-sm)", color: S.labelNormal, fontWeight: p.active ? 600 : 400 }}>{p.name}</div>
          </div>
        ))}
      </div>

      <Card padding="20px">
        <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: S.primaryStrong }}>받는 사람 · 딸 지혜</div>
        <div style={{ marginTop: 12 }}>
          <TextField label="메시지" value={msg} onChange={setMsg} />
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <Button variant="primary" onClick={() => setSent(true)}>보내기</Button>
          <Button variant="secondary">나중에</Button>
        </div>
        {sent && (
          <div style={{
            marginTop: 14, padding: "10px 14px", background: S.primaryLight,
            color: S.primaryStrong, borderRadius: "var(--radius-s)",
            fontSize: "var(--font-size-sm)", fontWeight: 500,
          }}>✓ 메시지를 보냈어요.</div>
        )}
      </Card>
    </div>
  );
}

function HealthScreen() {
  const [taken, setTaken] = useState({ a: false, b: false });
  return (
    <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 20, flex: 1, overflowY: "auto" }}>
      <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, color: S.labelNormal }}>오늘의 건강</div>

      <Card padding="20px">
        <div style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, color: S.labelNormal }}>약 드시기</div>
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { id: "a", name: "혈압약", time: "오전 8시" },
            { id: "b", name: "혈압약", time: "오후 2시" },
          ].map(p => (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px",
              background: taken[p.id] ? S.primaryLight : S.fillNormal,
              border: `1px solid ${taken[p.id] ? S.primaryNormal : S.line}`,
              borderRadius: "var(--radius-s)",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 9999,
                background: taken[p.id] ? S.primaryNormal : S.bgWhite,
                color: taken[p.id] ? S.labelWhite : S.labelNeutral,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                border: taken[p.id] ? "none" : `1px solid ${S.line}`,
              }}><Icon name={taken[p.id] ? "check" : "pill"} size={20} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "var(--font-size-lg)", fontWeight: 500, color: S.labelNormal }}>{p.name}</div>
                <div style={{ fontSize: "var(--font-size-sm)", color: S.labelAlt }}>{p.time}</div>
              </div>
              <Button variant={taken[p.id] ? "secondary" : "primary"} onClick={() => setTaken(s => ({ ...s, [p.id]: !s[p.id] }))}>
                {taken[p.id] ? "취소" : "먹었어요"}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="20px">
        <div style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, color: S.labelNormal }}>다음 진료</div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "var(--radius-s)", background: S.primaryLight, color: S.primaryStrong,
            display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}><Icon name="calendar" size={28} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "var(--font-size-lg)", fontWeight: 600, color: S.labelNormal }}>정형외과 · 김의사</div>
            <div style={{ fontSize: "var(--font-size-md)", color: S.labelNeutral, marginTop: 2 }}>내일 오전 10시 · 무릎 경과 확인</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SettingsScreen({ scale, setScale, onLogout }) {
  return (
    <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 20, flex: 1, overflowY: "auto" }}>
      <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, color: S.labelNormal }}>설정</div>

      <div>
        <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: S.labelAlt, marginBottom: 10 }}>화면</div>
        <Card padding="20px">
          <div style={{ fontSize: "var(--font-size-md)", color: S.labelNormal, marginBottom: 12, fontWeight: 500 }}>글씨 크기</div>
          <ScaleSwitcher scale={scale} setScale={setScale} />
        </Card>
      </div>

      <div>
        <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: S.labelAlt, marginBottom: 10 }}>계정</div>
        <Card padding="0" style={{ overflow: "hidden" }}>
          <ListItem icon="user" title="내 정보" subtitle="김영수 · 010-1234-5678" onClick={() => {}} />
          <ListItem icon="bell" title="알림 설정" onClick={() => {}} />
          <ListItem icon="log-out" title="로그아웃" onClick={onLogout} />
        </Card>
      </div>
    </div>
  );
}

// ========== APP SHELL ==========

function App() {
  const [scale, setScaleState] = useState(() => localStorage.getItem("wds.scale") || "normal");
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("wds.loggedIn") === "1");
  const [tab, setTab] = useState(() => localStorage.getItem("wds.tab") || "home");

  useEffect(() => {
    document.documentElement.setAttribute("data-typography-scale", scale);
    localStorage.setItem("wds.scale", scale);
  }, [scale]);
  useEffect(() => { localStorage.setItem("wds.tab", tab); }, [tab]);
  useEffect(() => { localStorage.setItem("wds.loggedIn", loggedIn ? "1" : "0"); }, [loggedIn]);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const setScale = (s) => setScaleState(s);
  const title = { home: "우리가", family: "가족", health: "건강", settings: "설정" }[tab];

  return (
    <div style={{
      width: 390, height: 780, margin: "40px auto",
      border: "1px solid var(--color-line-normal)", borderRadius: 24,
      overflow: "hidden", background: "var(--color-bg-50)",
      display: "flex", flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
      fontFamily: "var(--font-family)",
    }}>
      {!loggedIn ? (
        <>
          <TopBar title="로그인" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--color-bg-white)", overflowY: "auto" }}>
            <LoginScreen onLogin={() => setLoggedIn(true)} />
          </div>
        </>
      ) : (
        <>
          <TopBar title={title} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {tab === "home"     && <HomeScreen scale={scale} setScale={setScale} onOpen={setTab} />}
            {tab === "family"   && <FamilyScreen />}
            {tab === "health"   && <HealthScreen />}
            {tab === "settings" && <SettingsScreen scale={scale} setScale={setScale} onLogout={() => setLoggedIn(false)} />}
          </div>
          <BottomNav current={tab} onChange={setTab} />
        </>
      )}
    </div>
  );
}

window.App = App;

const _root = ReactDOM.createRoot(document.getElementById("root"));
_root.render(React.createElement(App));
