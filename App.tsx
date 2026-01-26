import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  GitBranch, 
  GitMerge, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Maximize,
  Minimize,
  Undo2,
  Ban,
  HelpCircle,
  ShieldCheck,
  LayoutList,
  Target,
  Search,
  Stethoscope,
  RefreshCw
} from 'lucide-react';
import HeroSlide from './components/HeroSlide';
import ContentSlide from './components/ContentSlide';
import CodeSlide from './components/CodeSlide';
import PrinciplesSlide from './components/PrinciplesSlide';
import GitFlowVisualizer from './components/GitFlowVisualizer';
import GitGraphStaticComparison from './components/GitGraphStaticComparison';
import VerticalLinearGraph from './components/VerticalLinearGraph';

const TOTAL_SLIDES = 18;

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [nextSlide, prevSlide]);

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <HeroSlide onNext={nextSlide} />;
      case 1:
        return (
          <ContentSlide 
            title="请看这两张 Git 历史图" 
            subtitle="直观感受它们的差异"
            customContent={<GitGraphStaticComparison minimal />}
          />
        );
      case 2:
        return (
          <ContentSlide 
            title="灵魂拷问" 
            centerContent
            customContent={
              <div className="w-full flex flex-col items-center gap-10 mt-8">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 text-blue-300 bg-blue-500/10 px-6 py-3 rounded-full border border-blue-500/20"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-lg font-medium">如果你是负责排障的那个人...</span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="group bg-gradient-to-br from-gray-900 to-black p-8 md:p-10 rounded-3xl border border-gray-800 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-500 flex flex-col items-start relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <Undo2 size={180} />
                    </div>
                    <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-400 mb-8 group-hover:scale-110 transition-transform">
                      <AlertTriangle size={28} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 leading-tight">
                      如果线上出问题了，<br/>
                      <span className="text-red-400">你更愿意看哪一张？</span>
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed z-10">
                      "是从混乱的铁路图中寻找真相，还是在清晰的线性历史中定位根因？"
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="group bg-gradient-to-br from-gray-900 to-black p-8 md:p-10 rounded-3xl border border-gray-800 hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] transition-all duration-500 flex flex-col items-start relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <GitBranch size={180} />
                    </div>
                    <div className="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-400 mb-8 group-hover:scale-110 transition-transform">
                      <GitBranch size={28} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 leading-tight">
                      为什么历史<br/>
                      <span className="text-yellow-400">会演变成这样？</span>
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed z-10">
                      "接下来的内容，我们将揭晓这两种历史是如何生成的，以及如何稳定地产生整洁的历史。"
                    </p>
                  </motion.div>
                </div>
              </div>
            }
          />
        );
      case 3:
        return (
          <ContentSlide 
            title="揭秘：两种历史是如何生成的" 
            subtitle="点击播放观察“标准合并”与“变基合并”的本质区别"
            customContent={<GitFlowVisualizer />}
          />
        );
      case 4:
        return (
          <ContentSlide 
            title="混乱的根源" 
            subtitle="为什么直接 Merge 默认就会制造分叉历史？"
            customContent={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                  <div className="text-red-400 mb-4"><GitBranch size={32} /></div>
                  <h4 className="text-xl font-bold text-gray-100 mb-3">历史分叉</h4>
                  <p className="text-gray-400 text-sm">Git 必须保留两条时间线，主干自然变成分叉的“铁路图”</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                  <div className="text-yellow-400 mb-4"><GitMerge size={32} /></div>
                  <h4 className="text-xl font-bold text-gray-100 mb-3">Merge Commit 噪音</h4>
                  <p className="text-gray-400 text-sm">产生双父节点提交，回滚时需要面对“回滚哪一边”的复杂决策</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                  <div className="text-blue-400 mb-4"><Search size={32} /></div>
                  <h4 className="text-xl font-bold text-gray-100 mb-3">定位困难</h4>
                  <p className="text-gray-400 text-sm">git bisect 效率直线下降，说不清功能具体是哪次引入的</p>
                </div>
              </div>
            }
          />
        );
      case 5:
        return (
          <ContentSlide 
            title="理想的主干：线性之美"
            subtitle="我们希望主干历史尽量贴近真实的时间顺序"
            customContent={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 items-center">
                <div className="space-y-6">
                  {[
                    { icon: <CheckCircle2 className="text-green-400" />, text: "历史是线性的", sub: "没有分叉，一条直线看到底" },
                    { icon: <LayoutList className="text-blue-400" />, text: "功能块连续性", sub: "一个功能对应一段连续的提交，而不是被交叉切断" },
                    { icon: <RotateCcw className="text-purple-400" />, text: "极速回滚", sub: "出问题只需 revert 一个 commit，简单纯粹" },
                    { icon: <Target className="text-yellow-400" />, text: "可读性极高", sub: "git log 就像读故事书一样顺畅" }
                  ].map((bullet, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center gap-6"
                    >
                      <div className="shrink-0 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-xl">
                        {React.cloneElement(bullet.icon as React.ReactElement<any>, { size: 28 })}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xl md:text-2xl font-bold text-gray-100 leading-tight">{bullet.text}</p>
                        <p className="text-sm md:text-lg text-gray-400 font-medium">{bullet.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-900/40 border border-white/10 rounded-3xl p-8 shadow-inner overflow-hidden"
                >
                  <VerticalLinearGraph />
                </motion.div>
              </div>
            }
          />
        );
      case 6:
        return (
          <ContentSlide 
            title="核心思想：先变基，后合并"
            centerContent
            customContent={
              <div className="flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent py-8"
                >
                  "先整理历史，再接回主干"
                </motion.div>
                <p className="text-gray-400 max-w-2xl mb-8">
                  在将功能分支合并到主干之前，先把自己的提交“搬到”主干的最新位置上，确保合并是线性的快进。
                </p>
                <div className="flex gap-4">
                  <span className="px-6 py-3 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Step 1: Rebase (整理)</span>
                  <span className="px-6 py-3 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">Step 2: Merge (接轨)</span>
                </div>
              </div>
            }
          />
        );
      case 7: 
        return (
          <PrinciplesSlide 
            customPrinciples={[
              { icon: <RefreshCw size={40} className="text-blue-400" />, title: "原则一：频繁同步", desc: "主干有更新就及时 Rebase，避免最后一次性解决大量冲突。" },
              { icon: <GitBranch size={40} className="text-purple-400" />, title: "原则二：合并前必变基", desc: "发起 PR/MR 前，功能分支必须基于最新主干，确保线性合入。" },
              { icon: <ShieldCheck size={40} className="text-green-400" />, title: "原则三：保护主干历史", desc: "主干尽量只接受 Fast-forward 合并，严禁对公共分支执行 Rebase。" }
            ]}
          />
        );
      case 8:
        return (
          <CodeSlide 
            title="Step 1 & 2: 创建与开发"
            subtitle="从最新主干出发，保持原子提交"
            code={`# 1. 确保基于最新主干
git checkout main
git pull origin main
git checkout -b feature/xxx

# 2. 正常开发提交
git add .
git commit -m "feat(auth): 添加登录核心逻辑"`}
            bullets={["提交粒度可以小", "遵循 Conventional Commits 规范"]}
          />
        );
      case 9:
        return (
          <CodeSlide 
            title="Step 3 & 4: 同步与 Squash"
            subtitle="很多人会漏掉的重要步骤"
            code={`# 3. 始终先更新本地 main
git checkout main && git pull origin main
git checkout feature/xxx

# 4. 推荐：Squash (一个需求一个提交)
git rebase -i main
# 将编辑器中的 pick 改为 squash`}
            bullets={["一个需求一个提交，回滚极简", "Rebase 冲突只需解决一次"]}
          />
        );
      case 10:
        return (
          <ContentSlide 
            title="Step 5: 执行 Rebase"
            customContent={
              <div className="space-y-8">
                <div className="bg-black border border-gray-800 rounded-xl p-6 font-mono text-lg text-blue-300">
                  git rebase main
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-8 bg-gray-900 rounded-3xl border border-gray-800 relative">
                      <div className="absolute top-4 right-4 text-gray-700 font-black">BEFORE</div>
                      <h4 className="text-gray-400 mb-4 font-bold">分叉状态</h4>
                      <p className="text-gray-500">Feature 分支基于旧的 Main 节点</p>
                   </div>
                   <div className="p-8 bg-blue-900/20 rounded-3xl border border-blue-500/30 relative">
                      <div className="absolute top-4 right-4 text-blue-500/50 font-black">AFTER</div>
                      <h4 className="text-blue-400 mb-4 font-bold">线性状态</h4>
                      <p className="text-gray-300">提交被“平移”到 Main 的最新头部</p>
                   </div>
                </div>
              </div>
            }
          />
        );
      case 11:
        return (
          <CodeSlide 
            title="Step 6: 冲突处理流程"
            subtitle="固定流程，不要硬扛"
            code={`# 1. 查看并手动解决代码冲突
# 2. 标记已解决
git add <conflict-file>

# 3. 继续变基
git rebase --continue

# 💡 实在太复杂？先放弃沟通
git rebase --abort`}
          />
        );
      case 12:
        return (
          <ContentSlide 
            title="Step 7: 为什么 Push 被拒？"
            customContent={
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-start gap-4">
                  <AlertTriangle className="text-red-400 shrink-0" />
                  <p className="text-gray-400">因为 Rebase 改写了 Hash，导致本地与远端历史不一致，Git 默认保护机制会拦截普通 push。</p>
                </div>
                <div className="p-10 bg-gray-900 rounded-3xl border border-blue-500/30">
                  <div className="text-xs uppercase tracking-widest text-blue-400 mb-4 font-bold">正确姿势</div>
                  <code className="text-2xl font-mono text-white block mb-4">git push --force-with-lease</code>
                  <p className="text-gray-400 text-sm">这是一个“成熟团队”的安全做法，避免误覆盖他人的最新提交。</p>
                </div>
              </div>
            }
          />
        );
      case 13:
        return (
          <ContentSlide 
            title="Step 8 & 9: PR 与合并"
            bullets={[
              { icon: <Terminal className="text-blue-400" />, text: "发起 PR / MR", sub: "重点检查历史是否清晰，PR 描述是否完整" },
              { icon: <GitMerge className="text-green-400" />, text: "主干合并", sub: "执行 Fast-forward 合并，不产生额外 merge 节点" },
              { icon: <Ban className="text-gray-500" />, text: "清理战场", sub: "合并完成后，及时删除 feature 分支" }
            ]}
          />
        );
      case 14:
        return (
          <ContentSlide 
            title="变基手术刀：什么时候不能用？"
            customContent={
               <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-12 text-center">
                 <Stethoscope className="w-24 h-24 text-red-500 mx-auto mb-8" />
                 <h3 className="text-3xl font-bold text-red-200 mb-8">Rebase 只能用在自己身上</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                    <div className="flex items-center gap-3 text-lg text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      禁止 Rebase 公共分支 (Main/Develop)
                    </div>
                    <div className="flex items-center gap-3 text-lg text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      禁止 Rebase 别人正在协作的分支
                    </div>
                 </div>
               </div>
            }
          />
        );
      case 15:
        return (
          <ContentSlide 
            title="后悔药：git reflog"
            subtitle="手滑了也不用惊慌"
            customContent={
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-4 text-yellow-400">
                  <Undo2 />
                  <span className="font-bold text-xl">时光倒流</span>
                </div>
                <p className="text-gray-400 mb-6">记录了 HEAD 的每一次移动。即使你删除了分支、强行重置了提交，只要 reflog 还在，就能找回来。</p>
                <div className="font-mono text-sm text-blue-300 bg-black p-4 rounded-lg">
                  <p className="text-green-400"># 找到变基前的位置</p>
                  <p>git reset --hard HEAD@{2}</p>
                </div>
              </div>
            }
          />
        );
      case 16:
        return (
          <ContentSlide 
            title="落地建议：总结"
            customContent={
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr className="text-left">
                      <th className="p-4 text-gray-400 uppercase text-xs">阶段</th>
                      <th className="p-4 text-gray-400 uppercase text-xs">建议</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-4 font-bold text-blue-300">开发阶段</td>
                      <td className="p-4 text-gray-300">自由提交，无需心理压力</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-purple-300">发 PR 前</td>
                      <td className="p-4 text-gray-300">Squash (推荐) + Rebase (必须)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-yellow-300">推送</td>
                      <td className="p-4 text-gray-300">统一使用 --force-with-lease</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-green-300">主干</td>
                      <td className="p-4 text-gray-300">严格保持线性历史</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />
        );
      case 17:
        return (
          <ContentSlide 
            title="谢谢观看"
            centerContent
            customContent={
              <div className="text-center space-y-10">
                <div className="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                  <CheckCircle2 size={64} className="text-blue-500" />
                </div>
                <div className="space-y-4">
                  <p className="text-2xl text-gray-200 font-bold">“不是为了操作炫技，而是为了排障简单”</p>
                  <p className="text-gray-500">为了让版本管理像艺术一样优雅</p>
                </div>
                <div className="pt-20 text-gray-600 text-xs tracking-widest uppercase">
                  朱锦涛 · 团队技术分享
                </div>
              </div>
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex flex-col">
      <div className="absolute top-10 right-10 z-[60]">
        <button 
          onClick={toggleFullscreen}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all hover:bg-white/10 active:scale-90 bg-black/20 backdrop-blur-sm"
          title={isFullscreen ? "退出全屏" : "全屏模式"}
        >
          {isFullscreen ? <Minimize size={20} className="text-white/70" /> : <Maximize size={20} className="text-white/70" />}
        </button>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-0 w-full px-12 flex items-center justify-between z-50">
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all ${currentSlide === 0 ? 'opacity-20' : 'hover:bg-white/10 active:scale-90'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === TOTAL_SLIDES - 1}
            className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all ${currentSlide === TOTAL_SLIDES - 1 ? 'opacity-20' : 'hover:bg-white/10 active:scale-90'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex-1 mx-12 h-[2px] bg-white/5 rounded-full relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-blue-500"
            animate={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }}
          />
        </div>

        <div className="text-sm font-mono text-white/40">
          {String(currentSlide + 1).padStart(2, '0')} / {TOTAL_SLIDES}
        </div>
      </div>
    </div>
  );
};

export default App;