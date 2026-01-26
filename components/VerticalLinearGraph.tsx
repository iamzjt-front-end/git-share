import React from "react";
import { motion } from "framer-motion";

interface Commit {
  id: string;
  msg: string;
  type: "feat" | "fix" | "docs" | "refactor";
}

const commits: Commit[] = [
  { id: "a1b2c3d", msg: "feat(auth): 登录核心逻辑", type: "feat" },
  { id: "e5f6g7h", msg: "feat(user): 个人中心模块", type: "feat" },
  { id: "i9j0k1l", msg: "fix(api): 修复并联请求冲突", type: "fix" },
  { id: "m2n3o4p", msg: "feat(pay): 支付SDK集成", type: "feat" },
  { id: "q5r6s7t", msg: "docs: 更新部署方案说明", type: "docs" },
  { id: "u8v9w0x", msg: "refactor: 优化状态管理逻辑", type: "refactor" },
];

const VerticalLinearGraph: React.FC = () => {
  return (
    <div className="relative w-full h-full py-4 min-h-[500px]">
      {/* 
          Vertical Track Layer (FIXED)
          创建一个与节点图标列 (w-20) 完全一致的透明容器。
          使用 justify-center 确保线条永远处于 w-20 的几何中心。
      */}
      <div className="absolute left-0 top-0 w-20 h-full flex justify-center pointer-events-none z-0">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "calc(100% - 60px)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-[2px] mt-6 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-400 rounded-full opacity-60"
        />
      </div>

      <div className="flex flex-col relative z-10 w-full">
        {commits.map((commit, i) => (
          <motion.div
            key={commit.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="flex items-center mb-10 last:mb-0"
          >
            {/* 
                Node Gutter: w-20 (80px). 
                flex justify-center 确保图标在 80px 的中心 (40px位置)。
            */}
            <div className="w-20 shrink-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-6 h-6 rounded-full bg-black border-[3px] z-20 transition-all duration-500 ${
                    commit.type === "feat"
                      ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] scale-110"
                      : commit.type === "fix"
                        ? "border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.8)] scale-110"
                        : "border-gray-600 shadow-none scale-90"
                  }`}
                />

                {(commit.type === "feat" || commit.type === "fix") && (
                  <div
                    className={`absolute inset-0 m-auto w-10 h-10 rounded-full animate-ping opacity-10 z-10 ${
                      commit.type === "feat" ? "bg-blue-400" : "bg-red-400"
                    }`}
                  />
                )}
              </div>
            </div>

            {/* Information Area */}
            <div className="flex flex-col ml-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5 font-medium">
                  {commit.id}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-widest ${
                    commit.type === "feat"
                      ? "text-blue-400 bg-blue-400/10"
                      : commit.type === "fix"
                        ? "text-red-400 bg-red-400/10"
                        : "text-gray-400 bg-gray-400/10"
                  }`}
                >
                  {commit.type}
                </span>
              </div>
              <p className="text-gray-100 font-bold text-lg md:text-xl tracking-tight">
                {commit.msg}
              </p>
            </div>
          </motion.div>
        ))}

        {/* HEAD Identifier */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex items-center h-10"
        >
          <div className="w-20 shrink-0 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          </div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold bg-blue-400/5 px-3 py-1.5 rounded-lg border border-blue-400/10">
            <span>HEAD -&gt; main, origin/main</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerticalLinearGraph;
