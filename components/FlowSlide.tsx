
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Code, 
  RefreshCw, 
  Combine, 
  ArrowRight, 
  ShieldCheck, 
  CheckSquare 
} from 'lucide-react';

const steps = [
  { icon: <Plus />, text: '创建分支' },
  { icon: <Code />, text: '开发提交' },
  { icon: <RefreshCw />, text: '同步基准' },
  { icon: <Combine />, text: 'Squash' },
  { icon: <RefreshCw />, text: '执行 Rebase' },
  { icon: <ArrowRight />, text: '强推 PR' },
  { icon: <ShieldCheck />, text: '合并代码' }
];

const FlowSlide: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col p-12 md:p-24 justify-center">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">完整工作流程</h2>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-4 items-center">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-lg">
                  {step.icon}
                </div>
                <span className="text-sm font-bold text-gray-400">{step.text}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.05 }}
                  className="hidden md:block"
                >
                  <ArrowRight size={20} className="text-gray-700" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
            <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
              <RefreshCw size={16} /> 变基原则
            </h4>
            <p className="text-xs text-gray-500">始终在自己的功能分支上执行，不要动公共分支。</p>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
            <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
              <Combine size={16} /> 压缩提交
            </h4>
            <p className="text-xs text-gray-500">一个功能对应一个提交，方便代码回滚与审查。</p>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
            <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
              <CheckSquare size={16} /> 安全合并
            </h4>
            <p className="text-xs text-gray-500">合并前确认已经是 Fast-forward 状态。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowSlide;
