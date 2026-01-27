import React from 'react';
import { motion } from 'framer-motion';

interface GitGraphStaticComparisonProps {
  minimal?: boolean;
}

/**
 * GitGraphStaticComparison
 * A component visualizing the structural difference between "Merge Chaos" and "Linear History".
 * 
 * DESIGN CONSTRAINTS (Strict Alignment):
 * - Main Trunk Baseline: y = 100
 * - Time Ticks (X-axis): [20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380]
 * - Branch Y-Levels: 40 (Top 2), 70 (Top 1), 130 (Bottom 1), 160 (Bottom 2)
 */
const GitGraphStaticComparison: React.FC<GitGraphStaticComparisonProps> = ({ minimal = false }) => {
  const mainY = 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-4">
      {/* 历史图 A - 极端复杂的多人异步协作历史 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-red-400">
            {minimal ? "历史图 A" : "1. 极端复杂的多人异步协作历史"}
          </h3>
          {!minimal && (
            <span className="text-xs text-gray-500 bg-red-500/10 px-2 py-1 rounded">铁路乱麻 🚂🌪️</span>
          )}
        </div>
        <div className="bg-gray-900/40 rounded-3xl border border-red-500/20 p-8 h-[340px] flex items-center justify-center overflow-hidden relative">
          <svg viewBox="0 0 400 200" className="w-full h-full" shapeRendering="geometricPrecision">
            {/* 1. 主干辅助背景线 */}
            <line x1="20" y1={mainY} x2="380" y2={mainY} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            
            {/* 2. 异步分支路径 (结构性复杂度) */}
            <g opacity="0.8">
              {/* 分支 5: 粉色 (Bottom 1) - T20检出, T80合并 */}
              <path d="M 20 100 C 35 100, 35 130, 50 130 L 65 130 C 75 130, 75 100, 80 100" fill="none" stroke="#ec4899" strokeWidth="2" />

              {/* 分支 1: 紫色 (Top 1) - T50检出, T140合并 */}
              <path d="M 50 100 C 65 100, 65 70, 80 70 L 125 70 C 135 70, 135 100, 140 100" fill="none" stroke="#a855f7" strokeWidth="2" />
              
              {/* 分支 7: 柠檬绿 (Top 2) - T50检出, T230合并 (超长路径) */}
              <path d="M 50 100 C 65 100, 65 40, 80 40 L 215 40 C 225 40, 225 100, 230 100" fill="none" stroke="#84cc16" strokeWidth="2" />

              {/* 分支 2: 蓝色 (Bottom 1) - T80检出, T260合并 */}
              <path d="M 80 100 C 95 100, 95 130, 110 130 L 245 130 C 255 130, 255 100, 260 100" fill="none" stroke="#3b82f6" strokeWidth="2" />
              
              {/* 分支 3: 绿色 (Bottom 2) - T170从蓝色分支检出, T290合并 */}
              <path d="M 170 130 C 185 130, 185 160, 200 160 L 275 160 C 285 160, 285 100, 290 100" fill="none" stroke="#10b981" strokeWidth="2" />
              
              {/* 分支 6: 青色 (Top 1) - T200检出, T320合并 */}
              <path d="M 200 100 C 215 100, 215 70, 230 70 L 305 70 C 315 70, 315 100, 320 100" fill="none" stroke="#06b6d4" strokeWidth="2" />

              {/* 分支 4: 橙色 (Top 2) - T260检出, T350合并 */}
              <path d="M 260 100 C 275 100, 275 40, 290 40 L 335 40 C 345 40, 345 100, 350 100" fill="none" stroke="#f59e0b" strokeWidth="2" />
            </g>

            {/* 3. 基础主干线 */}
            <line x1="20" y1={mainY} x2="380" y2={mainY} stroke="#333" strokeWidth="4" strokeLinecap="round" />

            {/* 4. 节点层 (严格网格对齐) */}
            <g>
              {/* 主干原始提交 (灰色) */}
              <circle cx="20" cy={mainY} r="4" fill="#666" />
              <circle cx="50" cy={mainY} r="4" fill="#666" />
              <circle cx="110" cy={mainY} r="4" fill="#666" />
              <circle cx="170" cy={mainY} r="4" fill="#666" />
              <circle cx="200" cy={mainY} r="4" fill="#666" />
              <circle cx="380" cy={mainY} r="4" fill="#666" />

              {/* 合并提交 (红色) - 严格对齐 y=100 */}
              <circle cx="80" cy={mainY} r="5" fill="#ef4444" stroke="#000" strokeWidth="1" /> {/* 粉色合并 */}
              <circle cx="140" cy={mainY} r="5" fill="#ef4444" stroke="#000" strokeWidth="1" /> {/* 紫色合并 */}
              <circle cx="230" cy={mainY} r="5" fill="#ef4444" stroke="#000" strokeWidth="1" /> {/* 柠檬绿合并 */}
              <circle cx="260" cy={mainY} r="5" fill="#ef4444" stroke="#000" strokeWidth="1" /> {/* 蓝色合并 */}
              <circle cx="290" cy={mainY} r="5" fill="#ef4444" stroke="#000" strokeWidth="1" /> {/* 绿色合并 */}
              <circle cx="320" cy={mainY} r="5" fill="#ef4444" stroke="#000" strokeWidth="1" /> {/* 青色合并 */}
              <circle cx="350" cy={mainY} r="5" fill="#ef4444" stroke="#000" strokeWidth="1" /> {/* 橙色合并 */}

              {/* 各分支开发提交 */}
              <circle cx="50" cy="130" r="3" fill="#ec4899" />
              
              <circle cx="80" cy="70" r="3" fill="#a855f7" />
              <circle cx="110" cy="70" r="3" fill="#a855f7" />
              
              <circle cx="80" cy="40" r="3" fill="#84cc16" />
              <circle cx="110" cy="40" r="3" fill="#84cc16" />
              <circle cx="140" cy="40" r="3" fill="#84cc16" />
              <circle cx="170" cy="40" r="3" fill="#84cc16" />
              <circle cx="200" cy="40" r="3" fill="#84cc16" />
              
              <circle cx="110" cy="130" r="3" fill="#3b82f6" />
              <circle cx="140" cy="130" r="3" fill="#3b82f6" />
              <circle cx="170" cy="130" r="3" fill="#3b82f6" />
              <circle cx="200" cy="130" r="3" fill="#3b82f6" />
              <circle cx="230" cy="130" r="3" fill="#3b82f6" />
              
              <circle cx="200" cy="160" r="3" fill="#10b981" />
              <circle cx="230" cy="160" r="3" fill="#10b981" />
              <circle cx="260" cy="160" r="3" fill="#10b981" />
              
              <circle cx="230" cy="70" r="3" fill="#06b6d4" />
              <circle cx="260" cy="70" r="3" fill="#06b6d4" />
              <circle cx="290" cy="70" r="3" fill="#06b6d4" />
              
              <circle cx="290" cy="40" r="3" fill="#f59e0b" />
              <circle cx="320" cy="40" r="3" fill="#f59e0b" />
            </g>
          </svg>
        </div>
        {!minimal && (
          <ul className="text-sm text-gray-500 space-y-2">
            <li className="flex items-center gap-2">❌ 7个并行开发分支，提交线极度交织，语义全失</li>
            <li className="flex items-center gap-2">❌ 主干几乎被 Merge 节点淹没，正常的提交逻辑被彻底碎片化</li>
            <li className="flex items-center gap-2">❌ 大型项目若不采用 Rebase，历史图谱将永久沦为“不可读状态”</li>
          </ul>
        )}
      </motion.div>

      {/* 历史图 B - 理想线性历史 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-green-400">
            {minimal ? "历史图 B" : "2. Rebase 后的线性历史"}
          </h3>
          {!minimal && (
            <span className="text-xs text-gray-500 bg-green-500/10 px-2 py-1 rounded">逻辑序列 📏</span>
          )}
        </div>
        <div className="bg-gray-900/40 rounded-3xl border border-green-500/20 p-8 h-[340px] flex items-center justify-center overflow-hidden relative">
          <svg viewBox="0 0 400 200" className="w-full h-full" shapeRendering="geometricPrecision">
            {/* 1. 唯一的、笔直的主干 */}
            <line x1="20" y1={mainY} x2="380" y2={mainY} stroke="#3b82f6" strokeWidth="4" />

            {/* 2. 节点组 (线性排布，语义化分层) */}
            <g>
              <circle cx="30" cy={mainY} r="5" fill="#3b82f6" />
              <circle cx="55" cy={mainY} r="5" fill="#3b82f6" />
              
              {/* 功能组 A */}
              <rect x="75" y="85" width="40" height="30" rx="15" fill="#ec4899" opacity="0.15" />
              <circle cx="95" cy={mainY} r="5" fill="#ec4899" />

              {/* 功能组 B */}
              <rect x="125" y="85" width="55" height="30" rx="15" fill="#a855f7" opacity="0.15" />
              <circle cx="140" cy={mainY} r="5" fill="#a855f7" />
              <circle cx="165" cy={mainY} r="5" fill="#a855f7" />

              {/* 功能组 C (汇合了原来的长路径) */}
              <rect x="190" y="85" width="105" height="30" rx="15" fill="#10b981" opacity="0.15" />
              <circle cx="205" cy={mainY} r="5" fill="#10b981" />
              <circle cx="230" cy={mainY} r="5" fill="#10b981" />
              <circle cx="255" cy={mainY} r="5" fill="#10b981" />
              <circle cx="280" cy={mainY} r="5" fill="#10b981" />

              {/* 功能组 D */}
              <rect x="305" y="85" width="55" height="30" rx="15" fill="#f59e0b" opacity="0.15" />
              <circle cx="320" cy={mainY} r="5" fill="#f59e0b" />
              <circle cx="345" cy={mainY} r="5" fill="#f59e0b" />

              <circle cx="375" cy={mainY} r="5" fill="#3b82f6" />
            </g>
          </svg>
        </div>
        {!minimal && (
          <ul className="text-sm text-gray-500 space-y-2">
            <li className="flex items-center gap-2">✅ 每个功能表现为一段连续的、逻辑严密的提交区间</li>
            <li className="flex items-center gap-2">✅ 即使分支再多，变基后也会按逻辑顺序整齐排列</li>
            <li className="flex items-center gap-2">✅ 故障定位时，只需关注逻辑分界点，噪音为零</li>
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default GitGraphStaticComparison;