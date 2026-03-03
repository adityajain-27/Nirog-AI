import { FC } from 'react';

export interface LightRaysProps {
    raysOrigin?: 'top-center' | 'top-left' | 'top-right' | 'center' | 'bottom-center';
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    pulsating?: boolean;
    fadeDistance?: number;
    saturation?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    noiseAmount?: number;
    distortion?: number;
    className?: string;
    style?: React.CSSProperties;
}

declare const LightRays: FC<LightRaysProps>;
export default LightRays;
