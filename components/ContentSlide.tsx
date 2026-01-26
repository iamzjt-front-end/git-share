
import React from 'react';
import { motion } from 'framer-motion';

interface Bullet {
  icon?: React.ReactNode;
  text: string;
  sub?: string;
}

interface ContentSlideProps {
  title: string;
  subtitle?: string;
  bullets?: (Bullet | string)[];
  centerContent?: boolean;
  customContent?: React.ReactNode;
}

const ContentSlide: React.FC<ContentSlideProps> = ({ 
  title, 
  subtitle, 
  bullets, 
  centerContent = false,
  customContent 
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-16 py-12 overflow-y-auto">
      <div className={`max-w-6xl w-full mx-auto ${centerContent ? 'text-center flex flex-col items-center' : ''} py-8`}>
        <motion.h2 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-[1.2] pb-2"
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-2xl text-blue-400 mb-8 font-medium"
          >
            {subtitle}
          </motion.p>
        )}

        {bullets && (
          <div className={`mt-4 space-y-6 ${centerContent ? 'flex flex-col items-center' : ''} w-full`}>
            {bullets.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-6 group"
              >
                {/* Fixed TypeScript error by casting to React.ReactElement<any> to allow 'size' prop injection */}
                {typeof b === 'object' && b.icon && (
                  <div className="shrink-0 p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all shadow-xl">
                    {React.cloneElement(b.icon as React.ReactElement<any>, { size: 28 })}
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-xl md:text-3xl font-bold text-gray-100 leading-tight">
                    {typeof b === 'string' ? b : b.text}
                  </p>
                  {typeof b === 'object' && b.sub && (
                    <p className="text-sm md:text-lg text-gray-400 font-medium">{b.sub}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {customContent && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10 w-full"
          >
            {customContent}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentSlide;
