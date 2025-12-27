// import zipIconSrc from 'figma:asset/2045035677b1f3fbcb658c5c78db0342ec800093.png';

interface ZipIconProps {
  className?: string;
  size?: number;
}

export function ZipIcon({ className, size = 40 }: ZipIconProps) {
  return (
    <img 
      // src={zipIconSrc}
      src="https://placehold.co/40"
      alt="Zip" 
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
