import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const ComparisonSlide: React.FC = () => {
  const data = [
    { label: '提交历史', merge: '分叉复杂，难以阅读', rebase: '线性清晰，一目了然' },
    { label: 'Merge Commit', merge: '每次合并产生额外节点', rebase: '无额外节点 (fast-forward)' },
    { label: '回滚操作', merge: '复杂，需指定父提交', rebase: '简单，直接 revert 即可' },
    { label: 'Bug 定位', merge: 'git bisect 效率低', rebase: 'git bisect 高效' },
    { label: '代码审查', merge: '变更来源不清晰', rebase: '变更历史清晰可追溯' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-16 py-12 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto py-8">
        <h2 className="text-4xl md:text-6xl font-black mb-12 leading-tight">对比总结</h2>
        
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-[1fr_1.5fr_1.5fr] border-b border-white/10 bg-white/10">
            <div className="p-6 md:p-8 font-bold text-gray-500 uppercase text-xs md:text-sm tracking-widest flex items-center">
              对比项
            </div>
            <div className="p-6 md:p-8 font-bold text-red-400 flex items-center gap-3 border-l border-white/10 text-lg md:text-xl">
              <XCircle size={22} /> 直接 Merge
            </div>
            <div className="p-6 md:p-8 font-bold text-blue-400 flex items-center gap-3 border-l border-white/10 text-lg md:text-xl">
              <CheckCircle size={22} /> Rebase + Merge
            </div>
          </div>

          {/* Data Rows */}
          <div className="flex flex-col">
            {data.map((row, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[1fr_1.5fr_1.5fr] border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="p-6 md:p-8 font-semibold text-gray-400 text-sm md:text-lg flex items-center">
                  {row.label}
                </div>
                <div className="p-6 md:p-8 text-gray-500 text-sm md:text-lg border-l border-white/5 flex items-center">
                  {row.merge}
                </div>
                <div className="p-6 md:p-8 text-gray-200 font-medium text-sm md:text-lg border-l border-white/5 flex items-center">
                  {row.rebase}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-6 text-blue-300 italic"
        >
          <AlertTriangle size={24} className="shrink-0" />
          <p className="text-sm md:text-lg leading-relaxed">虽然 Rebase 有一定的学习成本，但在多人协作的大型项目中，其带来的长期维护收益远超传统 Merge。</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ComparisonSlide;