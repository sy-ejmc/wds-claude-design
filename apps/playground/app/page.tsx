"use client";

import { useState } from "react";
import { BlockButton, Card, Input, ScaleSwitcher } from "@wds/ui";
import { color, margin, padding, typography } from "@wds/tokens";
import { ScaleRoot } from "./ScaleRoot";

/**
 * WDS Playground — Phase 1 demo landing.
 *
 * Renders the core DS-C3 accessibility control (ScaleSwitcher) at the top,
 * then a small composition of @wds/ui components exercised against the
 * @wds/tokens alias layer. Typography tokens are rem-based and resolve
 * from `var(--font-size-*)` per `<html data-typography-scale>`, so
 * switching the tier re-renders at the new size without a remount.
 */
export default function PlaygroundPage() {
  return (
    <ScaleRoot>
      {({ scale, setScale }) => <Landing scale={scale} setScale={setScale} />}
    </ScaleRoot>
  );
}

function Landing({
  scale,
  setScale,
}: {
  scale: "normal" | "large" | "x-large";
  setScale: (next: "normal" | "large" | "x-large") => void;
}) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: padding.xl,
        display: "flex",
        flexDirection: "column",
        gap: margin.l,
        fontFamily: typography.fontFamily,
        color: color.label.normal,
        background: color.background["bg-50"],
        minHeight: "100vh",
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: margin.s }}>
        <h1
          style={{
            fontSize: typography.size["3xl"],
            lineHeight: typography.lineHeight["3xl"],
            fontWeight: typography.weight.B,
            margin: 0,
          }}
        >
          우리가 서비스 로그인
        </h1>
        <p
          style={{
            fontSize: typography.size.md,
            lineHeight: typography.lineHeight.md,
            color: color.label.alternative,
            margin: 0,
          }}
        >
          글자 크기를 바꿔보세요. 모든 요소가 함께 커집니다.
        </p>
      </header>

      <ScaleSwitcher scale={scale} onChange={setScale} />

      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: margin.m,
          }}
        >
          <Input
            label="이메일"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@example.com"
          />
          <Input
            label="비밀번호"
            type="password"
            value={pw}
            onChange={setPw}
            placeholder="8자 이상"
            hint="영문과 숫자를 함께 쓰세요."
          />
          <BlockButton variant="primary" size="L" onClick={() => alert("로그인")}>
            로그인
          </BlockButton>
          <BlockButton variant="neutral" state="outline" size="L">
            회원가입
          </BlockButton>
        </div>
      </Card>

      <Card tinted>
        <p style={{ margin: 0, fontSize: typography.size.md, lineHeight: typography.lineHeight.md }}>
          현재 글자 크기: <strong>{scale === "normal" ? "일반 보기" : scale === "large" ? "크게 보기" : "더 크게 보기"}</strong>.
          URL 파라미터로도 바꿀 수 있어요 — <code>?scale=large</code>
        </p>
      </Card>
    </main>
  );
}
