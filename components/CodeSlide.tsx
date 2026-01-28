import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface CodeSlideProps {
  title: string;
  subtitle?: string;
  code: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  bullets?: (string | React.ReactNode)[];
}

const CodeSlide: React.FC<CodeSlideProps> = ({ title, subtitle, code, table, bullets }) => {
  // Simple syntax highlighting logic for Git terminal commands
  const highlightCode = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.trim() === '') return <div key={i} className="h-4"></div>;
      
      // 1. Highlight comments (starts with #)
      if (line.trim().startsWith('#')) {
        return <div key={i} className="text-gray-500 italic mb-1">{line}</div>;
      }

      // 2. Tokenize and highlight parts of the command
      const parts = line.split(/(\s+)/);
      const highlightedLine = parts.map((part, j) => {
        if (part === 'git') {
          return <span key={j} className="text-cyan-400 font-bold">{part}</span>;
        }
        if (/^(checkout|pull|push|commit|rebase|add|reset|merge|status|log)$/.test(part)) {
          return <span key={j} className="text-yellow-400 font-medium">{part}</span>;
        }
        if (/^-/.test(part)) {
          return <span key={j} className="text-pink-400 font-mono">{part}</span>;
        }
        if (/^"/.test(part) || /^'/.test(part)) {
          return <span key={j} className="text-green-400">{part}</span>;
        }
        // Specific highlight for targets and variables
        if (/^(main|origin|feature\/.*|HEAD.*|<.*>|N|[a-f0-9]{7,40})$/.test(part)) {
          return <span key={j} className="text-blue-300 font-medium">{part}</span>;
        }
        return <span key={j}>{part}</span>;
      });

      return <div key={i} className="mb-0.5">{highlightedLine}</div>;
    });
  };

  return (
    <div className="w-full h-full flex flex-col p-12 md:p-24 justify-center">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl font-black">{title}</h2>
          {subtitle && <p className="text-blue-400 font-medium">{subtitle}</p>}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2">
                <Terminal size={12}/> terminal
              </span>
            </div>
            <pre className="p-6 text-sm md:text-base font-mono leading-relaxed overflow-x-auto whitespace-pre text-gray-300">
              {highlightCode(code)}
            </pre>
          </motion.div>
        </div>

        <div className="space-y-8 pt-4">
          {table && (
            <div className="rounded-xl border border-white/10 overflow-hidden bg-white/5">
              <table className="w-full text-sm">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    {table.headers.map((h, i) => (
                      <th key={i} className="p-3 font-bold text-gray-400 text-left uppercase text-[10px] tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      {row.map((cell, j) => (
                        <td key={j} className="p-3 text-gray-300">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {bullets && (
            <div className="space-y-4">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-lg">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeSlide;