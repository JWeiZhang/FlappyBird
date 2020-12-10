import React, { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'

export function WebGL() {
  const requestRef = useRef(0)
  const previousFrameRef = useRef(0)
  const previousTimeRef = useRef(0)
  const [frame, setFrame] = useState<number>(0)
  const [timer, setTimer] = useState<number>(0)
  const [scene, setScene] = useState<null | THREE.Scene>(null)
  const [camera, setCamera] = useState<null | THREE.PerspectiveCamera>(null)
  const [renderer, setRenderer] = useState<null | THREE.WebGLRenderer>(null)
  const [pipes] = useState<Array<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>>([])
  const [cube, setCube] = useState<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>()
  const [speed, setSpeed] = useState(0)

  useEffect(() => {
    const newScene = new THREE.Scene()
    const newCamera = new THREE.PerspectiveCamera(90, 0.5, 0.1, 1000)
    const newRenderer = new THREE.WebGLRenderer()
    setScene(newScene)
    setCamera(newCamera)
    setRenderer(newRenderer)
    newRenderer.setSize(360, 720)
    document.body.appendChild(newRenderer.domElement)
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0)
    const material = new THREE.MeshBasicMaterial({ color: 0x828282 })
    const newCube = new THREE.Mesh(geometry, material)
    setCube(newCube)
    newScene.add(newCube)
    newCube.position.x = -2
    newCamera.position.z = 10

    window.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.code === 'KeyF') {
        fly(-2)
      }
    })
  }, [])

  useEffect(() => {
    animate()
  }, [renderer])

  useEffect(() => {
    if (timer % 2 === 0) {
      createPipe()
    }
  }, [timer])

  useEffect(() => {
    fly()
  }, [frame])

  const animate = function (now: number = 0) {
    const deltaTime = now - previousTimeRef.current
    const deltaFrame = now - previousFrameRef.current
    if (deltaTime > 1000) {
      setTimer(prevCount => prevCount + 1)
      previousTimeRef.current = now
    }

    setFrame(prevCount => prevCount + deltaFrame)
    previousFrameRef.current = now

    if (scene && camera && renderer) {
      pipes.forEach(pipe => {
        pipe.position.x = pipe.position.x - 0.08
      })

      renderer.render(scene, camera)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  function createPipe() {
    if (scene) {
      const geometry = new THREE.BoxGeometry(1.5, 15, 0)
      const material = new THREE.MeshBasicMaterial({ color: 0x228b22 })
      const upPipe = new THREE.Mesh(geometry, material)
      const downPipe = new THREE.Mesh(geometry, material)
      const yBase = Math.sin(frame) * 2.5
      upPipe.position.x = 5
      upPipe.position.y = yBase + 10
      downPipe.position.x = 5
      downPipe.position.y = yBase - 10
      scene.add(upPipe)
      pipes.push(upPipe)
      scene.add(downPipe)
      pipes.push(downPipe)
    }
  }

  function fly(speedToSet?: number) {
    if (speedToSet) {
      setSpeed(speedToSet)
    } else if (speed < 6) {
      setSpeed(speed + 0.1)
    }
    if (cube) {
      if (cube.position.y > -9.5) {
        cube.position.y = cube.position.y - speed / 10
      } else {
        dead()
      }
    }
  }

  function dead() {
    console.log('dead')
    cancelAnimationFrame(requestRef.current)
  }

  return <div />
}
