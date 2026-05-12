"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fill?: boolean;
  sizes?: string;
  onLoad?: () => void;
}

const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "empty",
  blurDataURL,
  fill = false,
  sizes,
  onLoad,
}: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (imgRef.current) observer.unobserve(imgRef.current);
        }
      },
      {
        threshold: 0,
        rootMargin: "5000px 0px",
      }
    );
    const el = imgRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <>
      <div ref={imgRef} className={cn(isLoaded ? "h-full" : "h-96", "flex w-full items-center justify-center")}>
        <Link href={src} target="_blank" className="flex w-full items-center justify-center hover:bg-accent">
          <Image
            src={isVisible ? src : "/blank.svg"}
            alt={alt}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            fill={fill}
            sizes={sizes}
            quality={75}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            className={cn(`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`, className)}
            onLoad={handleLoad}
            loading={priority ? undefined : "lazy"}
          />
        </Link>
      </div>
    </>
  );
};

export default LazyImage;
