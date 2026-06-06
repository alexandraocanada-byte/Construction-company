import { useState } from "react";
import { Star, MessageSquare, ShieldCheck, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Testimonial } from "../types";

export default function Reviews() {
  const reviewsList: Testimonial[] = [
    {
      id: "rev1",
      name: "Jason L.",
      role: "Whole Home Remodeling",
      location: "Toronto, ON",
      quote: "The crew from Lockr Inc did an absolutely phenomenal job on our complete home renovation. Their attention to detail was stellar, particularly with the custom millwork and hardwood installations. They respected our timelines, gave transparent and fair pricing, and kept the site incredibly clean. They are highly professional and reliable partners in the GTHA!",
      quoteZh: "洛克建筑团队对我们的整套房子进行了全面翻新，做工和品质都极其出色！特别是他们精细的定制木工和地板安装工艺。不仅工期控制得很好，价格也极其透明合理，每天都会把工地收拾得干干净净。是多伦多周边不可多得的专业且值得信任的装修伙伴！",
      rating: 5,
      date: "April 2026",
      reviewUrl: "https://maps.app.goo.gl/DCPDvvyNY2NeQbYw5"
    },
    {
      id: "rev2",
      name: "Amanda Chen",
      role: "Kitchen & Master Bath Update",
      location: "North York, Toronto",
      quote: "We hired Lockr Inc for our kitchen and master bathroom upgrade and we couldn't be happier with the results. From day one, their supervisor and designers walked us through every step. The custom quartz countertops, seamless tiling, and plumbing rerouting were completed to perfection. Worth every single penny!",
      quoteZh: "我们请洛克建筑团队对厨房和主卧卫浴进行了升级翻新，效果让我们非常惊喜！施工期间从负责人到设计师非常细心，耐心和我们沟通每个步骤。定制大理石台面、无缝瓷砖贴面和水电气管线改道都完成得近乎完美，每一分钱都花得很值！",
      rating: 5,
      date: "March 2026",
      reviewUrl: "https://maps.app.goo.gl/DAnd15m15meE2Gus7"
    },
    {
      id: "rev3",
      name: "Kevin H.",
      role: "Structural Load-Bearing Remodel",
      location: "Hamilton, ON",
      quote: "Outstanding structural and cosmetic work! Removed a main load-bearing wall to create a beautiful open-concept living space. They secured all necessary municipal permits, arranged zoning inspections efficiently, and executed the heavy steel beam installations flawlessly. Lockr's engineering and craftsmanship are second to none.",
      quoteZh: "非常出色的结构与美化工程！他们帮我们拆除了一堵主承重墙，打造了完美的敞开式生活空间。从向市政申请许可证、安排安全检查、到钢梁的精准安装都一气呵成。洛克团队的结构技术和专业工艺确实是安省顶尖水平。",
      rating: 5,
      date: "May 2026",
      reviewUrl: "https://maps.app.goo.gl/DqYMupMArevRBZjMA"
    },
    {
      id: "rev4",
      name: "Zoe & Liam",
      role: "Legal Basement Suite Conversion",
      location: "Burlington, ON",
      quote: "Superb experience working with Lockr Inc on our legal basement suite conversion. Highly professional, transparent, and prompt. They completed the specialized soundproofing, fire ratings, and deep drainage plumbing exactly to local city building codes. The final finish is modern and warm, turning our basement into a gorgeous rentable suite!",
      quoteZh: "与洛克建筑合作完成合法地下室套房改造的体验太棒了！他们高度专业诚实且工期准时。他们严格按照城市建筑规范，完成了高标准的隔音、防火隔离和排水管道敷设工作。成品的现代感和温馨感拉满，给整栋房子增色不少！",
      rating: 5,
      date: "May 2026",
      reviewUrl: "https://maps.app.goo.gl/niGQC3MeBt1vWsRN8"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  return (
    <section id="reviews" className="py-20 bg-stone-50 border-b border-stone-200 overflow-hidden text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-1.5 text-rose-500 font-sans text-xs font-semibold tracking-widest uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
            <span>Guaranteed Local Reputation</span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Loved By Our Community
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-sans max-w-xl mx-auto">
            Read authentic reviews from homeowners and business design projects in Downtown Toronto, Riverdale, and Wellesley Village.
          </p>
        </div>

        {/* Highlight Slider and Community Photo Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Community Project Photo Card */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] border border-stone-250/75 bg-white shadow-sm flex flex-col justify-between group">
            <div className="relative h-[250px] sm:h-[350px] lg:h-full w-full overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/d/1gUUPIqrsAE-q6ma4uCXrukkrcyeCbwFL"
                alt="Loved By Our Community Project Photo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Premium Floating Indicator */}
              <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md text-yellow-500 text-[10px] font-mono uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-xl border border-stone-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Toronto Job</span>
              </div>

              {/* Pride subtle blend overlay in corner */}
              <div className="absolute bottom-4 right-4 bg-stone-900/95 backdrop-blur-md border border-stone-800 px-3 py-2 rounded-xl flex gap-1.5 items-center select-none">
                <span className="text-[9.5px] font-mono font-bold tracking-wider text-stone-100 uppercase">LGBTQ+ Safe Space</span>
                <span className="w-8 h-1.5 bg-gradient-to-r from-red-500 via-yellow-400 via-emerald-400 via-blue-500 to-purple-600 rounded" />
              </div>
            </div>
            
            {/* Visual description */}
            <div className="p-5 border-t border-stone-100 bg-stone-50/55 rounded-b-[2.5rem]">
              <p className="font-sans font-bold text-xs text-stone-800 uppercase tracking-widest">Our Shared Spaces / 共享美好生活</p>
              <p className="font-sans text-xs text-stone-500 leading-relaxed mt-1">
                Reflecting our authentic Torontonian aesthetic — designed with pride, absolute engineering, and comfort for local families.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive reviews slider */}
          <div className="lg:col-span-7 relative bg-white border border-stone-250/75 rounded-[2.5rem] p-6 sm:p-12 shadow-sm flex flex-col justify-between">
            
            <div className="absolute top-6 left-6 text-stone-200 pointer-events-none">
              <Quote className="w-16 h-16 opacity-35" />
            </div>

            <div className="min-h-[280px] flex flex-col justify-between relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Stars Rating and Link */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      {[...Array(reviewsList[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                      <span className="text-xs font-mono font-bold text-stone-500 pl-1">5.0 Star Verified Review</span>
                    </div>
                    {reviewsList[activeIndex].reviewUrl && (
                      <a
                        href={reviewsList[activeIndex].reviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-yellow-600 hover:text-yellow-700 font-sans font-bold hover:underline transition-all"
                      >
                        <span>View original review on Google</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Testimonial Quote block */}
                  <div className="space-y-4">
                    <p className="font-sans text-stone-850 text-base sm:text-lg font-medium leading-relaxed">
                      &ldquo;{reviewsList[activeIndex].quote}&rdquo;
                    </p>
                    
                    <p className="font-sans text-stone-600 text-xs sm:text-sm leading-relaxed italic border-t border-stone-100 pt-3">
                      &ldquo;{reviewsList[activeIndex].quoteZh}&rdquo;
                    </p>
                  </div>

                  {/* Profile block */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <h4 className="font-sans font-bold text-sm text-stone-950 flex items-center gap-1.5">
                        <span>{reviewsList[activeIndex].name}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold font-sans uppercase">
                          Verified
                        </span>
                      </h4>
                      <p className="font-mono text-[10px] text-stone-500 mt-1 uppercase">
                        {reviewsList[activeIndex].role} &middot; {reviewsList[activeIndex].location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-stone-400 font-medium">Verified {reviewsList[activeIndex].date}</span>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation controls */}
              <div className="flex items-center justify-end space-x-3 pt-8 border-t border-stone-100/30 mt-6">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-stone-250 bg-white hover:bg-stone-50 text-stone-700 transition"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <span className="font-mono text-xs text-stone-500 font-semibold px-2">
                  {activeIndex + 1} / {reviewsList.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-stone-250 bg-white hover:bg-stone-50 text-stone-700 transition"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* View all reviews on Google Maps Button */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/%E6%B4%9B%E5%85%8B%E5%BB%BA%E7%AD%91%E8%A3%85%E4%BF%AE+Lockr+Inc/@43.2375048,-80.0390568,11z/data=!4m8!3m7!1s0x882b34cbec25c4ef:0xf8889e9053c30d76!8m2!3d43.6551126!4d-79.3848059!9m1!1b1!16s%2Fg%2F1yh9trl54?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 text-white font-sans font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.01] tracking-wide"
            id="view-all-google-reviews-btn"
          >
            <Star className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span>View All Reviews on Google</span>
            <ExternalLink className="w-4 h-4 text-stone-400" />
          </a>
        </div>

        {/* Trust badge markers row - Styled in pixel-perfect Pride Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 text-center border-t border-stone-200/60 pt-12">
          
          {/* Card 1: 100% Rate */}
          <div className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 p-[1.5px] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
            <div className="h-full p-5 bg-white rounded-[15px] flex flex-col justify-center">
              <span className="font-extrabold font-sans text-3xl text-stone-900 block font-mono">100%</span>
              <span className="font-mono text-[9.5px] text-stone-500 uppercase tracking-widest font-semibold mt-1">
                LGBTQ+ Safe & Affirming Rate
              </span>
            </div>
          </div>

          {/* Card 2: 24 Hour */}
          <div className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 p-[1.5px] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
            <div className="h-full p-5 bg-white rounded-[15px] flex flex-col justify-center">
              <span className="font-extrabold font-sans text-3xl text-stone-900 block font-mono">24 Hour</span>
              <span className="font-mono text-[9.5px] text-stone-500 uppercase tracking-widest font-semibold mt-1">
                In-Home Quote Response
              </span>
            </div>
          </div>

          {/* Card 3: 150+ Projects */}
          <div className="bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 p-[1.5px] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
            <div className="h-full p-5 bg-white rounded-[15px] flex flex-col justify-center">
              <span className="font-extrabold font-sans text-3xl text-stone-900 block font-mono">150+</span>
              <span className="font-mono text-[9.5px] text-stone-500 uppercase tracking-widest font-semibold mt-1">
                Toronto Projects Delivered
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
