import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  isClickable: boolean;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [clicks, setClicks] = useState<ClickEffect[]>([]);

  useEffect(() => {
    // Detect mobile/tablet touch-only devices to avoid double-cursor overlap
    const checkTouch = () => {
      const touchMatch = window.matchMedia("(any-hover: none)").matches || "ontouchstart" in window;
      setIsTouchDevice(touchMatch);
    };
    checkTouch();

    if (isTouchDevice) return;

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsHidden(false);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Smoothly animate the trailing outer ring
    const animateRing = () => {
      const ease = 0.16; // Lerp smoothing factor
      posX += (mouseX - posX) * ease;
      posY += (mouseY - posY) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      }
      requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect buttons, links, sliders, click sections, inputs, and elements marked with cursor-pointer
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        target.closest("#floating-dot-navigation button") ||
        target.closest(".bento-card-interactive");

      setIsPointer(!!isClickable);
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isClickable = !!(
        target && (
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest(".cursor-pointer") ||
          target.closest("[role='button']") ||
          target.closest("#floating-dot-navigation button")
        )
      );

      const clickId = Date.now();
      setClicks((prev) => [...prev, { id: clickId, x: e.clientX, y: e.clientY, isClickable }]);

      // Process automatic cleanup after the animation ends
      setTimeout(() => {
        setClicks((prev) => prev.filter((cls) => cls.id !== clickId));
      }, 750);
    };

    const onMouseLeaveWindow = () => {
      setIsHidden(true);
    };

    const onMouseEnterWindow = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    const animationId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      cancelAnimationFrame(animationId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice || isHidden) return null;

  return (
    <>
      {/* Hide the default browser cursor gracefully in CSS */}
      <style>{`
        @media (any-hover: hover) {
          body, a, button, select, input, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Center sharp pinpoint */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-yellow-500 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />

      {/* Trailing interactive ring containing the directional click arrow indicator */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-all duration-200 ease-out -ml-4 -mt-4 ${
          isPointer
            ? "w-8 h-8 bg-yellow-500/20 border-2 border-yellow-500 text-yellow-500 shadow-lg shadow-yellow-500/10 scale-110"
            : "w-8 h-8 bg-transparent border border-stone-400 scale-100"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {isPointer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <ArrowUpRight className="w-4 h-4 stroke-[3.5]" />
          </motion.div>
        )}
      </div>

      {/* Interactive mouse clicking indicator logos + ripples spawned on screen */}
      <div className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden">
        <AnimatePresence>
          {clicks.map((click) => (
            <div
              key={click.id}
              className="absolute left-0 top-0"
              style={{ left: click.x, top: click.y }}
            >
              {/* Gold Expanding Radial Wave */}
              <motion.div
                initial={{ transform: "translate(-50%, -50%) scale(0.2)", opacity: 0.8 }}
                animate={{ transform: "translate(-50%, -50%) scale(2.4)", opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`absolute w-12 h-12 rounded-full border-2 ${
                  click.isClickable ? "border-yellow-500 bg-yellow-500/5 shadow-yellow-500/20 shadow-md" : "border-stone-500 bg-transparent"
                }`}
              />

              {/* Floating Miniature Mouse Cursor Click Logo */}
              <motion.div
                initial={{ transform: "translate(-30%, -30%) scale(0.5) rotate(-15deg)", opacity: 0 }}
                animate={[
                  { transform: "translate(-10%, -10%) scale(1.1) rotate(0deg)", opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
                  { transform: "translate(-5%, -5%) scale(0.8) rotate(5deg)", opacity: 0, transition: { delay: 0.35, duration: 0.3, ease: "easeIn" } }
                ]}
                className="absolute"
              >
                <div className="flex items-center space-x-1.5 bg-stone-950/95 border border-yellow-500 text-yellow-500 rounded-lg px-2 py-1 shadow-lg backdrop-blur-sm">
                  <MousePointerClick className="w-3.5 h-3.5 stroke-[2.5] text-yellow-500 animate-pulse" />
                  <span className="font-mono text-[8.5px] uppercase tracking-wider font-extrabold leading-none">Click</span>
                </div>
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

