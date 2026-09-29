"use client";

import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(false);

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#131313]">
      <div className="lamp-page">
        <div className={`card ${active ? "active" : ""}`}>
          {/* LIGHT LAYER */}
          <div className="light-layer">
            <div className="slit" />

            <div className="lumen">
              <div className="min" />
              <div className="mid" />
              <div className="hi" />
            </div>

            <div className="darken">
              <div className="sl" />
              <div className="ll" />
              <div className="slt" />
              <div className="srt" />
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3.2rem"
                height="3.2rem"
                viewBox="0 0 1024 1024"
              >
                <defs>
                  <linearGradient
                    id="iconGradient"
                    x1="0"
                    x2="0"
                    y1="-1"
                    y2="0.8"
                  >
                    <stop offset="0%" stopColor="#bbb" />
                    <stop offset="100%" stopColor="#555" />
                  </linearGradient>

                  <filter id="strong-inner">
                    <feFlood floodColor="#fff2" />
                    <feComposite
                      operator="out"
                      in2="SourceGraphic"
                    />
                    <feMorphology
                      operator="dilate"
                      radius="8"
                    />
                    <feGaussianBlur stdDeviation="32" />
                    <feComposite
                      operator="atop"
                      in2="SourceGraphic"
                    />
                  </filter>
                </defs>

                <path
                  fill="url(#iconGradient)"
                  filter="url(#strong-inner)"
                  d="M488.1 414.7V303.4L300.9 428l83.6 55.8zm254.1 137.7v-79.8l-59.8 39.9zM512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m278 533c0 1.1-.1 2.1-.2 3.1c0 .4-.1.7-.2 1a14.2 14.2 0 0 1-.8 3.2c-.2.6-.4 1.2-.6 1.7c-.2.4-.4.8-.5 1.2c-.3.5-.5 1.1-.8 1.6c-.2.4-.4.7-.7 1.1c-.3.5-.7 1-1 1.5c-.3.4-.5.7-.8 1c-.4.4-.8.9-1.2 1.3c-.3.3-.6.6-1 .9c-.4.4-.9.8-1.4 1.1c-.4.3-.7.6-1.1.8c-.1.1-.3.2-.4.3L525.2 786c-4 2.7-8.6 4-13.2 4c-4.7 0-9.3-1.4-13.3-4L244.6 616.9c-.1-.1-.3-.2-.4-.3l-1.1-.8c-.5-.4-.9-.7-1.3-1.1c-.3-.3-.6-.6-1-.9c-.4-.4-.8-.8-1.2-1.3a7 7 0 0 1-.8-1c-.4-.5-.7-1-1-1.5c-.2-.4-.5-.7-.7-1.1c-.3-.5-.6-1.1-.8-1.6c-.2-.4-.4-.8-.5-1.2c-.2-.6-.4-1.2-.6-1.7c-.1-.4-.3-.8-.4-1.2c-.2-.7-.3-1.3-.4-2c-.1-.3-.1-.7-.2-1c-.1-1-.2-2.1-.2-3.1V427.9c0-1 .1-2.1.2-3.1c.1-.3.1-.7.2-1a14.2 14.2 0 0 1 .8-3.2c.2-.6.4-1.2.6-1.7c.2-.4.4-.8.5-1.2c.2-.5.5-1.1.8-1.6c.2-.4.4-.7.7-1.1c.6-.9 1.2-1.7 1.8-2.5c.4-.4.8-.9 1.2-1.3c.3-.3.6-.6 1-.9c.4-.4.9-.8 1.3-1.1s.7-.6 1.1-.8c.1-.1.3-.2.4-.3L498.7 239c8-5.3 18.5-5.3 26.5 0l254.1 169.1c.1.1.3.2.4.3l1.1.8l1.4 1.1c.3.3.6.6 1 .9c.4.4.8.8 1.2 1.3c.7.8 1.3 1.6 1.8 2.5c.2.4.5.7.7 1.1c.3.5.6 1 .8 1.6c.2.4.4.8.5 1.2c.2.6.4 1.2.6 1.7c.1.4.3.8.4 1.2c.2.7.3 1.3.4 2c.1.3.1.7.2 1c.1 1 .2 2.1.2 3.1zm-254.1 13.3v111.3L723.1 597l-83.6-55.8zM281.8 472.6v79.8l59.8-39.9zM512 456.1l-84.5 56.4l84.5 56.4l84.5-56.4zM723.1 428L535.9 303.4v111.3l103.6 69.1zM384.5 541.2L300.9 597l187.2 124.6V610.3z"
                />
              </svg>
            </div>

            <div className="bottom">
              <h4>Luminous Design</h4>

              <p>
                Light Folds Around Form
                <br />
                Revealing Layers Of Depth
              </p>

              <button
                type="button"
                aria-pressed={active}
                aria-label="Activate Lumen"
                className={`toggle ${active ? "active" : ""}`}
                onClick={() => setActive((value) => !value)}
              >
                <div className="handle" />
                <span>Activate Lumen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @font-face {
          font-family: "Aeonik Pro";
          src: url("https://db.onlinewebfonts.com/t/12ff62164c9778917bddb93c6379cf47.woff2")
            format("woff2");
          font-display: swap;
        }

        .lamp-page {
          --sz: clamp(10px, min(2vw, 3vh), 24px);

          min-height: 100vh;
          width: 100%;
          display: grid;
          place-items: center;

          background:
            radial-gradient(
              circle at 50% 30%,
              #2a2a2a 0%,
              #131313 64%
            );

          font-family: "Aeonik Pro", sans-serif;
          font-size: var(--sz);
        }

        .card {
          position: relative;

          width: 18rem;
          height: 24rem;

          padding: 1rem;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;

          color: #fff;

          border-radius: 1.8rem;

          background:
            radial-gradient(
              circle at 50% 0%,
              #3a3a3a 0%,
              #1a1a1a 64%
            );

          box-shadow:
            inset 0 1.01rem 0.2rem -1rem #fff0,
            inset 0 -1.01rem 0.2rem -1rem #0000,
            0 -1.02rem 0.2rem -1rem #fff0,
            0 1rem 0.2rem -1rem #0000,
            0 0 0 1px #fff3,
            0 4px 4px 0 #0004,
            0 0 0 1px #333;

          transition:
            all 0.4s ease-in-out,
            translate 0.4s ease-out;
        }

        .card::before {
          content: "";
          display: block;

          --offset: 1rem;
          --ax: 4rem;

          width: calc(100% + 2 * var(--offset));
          height: calc(100% + 2 * var(--offset));

          position: absolute;
          left: calc(-1 * var(--offset));
          right: calc(-1 * var(--offset));
          top: calc(-1 * var(--offset));
          bottom: calc(-1 * var(--offset));

          margin: auto;

          box-shadow: inset 0 0 0px 0.06rem #fff2;

          border-radius: 2.6rem;

          clip-path: polygon(
            var(--ax) 0,
            0 0,
            0 var(--ax),
            var(--ax) var(--ax),
            var(--ax) calc(100% - var(--ax)),
            0 calc(100% - var(--ax)),
            0 100%,
            var(--ax) 100%,
            var(--ax) calc(100% - var(--ax)),
            calc(100% - var(--ax)) calc(100% - var(--ax)),
            calc(100% - var(--ax)) 100%,
            100% 100%,
            100% calc(100% - var(--ax)),
            calc(100% - var(--ax)) calc(100% - var(--ax)),
            calc(100% - var(--ax)) var(--ax),
            100% var(--ax),
            100% 0,
            calc(100% - var(--ax)) 0,
            calc(100% - var(--ax)) var(--ax),
            var(--ax) var(--ax)
          );

          transition: all 0.4s ease-in-out;
        }

        .card:hover {
          translate: 0 -0.2rem;
        }

        .card:hover::before {
          --offset: 0.5rem;
          --ax: 8rem;

          border-radius: 2.2rem;

          box-shadow: inset 0 0 0 0.08rem #fff1;
        }

        /* =========================
           LIGHT LAYER
        ========================= */

        .light-layer {
          position: absolute;

          left: 0;
          top: 0;

          width: 100%;
          height: 100%;

          transform-style: preserve-3d;
          perspective: 400px;
        }

        .slit {
          position: absolute;

          left: 0;
          right: 0;
          top: 0;
          bottom: 0;

          margin: auto;

          width: 64%;
          height: 1.2rem;

          transform: rotateX(-76deg);

          background: #121212;

          box-shadow: 0 0 4px 0 #fff0;

          transition: all 0.4s ease-in-out;
        }

        /* =========================
           LUMEN
        ========================= */

        .lumen {
          position: absolute;

          left: 0;
          right: 0;
          top: 0;
          bottom: 0;

          width: 100%;
          height: 100%;

          margin: auto;

          pointer-events: none;

          perspective: 400px;

          opacity: 0;

          transition: opacity 0.4s ease-in-out;
        }

        .lumen .min {
          width: 70%;
          height: 3rem;

          position: absolute;

          left: 0;
          right: 0;
          top: 0;
          bottom: 2.5rem;

          margin: auto;

          transform: rotateX(-42deg);

          background: linear-gradient(#fff0, #fffa);

          opacity: 0.4;
        }

        .lumen .mid {
          width: 74%;
          height: 13rem;

          position: absolute;

          left: 0;
          right: 0;
          top: 0;
          bottom: 10em;

          margin: auto;

          transform: rotateX(-42deg);

          background: linear-gradient(#fff0, #fffa);

          filter: blur(1rem);

          opacity: 0.8;

          border-radius: 100% 100% 0 0;
        }

        .lumen .hi {
          width: 50%;
          height: 13rem;

          position: absolute;

          left: 0;
          right: 0;
          top: 0;
          bottom: 12em;

          margin: auto;

          transform: rotateX(22deg);

          background: linear-gradient(#fff0, #fffa);

          filter: blur(1rem);

          opacity: 0.6;

          border-radius: 100% 100% 0 0;
        }

        /* =========================
           DARKEN / SHADOWS
        ========================= */

        .darken {
          position: absolute;

          left: 0;
          right: 0;
          top: 0;
          bottom: 0;

          width: 100%;
          height: 100%;

          margin: auto;

          pointer-events: none;

          perspective: 400px;

          opacity: 0.5;

          transition: opacity 0.4s ease-in-out;
        }

        .darken > * {
          transition: opacity 0.4s ease-in-out;
        }

        .darken .sl {
          width: 64%;
          height: 10rem;

          position: absolute;

          left: 0;
          right: 0;
          top: 9.6em;
          bottom: 0;

          margin: auto;

          background: linear-gradient(#000, #0000);

          filter: blur(0.2rem);

          opacity: 0.1;

          border-radius: 0 0 100% 100%;

          transform: rotateX(-22deg);
        }

        .darken .ll {
          width: 62%;
          height: 10rem;

          position: absolute;

          left: 0;
          right: 0;
          top: 11em;
          bottom: 0;

          margin: auto;

          background: linear-gradient(#000a, #0000);

          filter: blur(0.8rem);

          opacity: 0.4;

          border-radius: 0 0 100% 100%;

          transform: rotateX(22deg);
        }

        .darken .slt {
          width: 0.5rem;
          height: 4rem;

          position: absolute;

          left: 0;
          right: 11.5rem;
          top: 3.9em;
          bottom: 0;

          margin: auto;

          background: linear-gradient(#0005, #0000);

          opacity: 0.6;

          border-radius: 0 0 100% 100%;

          transform: skewY(42deg);
        }

        .darken .srt {
          width: 0.5rem;
          height: 4rem;

          position: absolute;

          right: 0;
          left: 11.5rem;
          top: 3.9em;
          bottom: 0;

          margin: auto;

          background: linear-gradient(#0005, #0000);

          opacity: 0.6;

          border-radius: 0 0 100% 100%;

          transform: skewY(-42deg);
        }

        /* =========================
           CONTENT
        ========================= */

        .content {
          position: relative;
          z-index: 2;
        }

        .icon {
          position: absolute;

          top: -19rem;
          left: 0;
          right: 0;

          width: fit-content;

          margin: auto;

          filter: drop-shadow(0 -1.2rem 1px transparent);

          transition: filter 0.4s ease-in-out;
        }

        .bottom {
          position: relative;
        }

        .bottom h4 {
          margin: 0 0 1rem;

          font-size: 1.2rem;

          color: #ccc;
        }

        .bottom p {
          margin: 0;
          padding-bottom: 0.6rem;

          max-width: 64%;

          color: #fff4;

          font-size: 0.6rem;
          font-weight: 100;

          border-bottom: 1px solid #fff1;
        }

        /* =========================
           TOGGLE
        ========================= */

        .toggle {
          position: absolute;

          right: 0;
          bottom: 0;

          width: 4.8rem;
          height: 2rem;

          border: 0;
          padding: 0;

          border-radius: 0.6rem;

          background: #000;

          box-shadow:
            inset 0 -8px 8px 0.3rem #0004,
            inset 0 0 1px 0.3rem #ddd,
            inset 0 -2px 1px 0.3rem #fff,
            inset 0 1px 2px 0.3rem #0006,
            inset 0 0 1px 0.8rem #aaa;

          cursor: pointer;

          transition: all 0.4s ease-in-out;
        }

        .toggle::before {
          content: "";

          display: block;

          position: absolute;

          left: 0;
          right: 0;
          top: 0;
          bottom: 0;

          width: 3.4rem;
          height: 0.68rem;

          margin: auto;

          border-radius: 0.2rem;

          background: #000;

          transition: all 0.4s ease-in-out;
        }

        .handle {
          position: absolute;

          top: 0;
          bottom: 0.04rem;

          left: 0.68rem;

          width: 40%;
          height: 30%;

          margin: auto;

          background: #aaa;

          border-radius: 0.2rem;

          box-shadow:
            inset 0 1px 4px 0 #fff,
            inset 0 -1px 1px 0 #000a,
            0 0 1px 1px #0003,
            1px 3px 6px 1px #000a;

          transition: all 0.4s ease-in-out;
        }

        .toggle.active .handle {
          transform: translateX(1.58rem);
        }

        .toggle span {
          pointer-events: none;

          position: absolute;

          left: 0;
          right: 0;
          bottom: calc(100% + 0.4rem);

          margin: auto;

          text-align: center;

          font-size: 0.6rem;
          font-weight: 100;

          color: #555;

          opacity: 0;

          transition: opacity 0.4s ease-in-out;
        }

        .toggle:hover span {
          opacity: 1;
        }

        .toggle:not(.active):hover .handle {
          transform: translateX(0.2rem);
        }

        /* =========================
           ACTIVE LAMP
        ========================= */

        .card.active {
          box-shadow:
            inset 0 1.01rem 0.1rem -1rem #fffa,
            inset 0 -4rem 3rem -3rem #000a,
            0 -1.02rem 0.2rem -1rem #fffa,
            0 1rem 0.2rem -1rem #000,
            0 0 0 1px #fff2,
            0 4px 4px 0 #0004,
            0 0 0 1px #333;
        }

        .card.active .slit {
          background: #fff;
          box-shadow: 0 0 4px 0 #fff;
        }

        .card.active .lumen {
          opacity: 0.5;
        }

        .card.active .darken {
          opacity: 0.8;
        }

        .card.active .darken .sl {
          opacity: 0.2;
        }

        .card.active .darken .ll {
          opacity: 1;
        }

        .card.active .darken .slt,
        .card.active .darken .srt {
          opacity: 1;
        }

        .card.active .icon {
          filter:
            drop-shadow(0 -1.2rem 2px #0003)
            brightness(1.64);
        }

        .card.active .toggle::before {
          background: #fffc;
          box-shadow: 0 0 0.3rem 0.2rem #fff7;
        }

        .card.active .handle {
          box-shadow:
            inset 0 1px 12px 0 #fff,
            inset 0 -1px 1px 0 #fffa,
            0 0 2px 1px #4443,
            1px 3px 6px 1px #0004;
        }

        @media (max-width: 640px) {
          .lamp-page {
            font-size: 14px;
          }
        }
      `}</style>
    </main>
  );
}