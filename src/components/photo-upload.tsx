'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {type DragEvent, forwardRef, useCallback, useEffect, useRef, useState} from 'react'

import {Button} from '@/ui'
import {cn} from '@/utils'

type UploadItemData = {
  id: string
  file: File
  preview: string
  progress: number
  status: 'uploading' | 'done'
}

const ProgressRing = ({progress}: {progress: number}) => {
  const radius = 28
  const circumference = 2 * Math.PI * radius

  return (
    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r={radius} fill="none" stroke="white" strokeOpacity={0.2} strokeWidth={2} />
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (progress / 100) * circumference}
      />
    </svg>
  )
}

const Checkmark = () => (
  <svg
    className="w-6 h-6 text-white"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const EmptyUpload = ({dragging}: {dragging: boolean}) => (
  <div className="flex flex-col items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
      <Image src="/svg/upload.svg" alt="upload" width={20} height={20} className="w-5 h-5 opacity-90" />
    </div>
    <div className="text-center">
      <p className="text-white/70 text-sm font-medium">
        {dragging ? 'Drop your photos here' : 'Drag & drop photos here'}
      </p>
      <p className="text-white/40 text-xs mt-1">or click to browse</p>
    </div>
  </div>
)

const UploadItem = forwardRef<HTMLDivElement, {item: UploadItemData}>(({item}, ref) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const checkRef = useRef<HTMLDivElement>(null)
  const didAnimate = useRef(false)

  useEffect(() => {
    if (item.status === 'done' && !didAnimate.current) {
      didAnimate.current = true
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {duration: 0.3, ease: 'power2.out', opacity: 0})
      }
      if (checkRef.current) {
        gsap.fromTo(
          checkRef.current,
          {opacity: 0, scale: 0.5},
          {duration: 0.3, ease: 'back.out(2)', opacity: 1, scale: 1}
        )
      }
    }
  }, [item.status])

  return (
    <div ref={ref} className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.preview} alt="" className="w-full h-full object-cover" />

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 flex items-center justify-center"
        style={{opacity: item.status === 'done' ? 0 : 1}}
      >
        <ProgressRing progress={item.progress} />
      </div>

      <div
        ref={checkRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{opacity: item.status === 'done' ? 1 : 0}}
      >
        <Checkmark />
      </div>
    </div>
  )
})

const AddMore = () => (
  <div className="w-20 h-20 rounded-lg border border-dashed border-white/20 flex items-center justify-center hover:border-white/40 transition-colors">
    <svg
      className="w-5 h-5 text-white/40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </div>
)

export const PhotoUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<UploadItemData[]>([])
  const [dragging, setDragging] = useState(false)
  const dragCounter = useRef(0)

  const simulateUpload = useCallback((item: UploadItemData) => {
    const proxy = {progress: 0}

    gsap.to(proxy, {
      duration: 1.6 + Math.random() * 0.8,
      ease: 'power2.out',
      onComplete: () => {
        setItems(prev => prev.map(i => (i.id === item.id ? {...i, progress: 100, status: 'done'} : i)))
      },
      onUpdate: () => {
        setItems(prev => prev.map(i => (i.id === item.id ? {...i, progress: proxy.progress} : i)))
      },
      progress: 100,
    })
  }, [])

  const handleFiles = useCallback(
    (files: FileList) => {
      const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'))

      if (!imageFiles.length) {
        return
      }

      const newItems: UploadItemData[] = imageFiles.map(file => ({
        file,
        id: crypto.randomUUID(),
        preview: URL.createObjectURL(file),
        progress: 0,
        status: 'uploading' as const,
      }))

      setItems(prev => [...prev, ...newItems])
      newItems.forEach(item => simulateUpload(item))
    },
    [simulateUpload]
  )

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault()
    dragCounter.current++
    setDragging(true)
  }, [])

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    dragCounter.current--

    if (dragCounter.current === 0) {
      setDragging(false)
    }
  }, [])

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
  }, [])

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      dragCounter.current = 0
      setDragging(false)
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const hasItems = items.length > 0
  const allDone = hasItems && items.every(i => i.status === 'done')

  const handleCancel = useCallback(() => {
    items.forEach(i => URL.revokeObjectURL(i.preview))
    setItems([])
  }, [items])

  const handleSubmit = useCallback(() => {
    // TODO: actual upload logic
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 w-full mx-auto max-w-130">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={e => {
          if (e.target.files?.length) {
            handleFiles(e.target.files)
            e.target.value = ''
          }
        }}
      />

      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative w-full rounded-2xl border border-dashed cursor-pointer transition-all duration-200 p-6',
          dragging ? 'border-white/60 bg-white/10' : 'border-white/20 bg-white/3 hover:border-white/40 hover:bg-white/6'
        )}
      >
        {!hasItems && <EmptyUpload dragging={dragging} />}

        {hasItems && (
          <div className="flex flex-wrap gap-3 justify-center">
            {items.map(item => (
              <UploadItem key={item.id} item={item} />
            ))}
            <AddMore />
          </div>
        )}
      </div>

      {hasItems && (
        <div className="flex items-center gap-4">
          <button
            className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            onClick={handleCancel}
          >
            Zrušit
          </button>
          <Button
            disabled={!allDone}
            className={cn(!allDone && 'opacity-40 pointer-events-none')}
            onClick={handleSubmit}
          >
            <Image src="/svg/upload.svg" alt="" width={16} height={16} className="w-4 h-4" />
            Nahrát
          </Button>
        </div>
      )}
    </div>
  )
}
