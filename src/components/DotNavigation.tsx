import { motion } from "motion/react";

interface DotNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function DotNavigation({ activeSection, onNavigate }: DotNavigationProps) {
  const sections = [
    { id: "hero", label: "Home", labelZh: "首页" },
    { id: "philosophy", label: "Inclusivity", labelZh: "包容理念" },
    { id: "services", label: "Capabilities", labelZh: "专业服务" },
    { id: "calculator", label: "Estimator", labelZh: "估价系统" },
    { id: "floorplan", label: "Plan Upload", labelZh: "图纸上传" },
    { id: "reviews", label: "Reviews", labelZh: "客户评价" },
    { id: "contact", label: "Contact Us", labelZh: "联系我们" },
  ];

  return (
    <div 
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-45 flex flex-col items-center space-y-4"
      id="floating-dot-navigation"
    >
      {/* Glow path line behind the dots for blueprint precision aesthetic */}
      <div className="absolute top-4 bottom-4 w-[1px] bg-gradient-to-b from-yellow-500/0 via-stone-700 to-yellow-500/0 pointer-events-none z-0" />

      {sections.map((section, idx) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className="relative flex items-center justify-center p-2.5 rounded-full cursor-pointer group focus:outline-none focus:ring-1 focus:ring-yellow-500/50 z-10"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Tooltip on left */}
            <div className="absolute right-10 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250 flex items-center shrink-0">
              <div className="bg-stone-950/95 border border-stone-800 text-stone-100 px-3 py-1.5 rounded-xl shadow-xl flex flex-col items-end whitespace-nowrap">
                <span className="font-sans font-extrabold text-[10.5px] uppercase tracking-wider text-yellow-500">
                  {section.label}
                </span>
                <span className="font-sans text-[8.5px] text-stone-400 mt-0.5">
                  {section.labelZh}
                </span>
              </div>
              {/* Little caret indicator pointing right */}
              <div className="w-1.5 h-1.5 bg-stone-950 border-r border-t border-stone-800 rotate-45 -ml-1" />
            </div>

            {/* Premium Gold Interactive Box shape */}
            {isActive ? (
              <div className="relative w-8 h-8 flex items-center justify-center bg-brand-accent rounded-md shadow-lg shadow-brand-accent/30 transition-all duration-300">
                <span className="w-2 h-2 rounded-full bg-white relative z-10" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-md bg-stone-200 border border-stone-300 group-hover:bg-brand-accent/30 group-hover:border-brand-accent/50 transition-all duration-200" />
            )}
          </button>
        );
      })}
    </div>
  );
}
