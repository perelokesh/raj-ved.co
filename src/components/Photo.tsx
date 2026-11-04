import Image from "next/image";
import { assets } from "@/src/content/assets";

type Props = {
  assetId: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  // Fills the parent (which must be positioned). Otherwise the image keeps its ratio.
  fill?: boolean;
};

// Every image goes through the manifest so replacing a file never touches components.
export function Photo({ assetId, alt, sizes, priority = false, className, fill = false }: Props) {
  const asset = assets[assetId];
  if (!asset) throw new Error(`Unknown asset id: ${assetId}`);
  if (fill) {
    return (
      <Image
        src={asset.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={asset.blur}
        className={className}
      />
    );
  }
  return (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={asset.blur}
      className={className}
    />
  );
}
