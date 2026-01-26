import React from 'react';
import { motion } from 'framer-motion';

interface GitGraphStaticComparisonProps {
  minimal?: boolean;
}

const GitGraphStaticComparison: React.FC<GitGraphStaticComparisonProps> = ({ minimal = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-4">
      {/* 历史图 A - 混乱状态 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-red-400">
            {minimal ? "历史图 A" : "1. 直接 Merge 的历史"}
          </h3>
          {!minimal && (
            <span className="text-xs text-gray-500 bg-red-500/10 px-2 py-1 rounded">铁路图 🚂</span>
          )}
        </div>
        <div className="bg-gray-900/40 rounded-3xl border border-red-500/20 p-8 h-[300px] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full h-full" shapeRendering="geometricPrecision">
            {/* 1. 底层导轨 */}
            <line x1="20" y1="100" x2="380" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            
            {/* 2. 分支路径线 */}
            <path d="M 60 100 C 90 100, 110 60, 140 60 L 260 60 C 290 60, 310 100, 340 100" fill="none" stroke="#a855f7" strokeWidth="2.5" />
            <path d="M 100 100 C 130 100, 150 140, 180 140 L 300 140 C 330 140, 350 100, 380 100" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
            
            {/* 3. 主干基准线 (3px 线宽) */}
            <line x1="20" y1="100" x2="380" y2="100" stroke="#666" strokeWidth="3" strokeLinecap="round" />

            {/* 4. 节点层 (顶层，cx 严格对齐基准) */}
            <g>
              {/* 灰色分叉节点修正：cx=60 和 cx=100 是线条分叉的绝对起点数值 */}
              <circle cx="20" cy="100" r="4.5" fill="#888" />
              <circle cx="60" cy="100" r="4.5" fill="#888" />
              <circle cx="100" cy="100" r="4.5" fill="#888" />
              
              {/* 紫色分支节点 */}
              <circle cx="100" cy="80" r="4.5" fill="#a855f7" /> 
              <circle cx="150" cy="60" r="4.5" fill="#a855f7" />
              <circle cx="200" cy="60" r="4.5" fill="#a855f7" />
              <circle cx="250" cy="60" r="4.5" fill="#a855f7" />
              <circle cx="300" cy="80" r="4.5" fill="#a855f7" />
              
              {/* 蓝色分支节点 */}
              <circle cx="140" cy="120" r="4.5" fill="#3b82f6" />
              <circle cx="190" cy="140" r="4.5" fill="#3b82f6" />
              <circle cx="240" cy="140" r="4.5" fill="#3b82f6" />
              <circle cx="290" cy="140" r="4.5" fill="#3b82f6" />
              <circle cx="340" cy="120" r="4.5" fill="#3b82f6" />
              
              {/* 合并节点 (红色，稍微大一点表示重要性) */}
              <circle cx="340" cy="100" r="6" fill="#ef4444" stroke="#000" strokeWidth="1.5" />
              <circle cx="380" cy="100" r="6" fill="#ef4444" stroke="#000" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
        {!minimal && (
          <ul className="text-sm text-gray-500 space-y-2">
            <li className="flex items-center gap-2">❌ 分支交错，时间轴混乱</li>
            <li className="flex items-center gap-2">❌ 充满无意义的 Merge Commit</li>
          </ul>
        )}
      </motion.div>

      {/* 历史图 B - 理想状态 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-green-400">
            {minimal ? "历史图 B" : "2. Rebase 后的历史"}
          </h3>
          {!minimal && (
            <span className="text-xs text-gray-500 bg-green-500/10 px-2 py-1 rounded">一条直线 📏</span>
          )}
        </div>
        <div className="bg-gray-900/40 rounded-3xl border border-green-500/20 p-8 h-[300px] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 400 200" className="w-full h-full" shapeRendering="geometricPrecision">
            {/* 1. 主干线 */}
            <line x1="20" y1="100" x2="380" y2="100" stroke="#3b82f6" strokeWidth="4" />

            {/* 2. 节点组 */}
            <g>
              <circle cx="40" cy="100" r="5" fill="#3b82f6" />
              <circle cx="70" cy="100" r="5" fill="#3b82f6" />
              
              {/* 功能组 A */}
              <rect x="95" y="85" width="80" height="30" rx="15" fill="#a855f7" opacity="0.2" />
              <circle cx="110" cy="100" r="5" fill="#a855f7" />
              <circle cx="135" cy="100" r="5" fill="#a855f7" />
              <circle cx="160" cy="100" r="5" fill="#a855f7" />

              {/* 功能组 B */}
              <rect x="205" y="85" width="55" height="30" rx="15" fill="#10b981" opacity="0.2" />
              <circle cx="220" cy="100" r="5" fill="#10b981" />
              <circle cx="245" cy="100" r="5" fill="#10b981" />

              <circle cx="290" cy="100" r="5" fill="#3b82f6" />
              <circle cx="320" cy="100" r="5" fill="#3b82f6" />
              <circle cx="350" cy="100" r="5" fill="#3b82f6" />
            </g>
          </svg>
        </div>
        {!minimal && (
          <ul className="text-sm text-gray-500 space-y-2">
            <li className="flex items-center gap-2">✅ 历史完全线性，阅读极其顺畅</li>
            <li className="flex items-center gap-2">✅ 功能模块成组展示，回滚极其简单</li>
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default GitGraphStaticComparison;