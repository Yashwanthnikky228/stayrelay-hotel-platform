interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

/** Uses server-approved media only; missing or invalid assets fail to a neutral visual. */
export function ResponsiveImage({ src, alt, width = 1200, height = 900, className = '', sizes = '100vw', loading = 'lazy' }: ResponsiveImageProps) {
  return <img src={src} alt={alt} width={width} height={height} sizes={sizes} loading={loading} decoding="async" className={`bg-cloud object-cover ${className}`} onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }} />;
}
