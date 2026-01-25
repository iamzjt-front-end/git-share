
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitMerge, GitBranch, RefreshCw, Play } from 'lucide-react';

type Workflow = 'merge' | 'rebase';

const GitFlowVisualizer: React.FC = () => {
  const [workflow, setWorkflow] = useState<Workflow>('merge');
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const reset = () => {
    setIsPlaying(false);
    setKey(prev => prev + 1);
  };

  // Timeline Constants (Seconds)
  const T_A = 0.2;
  const T_B = 0.5;
  const T_FEAT_PATH = 0.8;
  const T_C1 = 1.2;
  const T_C2 = 1.6;
  const T_D = 2.0;
  const T_E = 2.4;
  const T_REBASE_START = 3.5;

  return (
    <div className="w-full flex flex-col gap-4 max-w-4xl mx-auto">
      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => { setWorkflow('merge'); reset(); }}
          className={`px-4 py-2 rounded-full flex items-center gap-2 border text-sm transition-all ${workflow === 'merge' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/5 border-white/10 text-gray-500'}`}
        >
          <GitMerge size={16} /> 标准 Merge
        </button>
        <button
          onClick={() => { setWorkflow('rebase'); reset(); }}
          className={`px-4 py-2 rounded-full flex items-center gap-2 border text-sm transition-all ${workflow === 'rebase' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500'}`}
        >
          <GitBranch size={16} /> Rebase + Merge
        </button>
        <button
          onClick={reset}
          className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Visualizer Canvas */}
      <div className="h-[280px] md:h-[320px] w-full bg-gray-900/40 rounded-3xl border border-white/10 relative overflow-hidden flex items-center justify-center p-4 shadow-2xl">
        {!isPlaying && (
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute z-10 flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <Play fill="white" size={24} className="text-white ml-1" />
            </div>
            <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px]">点击播放演进动画</span>
          </button>
        )}

        <svg viewBox="0 0 800 300" className="w-full h-full overflow-visible" key={key}>
          {/* Background Track Guides */}
          <line x1="50" y1="180" x2="750" y2="180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="50" y1="110" x2="750" y2="110" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          
          <AnimatePresence>
            {isPlaying && (
              <g>
                {/* --- 1. LINES (RENDERED FIRST/BENEATH) --- */}
                <motion.path 
                  d="M 100 180 L 400 180" 
                  stroke="#3b82f6" 
                  strokeWidth="3" 
                  fill="none" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.4, ease: "linear" }}
                />

                <motion.path 
                  d="M 200 180 C 250 180, 280 110, 330 110 L 500 110" 
                  stroke="#a855f7" 
                  strokeWidth="3" 
                  fill="none" 
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: workflow === 'rebase' ? [0, 1, 1, 0] : 1,
                    opacity: workflow === 'rebase' ? [1, 1, 1, 0] : 1
                  }}
                  transition={{ 
                    pathLength: { delay: T_FEAT_PATH, duration: workflow === 'rebase' ? 3.5 : 1.2 },
                    opacity: { delay: T_REBASE_START + 0.2, duration: 0.5 }
                  }}
                />

                {workflow === 'merge' ? (
                  <g>
                    <motion.path 
                      d="M 400 180 L 650 180" 
                      stroke="#3b82f6" 
                      strokeWidth="3" 
                      fill="none" 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 2.8, duration: 0.8 }}
                    />
                    <motion.path 
                      d="M 500 110 C 550 110, 600 180, 650 180" 
                      stroke="#ef4444" 
                      strokeWidth="3" 
                      strokeDasharray="5,5"
                      fill="none" 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 3.0, duration: 0.8 }}
                    />
                  </g>
                ) : (
                  <g>
                    <motion.path 
                      d="M 400 180 L 600 180" 
                      stroke="#a855f7" 
                      strokeWidth="3" 
                      fill="none" 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: T_REBASE_START + 0.6, duration: 0.8 }}
                    />
                  </g>
                )}

                {/* --- 2. NODES (RENDERED LAST/ON TOP) --- */}
                <CommitNode x={100} y={180} label="A" color="#3b82f6" delay={T_A} />
                <CommitNode x={200} y={180} label="B" color="#3b82f6" delay={T_B} />
                <CommitNode x={300} y={180} label="D" color="#3b82f6" delay={T_D} />
                <CommitNode x={400} y={180} label="E" color="#3b82f6" delay={T_E} />
                
                <CommitNode 
                  x={350} y={110} 
                  targetX={workflow === 'rebase' ? 500 : undefined} 
                  targetY={workflow === 'rebase' ? 180 : undefined}
                  label={workflow === 'rebase' ? "C1'" : "C1"} 
                  color="#a855f7" 
                  delay={T_C1}
                  moveDelay={T_REBASE_START}
                />
                <CommitNode 
                  x={450} y={110} 
                  targetX={workflow === 'rebase' ? 600 : undefined} 
                  targetY={workflow === 'rebase' ? 180 : undefined}
                  label={workflow === 'rebase' ? "C2'" : "C2"} 
                  color="#a855f7" 
                  delay={T_C2}
                  moveDelay={T_REBASE_START + 0.2}
                />

                {workflow === 'merge' ? (
                  <g>
                    <CommitNode x={650} y={180} label="M" color="#ef4444" delay={3.8} />
                    <motion.text 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 4.2 }}
                      x="650" y="225" fill="#ef4444" fontSize="12" textAnchor="middle" className="font-bold"
                    >
                      Merge Commit (保留分叉轨迹)
                    </motion.text>
                  </g>
                ) : (
                  <g>
                    <motion.text 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ delay: T_REBASE_START - 0.5, duration: 2.5 }}
                      x="400" y="60" fill="#a855f7" fontSize="14" textAnchor="middle" className="font-black uppercase tracking-[0.3em]"
                    >
                      Translating Commits...
                    </motion.text>
                    <motion.text 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: T_REBASE_START + 1.5 }}
                      x="550" y="225" fill="#a855f7" fontSize="12" textAnchor="middle" className="font-bold"
                    >
                      完全线性历史 (Clean Fast-forward)
                    </motion.text>
                  </g>
                )}
              </g>
            )}
          </AnimatePresence>
          
          <text x="50" y="185" fill="#3b82f6" fontSize="11" fontWeight="800" opacity="0.3">MAIN</text>
          <text x="50" y="115" fill="#a855f7" fontSize="11" fontWeight="800" opacity="0.3">FEATURE</text>
        </svg>
      </div>

      {/* Logic Documentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <p className="text-gray-500 text-[10px] mb-1 uppercase tracking-wider">交互逻辑</p>
          <h3 className={`text-lg font-bold ${workflow === 'merge' ? 'text-red-400' : 'text-purple-400'}`}>
            {workflow === 'merge' ? '轨迹保留' : '提交平移' }
          </h3>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <p className="text-gray-500 text-[10px] mb-1 uppercase tracking-wider">技术要点</p>
          <p className="text-gray-300 text-xs leading-relaxed">
            {workflow === 'merge' 
              ? '通过平滑曲线保留分支生命周期。' 
              : '提交逐个平移到 Main 顶端，获得完美线性历史。' }
          </p>
        </div>
      </div>
    </div>
  );
};

interface CommitNodeProps {
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  label: string;
  color: string;
  delay: number;
  moveDelay?: number;
}

const CommitNode: React.FC<CommitNodeProps> = ({ 
  x, y, targetX, targetY,
  label, color, delay, 
  moveDelay = 0
}) => {
  const isMoving = targetX !== undefined && targetY !== undefined;

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0, x, y }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: isMoving ? [x, x, targetX] : x,
        y: isMoving ? [y, y, targetY] : y
      }}
      transition={{ 
        scale: { type: "spring", stiffness: 260, damping: 20, delay },
        opacity: { duration: 0.3, delay },
        x: { duration: 1.0, times: [0, 0.2, 1], delay: moveDelay, ease: "easeInOut" },
        y: { duration: 1.0, times: [0, 0.2, 1], delay: moveDelay, ease: "easeInOut" }
      }}
    >
      <circle cx={0} cy={0} r="14" fill={color} className="shadow-[0_0_20px_rgba(0,0,0,0.6)]" />
      <circle cx={0} cy={0} r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <text 
        x={0} 
        y={4} 
        fill="white" 
        fontSize="9" 
        fontWeight="900" 
        textAnchor="middle"
      >
        {label}
      </text>
    </motion.g>
  );
};

export default GitFlowVisualizer;
