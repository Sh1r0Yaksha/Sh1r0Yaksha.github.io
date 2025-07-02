import type { ReactNode } from 'react';
import './Section.css';

interface SectionProps {
  id: string;
  children?: ReactNode;
}

export default function Section({ id, children }: SectionProps) {
  return (
    <div className="section" id={id}>
      {children}
    </div>
  );
}