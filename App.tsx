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
  History,
  RotateCcw,
  Zap,
  Maximize,
  Minimize,
  Undo2,
  Ban,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import HeroSlide from './components/HeroSlide';
import ContentSlide from './components/ContentSlide';
import ComparisonSlide from './components/ComparisonSlide';
import CodeSlide from './components/CodeSlide';
import PrinciplesSlide from './components/PrinciplesSlide';
import GitFlowVisualizer from './components/GitFlowVisualizer';

const TOTAL_SLIDES = 19;

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
            title="先抛一个问题" 
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
                  <span className="text-lg font-medium">日常开发中的灵魂拷问</span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
                  {/* Card 1: Rollback Pain */}
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
                      线上出问题了，<br/>
                      <span className="text-red-400">回滚却很痛苦？</span>
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed z-10">
                      "想 revert 一个功能，却发现它夹杂在几十个 merge commit 里，牵一发而动全身。"
                    </p>
                  </motion.div>

                  {/* Card 2: Railway Graph */}
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
                      Git Log 像<br/>
                      <span className="text-yellow-400">复杂的铁路图？</span>
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed z-10">
                      "只是想找某个功能是什么时候进主干的，结果被满屏的交叉线绕晕了眼。"
                    </p>
                  </motion.div>
                </div>
              </div>
            }
          />
        );
      case 2:
        return (
          <ContentSlide 
            title="为什么要改？" 
            subtitle="直接 Merge 带来的三个典型痛点"
            bullets={[
              { icon: <GitBranch className="text-red-400" />, text: "分叉历史（铁路图）", sub: "多个 feature 同时进，历史线乱成一团，难以阅读" },
              { icon: <GitMerge className="text-yellow-400" />, text: "Merge Commit 噪音", sub: "产生大量无意义的合并节点，干扰回滚操作" },
              { icon: <History className="text-gray-400" />, text: "定位困难", sub: "很难追踪某功能引入的精确时间，git bisect 效率低" }
            ]}
          />
        );
      case 3:
        return (
          <ContentSlide 
            title="直观对比：历史演进"
            subtitle="点击下方按钮观察两种工作流的差异"
            customContent={<GitFlowVisualizer />}
          />
        );
      case 4:
        return (
          <ContentSlide 
            title="核心思想"
            centerContent
            customContent={
              <div className="flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent py-8 leading-tight"
                >
                  "先变基，后合并"
                </motion.div>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl text-center leading-relaxed">
                  在将功能分支合并到主干之前，<br/>先把自己的提交 <span className="text-blue-400 font-bold">"搬到"</span> 主干的最新位置上。
                </p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-200"
                >
                  <AlertTriangle />
                  <span>红线：只对自己的私有功能分支执行 Rebase，严禁操作公共分支！</span>
                </motion.div>
              </div>
            }
          />
        );
      case 5:
        return <ComparisonSlide />;
      case 6:
        return <PrinciplesSlide />;
      case 7:
        return (
          <CodeSlide 
            title="Step 1 & 2: 创建与开发"
            subtitle="规范的开始是成功的一半"
            code={`# 1. 确保基于最新主干创建分支
git checkout main
git pull origin main
git checkout -b feature/20231027-user-login

# 2. 正常开发提交 (Conventional Commits)
git add .
git commit -m "feat(auth): 添加用户登录功能"`}
            bullets={[
              "分支命名：feature/YYYYMMDD-xxx, hotfix/YYYYMMDD-xxx",
              "提交粒度：保持原子性，一个提交做一件事"
            ]}
          />
        );
      case 8:
        return (
          <CodeSlide 
            title="Step 3: 同步主干"
            subtitle="很多人会漏掉的一步"
            code={`# 切换回主干并更新
git checkout main
git pull origin main

# 切回功能分支，准备 Rebase
git checkout feature/20231027-user-login`}
            bullets={[
              "这一步是为了更新本地 main 分支引用",
              "为接下来的 Rebase 提供最新的'基座'"
            ]}
          />
        );
      case 9:
        return (
          <CodeSlide 
            title="Step 4: 交互式 Squash (推荐)"
            subtitle="一个需求，一个提交"
            code={`# 交互式变基：整理最近的提交
git rebase -i main

# --- 编辑器界面 ---
pick 3a1b2c feat: 基础结构
squash 4d5e6f feat: 核心逻辑  <-- 改为 squash
squash 7g8h9i fix: 修复小 bug   <-- 改为 squash`}
            bullets={[
              "收益：主干历史更清爽",
              "收益：冲突只需解决一次",
              "收益：回滚极简 (revert 一个 commit 即可)"
            ]}
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
                   <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                      <h4 className="text-gray-400 mb-2 font-bold">Rebase 前</h4>
                      <p className="text-sm text-gray-500">我的分支基于 3 天前的 main</p>
                   </div>
                   <div className="p-6 bg-blue-900/20 rounded-xl border border-blue-500/30">
                      <h4 className="text-blue-400 mb-2 font-bold">Rebase 后</h4>
                      <p className="text-sm text-gray-300">我的分支"嫁接"到了 main 的最前端</p>
                   </div>
                </div>
                <p className="text-center text-gray-500 text-sm">注：Rebase 会改变提交的 Hash 值，这是正常的。</p>
              </div>
            }
          />
        );
      case 11:
        return (
          <CodeSlide 
            title="Step 6: 解决冲突"
            subtitle="不要慌，按流程走"
            code={`# 1. 查看冲突文件
git status

# 2. 手动修改代码解决冲突...

# 3. 标记解决
git add <file>

# 4. 继续变基
git rebase --continue

# 💡 实在搞不定，想重来？
git rebase --abort`}
          />
        );
      case 12:
        return (
          <ContentSlide 
            title="Step 7: 安全强推"
            customContent={
              <div className="space-y-8">
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                  <p className="text-gray-400 mb-4">因为历史被改写（Hash 变了），普通 push 会被拒绝。</p>
                  <div className="flex flex-col gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-400 font-bold">✅ 推荐方式</span>
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">安全锁</span>
                      </div>
                      <code className="text-xl font-mono text-white">git push --force-with-lease origin feature/xxx</code>
                      <p className="text-sm text-gray-400 mt-2">检查远端是否有"我不知道"的新提交，防止误覆盖同事代码。</p>
                    </div>
                    
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg opacity-60">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-red-400 font-bold">❌ 危险方式</span>
                      </div>
                      <code className="text-xl font-mono text-gray-500">git push --force</code>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        );
      case 13:
        return (
          <ContentSlide 
            title="Step 8 & 9: 合并与清理"
            bullets={[
              { icon: <CheckCircle2 className="text-blue-400" />, text: "发起 PR/MR", sub: "填写清晰的标题与描述，关联 Issue" },
              { icon: <GitMerge className="text-purple-400" />, text: "合并主干 (Fast-forward)", sub: "因为已经 rebase 过，合并时是一条直线，不会产生 Merge Commit" },
              { icon: <Ban className="text-gray-400" />, text: "清理分支", sub: "合并完成后，删除本地和远端的功能分支" }
            ]}
          />
        );
      case 14:
        return (
          <ContentSlide 
            title="禁区：什么时候不要 Rebase"
            customContent={
               <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-12 text-center">
                 <Ban className="w-24 h-24 text-red-500 mx-auto mb-8" />
                 <h3 className="text-3xl font-bold text-red-200 mb-8">公共分支绝对禁止 Rebase</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                    <div className="flex items-center gap-3 text-lg text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      Main / Master 分支
                    </div>
                    <div className="flex items-center gap-3 text-lg text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      Develop / Test 分支
                    </div>
                    <div className="flex items-center gap-3 text-lg text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      别人正在协作的分支
                    </div>
                    <div className="flex items-center gap-3 text-lg text-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      已经合并完成的分支
                    </div>
                 </div>
               </div>
            }
          />
        );
      case 15:
        return (
          <ContentSlide 
            title="兜底方案：后悔药"
            subtitle="手滑了怎么救？Git 有时光机"
            customContent={
              <div className="flex flex-col items-center gap-8 mt-4">
                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-3xl">
                  <div className="flex items-center gap-3 mb-4 text-yellow-400">
                    <Undo2 />
                    <span className="font-bold text-xl">git reflog</span>
                  </div>
                  <p className="text-gray-400 mb-6">
                    记录了 HEAD 指针的每一次移动。即使你删除了分支、强制重置了提交，只要 reflog 还在，就能找回来。
                  </p>
                  <div className="font-mono text-sm text-blue-300 bg-black p-4 rounded-lg">
                    <p>e3a1b2c HEAD@{0}: rebase finished: returning to refs/heads/feature/xxx</p>
                    <p>9f8d7e6 HEAD@{1}: rebase: checkout main</p>
                    <p className="text-green-400"># 找到 rebase 之前的 hash，reset 回去即可</p>
                    <p>git reset --hard HEAD@{2}</p>
                  </div>
                </div>
              </div>
            }
          />
        );
      case 16:
        return (
          <ContentSlide 
            title="落地建议"
            bullets={[
              { icon: <Zap className="text-yellow-400" />, text: "开发时自由提交", sub: "便于自检与审查，不用担心 commit 太多" },
              { icon: <GitMerge className="text-blue-400" />, text: "PR 前必 Squash + Rebase", sub: "把最好的状态展示给团队，保持主干整洁" },
              { icon: <ShieldCheck className="text-green-400" />, text: "统一使用 Force-with-lease", sub: "养成安全推送的肌肉记忆" }
            ]}
          />
        );
      case 17:
        return (
          <ContentSlide 
            title="常见问题 Q&A"
            customContent={
              <div className="grid gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="flex items-center gap-2 font-bold text-blue-400 mb-2">
                    <HelpCircle size={18} /> Rebase 和 Merge 到底什么时候用？
                  </h4>
                  <p className="text-gray-400 text-sm">A: 同步主干更新用 <span className="text-white">Rebase</span>；最终合入主干用 <span className="text-white">Merge</span> (Fast-forward)。</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="flex items-center gap-2 font-bold text-blue-400 mb-2">
                    <HelpCircle size={18} /> 为什么 push 被拒绝？
                  </h4>
                  <p className="text-gray-400 text-sm">A: 因为 Rebase 改写了历史，本地 Hash 和远端不一致。请使用 <code className="text-white bg-white/10 px-1 rounded">--force-with-lease</code>。</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="flex items-center gap-2 font-bold text-blue-400 mb-2">
                    <HelpCircle size={18} /> 冲突太复杂不想解了怎么办？
                  </h4>
                  <p className="text-gray-400 text-sm">A: 使用 <code className="text-white bg-white/10 px-1 rounded">git rebase --abort</code> 回到变基之前的状态。</p>
                </div>
              </div>
            }
          />
        );
      case 18:
        return (
          <ContentSlide 
            title="谢谢观看"
            centerContent
            customContent={
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <CheckCircle2 size={48} className="text-blue-400" />
                </div>
                <p className="text-2xl text-gray-300">为了让版本管理像艺术一样优雅</p>
                <div className="pt-12 text-gray-600 text-sm">
                  Rebase + Merge 实践指南
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
      {/* Fullscreen Button */}
      <div className="absolute top-10 right-10 z-[60]">
        <button 
          onClick={toggleFullscreen}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all hover:bg-white/10 active:scale-90 bg-black/20 backdrop-blur-sm"
          title={isFullscreen ? "退出全屏" : "全屏模式"}
        >
          {isFullscreen ? <Minimize size={20} className="text-white/70" /> : <Maximize size={20} className="text-white/70" />}
        </button>
      </div>

      {/* Background Decor */}
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

      {/* Navigation Overlay */}
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