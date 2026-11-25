import React from 'react';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="flex flex-col items-center text-center px-6 py-8 md:px-10 md:py-16 bg-card-depth border border-gold/10 group hover:border-gold/40 transition-all duration-700 rounded-sm shadow-2xl relative overflow-hidden h-full border-glow-hover shine-effect">
      <div className="mb-6 p-4 md:mb-8 md:p-5 rounded-full bg-void/50 shadow-inner text-gold/70 group-hover:text-gold transition-all duration-500 border border-gold/10">
        <span className="material-icons-outlined text-2xl md:text-4xl">{feature.icon}</span>
      </div>
      <h3 className="font-display text-lg md:text-xl font-bold text-stone-100 mb-3 tracking-tight group-hover:text-gold transition-colors duration-500">
        {feature.title}
      </h3>
      <div className="w-8 h-px bg-gold/35 mb-4 group-hover:w-16 transition-all duration-700"></div>
      <p className="text-sm md:text-[0.95rem] font-sans text-stone-200 leading-relaxed max-w-xs mx-auto transition-colors">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;
