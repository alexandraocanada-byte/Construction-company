import { useState } from "react";
import { Hammer, Menu, X, Heart, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "hero", label: "Home", labelZh: "首页" },
    { id: "philosophy", label: "Inclusivity & Pride", labelZh: "包容理念" },
    { id: "services", label: "Capabilities", labelZh: "专业服务" },
    { id: "calculator", label: "Estimator", labelZh: "估价系统" },
    { id: "floorplan", label: "Plan Upload", labelZh: "图纸上传" },
    { id: "reviews", label: "Reviews", labelZh: "客户评价" },
    { id: "contact", label: "Contact Us", labelZh: "联系我们" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 text-stone-900">
      {/* Pride Accent Top Band: Multi-color subtle gradient strip */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate("hero")}>
            <div className="p-3 bg-stone-50 border-2 border-brand-accent rounded-full text-brand-accent flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-350">
              <Hammer className="w-5.5 h-5.5" id="header-logo-hammer" />
            </div>
            <div>
              <span className="font-display font-bold tracking-tight text-xl text-brand-primary uppercase block leading-none">
                Lockr <span className="text-brand-accent">Inc.</span>
              </span>
              <p className="font-mono text-[10px] text-stone-500 tracking-wider flex items-center gap-1.5 mt-0.5">
                <span>洛克建筑装修</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium font-sans tracking-wide transition-all relative ${
                    isActive 
                      ? "text-brand-accent bg-stone-100"
                      : "text-stone-600 hover:text-brand-primary hover:bg-stone-100"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Support and Safety indicators */}
          <div className="hidden lg:flex items-center space-x-4 border-l border-stone-200 pl-6">
            <div className="flex items-center space-x-2 text-xs text-stone-600 font-sans">
              <Shield className="w-3.5 h-3.5 text-brand-accent" />
              <span>Licensed & Bonded</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-brand-primary hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-stone-50 border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive 
                        ? "text-brand-accent bg-stone-100 font-semibold"
                        : "text-stone-600 hover:text-brand-primary hover:bg-stone-100"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
