import { useState } from "react";
import { Heart, Sparkles, Smile, Compass, ChevronLeft, ChevronRight, Hammer, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Philosophy() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const slides = [
    {
      url: "https://lh3.googleusercontent.com/d/1t2ZCZ0F23FsS-_i8N0OBIKnDVFHKaXKe",
      alt: "Premium Custom Living Space 1 by Lockr Inc."
    },
    {
      url: "https://lh3.googleusercontent.com/d/1pkHlDS1oW0es715Ar_gYmc2wWi7FpjAd",
      alt: "Premium Custom Living Space 2 by Lockr Inc."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const commitments = [
    {
      icon: Heart,
      color: "text-rose-500 bg-rose-500/10",
      title: "Affirming Safe Spaces",
      titleZh: "包容安全施工",
      desc: "Our on-site crews are trained in diversity, active listening, and safe-space practices. No judgment, no misgendering, and absolute comfort inside your home.",
      descZh: "我们的施工队伍均接受过包容度与尊重的培训。不论您的身份如何，在您家中的施工过程始终保持十二分的安全舒适与彼此敬重。"
    },
    {
      icon: Sparkles,
      color: "text-yellow-600 bg-yellow-500/10",
      title: "Co-Creative Custom Design",
      titleZh: "协同个性定制",
      desc: "We build for creative families. Your spaces should reflect your story. We collaborate closely on non-traditional floorplans, dynamic layouts, and custom cabinetry.",
      descZh: "我们为所有元家庭与创意人士建造家园。您的空间应当照出您的故事。无论您需要开放隔间、共享更衣室、还是艺术工作区，我们随时倾听并实现。"
    },
    {
      icon: Smile,
      color: "text-emerald-500 bg-emerald-500/10",
      title: "Radical Transparency",
      titleZh: "预算公开透明",
      desc: "Detailed building estimates, no hidden layers, and fixed milestones. Building trust is just as important as building fine oak partitions.",
      descZh: "从报价到交付，绝无隐形成本。固定的节点审核让施工进程明朗，像精挑细选的木料一样诚实无欺。"
    },
    {
      icon: Compass,
      color: "text-indigo-500 bg-indigo-500/10",
      title: "Queer-Led Sensibility",
      titleZh: "包容艺术美学",
      desc: "We blend architectural discipline with a warm, inclusive design language. Perfect lighting, tactile premium materials, and flexible fluid utilities.",
      descZh: "我们将严谨的建筑工艺与充满包容关怀的设计美学融为一体，注重柔性光照，温润质感，以及灵活流畅的功能流线。"
    }
  ];

  return (
    <section id="philosophy" className="py-20 bg-stone-50 text-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with Architectural Backdrop */}
        <div className="relative overflow-hidden bg-stone-950 rounded-3xl p-8 sm:p-12 md:p-16 text-center text-stone-100 shadow-xl mb-16 border border-stone-800">
          <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-30">
            <img
              src="https://lh3.googleusercontent.com/d/1eKt358Nhm9rm58aY6BbfRv5DJiGbBZrl"
              alt="Crafted for Who You Are Architectural Backdrop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/45" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center space-x-2 text-yellow-500 font-sans text-xs font-bold tracking-widest uppercase mb-4"
            >
              <Heart className="w-4 h-4 fill-yellow-500 animate-pulse text-yellow-500" />
              <span>Inclusive Design & Build in Toronto</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
            >
              Crafted for Who You Are. <br className="hidden sm:inline" />
              Designed For Where You Belong.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-sm sm:text-base md:text-lg text-stone-300 font-sans max-w-2xl mx-auto leading-relaxed"
            >
              Your home is more than wood and stone — it is your sanctuary. We are proud members and allies of the Toronto LGBTQ+ community, bringing safe, respectful, and beautiful craftsmanship to home remodeling.
            </motion.p>
          </div>
        </div>

        {/* Brand Showcase Block: Image & Affirming Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* Text panel (cols-5) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-sans font-bold text-2xl text-stone-900 tracking-tight">
              Proudly Centered in Toronto’s Creative Core
              <span className="block text-sm font-sans font-medium text-yellow-600 mt-1 uppercase tracking-wider">
                多伦多市中心包容性装修团队
              </span>
            </h3>
            
            <p className="text-stone-600 font-sans text-sm leading-relaxed">
              Serving Downtown Toronto, Church-Wellesley Village, Riverdale, the Annex, and the Greater Toronto Area. We know that typical construction environments can feel daunting or rigid. That’s why we founded <strong>Lockr Inc.</strong> — to offer a modern, collaborative team that treats you and your relationships with sincere, natural respect.
            </p>
            
            <p className="text-stone-600 font-sans text-sm leading-relaxed">
              Whether you are a modern couple reconfiguring an open-concept loft, a family designing safe study spaces for your children, or someone looking to work with creative local tradespeople who represent the community, we build spaces of trust and high comfort.
            </p>

            <div className="border-t border-stone-100 pt-6">
              <blockquote className="italic text-yellow-800 font-sans text-sm border-l-2 border-yellow-500 pl-4">
                &ldquo;We wanted a contractor who understood our fluid lifestyle and wouldn't raise eyebrows at our customized multi-closet layout. Lockr didn’t just understand it — they perfected it.&rdquo;
                <footer className="text-stone-500 font-medium font-sans text-xs mt-2 not-italic">— Leo & Jordan, Toronto Village Owners</footer>
              </blockquote>
            </div>
          </div>

          {/* Picture Slide/Carousel (cols-7) */}
          <div className="lg:col-span-7 relative h-[320px] sm:h-[450px] w-full overflow-hidden rounded-2xl shadow-lg border border-stone-200 bg-stone-100 group">
            
            {/* Carousel Images with slide animations */}
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 cursor-pointer"
                onClick={() => setLightboxIndex(index)}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  zIndex: currentSlide === index ? 10 : 0
                }}
                transition={{ duration: 0.4 }}
              >
                {currentSlide === index && (
                  <div className="relative w-full h-full overflow-hidden group/img">
                    <img
                      src={slide.url}
                      alt={slide.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                    />
                    {/* Hover Visual Interaction Shield & Label */}
                    <div className="absolute inset-0 bg-stone-950/20 group-hover/img:bg-stone-950/40 transition-colors duration-300 flex items-center justify-center">
                      <div 
                        className="bg-stone-900/90 backdrop-blur-md border border-yellow-500/30 px-4 py-2.5 rounded-xl flex items-center space-x-2 text-yellow-500 shadow-xl opacity-0 group-hover/img:opacity-100 transition-all duration-300 pointer-events-none"
                      >
                        <ZoomIn className="w-4 h-4 text-yellow-500" />
                        <span className="font-sans font-extrabold text-[10.5px] uppercase tracking-wider">View High-Res Photo</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Left Chevron Button */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-stone-900/40 hover:bg-stone-950/85 backdrop-blur-sm text-white transition-all cursor-pointer border border-stone-800"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Chevron Button */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-stone-900/40 hover:bg-stone-950/85 backdrop-blur-sm text-white transition-all cursor-pointer border border-stone-800"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pagination Indicators - Pill dots */}
            <div className="absolute bottom-4 left-4 z-20 flex space-x-1.5 bg-stone-900/30 backdrop-blur-sm py-1.5 px-3 rounded-full border border-white/10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-yellow-500 w-4" : "bg-stone-300 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Circle premium medallion: Circle shape with the logo and name make it premium */}
            <div className="absolute bottom-4 right-4 z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-stone-900/95 backdrop-blur-md border border-stone-700/60 flex flex-col items-center justify-center text-center shadow-2xl p-2 select-none group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-1 rounded-full border border-dashed border-yellow-500/20" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600 p-[1.5px] mb-1 flex items-center justify-center shadow">
                <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center">
                  <Hammer className="w-3.5 h-3.5 text-yellow-500" />
                </div>
              </div>
              <span className="font-sans font-bold text-[9px] sm:text-[10px] text-stone-100 uppercase tracking-widest leading-none mt-1">
                Lockr <span className="text-yellow-500">Inc.</span>
              </span>
              <p className="font-sans text-[7px] text-stone-400 font-medium tracking-wide mt-0.5 leading-none">
                洛克建筑 · 2018
              </p>
            </div>

          </div>

        </div>

        {/* Commitment Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {commitments.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl p-[1px] bg-gradient-to-r from-red-500/15 via-orange-500/15 via-yellow-500/15 via-green-500/15 via-blue-500/15 to-purple-500/15 hover:from-red-500/50 hover:via-orange-500/50 hover:via-yellow-500/50 hover:via-green-500/50 hover:via-blue-500/50 hover:to-purple-500/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-yellow-500/5 group relative overflow-hidden"
              >
                {/* Very thin top rainbow rib ribbon inside card */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-500 via-blue-500 to-purple-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="bg-white p-7 sm:p-8 rounded-[15px] h-full flex flex-col justify-between transition-colors duration-300 group-hover:bg-stone-50/20">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${item.color} shrink-0`}>
                      <Icon className="w-5 h-5" id={`philosophy-item-icon-${index}`} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2 mb-2">
                        <h4 className="font-sans font-bold text-base sm:text-lg text-stone-900 tracking-tight">{item.title}</h4>
                        <span className="font-sans text-xs text-yellow-600 font-medium">{item.titleZh}</span>
                      </div>
                      
                      <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed mb-3">
                        {item.desc}
                      </p>
                      
                      <p className="text-stone-500 font-sans text-xs border-t border-stone-100 pt-2 italic leading-relaxed">
                        {item.descZh}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>

      {/* High-Resolution Picture Lightbox Modal (For big and clean, non-blurry full screen preview) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/95 backdrop-blur-md z-[1000] flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close controls at top right */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white cursor-pointer active:scale-95 transition-all outline-none"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Main Picture Frame */}
            <div 
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()} // Prevent clicking modal frame from shutting the modal
            >
              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                src={slides[lightboxIndex].url}
                alt={slides[lightboxIndex].alt}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-stone-800 bg-black/40"
              />

              {/* Left Arrow inside Lightbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null ? (prev - 1 + slides.length) % slides.length : 0));
                }}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-stone-900/80 hover:bg-stone-850 border border-stone-800 text-white cursor-pointer active:scale-95 transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow inside Lightbox */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null ? (prev + 1) % slides.length : 0));
                }}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-stone-900/80 hover:bg-stone-850 border border-stone-800 text-white cursor-pointer active:scale-95 transition-all"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Description panel below image */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-center max-w-xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-sans font-bold text-sm sm:text-base text-stone-100 tracking-tight">
                {slides[lightboxIndex].alt}
              </h4>
              <p className="font-mono text-[10.5px] text-yellow-500 uppercase tracking-widest mt-1.5 font-bold">
                Lockr Inc. Architectural Presentation Fine Space Remodeling — Toronto
              </p>
              <p className="text-stone-400 text-xs mt-1.5">
                Image {lightboxIndex + 1} of {slides.length} &bull; Click anywhere outside to return.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
