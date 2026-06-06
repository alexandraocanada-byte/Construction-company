import { Home, Utensils, Hammer, Store, CheckCircle, Flame, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Services() {
  const servicesList = [
    {
      icon: Home,
      title: "Whole-House Renovations",
      titleZh: "公寓与别墅整房翻新",
      description: "Structural redesigns of Toronto historic houses and high-rise apartments. We coordinate everything from electrical framing, wall insulation, floor structural repairs, to custom partitions and spatial flowing layouts.",
      descriptionZh: "不论是上百年历史的老别墅，还是多伦多市中心的新式公寓，我们承接全套土建重组、隔热保温、地板基层重砌与空间流线优化，交出完美钥匙。",
      bullets: ["Structural redesign", "Premium oak flooring", "Drywall & soundproofing"]
    },
    {
      icon: Utensils,
      title: "Kitchen & Bath Transformations",
      titleZh: "高档厨卫翻新与水电重建",
      description: "Expert stone counters, plumbing rerouting, safe waterproof framing, and beautifully installed high-contrast ceramics. We design bright kitchens and luxurious bathrooms tailored for convenience, joy, and peace of mind.",
      descriptionZh: "专注于高档石材饰面板、隐蔽防水水电重排、安全排水泄水，以及令人心旷神怡的照明与五金安装。打造明亮、极富质感与温度的厨卫环境。",
      bullets: ["Schluter waterproof systems", "Premium stone counters", "Contemporary lighting designs"]
    },
    {
      icon: Hammer,
      title: "Master Carpentry & Millwork",
      titleZh: "精细木活与全套定制橱柜",
      description: "Custom modular cabinets, walk-in closets, built-in library units, solid oak tables, and elegant modern wall moldings. We run our own local wood shop, handproofing every joint and panel for maximum luxury.",
      descriptionZh: "高规定制衣帽间、流线书柜、高档墙面板与天花。我们拥有本地木工坊，亲手挑选温润木料并严丝合缝地拼接安装，散发无与伦比的新木香气与精致度。",
      bullets: ["Canadian oak & walnut", "Soft-close German fittings", "Exquisite wall panel moldings"]
    },
    {
      icon: Store,
      title: "Inclusive Commercial Spaces",
      titleZh: "包容性与创意商业空间",
      description: "Reimagining storefronts and workspaces with accessible, inclusive design principles. We create welcoming, durable commercial environments built to foster community and long-term success.",
      descriptionZh: "重新构想店面与办公空间，融入无障碍与包容性设计原则。我们打造温馨、耐用的商业环境，旨在培育社区感与长久商业成功。",
      bullets: ["ADA compliance", "Custom storefronts", "Commercial lighting"]
    },
  ];

  return (
    <section id="services" className="py-23 bg-brand-accent/5 text-stone-900 overflow-hidden relative">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ 
          backgroundImage: 'url("https://drive.google.com/uc?export=view&id=16woasVUxuFgRueOe3PylSkJzcF6-QPrh")',
          opacity: 0.8
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center space-x-1 text-brand-accent font-sans text-xs font-bold tracking-widest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exquisite Craftsmanship & Construction</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-brand-primary tracking-tight font-extrabold"
          >
            Our Core Building Capabilities
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-base sm:text-lg text-stone-950 font-sans font-extrabold max-w-xl mx-auto"
          >
            Providing structural integrity, fine finishes, and highly detailed master-woodworking to Toronto homes and creative businesses.
          </motion.p>
        </div>

        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {servicesList.map((item, index) => {
            const Icon = item.icon;
            const styles = [
              {
                borderColor: "hover:border-brand-accent/35",
                iconBg: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
                bulletCheck: "text-brand-accent",
                glowBg: "bg-brand-accent/5 group-hover:bg-brand-accent/10"
              },
              {
                borderColor: "hover:border-brand-accent/35",
                iconBg: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
                bulletCheck: "text-brand-accent",
                glowBg: "bg-brand-accent/5 group-hover:bg-brand-accent/10"
              },
              {
                borderColor: "hover:border-brand-accent/35",
                iconBg: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
                bulletCheck: "text-brand-accent",
                glowBg: "bg-brand-accent/5 group-hover:bg-brand-accent/10"
              },
              {
                borderColor: "hover:border-brand-accent/35",
                iconBg: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
                bulletCheck: "text-brand-accent",
                glowBg: "bg-brand-accent/5 group-hover:bg-brand-accent/10"
              }
            ][index] || {
              borderColor: "hover:border-brand-accent/30",
              iconBg: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
              bulletCheck: "text-brand-accent",
              glowBg: "bg-brand-accent/5 group-hover:bg-brand-accent/10"
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl p-[1px] bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 hover:from-brand-accent/50 hover:via-brand-accent/30 hover:to-brand-accent/50 transition-all duration-500 shadow-xl relative group overflow-hidden"
              >
                {/* Thin top rainbow accent ribbon inside card */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-brand-accent opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="bg-white/95 p-7 sm:p-8 rounded-[15px] h-full flex flex-col justify-between transition-all duration-300">
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none transition-all ${styles.glowBg}`} />
                  
                  <div>
                    <div className={`p-3 border rounded-xl w-fit mb-6 relative z-10 ${styles.iconBg}`}>
                      <Icon className="w-6 h-6" id={`services-item-icon-${index}`} />
                    </div>

                    <div className="flex flex-wrap items-baseline gap-2 mb-3 relative z-10">
                      <h3 className="font-display font-bold text-xl text-brand-primary tracking-tight">{item.title}</h3>
                      <span className="font-sans text-xs text-stone-800 font-bold">{item.titleZh}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-950 font-sans font-bold leading-relaxed mb-4 relative z-10">
                      {item.description}
                    </p>

                    <p className="text-xs text-stone-900 font-sans font-bold leading-relaxed mb-6 italic border-t border-stone-300 pt-3 relative z-10">
                      {item.descriptionZh}
                    </p>
                  </div>

                  <div className="border-t border-stone-200 pt-4 mt-auto relative z-10">
                    <div className="flex flex-wrap gap-2">
                      {item.bullets.map((bullet, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-50 text-stone-800 px-3 py-1 rounded-full text-xs font-sans font-bold flex items-center space-x-1"
                        >
                          <CheckCircle className={`w-3 h-3 ${styles.bulletCheck}`} />
                          <span>{bullet}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
