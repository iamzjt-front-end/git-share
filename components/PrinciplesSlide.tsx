
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

const PrinciplesSlide: React.FC = () => {
  const principles = [
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

  return (
    <div className="w-full h-full flex flex-col p-12 md:p-24 justify-center">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">三个关键原则</h2>
        
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
      </div>
    </div>
  );
};

export default PrinciplesSlide;
