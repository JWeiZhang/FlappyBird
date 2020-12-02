import React, { useState, useEffect, useRef } from 'react'
import spriteSheet from '../assets/spritesheet.png'

const canvasStyle = {
  border: '1px solid #000',
  width: '360px',
  height: '720px',
}

export function Game() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [speed, setSpeed] = useState<number>(0)
  const requestRef = useRef(0)
  const previousTimeRef = useRef(0)
  // const [frame, setFrame] = useState<number>(60)

  // 與 componentDidMount 和 componentDidUpdate 類似：
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    setCanvas(canvas)
    setCtx(canvas.getContext('2d'))
    ctx?.clearRect(0, 0, 360, 720)
    const image = new Image()
    image.src = spriteSheet
    image.onload = () => {
      setImage(image)
    }
  }, [])

  useEffect(() => {
    drawBackground()
  }, [image])

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setSpeed(prevCount => (prevCount + deltaTime * 0.1) % 350)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  useEffect(() => {
    drawGrass()
  }, [speed])

  function drawBackground() {
    if (ctx && image) {
      ctx.drawImage(image, 0, 0, 145, 260, 0, 0, 300, 160)
      ctx.drawImage(image, 150, 10, 145, 40, 0, 125, 300, 50)
    }
  }

  function drawGrass() {
    if (ctx && image) {
      ctx.drawImage(image, 145, 0, 145, 10, 0 - speed, 125, 300, 10)
      ctx.drawImage(image, 145, 0, 145, 10, 320 - speed, 125, 300, 10)
    }
  }

  return <canvas id="canvas" style={canvasStyle}></canvas>
}
