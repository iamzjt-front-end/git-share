import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Commit {
  id: string;
  msg: string;
  type: 'feat' | 'fix' | 'docs' | 'refactor';
}

const commits: Commit[] = [
  { id: 'a1b2c3d', msg: 'feat(auth): 登录核心逻辑', type: 'feat' },
  { id: 'e5f6g7h', msg: 'feat(user): 个人中心模块', type: 'feat' },
  { id: 'i9j0k1l', msg: 'fix(api): 修复并联请求冲突', type: 'fix' },
  { id: 'm2n3o4p', msg: 'feat(pay): 支付SDK集成', type: 'feat' },
  { id: 'q5r6s7t', msg: 'docs: 更新部署方案说明', type: 'docs' },
  { id: 'u8v9w0x', msg: 'refactor: 优化状态管理逻辑', type: 'refactor' },
];

const VerticalLinearGraph: React.FC = () => {
  return (
    <div className="relative w-full h-full py-6 min-h-[500px]">
      {/* 
          垂直轨道线：确保在容器中轴线
      */}
      <div className="absolute left-0 top-0 w-24 h-full flex justify-center pointer-events-none z-0">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: 'calc(100% - 80px)' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-[2px] mt-10 bg-gradient-to-b from-blue-500/80 via-purple-500/50 to-blue-400/20 rounded-full"
        />
      </div>

      <div className="flex flex-col relative z-10 w-full">
        {commits.map((commit, i) => (
          <motion.div
            key={commit.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center mb-12 last:mb-0"
          >
            {/* 节点容器：w-24 确保轨道居中 */}
            <div className="w-24 shrink-0 flex items-center justify-center relative">
              
              {/* 节点背景光晕：绝对定位，确保中心对齐 */}
              {/* Fixed: Use actual AnimatePresence from framer-motion instead of mock to ensure correct children typing */}
              <AnimatePresence>
                {(commit.type === 'feat' || commit.type === 'fix') && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.15, 1] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className={`absolute w-14 h-16 blur-2xl rounded-full z-0 ${
                       commit.type === 'feat' ? 'bg-blue-500/40' : 'bg-red-500/40'
                    }`}
                  />
                )}
              </AnimatePresence>

              {/* 核心物理节点 */}
              <div className="relative z-10 flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full bg-black border-[3px] shadow-lg transition-all duration-700 ${
                  commit.type === 'feat' ? 'border-blue-500 shadow-blue-500/40 scale-110' :
                  commit.type === 'fix' ? 'border-red-500 shadow-red-500/40 scale-110' :
                  'border-gray-700 scale-90'
                }`} />
              </div>
            </div>

            {/* 文字信息层 */}
            <div className="flex flex-col ml-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-gray-500 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {commit.id.toUpperCase()}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-sm tracking-wider ${
                  commit.type === 'feat' ? 'text-blue-400 bg-blue-400/10' :
                  commit.type === 'fix' ? 'text-red-400 bg-red-400/10' :
                  'text-gray-500 bg-gray-500/10'
                }`}>
                  {commit.type}
                </span>
              </div>
              <p className="text-gray-100 font-bold text-lg md:text-xl tracking-tight">
                {commit.msg}
              </p>
            </div>
          </motion.div>
        ))}
        
        {/* 指针标记 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex items-center h-10"
        >
          <div className="w-24 shrink-0 flex items-center justify-center">
             <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
          </div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold bg-blue-400/5 px-3 py-1.5 rounded-lg border border-blue-400/20">
            <span>HEAD -> main, origin/main</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerticalLinearGraph;