declare module "react-simple-maps" {
  import type { CSSProperties, ReactNode } from "react";

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: { center?: [number, number]; scale?: number; rotate?: [number, number, number] };
    style?: CSSProperties;
    width?: number;
    height?: number;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Array<{ rsmKey: string } & Record<string, unknown>> }) => ReactNode;
  }

  export interface GeographyProps {
    geography: { rsmKey: string } & Record<string, unknown>;
    style?: { default?: CSSProperties; hover?: CSSProperties; pressed?: CSSProperties };
    onClick?: () => void;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    onClick?: () => void;
    children?: ReactNode;
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function Marker(props: MarkerProps): JSX.Element;
}
