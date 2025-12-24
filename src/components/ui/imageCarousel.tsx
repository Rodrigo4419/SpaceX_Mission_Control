"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ImageIcon,
  LoadingIcon,
} from "@/components/svg";

type TProps = {
  images: string[];
  width: string;
  height: string;
};

export default function ImageCarousel({ images, width, height }: TProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState({
    link: images[0],
    index: 0,
  });

  const nextImage = () => {
    setIsLoading(true);
    const next = image.index + 1;
    setImage({
      link: images[next],
      index: next,
    });
  };

  const prevImage = () => {
    setIsLoading(true);
    const next = image.index - 1;
    setImage({
      link: images[next],
      index: next,
    });
  };
  

  return (
      <div
        className='relative w-[${width}] h-[${height}] bg-zinc-900/30 rounded-xl overflow-hidden'
        style={{width:width, height:height}}
      >
        {images.length > 0 ? (
          <>
            <button
              disabled={image.index === 0 ? true : false}
              onClick={() => prevImage()}
              className="absolute z-10 top-1/2 translate-y-[-50%] cursor-pointer hover:text-blue-400 disabled:text-zinc-500 disabled:pointer-events-none"
            >
              <ChevronLeftIcon height="1.5rem" width="1.5rem" />
            </button>
            <button
              disabled={image.index === images.length - 1 ? true : false}
              onClick={() => nextImage()}
              className="absolute z-10 top-1/2 right-0 translate-y-[-50%] cursor-pointer hover:text-blue-400 disabled:text-zinc-500 disabled:pointer-events-none"
            >
              <ChevronRightIcon height="1.5rem" width="1.5rem" />
            </button>
            {isLoading && (
              <div className="absolute flex items-center justify-center w-full h-full z-10 bg-zinc-950/40">
                <LoadingIcon height="15%" width="15%" color="#2b7fff" />
              </div>
            )}
            <img
              className="absolute w-full max-w-full h-auto max-h-full m-auto inset-0 object-contain text-transparent"
              alt="Launch img"
              src={image.link}
              onLoad={() => setIsLoading(false)}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-[50%] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <ImageIcon width="30%" height="30%" />
            <p className="w-fit text-center">No images available</p>
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 translate-x-[-50%] flex gap-1.5 w-fit m-auto">
          {images.map((img, i) => (
            <button
              key={'img-button'+i}
              id={img}
              onClick={() => setImage({ link: img, index: i })}
              className={`h-1 w-3.5 ${
                i === image.index ? "bg-zinc-50" : "bg-zinc-700"
              } rounded-sm duration-150 ease-in-out cursor-pointer hover:bg-zinc-50`}
            ></button>
          ))}
        </div>
      </div>
  );
}
