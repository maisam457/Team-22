declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  
  export const Search: ComponentType<LucideProps>;
  export const Bell: ComponentType<LucideProps>;
  export const Settings: ComponentType<LucideProps>;
  // Add other icons as needed
}
