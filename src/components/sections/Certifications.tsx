import { motion } from "motion/react";
import { Calendar, Award, MapPin, Star } from "lucide-react";

const journeySteps = [
  {
    year: 2026,
    title: "Lead AI Architect",
    description: "Leading generative AI research & deployment at Neural Dynamics.",
    issuer: "Neural Dynamics",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
  },
  {
    year: 2025,
    title: "Senior Full Stack Engineer",
    description: "Built scalable microservices & real-time dashboards for fintech.",
    issuer: "FinScale Inc.",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
  },
  {
    year: 2024,
    title: "AWS Solutions Architect",
    description: "Designed high-availability cloud infrastructure, reduced costs by 30%.",
    issuer: "Amazon Web Services",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
  },
  {
    year: 2023,
    title: "Meta Backend Developer",
    description: "Specialized in GraphQL, distributed systems & high-performance APIs.",
    issuer: "Meta x Coursera",
    location: "Online",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
  },
  {
    year: 2022,
    title: "Google UX Design",
    description: "User-centric design, prototyping, accessibility best practices.",
    issuer: "Google",
    location: "Mountain View, CA",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400",
  },
];

export default function MyJourney() {
  return (
    <section className="py-24 px-4 md:px-6 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-purple-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 flex justify-center gap-2">
              <span className="inline-block w-8 h-px bg-purple-500 self-center" />
              MY JOURNEY
              <span className="inline-block w-8 h-px bg-purple-500 self-center" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              2022 <span className="text-purple-400">→</span> 2026
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Every step, a milestone. Every role, a story.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line (desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500" />

          <div className="space-y-20 md:space-y-28">
            {journeySteps.map((step, idx) => {
              const isLeft = idx % 2 === 0; // even -> left, odd -> right
              return (
                <div key={step.year} className="relative">
                  <div
                    className={`md:flex items-center gap-8 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Card */}
                    <div className={`md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 50, x: isLeft ? -40 : 40 }}
                        whileInView={{ opacity: 1, y: 0, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300">
                          {/* Year ribbon */}
                          <div className="absolute top-4 left-4 z-10 bg-purple-600 text-white text-sm font-mono px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Calendar size={14} /> {step.year}
                          </div>

                          {/* Image */}
                          <div className="relative h-48 md:h-56 overflow-hidden">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://placehold.co/600x400/1e1e2f/white?text=Journey";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">{step.title}</h3>
                            <div className="flex items-center gap-2 text-purple-300 text-sm mb-3">
                              <Award size={14} />
                              <span>{step.issuer}</span>
                              <span className="w-1 h-1 bg-purple-400 rounded-full" />
                              <MapPin size={14} />
                              <span>{step.location}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{step.description}</p>

                            {/* Decorative shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center dot (desktop) */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 bg-purple-500 rounded-full border-4 border-black shadow-lg shadow-purple-500/70" />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>

                  {/* Mobile connector */}
                  {idx !== journeySteps.length - 1 && (
                    <div className="md:hidden flex justify-center my-4">
                      <div className="w-0.5 h-12 bg-gradient-to-b from-purple-500 to-purple-500/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom badge marquee (optional, keeps the spirit) */}
        <div className="relative overflow-hidden w-full mt-32 py-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
          <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex gap-12 items-center">
                {["Meta", "Google", "Amazon", "Coursera", "GitHub", "AWS", "LinkedIn", "Prisma"].map(
                  (brand, i) => (
                    <div key={i} className="text-2xl font-black text-white/30 font-mono flex items-center gap-2">
                      <Star size={18} className="text-purple-400" />
                      {brand.toUpperCase()}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}