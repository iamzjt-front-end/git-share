import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, AlertCircle, Skull, Activity, Flame, GitCommit, GitPullRequest, Info } from 'lucide-react';

const ChaosVisualizer: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((s) => (s + 1) % 5);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const developers = [
    { id: 'A', name: '张三', color: '#ef4444', task: 'Auth' },
    { id: 'B', name: '李四', color: '#3b82f6', task: 'User' },
    { id: 'C', name: '王五', color: '#10b981', task: 'Pay' },
    { id: 'D', name: '赵六', color: '#f59e0b', task: 'Cart' },
    { id: 'E', name: '小陈', color: '#a855f7', task: 'CSS' },
  ];

  const currentStatusColor = ['#3b82f6', '#10b981', '#f59e0b', '#f97316', '#ef4444'][stage];

  const CommitNode = ({ cx, cy, color, delay = 0, size = 4 }) => (
    <motion.circle
      cx={cx} cy={cy} r={size}
      fill={color}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
    />
  );

  return (
    <div className="w-full flex flex-col gap-6 py-4">
      <div className="grid grid-cols-5 gap-4 w-full max-w-5xl mx-auto">
        {developers.map((dev, i) => (
          <motion.div
            key={dev.id}
            animate={{ 
              opacity: stage >= 1 ? 1 : 0.3,
              borderColor: stage >= 1 ? `${dev.color}40` : 'rgba(255,255,255,0.05)',
              y: stage === 1 ? -4 : 0
            }}
            className="p-4 rounded-2xl border-b-4 bg-gray-900/60 flex flex-col items-center gap-2 transition-all duration-500 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm" style={{ backgroundColor: `${dev.color}20`, color: dev.color }}>
              {dev.id}
            </div>
            <span className="text-xs text-gray-300 font-bold">{dev.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-gray-500 font-mono border border-white/5">{dev.task}</span>
          </motion.div>
        ))}
      </div>

      <div className={`relative w-full h-[400px] bg-black/40 rounded-3xl border transition-all duration-1000 overflow-hidden flex items-center justify-center shadow-2xl ${stage === 4 ? 'border-red-500/50' : 'border-white/5'}`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />

        <AnimatePresence>
          {stage === 4 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-6 border-2 border-red-500/30 rounded-2xl pointer-events-none z-10 shadow-[inset_0_0_50px_rgba(239,68,68,0.1)]"
            />
          )}
        </AnimatePresence>

        <motion.svg 
          viewBox="0 0 800 400" 
          className="w-full h-full overflow-visible"
          animate={stage === 4 ? { x: [-0.3, 0.3, -0.3, 0], y: [0.3, -0.3, 0.3, 0] } : {}}
          transition={{ repeat: Infinity, duration: 0.25 }}
        >
          <line x1="50" y1="200" x2="750" y2="200" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="8 12" />
          
          <AnimatePresence>
            <CommitNode cx={100} cy={200} color="#3b82f6" delay={0.2} size={6} />
            <text x="100" y="235" fill="#444" fontSize="10" className="font-bold tracking-tighter" textAnchor="middle">CHECKOUT POINT</text>

            {stage >= 1 && (
              <g>
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 100 200 C 150 200, 200 80, 300 80 L 500 80" stroke="#ef4444" strokeWidth="3" fill="none" transition={{ duration: 1.5 }} />
                <CommitNode cx={181.25} cy={140} color="#ef4444" delay={0.8} />
                <CommitNode cx={300} cy={80} color="#ef4444" delay={1.2} />

                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 100 200 C 180 200, 250 280, 320 280 L 600 280" stroke="#3b82f6" strokeWidth="3" fill="none" transition={{ duration: 1.5, delay: 0.2 }} />
                <CommitNode cx={213.75} cy={240} color="#3b82f6" delay={1.0} />
                <CommitNode cx={350} cy={280} color="#3b82f6" delay={1.4} />

                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 100 200 C 150 200, 250 340, 400 340 L 550 340" stroke="#10b981" strokeWidth="3" fill="none" transition={{ duration: 1.5, delay: 0.4 }} />
                <CommitNode cx={212.5} cy={270} color="#10b981" delay={1.3} />
              </g>
            )}

            {stage >= 2 && (
              <g>
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 320 200 C 330 200, 380 280, 320 280" stroke="#444" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <CommitNode cx={320} cy={280} color="#3b82f6" delay={0.5} size={8} />
                <text x="335" y="272" fill="#3b82f6" fontSize="10" className="font-bold italic">Merge 'main' into User</text>
                <CommitNode cx={420} cy={225} color="#555" delay={0.6} />
              </g>
            )}

            {stage >= 3 && (
              <g>
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 320 280 C 450 280, 500 40, 600 40 L 700 40" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <CommitNode cx={500} cy={140} color="#f59e0b" delay={0.5} />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 400 340 C 550 340, 600 160, 720 160" stroke="#a855f7" strokeWidth="3" fill="none" />
                <CommitNode cx={625} cy={232} color="#a855f7" delay={0.7} />
              </g>
            )}

            {stage >= 4 && (
              <g>
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 700 40 C 740 40, 745 200, 750 200" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 720 160 C 740 160, 745 200, 750 200" stroke="#a855f7" strokeWidth="3" fill="none" />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} d="M 600 280 C 700 280, 740 200, 750 200" stroke="#3b82f6" strokeWidth="3" fill="none" />
                
                <motion.circle 
                  cx="750" cy="200" r="22" 
                  fill="#ef4444" 
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
                
                <motion.g animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                   <foreignObject x="738" y="188" width="24" height="24">
                      <Flame className="text-white" size={24} />
                   </foreignObject>
                </motion.g>
                
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                   <rect x="620" y="240" width="140" height="24" rx="4" fill="#000" stroke="#ef4444" strokeWidth="1" opacity="0.9" />
                   <text x="630" y="256" fill="#ef4444" fontSize="11" className="font-black italic">⚠️ CONFLICTS DETECTED</text>
                </motion.g>
              </g>
            )}
          </AnimatePresence>
        </motion.svg>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-gray-900/60 border border-white/10 p-8 rounded-3xl flex items-center gap-8 shadow-2xl relative"
          >
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${stage === 4 ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'}`}>
              {stage === 4 ? <Skull size={44} /> : stage >= 2 ? <AlertCircle size={44} /> : <Info size={44} />}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-4">
                 <h5 className="font-black text-2xl tracking-tight" style={{ color: currentStatusColor }}>
                  阶段 {stage}: {['宁静开端', '并发发散', '逻辑交叉', '混沌初现', '熵增爆发'][stage]}
                </h5>
                {stage >= 3 && <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest animate-pulse">Danger Zone</span>}
              </div>
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                {stage === 0 && "项目起始：所有人都基于同一个 commit 检出，这是历史中唯一的‘有序’时刻。"}
                {stage === 1 && "并发工作：团队成员各自启动任务。在没有合并之前，各个分支的历史保持平行。"}
                {stage === 2 && "回填合并：李四通过 Standard Merge 尝试同步主干，导致历史图谱产生多余节点，破坏线性。"}
                {stage === 3 && "复杂度激增：更多人加入交叉合并，开发意图被揉碎在层叠的合并节点中。"}
                {stage === 4 && "最终摊牌：当所有乱麻尝试回归主干，逻辑冲突、无效测试和难以定位的 Bug 将全面爆发。"}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-12 w-full max-w-5xl mx-auto mt-4 px-4">
        <div className="space-y-2">
            <span className="text-[11px] text-gray-500 uppercase tracking-widest font-black">历史噪声级别</span>
            <div className="flex items-baseline gap-2">
              <motion.span 
                animate={{ color: currentStatusColor }} 
                className="text-6xl font-black transition-colors duration-500 tabular-nums tracking-tighter"
              >
                {Math.min(stage * 24 + 5, 93)}%
              </motion.span>
              <Activity size={18} className="text-gray-700" />
            </div>
        </div>

        <div className="space-y-2">
            <span className="text-[11px] text-gray-500 uppercase tracking-widest font-black">GIT BISECT 复杂度</span>
            <div className="flex items-baseline gap-2">
              <motion.span 
                animate={{ color: currentStatusColor }} 
                className="text-5xl font-black transition-colors duration-500"
              >
                {['线性', '多项式', '指数', '混沌', 'Infinity'][stage]}
              </motion.span>
              <GitPullRequest size={18} className="text-gray-700" />
            </div>
        </div>

        <div className="flex flex-col justify-end pb-2">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] text-gray-500 uppercase tracking-widest font-black">排障心智负担</span>
              <motion.span 
                animate={{ color: currentStatusColor }}
                className="text-xs font-black uppercase tracking-widest"
              >
                {['ZEN', 'ZEN', 'HIGH', 'STRESS', 'CRITICAL'][stage]}
              </motion.span>
            </div>
            <div className="h-4 w-full bg-white/5 rounded-full border border-white/5 overflow-hidden relative shadow-inner">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ 
                  width: `${(stage + 1) * 20}%`,
                  boxShadow: stage === 4 ? '0 0 20px rgba(239,68,68,0.5)' : 'none'
                }}
                transition={{ duration: 1, ease: "circOut" }}
                className="h-full rounded-full relative"
                style={{ 
                  backgroundImage: 'linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444)',
                }}
              >
                <motion.div 
                  animate={{ opacity: [0, 0.4, 0], x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-white"
                />
              </motion.div>
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
              <span>平静 (ZEN)</span>
              <span>压力 (STRESS)</span>
              <span>混乱 (CHAOS)</span>
            </div>
        </div>
      </div>

      <div className="text-center opacity-30 mt-6 flex items-center justify-center gap-3">
        <div className="h-px w-20 bg-gray-800" />
        <p className="text-xs italic text-gray-400">“每一次无谓的 Standard Merge，都在透支未来的排障生命力。”</p>
        <div className="h-px w-20 bg-gray-800" />
      </div>
    </div>
  );
};

export default ChaosVisualizer;