import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart, Star, Sparkles, GitBranch, Terminal, Info } from 'lucide-react';

const ThankYouSlide: React.FC = () => {
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHeart(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-black select-none">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', 
            backgroundSize: '50px 50px' 
          }} 
        />
        
        {/* Floating "Git Nodes" Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.4, 0],
              x: [null, (Math.random() - 0.5) * 50]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 10 
            }}
            className="absolute"
          >
            <div className="w-4 h-4 rounded-full border border-blue-500/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Main "Thanks" Text with Glitch/Pop effect */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mb-12"
        >
          <motion.h2 
            className="text-[120px] md:text-[180px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600"
            animate={{ 
              textShadow: [
                "0 0 0px rgba(59,130,246,0)",
                "0 0 20px rgba(59,130,246,0.3)",
                "0 0 0px rgba(59,130,246,0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            谢谢
          </motion.h2>
          
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, x: 20, y: -20, opacity: 0 }}
                animate={{ scale: 1, x: 50, y: -40, opacity: 1 }}
                className="absolute top-0 right-0"
              >
                <Heart className="text-red-500 fill-red-500 w-12 h-12 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Fun Status Message Container */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 group cursor-default"
          >
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <CheckCircle2 size={18} />
            </div>
            <p className="font-mono text-sm md:text-base text-gray-300">
              <span className="text-blue-400">$</span> git rebase <span className="text-green-400">success</span> --clean-history
            </p>
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-5 bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </motion.div>

          {/* New: Explanation text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-[10px] md:text-xs text-gray-500 font-medium flex items-center gap-1.5"
          >
            <Info size={12} className="shrink-0" />
            这不是一条真实的命令，只是一个拟人的语义化总结
          </motion.p>
        </div>

        {/* Bottom Floating Icons */}
        <div className="flex gap-8 mt-20">
          {[
            { icon: <GitBranch className="text-blue-400" />, delay: 1.0 },
            { icon: <Sparkles className="text-yellow-400" />, delay: 1.2 },
            { icon: <Star className="text-purple-400" />, delay: 1.4 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
              }}
              transition={{ 
                opacity: { delay: item.delay },
                y: { delay: item.delay, duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
            >
              {item.icon}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end opacity-20 hover:opacity-100 transition-opacity">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 mb-1">Developed for team sharing</div>
        <div className="text-[10px] font-mono text-gray-600">Built with Framer Motion & Lucide</div>
      </div>
    </div>
  );
};

export default ThankYouSlide;