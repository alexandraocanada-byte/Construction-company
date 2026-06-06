import { useState, useEffect } from "react";
import { ArrowRight, Drill, Award, Users, Map, CheckCircle2, Hammer, Shield } from "lucide-react";
import { motion } from "motion/react";

import Header from "./components/Header";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import Calculator from "./components/Calculator";
import FloorplanUploader from "./components/FloorplanUploader";
import Reviews from "./components/Reviews";
import ContactCard from "./components/ContactCard";
import CustomCursor from "./components/CustomCursor";
import DotNavigation from "./components/DotNavigation";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // Track scroll position to update active navigation links in header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "philosophy", "services", "calculator", "floorplan", "reviews", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 95; // 64px header height + padding offset
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      try {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } catch (e) {
        window.scrollTo(0, offsetPosition);
      }
      
      // Secondary deferred scroll anchor for stubborn frames/safari mobile viewports
      setTimeout(() => {
        try {
          const checkPos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          if (Math.abs(window.pageYOffset - checkPos) > 10) {
            window.scrollTo({
              top: checkPos,
              behavior: "smooth"
            });
          }
        } catch (_) {}
      }, 350);

      setActiveSection(sectionId);
    }
  };

  const toolsList = [
    {
      id: "saw",
      icon: "🪚",
      name: "Gyokucho Japanese Pull Saw",
      label: "Fine Ryoba Pull Saw",
      spec: "22 TPI High-Carbon Steel • 0.3mm Kerf Depth",
      accuracy: "99.98% Pristine Hand-Cut Precision",
      useCase: "Hand-sculpted cabinetry, sliding partition joins, hidden wall compartments",
      desc: "An ultra-thin, highly flexible traditional Japanese pull-saw. Delivers clean, splinter-free micro-cuts on luxury Oak trim by running teeth on the pull stroke."
    },
    {
      id: "level",
      icon: "📐",
      name: "Stabila Digital Level Box",
      label: "Digital Laser Alignment",
      spec: "IP65 Self-Correcting Calibrator • Accurate to 0.05°",
      accuracy: "Symmetric Line Deviation: < 0.02 mm / meter",
      useCase: "Floating wardrobe assemblies, closet frames, floor layout blueprints",
      desc: "Generates continuous laser planes. Essential for ensuring floating dividing gates and customized cabinetry fits perfectly upright against Toronto's heritage un-level walls."
    },
    {
      id: "hammer",
      icon: "🔨",
      name: "Estwing 16oz Framing Hammer",
      label: "Forge-Steel Clad Framing Hammer",
      spec: "Solid Single-Piece Carbon Hammer Head • Vibro-Muff Leather Wrap",
      accuracy: "Optimized Dynamic Force Pivot Point",
      useCase: "Hardwood base framing, interior partitioning, structural renovations",
      desc: "Forged in one solid carbon steel piece with a classic wrapped leather grip that deadens vibrations, allowing for heavy framing without timber stress."
    },
    {
      id: "drill",
      icon: "🔌",
      name: "Milwaukee FUEL Brushless M18",
      label: "Dual-Sensory Wood Driver",
      spec: "REDLINK Plus Intelligent Speed-Governor • Solid Core Brushless",
      accuracy: "Smart Torque Feed Level: Calibrated Live Control",
      useCase: "Subfloor fast-assembly, cabinetry hinges, structural hardware anchoring",
      desc: "Delivers responsive speed regulation. Controls torque live to fasten dense structural Maple joints without fatigue or splitting."
    }
  ];

  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [calibrationActive, setCalibrationActive] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState("");

  // Cycle automatically through tools for active showcase motion, unless clicked manually
  useEffect(() => {
    if (!isAutoCycling || calibrationActive) return;
    const interval = setInterval(() => {
      setActiveToolIndex((prev) => (prev + 1) % toolsList.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoCycling, calibrationActive]);

  const triggerCalibration = () => {
    setIsAutoCycling(false);
    setCalibrationActive(true);
    
    const steps = [
      "⚡ Running diagnostic sweeps on Lockr equipment...",
      "📡 Adjusting tool aligners to Ontario local gravity delta...",
      "🔒 Safety locks active. Wood splitter-guard valid...",
      "✅ Hardware calibrated! Station fully operational."
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setCalibrationStep(step);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setCalibrationActive(false);
            setCalibrationStep("");
          }, 1800);
        }
      }, (index + 1) * 800);
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-brand-accent selection:text-white">
      {/* Custom Premium Agency Cursor */}
      <CustomCursor />

      {/* Floating Dot Navigation Indicators on side */}
      <DotNavigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Premium Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-[115vh] lg:min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-stone-950"
      >
        {/* Background photo with Ken Burns zoom effect */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://lh3.googleusercontent.com/d/1Hhz22wxlzW3dT0ugO4HZSYETyTHykyE1"
            alt="Warm sunlit custom carpentry home interior background by Lockr Inc."
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-100 filter brightness-[0.55]"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 0.4, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Subtle blueprint grid layout line overlays for professional builder texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/75 to-transparent" />
        </div>

        {/* Content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading... */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center space-x-2 bg-brand-accent/10 border border-brand-accent/20 px-4 py-2 rounded-full text-brand-accent text-xs font-bold font-sans uppercase tracking-widest shadow-sm"
              >
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                <span>Est. 2018 — Serving GTHA</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display font-bold text-5xl md:text-7xl text-white tracking-tight leading-tight uppercase"
                >
                  Crafting Safe Spaces. <br />
                  Building <span className="text-brand-accent">Your Sanctuary</span>.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-sans text-stone-100 font-medium text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
                >
                  Premium general contracting, fine house remodeling, and hand-sculpted carpentry in Toronto.
                </motion.p>
              </div>

              {/* Action Call buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
              >
                <button
                  onClick={() => handleNavigate("calculator")}
                  className="w-full sm:w-auto bg-brand-accent hover:bg-yellow-600 text-white font-sans font-bold text-sm tracking-wide px-8 py-4 rounded-full shadow-lg transition-all duration-300 uppercase flex items-center justify-center space-x-2 border border-brand-accent cursor-pointer active:scale-95 group"
                >
                  <span>Build Estimates</span>
                </button>
                
                <button
                  onClick={() => handleNavigate("philosophy")}
                  className="w-full sm:w-auto bg-white hover:bg-stone-100 text-brand-primary font-sans font-semibold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 uppercase border border-stone-200 cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Our Statement</span>
                </button>
              </motion.div>
            </div>


            {/* Right Column: Virtual Tools & Equipment Calibration Station */}
            <div className="lg:col-span-5 w-full">
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative p-[1px] bg-gradient-to-r from-red-500/15 via-orange-500/15 via-yellow-500/15 via-green-500/15 via-blue-500/15 to-purple-500/15 hover:from-red-500/50 hover:via-orange-500/50 hover:via-yellow-500/50 hover:via-green-500/50 hover:via-blue-500/50 hover:to-purple-500/50 transition-all duration-500 rounded-3xl shadow-2xl max-w-md mx-auto overflow-hidden group"
                id="interactive-toolbelt-box"
              >
                {/* Thin top rainbow accent ribbon inside card */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-purple-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

                <div className="bg-stone-950/90 backdrop-blur-md rounded-[23px] p-6 h-full relative overflow-hidden">
                  {/* Simulated Green Laser Line sweeping down with continuous animation */}
                  <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_10px_#10b981] z-20 pointer-events-none" 
                  />

                  {/* Grid Overlay inside the box to enhance the blueprint theme */}
                  <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Station Header */}
                  <div className="relative z-10 flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-stone-400">
                        LOCKR Equipment Station V2.4
                      </span>
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-500">
                      GTHA CALIBRATION
                    </span>
                  </div>

                  {/* Selected tool visual card frame */}
                  <div className="relative z-10 bg-stone-904 px-5 py-4 min-h-[190px] flex flex-col justify-between border border-stone-800/80 rounded-2xl hover:border-yellow-500/20 transition-all duration-305">
                    <div className="absolute top-2 right-2 bg-stone-950/80 border border-stone-800 px-2 py-0.5 rounded font-mono text-[8px] text-yellow-500/80 uppercase">
                      Spec-Verify
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl select-none" id="tool-active-emoji">
                          {toolsList[activeToolIndex].icon}
                        </span>
                        <div>
                          <h3 className="font-sans font-extrabold text-sm text-stone-50 uppercase tracking-tight leading-none">
                            {toolsList[activeToolIndex].name}
                          </h3>
                          <p className="font-mono text-[9px] text-yellow-500 mt-1 uppercase">
                            {toolsList[activeToolIndex].label}
                          </p>
                        </div>
                      </div>

                      <p className="font-sans text-xs text-stone-400 leading-relaxed pr-2">
                        {toolsList[activeToolIndex].desc}
                      </p>
                    </div>

                    <div className="border-t border-stone-800/60 pt-3 mt-3 space-y-1">
                      <div className="flex justify-between items-center text-[9.5px]">
                        <span className="font-mono text-stone-500">HARDWARE ACCURACY</span>
                        <span className="font-mono font-bold text-emerald-400">{toolsList[activeToolIndex].accuracy}</span>
                      </div>
                      <div className="flex justify-between items-center text-[9.5px]">
                        <span className="font-mono text-stone-500">FIELD ACCREDITATION</span>
                        <span className="font-sans font-medium text-stone-300">{toolsList[activeToolIndex].spec}</span>
                      </div>
                    </div>
                  </div>

                  {/* Row tab-buttons to toggle between tools */}
                  <div className="relative z-10 grid grid-cols-4 gap-2 mt-4">
                    {toolsList.map((tool, idx) => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setActiveToolIndex(idx);
                          setIsAutoCycling(false);
                        }}
                        className={`py-2 rounded-xl flex flex-col items-center justify-center border transition-all duration-300 relative group cursor-pointer ${
                          activeToolIndex === idx
                            ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-500 shadow-md shadow-yellow-500/5"
                            : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700"
                        }`}
                      >
                        <span className="text-lg">{tool.icon}</span>
                        <span className="text-[8px] font-mono mt-1 opacity-70 tracking-tight block truncate w-full text-center px-1">
                          {tool.label.split(" ")[0]}
                        </span>
                        {activeToolIndex === idx && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-500 shadow shadow-yellow-500/80" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Live Diagnostic Calibration terminal console feedback */}
                  <div className="relative z-10 bg-stone-950 rounded-xl border border-stone-900 p-3.5 mt-4 min-h-[64px] flex flex-col justify-center">
                    <div className="flex items-center justify-between text-[9px] font-mono text-stone-500 mb-1 border-b border-stone-900 pb-1">
                      <span>🔴 INSTRUMENT TERMINAL LOGS</span>
                      <span>ONLINE</span>
                    </div>
                    {calibrationActive ? (
                      <motion.p
                        key={calibrationStep}
                        initial={{ opacity: 0, x: -3 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-mono text-[10.5px] text-emerald-400 tracking-wide font-medium leading-tight select-none"
                      >
                        {calibrationStep}
                      </motion.p>
                    ) : (
                      <p className="font-mono text-[9.5px] text-stone-400 leading-tight">
                        <span className="text-yellow-500 font-bold">&gt;</span> Ideal for LGBTQ+ home renovations. Inspect trades tools or click below to trigger a hardware calibration check.
                      </p>
                    )}
                  </div>

                  {/* Trigger calibration button for professional company credibility */}
                  <button
                    onClick={triggerCalibration}
                    disabled={calibrationActive}
                    className={`relative z-10 mt-3.5 w-full py-3 px-4 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 border cursor-pointer group ${
                      calibrationActive
                        ? "bg-stone-900 border-stone-800 text-stone-500 pointer-events-none"
                        : "bg-stone-900 hover:bg-stone-850 hover:border-emerald-500/40 text-stone-200 border-stone-800"
                    }`}
                    id="calibrate-field-tools-btn"
                  >
                    <Hammer className={`w-3.5 h-3.5 text-yellow-500 ${calibrationActive ? "animate-spin" : ""}`} />
                    <span>
                      {calibrationActive ? "Sweep Verification Running..." : "Calibrate Professional Field Tools 🛠️"}
                    </span>
                    {!calibrationActive && (
                      <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-yellow-500 transition-all duration-200 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Key Trust highlights icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-5xl mx-auto border-t border-stone-900/40"
          >
            <div className="flex flex-col items-center p-3 bg-stone-950/40 rounded-xl border border-stone-900/30">
              <Award className="w-5 h-5 text-yellow-500 mb-2" />
              <span className="font-sans text-xs font-bold text-stone-100 uppercase">Licensed Contractor</span>
              <p className="font-mono text-[9px] text-stone-500 mt-1 uppercase">WSIB / Full Cover</p>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-stone-950/40 rounded-xl border border-stone-900/30">
              <Drill className="w-5 h-5 text-yellow-500 mb-2" />
              <span className="font-sans text-xs font-bold text-stone-100 uppercase">Master Carpentry</span>
              <p className="font-mono text-[9px] text-stone-500 mt-1 uppercase">Local Wood shop</p>
            </div>

            <div className="flex flex-col items-center p-3 bg-stone-950/40 rounded-xl border border-stone-900/30">
              <Users className="w-5 h-5 text-yellow-500 mb-2" />
              <span className="font-sans text-xs font-bold text-stone-100 uppercase">LGBTQ+ Safe Space</span>
              <p className="font-mono text-[9px] text-stone-500 mt-1 uppercase">Sensibility & Respect</p>
            </div>

            <div className="flex flex-col items-center p-3 bg-stone-950/40 rounded-xl border border-stone-900/30">
              <Map className="w-5 h-5 text-yellow-500 mb-2" />
              <span className="font-sans text-xs font-bold text-stone-100 uppercase">GTA Local Team</span>
              <p className="font-mono text-[9px] text-stone-500 mt-1 uppercase">Ontario Built</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Main content sections */}
      <Philosophy />
      
      <Services />

      <Calculator />

      <FloorplanUploader />

      <Reviews />

      <ContactCard />

      {/* Footer Block */}
      <footer className="bg-stone-950 border-t border-stone-900 text-stone-400 py-12 font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <span className="font-sans font-bold tracking-tight text-lg text-stone-200 uppercase">
              Lockr <span className="text-yellow-500">Inc.</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <span className="font-mono text-xs tracking-wider">洛克建筑装修</span>
          </div>

          <p className="text-xs text-stone-500 max-w-lg mx-auto leading-relaxed">
            Lockr Inc. is a registered building contractor in Ontario. We provide fully insured, certified and safe structural carpentry and home remodeling modifications across the Greater Toronto Area.
          </p>

          <p className="text-xs text-stone-500 flex items-center justify-center gap-1">
            <span>Built with sincere Pride and Solidarity</span>
            <span className="inline-block bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 w-12 h-2 rounded ml-1.5" />
          </p>

          <div className="pt-6 border-t border-stone-900 text-[10px] text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>&copy; 2026 Lockr Inc. Toronto. All rights reserved.</span>
            <div className="flex gap-4">
              <span>Licensed Tradesperson #21-120938</span>
              <span>•</span>
              <span>WSIB Ontario Protected</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
