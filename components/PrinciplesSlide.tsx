import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle2, ShieldAlert, Zap, Info } from 'lucide-react';

interface Principle {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface PrinciplesSlideProps {
  customPrinciples?: Principle[];
}

const PrinciplesSlide: React.FC<PrinciplesSlideProps> = ({ customPrinciples }) => {
  const defaultPrinciples = [
    {
      icon: <RefreshCw size={40} className="text-blue-400" />,
      title: "原则一：频繁同步",
      desc: "定期将基准分支的最新更改 rebase 到功能分支，减少最后的冲突压力。"
    },
    {
      icon: <CheckCircle2 size={40} className="text-green-400" />,
      title: "原则二：合并前必变基",
      desc: "在发起 PR/MR 之前，必须先执行 rebase，保证合并历史的干净纯粹。"
    },
    {
      icon: <ShieldAlert size={40} className="text-red-400" />,
      title: "原则三：保护公共分支",
      desc: "基准分支只接受 Fast-Forward Merge。严禁对 main/develop 等分支进行 Rebase。"
    }
  ];

  const principles = customPrinciples || defaultPrinciples;

  return (
    <div className="w-full h-full flex flex-col p-12 md:p-24 justify-center">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center tracking-tight">核心原则</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.08] transition-all hover:translate-y-[-10px] group"
            >
              <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Fast-forward explanation block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 bg-blue-500/5 border border-blue-500/20 rounded-[2.5rem] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <Zap size={120} className="text-blue-400" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Zap size={32} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h4 className="text-2xl font-bold text-blue-100">什么是 Fast-forward 合并？</h4>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 font-black tracking-widest uppercase">推荐模式</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-4xl">
                当主干分支在开发期间没有新提交时，Git 只需将主干指针<span className="text-blue-300 font-bold">直接移动</span>到功能分支的末端。这种合并方式<span className="text-white font-medium">不产生额外的 Merge Commit 节点</span>，能够保证提交历史像一条直线一样清晰。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrinciplesSlide;