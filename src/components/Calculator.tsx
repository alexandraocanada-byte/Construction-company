import { useState, FormEvent } from "react";
import { Calculator as CalcIcon, RefreshCw, Sparkles, Check, ChevronRight, FileText, Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { QuoteInputs } from "../types";

export default function Calculator() {
  const [inputs, setInputs] = useState<QuoteInputs>({
    rooms: ["kitchen"],
    qualityTier: "premium",
    sqft: 500,
    customWood: "reclaimed",
    includeDesignConsult: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientNotes, setClientNotes] = useState("");

  const roomBaselines: { [key: string]: { label: string; labelZh: string; cost: number } } = {
    kitchen: { label: "Kitchen Space", labelZh: "整体厨房 remodel", cost: 18000 },
    bathroom: { label: "Bathroom / Ensuite", labelZh: "主卧副卧客卫 remodel", cost: 12000 },
    living: { label: "Living / Lounge Area", labelZh: "起居客厅改造", cost: 8000 },
    bedroom: { label: "Bedrooms & Closets", labelZh: "卧室与定制衣帽空间", cost: 6000 },
  };

  const tiers: { [key: string]: { label: string; desc: string; factor: number; color: string } } = {
    standard: {
      label: "Cozy Standard (温暖简约)",
      desc: "Clean silhouettes, premium eco-friendly laminates, durable modern hardware.",
      factor: 1.0,
      color: "border-stone-200 bg-stone-50 text-stone-900"
    },
    premium: {
      label: "Bespoke Premium (高档精工)",
      desc: "Warm Canadian hardwoods, high-density stonework, customized soft-close drawers.",
      factor: 1.45,
      color: "border-yellow-500/40 bg-yellow-500/5 text-stone-900"
    },
    legacy: {
      label: "Artisan Heritage (殿堂尊享)",
      desc: "Custom architectural paneling, rare Walnut woods, hand-polished organic oil finishing.",
      factor: 1.9,
      color: "border-purple-500/30 bg-purple-500/5 text-stone-900"
    }
  };

  const woodUpgrades = {
    none: { label: "Standard Finishes (标准五金漆面板)", cost: 0 },
    oak: { label: "Bespoke Canadian White Oak (加拿大白橡木)", cost: 2500 },
    walnut: { label: "Artisan Solid Black Walnut (黑胡桃原木)", cost: 4500 },
    reclaimed: { label: "Reclaimed Inclusive Heritage Pine (复古环保纪念松木)", cost: 1200 },
  };

  // Calculations
  const roomsTotal = inputs.rooms.reduce((acc, roomId) => acc + (roomBaselines[roomId]?.cost || 0), 0);
  const sqftCost = inputs.sqft * 85; 
  const woodCost = woodUpgrades[inputs.customWood]?.cost || 0;
  const designCost = inputs.includeDesignConsult ? 1500 : 0;
  
  const tierObj = tiers[inputs.qualityTier] || tiers.premium;
  const subtotalBeforeTier = roomsTotal + sqftCost;
  const subtotalWithBudgetFactor = subtotalBeforeTier * tierObj.factor;
  
  const totalSubtotal = subtotalWithBudgetFactor + woodCost + designCost;
  const environmentalFee = totalSubtotal * 0.08; // Permits, licensing, environmental waste management
  const grandTotal = totalSubtotal + environmentalFee;

  const toggleRoom = (roomId: string) => {
    setInputs(prev => {
      const active = prev.rooms.includes(roomId);
      if (active) {
        // Keep at least one room selected
        if (prev.rooms.length <= 1) return prev;
        return { ...prev, rooms: prev.rooms.filter(id => id !== roomId) };
      } else {
        return { ...prev, rooms: [...prev.rooms, roomId] };
      }
    });
  };

  const handleReset = () => {
    setInputs({
      rooms: ["kitchen"],
      qualityTier: "premium",
      sqft: 500,
      customWood: "reclaimed",
      includeDesignConsult: true,
    });
    setSubmitted(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    const selectedRoomsLabels = inputs.rooms.map(id => roomBaselines[id]?.label || id).join(', ');
    const tierName = tiers[inputs.qualityTier]?.label || inputs.qualityTier;
    const woodUpgradeName = woodUpgrades[inputs.customWood]?.label || inputs.customWood;
    
    const mailSubject = encodeURIComponent(`Lockr Inc. - Estimator Space Inquiry (from ${clientName})`);
    
    const mailBody = encodeURIComponent(
`Hi Lockr Inc. Team,

I have completed a project estimate using the Interactive Space Estimator on your website. Here are my project specifications:

--- CUSTOM ESTIMATE SPECIFICATION ---
Client Name: ${clientName}
Client Email: ${clientEmail}
Client Phone: ${clientPhone || "Not specified"}

Selected Areas to Renovate: ${selectedRoomsLabels}
Craft & Material Style: ${tierName}
Approximate Square Footage: ${inputs.sqft} SQFT
Casing & Wood Selection: ${woodUpgradeName}
Queer Space Design Consult Added: ${inputs.includeDesignConsult ? "Yes" : "No"}

TOTAL CALCULATED ESTIMATE: $${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} CAD
------------------------------------

Special Requirements / Extra Details:
${clientNotes || "No extra details specified."}

Please reach out to me to verify my dimensions and schedule a friendly on-site visit.

Thank you,
${clientName}`
    );
    
    const targetRecipient = localStorage.getItem("lockr_recipient_email") || "hello@lockrinc.com";
    window.location.href = `mailto:${targetRecipient}?subject=${mailSubject}&body=${mailBody}`;
    setSubmitted(true);
  };

  return (
    <section id="calculator" className="py-20 bg-stone-100 text-stone-900 overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-1.5 text-yellow-600 font-sans text-xs font-semibold tracking-widest uppercase mb-3">
            <CalcIcon className="w-4 h-4" />
            <span>Interactive Space Estimator</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Estimate Your Remodeling Project
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-sans max-w-xl mx-auto">
            Design your bespoke dream space and calculate an honest, itemized construction projection in Canadian Dollars (CAD) in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Panel (cols-7) */}
          <div className="lg:col-span-7 rounded-3xl p-[1px] bg-gradient-to-r from-red-500/15 via-orange-500/15 via-yellow-500/15 via-green-500/15 via-blue-500/15 to-purple-500/15 hover:from-red-500/50 hover:via-orange-500/50 hover:via-yellow-500/50 hover:via-green-500/50 hover:via-blue-500/50 hover:to-purple-500/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-yellow-500/5 group relative overflow-hidden">
            {/* Thin top rainbow accent ribbon inside card */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-purple-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

            <div className="bg-white rounded-[23px] p-6 sm:p-8 space-y-8 h-full">
            <div className="flex justify-between items-center pb-4 border-b border-stone-100">
              <h3 className="font-sans font-bold text-lg text-stone-900 flex items-center space-x-2">
                <span className="bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded text-xs animate-pulse">A</span>
                <span>Select Your Options / 空间材质定制</span>
              </h3>
              <button 
                onClick={handleReset}
                className="text-stone-500 hover:text-stone-900 flex items-center space-x-1 py-1 px-2.5 hover:bg-stone-50 rounded-lg text-xs font-sans transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Room choice checkboxes */}
            <div className="space-y-3">
              <label className="block font-sans font-bold text-sm text-stone-800 tracking-wide uppercase">
                1. Areas to be Renovated / 选择施工空间
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(roomBaselines).map(([id, item]) => {
                  const selected = inputs.rooms.includes(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleRoom(id)}
                      className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                        selected 
                          ? "border-yellow-500 bg-yellow-500/5 ring-1 ring-yellow-500"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <div>
                        <p className="font-sans font-bold text-xs sm:text-sm text-stone-900">{item.label}</p>
                        <p className="font-sans text-[10px] text-stone-500">{item.labelZh}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        selected ? "bg-yellow-500 border-yellow-600 text-stone-950 font-bold" : "border-stone-300 bg-stone-50"
                      }`}>
                        {selected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality Tier selection (Radio cards) */}
            <div className="space-y-3">
              <label className="block some-label font-sans font-bold text-sm text-stone-800 tracking-wide uppercase">
                2. Craft and Material Style / 挑选建筑工艺与品质
              </label>
              <div className="space-y-3">
                {Object.entries(tiers).map(([key, item]) => {
                  const selected = inputs.qualityTier === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setInputs(prev => ({ ...prev, qualityTier: key as QuoteInputs['qualityTier'] }))}
                      className={`text-left w-full p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                        selected 
                          ? "border-yellow-500 bg-yellow-500/5 ring-1 ring-yellow-500"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="font-sans font-bold text-sm text-stone-900">{item.label}</span>
                        <span className="font-mono text-xs text-yellow-600 font-semibold bg-yellow-50 px-2 py-0.5 rounded">
                          x{item.factor.toFixed(2)} Factor
                        </span>
                      </div>
                      <p className="font-sans text-xs text-stone-600 leading-normal">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Square Footage slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="block font-sans font-bold text-sm text-stone-800 tracking-wide uppercase">
                  3. Approximate Square Footage / 估算房屋面积
                </label>
                <span className="font-sans font-bold text-sm text-yellow-800 font-mono bg-yellow-100 px-2 py-0.5 rounded">
                  {inputs.sqft} SQFT / {Math.round(inputs.sqft / 10.76)} ㎡
                </span>
              </div>
              <div className="pt-2">
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={inputs.sqft}
                  onChange={(e) => setInputs(prev => ({ ...prev, sqft: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono pt-1">
                  <span>100 SQFT (Cosy Apartment study)</span>
                  <span>1,000 SQFT (Average Condo)</span>
                  <span>2,000 SQFT (Spacious House)</span>
                </div>
              </div>
            </div>

            {/* Cabinet and Timber upgrade selection (Select dropdown) */}
            <div className="space-y-3">
              <label className="block font-sans font-bold text-sm text-stone-800 tracking-wide uppercase">
                4. Wood Selection / 定制原木用料与饰面
              </label>
              <div className="relative">
                <select
                  value={inputs.customWood}
                  onChange={(e) => setInputs(prev => ({ ...prev, customWood: e.target.value as QuoteInputs['customWood'] }))}
                  className="w-full bg-white border border-stone-200 hover:border-stone-300 text-stone-850 py-3.5 px-4 pr-10 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer"
                >
                  {Object.entries(woodUpgrades).map(([key, value]) => (
                    <option key={key} value={key} className="p-2">
                      {value.label} — {value.cost === 0 ? "Included" : `+$${value.cost.toLocaleString()}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Space design consulting add-on */}
            <div className="pt-4 border-t border-stone-100 flex items-start space-x-3 bg-stone-50 p-4 rounded-xl">
              <input
                id="designConsultCheck"
                type="checkbox"
                checked={inputs.includeDesignConsult}
                onChange={(e) => setInputs(prev => ({ ...prev, includeDesignConsult: e.target.checked }))}
                className="w-4.5 h-4.5 text-yellow-500 rounded border-stone-300 bg-white cursor-pointer focus:ring-yellow-500"
              />
              <div className="flex-1 cursor-pointer select-none" onClick={() => setInputs(prev => ({ ...prev, includeDesignConsult: !prev.includeDesignConsult }))}>
                <label className="block font-sans font-bold text-xs sm:text-sm text-stone-900 cursor-pointer flex items-center gap-1.5">
                  <span>Add Queer Space Design Consult</span>
                  <span className="text-yellow-600 font-mono font-bold">+$1,500</span>
                </label>
                <p className="font-sans text-xs text-stone-500 mt-1 leading-normal">
                  Receive design workshops from a senior, affirming design representative to plan layouts that match your gender expression, lifestyle routines, and custom aesthetic sensibilities perfectly.
                </p>
              </div>
            </div>

          </div></div>

          {/* Invoice Breakdown Panel (cols-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="rounded-3xl p-[1px] bg-gradient-to-r from-red-500/15 via-orange-500/15 via-yellow-500/15 via-green-500/15 via-blue-500/15 to-purple-500/15 hover:from-red-500/50 hover:via-orange-500/50 hover:via-yellow-500/50 hover:via-green-500/50 hover:via-blue-500/50 hover:to-purple-500/50 transition-all duration-500 shadow-lg relative overflow-hidden group flex-1 flex flex-col justify-between">
              {/* Thin top rainbow accent ribbon inside card */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-purple-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

              <div className="bg-stone-900 text-stone-100 rounded-[23px] p-6 sm:p-8 flex-1 flex flex-col justify-between relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-yellow-500" />
                    <span className="font-sans font-bold text-base tracking-tight text-stone-100">Bespoke Estimate Spec</span>
                  </div>
                  <span className="font-mono text-[9px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded tracking-wide">
                    QUOTE VERSION: 2026.06
                  </span>
                </div>

                {/* Bill Items list */}
                <div className="py-6 space-y-4">
                  
                  {/* Scope items */}
                  <div className="flex justify-between items-start text-xs font-sans">
                    <div>
                      <span className="text-stone-300 font-bold block mb-1">Renovation Space Baselines:</span>
                      <ul className="list-disc leading-relaxed pl-4 text-stone-400 space-y-1">
                        {inputs.rooms.map((roomId) => (
                          <li key={roomId}>
                            {roomBaselines[roomId]?.label} ({roomBaselines[roomId]?.cost.toLocaleString()} CAD)
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="font-mono text-stone-200 mt-1">${roomsTotal.toLocaleString()}</span>
                  </div>

                  {/* SQFT Calculation */}
                  <div className="flex justify-between items-baseline text-xs font-sans">
                    <div>
                      <span className="text-stone-300 font-bold">Square Footage Framing:</span>
                      <p className="text-stone-400 mt-0.5">{inputs.sqft} SQFT x $85 per SQFT raw framing</p>
                    </div>
                    <span className="font-mono text-stone-200">${sqftCost.toLocaleString()}</span>
                  </div>

                  {/* Quality Tier multiplier */}
                  <div className="flex justify-between items-baseline text-xs font-sans border-t border-stone-800/60 pt-3">
                    <div>
                      <span className="text-stone-300 font-bold">Craft Multiplier:</span>
                      <span className="text-yellow-500 text-[10px] block font-semibold">{tierObj.label}</span>
                    </div>
                    <span className="font-mono text-stone-400">Total x{tierObj.factor.toFixed(2)}</span>
                  </div>

                  {/* Cabinet wood upgrade */}
                  {woodCost > 0 && (
                    <div className="flex justify-between items-baseline text-xs font-sans">
                      <div>
                        <span className="text-stone-300 font-bold">Timber & Finish Premium:</span>
                        <p className="text-stone-400 text-[10px] block">{woodUpgrades[inputs.customWood]?.label}</p>
                      </div>
                      <span className="font-mono text-stone-250">+${woodCost.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Space design consult */}
                  {designCost > 0 && (
                    <div className="flex justify-between items-baseline text-xs font-sans">
                      <div>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                          <span>Special Queer Design Consult:</span>
                        </span>
                        <p className="text-stone-400 text-[10px]">Affirming routing & safe layouts workshop</p>
                      </div>
                      <span className="font-mono text-stone-250">+${designCost.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Environmental Waste permits fee */}
                  <div className="flex justify-between items-baseline text-xs font-sans border-t border-stone-800/60 pt-3">
                    <div>
                      <span className="text-stone-400">Permits, Bio-Insulation & Waste management:</span>
                      <p className="text-stone-500 text-[10px]">Ontario strict environmental recycling fee (8%)</p>
                    </div>
                    <span className="font-mono text-stone-300">${environmentalFee.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>

                </div>
              </div>

              {/* Grand Total output with large typeface */}
              <div className="border-t border-stone-800 pt-6 mt-auto">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-sm text-stone-300">Total Estimate:</span>
                  <div className="text-right">
                    <span className="font-mono font-bold text-2xl sm:text-3xl text-yellow-500 block">
                      ${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs font-semibold text-stone-400">CAD</span>
                    </span>
                    <span className="font-mono text-[9px] text-stone-500">Estimates subject to actual on-site layout review</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Submission Form Block */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="consult-form"
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="font-sans font-bold text-xs text-stone-500 tracking-wider uppercase">
                      Lockr Core Service Inquiry
                    </p>
                    <h4 className="font-sans font-bold text-base text-stone-900 tracking-tight">
                      Send this Estima Details to Our Team
                    </h4>
                    
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name / 您的姓名"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                      <input
                        type="email"
                        placeholder="Your Email / 您的邮箱"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone (Optional) / 联系电话"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                      <textarea
                        placeholder="Extra details or special space requirements... / 其他特殊空间需求"
                        rows={2}
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-stone-900 hover:bg-stone-850 text-stone-100 py-3.5 rounded-xl text-xs font-sans font-bold tracking-wide uppercase transition-all flex items-center justify-center space-x-2 border border-stone-800 group cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-yellow-500" />
                      <span>Request Free On-Site Consultation</span>
                      <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-yellow-500 transition-all duration-200 group-hover:translate-x-1" />
                    </button>
                    
                    <p className="text-[10px] text-center text-stone-500 font-sans leading-normal">
                      We response to design requests in 24 hours. Confidential, respectful, and friendly.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-box"
                    className="text-center py-6 space-y-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-12 h-12 bg-emerald-100 border border-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-lg text-stone-900 tracking-tight">Draft Sheet Submitted!</h4>
                      <p className="text-xs text-stone-500 font-sans mt-2 max-w-sm mx-auto leading-normal">
                        Thank you, <span className="font-semibold text-stone-800">{clientName}</span>. Your estimate of <span className="font-bold text-yellow-700">${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} CAD</span> has been locked. 
                      </p>
                      <p className="text-xs text-stone-600 font-sans mt-2 leading-relaxed italic">
                        &ldquo;Our senior design manager will reach out via <span className="underline font-sans not-italic font-bold">{clientEmail}</span> to arrange a safe, friendly on-site visit and double verify dimensions.&rdquo;
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-yellow-600 hover:text-yellow-800 font-sans font-bold text-xs uppercase cursor-pointer"
                    >
                      Edit Options / Configure Another Space
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div></div>

          </div>

        </div>

      </div>
    </section>
  );
}
