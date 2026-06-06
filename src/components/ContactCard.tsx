import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Compass, Send, CheckCircle2, Navigation, MessageSquare, ArrowRight, Edit2, Save } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactCard() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [recipientEmail, setRecipientEmail] = useState(() => {
    return localStorage.getItem("lockr_recipient_email") || "hello@lockrinc.com";
  });
  const [isEditingRecipient, setIsEditingRecipient] = useState(false);
  const [tempRecipientEmail, setTempRecipientEmail] = useState("");

  const [selectedNeighborhood, setSelectedNeighborhood] = useState("village");

  const neighborhoods: { [key: string]: { name: string; distance: string; transit: string; vehicle: string } } = {
    village: {
      name: "Church-Wellesley Village (Wellesley / Church)",
      distance: "0.4 km (5 min walk)",
      transit: "A quick 5-min stroll East down Wellesley St. directly past Cawthra Square Park — we are right inside your local community!",
      vehicle: "2 mins via Wellesley St E. Easy pay-and-display parking along church."
    },
    riverdale: {
      name: "Riverdale & Leslieville (Gerrard / Broadview)",
      distance: "3.2 km (12 min drive)",
      transit: "Hop on the 504 King Streetcar to Broadview Station, then transition to Line 2 Subway westbound to Bloor-Yonge, then Wellesley.",
      vehicle: "10 mins westbound via Dundas St E or Danforth Ave, then head south down Bay to Wellesley."
    },
    annex: {
      name: "The Annex & Bloor West (Bloor / Bathurst)",
      distance: "2.8 km (10 min subway)",
      transit: "Take Line 2 Subway eastbound from Bathurst Station, change at Bloor-Yonge southbound for 1 stop to Wellesley Station.",
      vehicle: "12 mins via Bloor St E, turning southbound down Yonge St."
    },
    gtha: {
      name: "Greater GTHA Suburbs (Mississauga, Markham, Oakville)",
      distance: "20-40 km",
      transit: "Go Transit straight into Union Station, then hop onto Line 1 Subway heading north to Wellesley Station.",
      vehicle: "Direct response: We dispatch our specialized Mobile Design & Wood Sample truck direct to your suburban driveway."
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;
    
    const mailSubject = encodeURIComponent(`Lockr Inc. - Project Inquiry (from ${formName})`);
    const mailBody = encodeURIComponent(
`Hi Lockr Inc. Team,

I have sent an inquiry from your website. Here are my details:

Name: ${formName}
Email: ${formEmail}

Inquiry Message:
${formMsg}

Please let me know if you received my message.

Best regards,
${formName}`
    );
    
    window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormMsg("");
    setFormSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 bg-stone-900 border-t border-stone-800 text-stone-100 relative overflow-hidden">
      {/* Pride Accent Line at top of section */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-mono tracking-widest text-yellow-500 uppercase font-semibold">
            Let's build together / 期待与您携手
          </span>
          <h2 className="font-sans font-bold text-3xl text-stone-150 tracking-tight mt-1">
            Connect With Lockr Inc.
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-sans mt-2">
            Speak with friendly builders. Send us a message, estimate request, or find easy directions to our Toronto core hub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Contact details & Direction Finder (cols-7) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Mail & Phone Card */}
                <div className="bg-stone-850 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-yellow-500/30 transition-all duration-300 group">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-yellow-500">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <Phone className="w-5 h-5" id="contact-phone-icon" />
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-300">Toronto Hotline</span>
                    </div>
                    <div className="pt-2">
                      <a href="tel:+16475358668" className="text-base sm:text-lg font-mono font-bold text-stone-150 group-hover:text-yellow-500 transition-colors block">
                        +1 (647) 535-8668
                      </a>
                      <span className="text-[10.5px] text-stone-400 font-sans block mt-1">Ontario Local Dispatch Center (Mon-Sat)</span>
                    </div>
                  </div>
                  <a
                    href="tel:+16475358668"
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs uppercase tracking-wide py-3 px-4 rounded-xl transition-all duration-250 shadow-md border border-emerald-700 active:scale-95"
                    id="tap-to-call-btn"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Click to Call Hotline</span>
                  </a>
                </div>

                {/* Email Card */}
                <div className="bg-stone-850 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-yellow-500/30 transition-all duration-300 group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-yellow-500">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                          <Mail className="w-5 h-5" id="contact-mail-icon" />
                        </div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-300">Direct Estimates</span>
                      </div>
                      {!isEditingRecipient && (
                        <button
                          type="button"
                          onClick={() => {
                            setTempRecipientEmail(recipientEmail);
                            setIsEditingRecipient(true);
                          }}
                          className="p-1.5 hover:bg-stone-850 text-stone-400 hover:text-yellow-500 rounded-lg transition-colors cursor-pointer"
                          title="Change Recipient Email"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="pt-2">
                      {isEditingRecipient ? (
                        <div className="space-y-2">
                          <input
                            type="email"
                            value={tempRecipientEmail}
                            onChange={(e) => setTempRecipientEmail(e.target.value)}
                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 font-mono focus:border-yellow-500 focus:outline-none"
                            placeholder="recipient@example.com"
                          />
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (tempRecipientEmail.trim() && tempRecipientEmail.includes("@")) {
                                  localStorage.setItem("lockr_recipient_email", tempRecipientEmail.trim());
                                  setRecipientEmail(tempRecipientEmail.trim());
                                }
                                setIsEditingRecipient(false);
                              }}
                              className="px-2 py-1 bg-yellow-600 hover:bg-yellow-550 text-stone-950 font-sans font-bold text-[10px] rounded uppercase flex items-center gap-1 cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsEditingRecipient(false)}
                              className="px-2 py-1 bg-stone-800 hover:bg-stone-750 text-stone-300 font-sans font-medium text-[10px] rounded uppercase cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <a href={`mailto:${recipientEmail}`} className="text-base sm:text-lg font-mono font-bold text-stone-150 group-hover:text-yellow-500 transition-colors block break-all">
                            {recipientEmail}
                          </a>
                          <span className="text-[10.5px] text-stone-400 font-sans block mt-1">Estimates, blueprints, inquiries & ideas</span>
                        </>
                      )}
                    </div>
                  </div>
                  <a
                    href={`mailto:${recipientEmail}`}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-750 text-stone-150 font-sans font-bold text-xs uppercase tracking-wide py-3 px-4 rounded-xl transition-all duration-250 border border-stone-700 hover:border-stone-600 active:scale-95"
                    id="tap-to-email-btn"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-400" />
                    <span>Click to Email Draft</span>
                  </a>
                </div>

              </div>

              {/* Office & Timing Bento Card */}
              <div className="bg-stone-850 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div className="flex items-start space-x-3 text-stone-200">
                    <MapPin className="w-5.5 h-5.5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-bold text-sm text-stone-100">Core Toronto Hub Address</h4>
                      <p className="font-sans text-xs text-stone-400 mt-1 leading-normal">
                        Serving Downtown, Church-Wellesley Village, Riverdale, and all GTHA neighborhoods.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-stone-200">
                  <Clock className="w-5.5 h-5.5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-stone-100">Hours of Quality Operation</h4>
                    <p className="font-sans text-xs text-stone-400 mt-1 leading-normal">
                      Monday to Friday: <span className="text-stone-150">8:00 AM – 6:00 PM</span> <br />
                      Saturday Hours: <span className="text-stone-150">9:00 AM – 4:00 PM</span> <br />
                      Sunday & Statutory Holidays: <span className="text-stone-500">Closed (In-shop woodworking only)</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Interactive Direction Finder Widget */}
              <div className="bg-stone-950 border border-stone-800/80 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-rose-500">
                    <Navigation className="w-4.5 h-4.5 text-yellow-500" />
                    <span className="font-sans font-bold text-xs tracking-wide uppercase text-stone-300">
                      GTA Transit & Driving Finder
                    </span>
                  </div>
                  <Compass className="w-4 h-4 text-stone-600 animate-spin-slow" />
                </div>
                
                <div className="space-y-3">
                  <p className="text-xs text-stone-400 font-sans">
                    Select your local Toronto district to view direct routing to Wellesley / Church community or arrange a mobile woodworking visit:
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(neighborhoods).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedNeighborhood(key)}
                        className={`px-3 py-2 rounded-lg text-[11px] font-sans font-medium transition-all text-center border cursor-pointer ${
                          selectedNeighborhood === key
                            ? "bg-yellow-500 border-yellow-600 text-stone-900 font-semibold"
                            : "bg-stone-850 border-stone-800 text-stone-400 hover:text-stone-200"
                        }`}
                      >
                        {key === "village" ? "Wellesley Village" : key === "riverdale" ? "Riverdale" : key === "annex" ? "The Annex" : "GTHA Suburbs"}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedNeighborhood && (
                      <motion.div
                        key={selectedNeighborhood}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 bg-stone-900 border border-stone-850 rounded-xl space-y-2.5"
                      >
                        <p className="font-sans font-bold text-xs text-stone-200">
                          Routing from <span className="text-yellow-500">{neighborhoods[selectedNeighborhood].name}</span>:
                        </p>
                        <p className="text-xs text-stone-300 font-sans leading-relaxed">
                          <strong>Subway / Streetcar:</strong> {neighborhoods[selectedNeighborhood].transit}
                        </p>
                        <p className="text-xs text-stone-400 font-sans leading-relaxed border-t border-stone-800/60 pt-2 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span><strong>Vehicle distance:</strong> {neighborhoods[selectedNeighborhood].distance}. {neighborhoods[selectedNeighborhood].vehicle}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

            </div>
          </div>

          {/* Secure Contact Inquiry form (cols-5) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-[1px] bg-gradient-to-r from-red-500/15 via-orange-500/15 via-yellow-500/15 via-green-500/15 via-blue-500/15 to-purple-500/15 hover:from-red-500/50 hover:via-orange-500/50 hover:via-yellow-500/50 hover:via-green-500/50 hover:via-blue-500/50 hover:to-purple-500/50 transition-all duration-500 shadow-xl relative overflow-hidden group h-full">
              {/* Thin top rainbow accent ribbon inside card */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-purple-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30" />

              <div className="bg-stone-850 p-6 sm:p-8 rounded-[23px] h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="general-inquiry"
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center space-x-2 border-b border-stone-800 pb-4">
                      <MessageSquare className="w-5 h-5 text-rose-500" />
                      <h3 className="font-sans font-bold text-base text-stone-100">Inquiry & Feedback Panel</h3>
                    </div>

                    <p className="text-xs text-stone-400 font-sans leading-normal">
                      Have general inquiries or feedback about custom woodwork projects? Write your email and details below, and we will get back to you!
                    </p>

                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">
                          Full Name / 姓名
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="your name"
                          className="w-full bg-stone-900 border border-stone-800 px-4 py-3 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 text-stone-100"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">
                          Email Address / 电子邮箱
                        </label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className="w-full bg-stone-900 border border-stone-800 px-4 py-3 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 text-stone-100"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-bold text-stone-400 uppercase tracking-widest mb-1">
                          Message Body / 留言内容
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formMsg}
                          onChange={(e) => setFormMsg(e.target.value)}
                          placeholder="Tell us about your home vision, layout ideas, or woodwork goals..."
                          className="w-full bg-stone-900 border border-stone-800 px-4 py-3 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 text-stone-100"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-stone-950 py-3.5 rounded-xl text-xs font-sans font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 border border-yellow-600 cursor-pointer group"
                    >
                      <Send className="w-4 h-4" id="contact-submit-arrow" />
                      <span>Transmit Message to Lockr</span>
                      <ArrowRight className="w-4 h-4 text-stone-800 group-hover:text-stone-955 transition-all duration-200 group-hover:translate-x-1" />
                    </button>

                    <p className="text-[10px] text-stone-500 font-sans text-center leading-normal">
                      Information transmitted securely in Ontario under privacy standards.
                    </p>

                  </motion.form>
                ) : (
                  <motion.div
                    key="form-success"
                    className="text-center py-10 space-y-5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-14 h-14 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" id="contact-success-checkmark" />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-lg text-stone-100">Message Transmitted!</h3>
                      <p className="text-xs text-stone-400 font-sans mt-2 max-w-sm mx-auto leading-relaxed">
                        Hey <span className="font-semibold text-stone-200">{formName}</span>, your message has been sent directly to Lockr Inc.'s local Toronto desk. 
                      </p>
                      <p className="text-xs text-stone-300 font-sans mt-4 italic leading-relaxed bg-stone-900/50 p-4 border border-stone-800/80 rounded-xl">
                        &ldquo;We appreciate your local inquiry. An active builder will inspect your message and reply to <span className="font-sans font-bold text-yellow-500 not-italic underline">{formEmail}</span> within 24 hours.&rdquo;
                      </p>
                    </div>
                    <button
                      onClick={handleResetForm}
                      className="text-stone-400 hover:text-stone-100 text-xs font-sans font-bold uppercase cursor-pointer"
                    >
                      Write Another Message
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
