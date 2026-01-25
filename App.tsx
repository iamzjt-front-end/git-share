
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
  Minimize
} from 'lucide-react';
import HeroSlide from './components/HeroSlide';
import ContentSlide from './components/ContentSlide';
import ComparisonSlide from './components/ComparisonSlide';
import FlowSlide from './components/FlowSlide';
import CodeSlide from './components/CodeSlide';
import PrinciplesSlide from './components/PrinciplesSlide';
import GitFlowVisualizer from './components/GitFlowVisualizer';

const TOTAL_SLIDES = 23;

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
            title="为什么需要 Rebase + Merge？" 
            bullets={[
              { icon: <Zap className="text-yellow-400" />, text: "保持代码提交历史的线性清晰", sub: "没有乱七八糟的交叉线" },
              { icon: <GitMerge className="text-blue-400" />, text: "避免产生不必要的合并节点", sub: "告别冗余的 'Merge branch...' 提交" },
              { icon: <RotateCcw className="text-green-400" />, text: "简化代码回滚操作", sub: "直接 Revert 即可，无需指定父节点" },
              { icon: <History className="text-purple-400" />, text: "提高代码审查效率", sub: "清晰的变更来源，一目了然" }
            ]}
          />
        );
      case 2:
        return (
          <ContentSlide 
            title="直观对比：历史演进"
            subtitle="点击下方按钮观察两种工作流的差异"
            customContent={<GitFlowVisualizer />}
          />
        );
      case 3:
        return <ComparisonSlide />;
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
                  className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent py-8"
                >
                  "先变基，后合并"
                </motion.div>
                <p className="text-xl text-gray-400 max-w-2xl text-center">
                  在将功能分支合并到基准分支之前，先将功能分支的提交"移植"到基准分支的最新位置
                </p>
              </div>
            }
          />
        );
      case 5:
        return <PrinciplesSlide />;
      case 6:
        return <FlowSlide />;
      case 7:
        return (
          <CodeSlide 
            title="步骤一：创建功能分支"
            code={`# 确保基准分支是最新的\ngit checkout main\ngit pull origin main\n\n# 创建功能分支并切换\ngit checkout -b feature/user-login`}
            table={{
              headers: ['类型', '格式', '示例'],
              rows: [
                ['新功能', 'feature/<描述>', 'feature/user-login'],
                ['Bug 修复', 'fix/<描述>', 'fix/cart-bug'],
                ['热修复', 'hotfix/<描述>', 'hotfix/security-patch']
              ]
            }}
          />
        );
      case 8:
        return (
          <CodeSlide 
            title="步骤二：开发并提交"
            code={`# 暂存更改\ngit add src/auth/login.js\n\n# 提交（使用规范的提交信息）\ngit commit -m "feat(auth): 添加用户登录功能"`}
            subtitle="Conventional Commits 规范"
            table={{
              headers: ['Type', '说明', '示例'],
              rows: [
                ['feat', '新功能', 'feat(auth): 添加登录'],
                ['fix', '修复', 'fix(cart): 修复计算问题'],
                ['docs', '文档', 'docs(readme): 更新说明']
              ]
            }}
          />
        );
      case 9:
        return (
          <ContentSlide 
            title="步骤三：同步基准分支"
            customContent={
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 font-mono text-blue-400">
                  <p>git checkout main</p>
                  <p>git pull origin main</p>
                  <p>git checkout feature/user-login</p>
                </div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg flex items-start gap-4"
                >
                  <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
                  <p className="text-yellow-200">重要：这一步是为了更新本地基准分支引用，为下一步的 rebase 做准备。</p>
                </motion.div>
              </div>
            }
          />
        );
      case 10:
        return (
          <CodeSlide 
            title="步骤四：合并提交 (Squash)"
            code={`# 交互式 rebase\ngit rebase -i main\n\n# 编辑器中将 pick 改为 squash\npick a1b2c3d feat: 基础结构\nsquash b2c3d4e feat: 核心逻辑\nsquash c3d4e5f test: 单元测试`}
            subtitle="为什么要 Squash？"
            bullets={["一个需求一个提交", "减少冲突频率", "简化代码回退", "历史清爽"]}
          />
        );
      case 11:
        return (
          <ContentSlide 
            title="步骤五：执行 Rebase"
            customContent={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-blue-400 font-bold">Rebase 前</h3>
                  <div className="bg-gray-900 p-4 rounded font-mono text-sm leading-relaxed">
                    &nbsp;&nbsp;&nbsp;&nbsp;o---o---o (feature)<br/>
                    &nbsp;&nbsp;&nbsp;/<br/>
                    o---o---o---o---o (main)
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-green-400 font-bold">Rebase 后</h3>
                  <div className="bg-gray-900 p-4 rounded font-mono text-sm leading-relaxed">
                    o---o---o---o---o (main)<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o'--o'--o' (feature)
                  </div>
                </div>
                <div className="col-span-full bg-red-500/10 border border-red-500/30 p-4 rounded-lg text-red-200 flex items-center gap-4">
                  <AlertTriangle className="shrink-0" />
                  <span>警告：Rebase 会改写历史，只对自己分支执行！</span>
                </div>
              </div>
            }
          />
        );
      case 12:
        return (
          <CodeSlide 
            title="步骤六：解决冲突"
            code={`# 1. 查看冲突文件\ngit status\n\n# 2. 手动解决冲突标记 <<<<<<< HEAD\n\n# 3. 标记已解决\ngit add <file>\n\n# 4. 继续 rebase\ngit rebase --continue`}
            subtitle="冲突不可怕，耐心即胜利"
          />
        );
      case 13:
        return (
          <ContentSlide 
            title="步骤七：强制推送"
            customContent={
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-500/5 border border-green-500/20 p-6 rounded-xl">
                    <h3 className="text-green-400 font-bold mb-4">推荐：安全强推</h3>
                    <code className="text-blue-300">git push --force-with-lease</code>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl">
                    <h3 className="text-red-400 font-bold mb-4">危险：暴力强推</h3>
                    <code className="text-gray-400">git push --force</code>
                  </div>
                </div>
                <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Zap size={18} className="text-blue-400" /> --force-with-lease 的奥秘
                  </h4>
                  <p className="text-gray-400 text-sm">它会检查远程分支是否有你不知道的新提交，防止覆盖他人的工作成果。这是团队协作的黄金底线。</p>
                </div>
              </div>
            }
          />
        );
      case 14:
        return (
          <ContentSlide 
            title="步骤八 & 九：合并并清理"
            customContent={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xl text-blue-400 font-bold">
                    <span className="w-8 h-8 rounded-full bg-blue-400 text-black flex items-center justify-center text-sm">8</span>
                    发起 PR/MR
                  </div>
                  <ul className="list-disc list-inside text-gray-400 space-y-2 pl-4">
                    <li>关联 Issue</li>
                    <li>指定 Reviewer</li>
                    <li>详细描述变更内容</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xl text-green-400 font-bold">
                    <span className="w-8 h-8 rounded-full bg-green-400 text-black flex items-center justify-center text-sm">9</span>
                    合并并删除
                  </div>
                  <div className="bg-gray-900 p-4 rounded font-mono text-sm text-blue-300">
                    git checkout main<br/>
                    git merge feature/xxx<br/>
                    git push origin main<br/>
                    git branch -d feature/xxx
                  </div>
                </div>
              </div>
            }
          />
        );
      case 15:
        return (
          <ContentSlide 
            title="常用命令速查"
            customContent={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="p-4 bg-gray-900/80 rounded-lg border border-gray-800">
                  <h4 className="text-blue-400 font-bold mb-2">同步基准</h4>
                  <code className="text-xs text-gray-400">git checkout main && git pull</code>
                </div>
                <div className="p-4 bg-gray-900/80 rounded-lg border border-gray-800">
                  <h4 className="text-blue-400 font-bold mb-2">交互式合并</h4>
                  <code className="text-xs text-gray-400">git rebase -i main</code>
                </div>
                <div className="p-4 bg-gray-900/80 rounded-lg border border-gray-800">
                  <h4 className="text-blue-400 font-bold mb-2">变基到最新</h4>
                  <code className="text-xs text-gray-400">git rebase main</code>
                </div>
                <div className="p-4 bg-gray-900/80 rounded-lg border border-gray-800">
                  <h4 className="text-blue-400 font-bold mb-2">安全推送</h4>
                  <code className="text-xs text-gray-400">git push --force-with-lease</code>
                </div>
              </div>
            }
          />
        );
      case 16:
        return (
          <ContentSlide 
            title="常见问题 Q&A"
            bullets={[
              { icon: <CheckCircle2 className="text-blue-400" />, text: "Q: Rebase 和 Merge 的区别？", sub: "A: Rebase 保持线性历史，Merge 保留完整分支轨迹。" },
              { icon: <CheckCircle2 className="text-blue-400" />, text: "Q: 什么时候用 Rebase？", sub: "A: 用于同步基准到功能分支；Merge 用于最终合并回主干。" },
              { icon: <CheckCircle2 className="text-blue-400" />, text: "Q: 公共分支可以 Rebase 吗？", sub: "A: ❌ 绝对不行！只能对自己的私有功能分支执行。" }
            ]}
          />
        );
      case 17:
        return (
          <ContentSlide 
            title="何时禁止使用 Rebase"
            customContent={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-red-500/5 p-6 rounded-xl border border-red-500/20">
                  <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2"><AlertTriangle size={20}/> 禁止场景</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>🚫 公共分支 (main/develop)</li>
                    <li>🚫 已被他人使用的协作分支</li>
                    <li>🚫 已经合并完成的分支</li>
                    <li>🚫 必须保留审计完整历史的场景</li>
                  </ul>
                </div>
                <div className="bg-green-500/5 p-6 rounded-xl border border-green-500/20">
                  <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2"><CheckCircle2 size={20}/> 适用场景</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>✅ 自己的私有功能分支</li>
                    <li>✅ 提交 PR 之前的历史梳理</li>
                    <li>✅ 同步基准分支的最新变更</li>
                  </ul>
                </div>
              </div>
            }
          />
        );
      case 18:
        return (
          <ContentSlide 
            title="提交规范 (Conventional)"
            bullets={[
              { icon: <Terminal className="text-blue-400" />, text: "feat: 新功能", sub: "新功能的引入" },
              { icon: <Terminal className="text-red-400" />, text: "fix: 修复", sub: "Bug 修复" },
              { icon: <Terminal className="text-green-400" />, text: "docs: 文档", sub: "仅文档更新" },
              { icon: <Terminal className="text-purple-400" />, text: "refactor: 重构", sub: "非功能性代码变更" }
            ]}
          />
        );
      case 19:
        return (
          <ContentSlide 
            title="分支命名规范"
            customContent={
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">功能开发</p>
                    <p className="text-blue-300 font-mono">feature/user-login</p>
                  </div>
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">缺陷修复</p>
                    <p className="text-blue-300 font-mono">fix/cart-bug</p>
                  </div>
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">紧急修复</p>
                    <p className="text-blue-300 font-mono">hotfix/security-patch</p>
                  </div>
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg">
                    <p className="text-gray-500 text-xs mb-1">版本发布</p>
                    <p className="text-blue-300 font-mono">release/v1.0.0</p>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500">
                  ✅ 全部小写  ✅ 连字符分隔  ✅ 简洁明了
                </div>
              </div>
            }
          />
        );
      case 20:
        return (
          <ContentSlide 
            title="协作建议"
            bullets={[
              "一个提交只做一件事 (Atomicity)",
              "提交后代码必须能运行",
              "PR 前务必先进行自我审查",
              "确保测试 100% 通过再 Rebase"
            ]}
          />
        );
      case 21:
        return (
          <ContentSlide 
            title="总结：三大黄金法则"
            centerContent
            customContent={
              <div className="space-y-12">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-5xl font-black text-blue-400">01</div>
                  <div className="text-2xl font-bold">只 Rebase 私有分支</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-5xl font-black text-purple-400">02</div>
                  <div className="text-2xl font-bold">先 Rebase 后 Merge</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-5xl font-black text-pink-400">03</div>
                  <div className="text-2xl font-bold">使用 --force-with-lease</div>
                </div>
              </div>
            }
          />
        );
      case 22:
        return (
          <ContentSlide 
            title="谢谢观看"
            centerContent
            customContent={
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <CheckCircle2 size={48} className="text-blue-400" />
                </div>
                <p className="text-2xl text-gray-300">有问题欢迎随时交流 🙋</p>
                <div className="pt-12 text-gray-600 text-sm">
                  文档版本: 1.0 | 企迈研发团队
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
