// Added React import to fix "Cannot find namespace 'React'" error
import React from 'react';

export type SlideType = 
  | 'hero' 
  | 'content' 
  | 'comparison' 
  | 'diagram' 
  | 'code' 
  | 'principles' 
  | 'flow' 
  | 'qa' 
  | 'summary';

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  dark?: boolean;
}