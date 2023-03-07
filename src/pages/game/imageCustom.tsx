import NextImage from 'next/image';
import Link from 'next/link';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from '@/styles/ImageCustom.module.css';

interface ICanvasData {
  xPos: number;
  yPos: number;
  width: number;
  height: number;
}

export default function ImageCustom() {

  const [currentImageSrc, setCurrentImageSrc] = useState<string>("/favicon.ico");
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasImageData, setCanvasImageData] = useState<ICanvasData>({
    xPos: 0,
    yPos: 0,
    width: 0,
    height: 0
  });

  const onImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const curFiles = event.target.files;
    if (curFiles !== null && curFiles.length > 0) {
      const imgSrc = URL.createObjectURL(curFiles[0]);
      const img: HTMLImageElement = new Image();
      img.src = imgSrc;
      img.onload = () => {
        if (img.width > img.height) {
          const resizedHeight = Math.floor(500 * (img.height / img.width));
          setCanvasImageData({
            xPos: 0,
            yPos: Math.floor((500 - resizedHeight) / 2),
            width: 500,
            height: resizedHeight
          });
        }
        else {
          const resizedWidth = Math.floor(500 * (img.width / img.height));
          setCanvasImageData({
            xPos: Math.floor((500 - resizedWidth) / 2),
            yPos: 0,
            width: resizedWidth,
            height: 500
          });
        }
        setCurrentImageSrc(imgSrc);
      }
    }
  }

  const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const ctx = canvasRef.current!.getContext("2d");
    ctx!.clearRect(0, 0, 500, 500);
    ctx!.drawImage(imageRef.current!, canvasImageData.xPos, canvasImageData.yPos, canvasImageData.width, canvasImageData.height);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className={styles.imageSelect}>
        <NextImage
          ref={imageRef}
          src={currentImageSrc}
          onLoad={onImageLoad}
          alt="err"
          width={0}
          height={0}
          style={{ display: 'none' }}
        />
        {canvasImageData.width !== 0 &&
        <>
          <canvas
            ref={canvasRef} 
            width={500} 
            height={500}
          />
          <br />
        </>
        }
        <div className={styles.upload}>
          <label htmlFor="image_uploads">
            Choose image to upload&nbsp;
          </label>
          <input 
            type="file" 
            id="image_uploads" 
            accept="image/*" 
            onChange={onImageFileChange}
          />
        </div>
        <div className={styles.cancel}>
          <Link
            href={'/'}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}