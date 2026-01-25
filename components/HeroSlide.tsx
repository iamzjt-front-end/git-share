
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, GitBranch } from 'lucide-react';

interface HeroSlideProps {
  onNext: () => void;
}

const HeroSlide: React.FC<HeroSlideProps> = ({ onNext }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative px-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 text-blue-400 mb-8 bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/20"
      >
        <GitBranch size={20} />
        <span className="text-sm font-bold tracking-widest uppercase">Git 操作规范说明</span>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-black text-center mb-6 tracking-tight leading-tight"
      >
        从混乱到线性：<br/> 
        Rebase <span className="text-blue-500">+</span> Merge 的团队实践
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl text-center font-light leading-relaxed"
      >
        打造清晰、线性、可追溯的代码提交历史，<br/>让版本管理像艺术一样优雅。
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-bold transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)]"
      >
        开始 
        <ChevronRight className="transition-transform group-hover:translate-x-1" />
      </motion.button>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-24 text-gray-500 text-sm flex gap-12"
      >
        <span>↑↓ / Space 翻页</span>
        <span>←→ 导航</span>
      </motion.div>
    </div>
  );
};

export default HeroSlide;
