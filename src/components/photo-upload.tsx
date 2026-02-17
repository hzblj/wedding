'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {type DragEvent, forwardRef, useCallback, useEffect, useRef, useState} from 'react'

import {createClient} from '@/lib'
import {Button} from '@/ui'
import {cn} from '@/utils'

type UploadItemData = {
  id: string
  file: File
  preview: string
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
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

const ErrorIcon = () => (
  <svg
    className="w-6 h-6 text-red-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)

const UploadItem = forwardRef<HTMLDivElement, {item: UploadItemData; onRemove: (id: string) => void}>(
  ({item, onRemove}, ref) => {
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

    const showOverlay = item.status === 'uploading' || item.status === 'error'

    return (
      <div ref={ref} className="group relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0">
        {item.file.type.startsWith('video/') ? (
          <video src={item.preview} muted className="w-full h-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.preview} alt="" className="w-full h-full object-cover" />
        )}

        {showOverlay && (
          <div ref={overlayRef} className="absolute inset-0 bg-black/50 flex items-center justify-center">
            {item.status === 'uploading' && <ProgressRing progress={item.progress} />}
            {item.status === 'error' && <ErrorIcon />}
          </div>
        )}

        <div
          ref={checkRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{opacity: item.status === 'done' ? 1 : 0}}
        >
          <Checkmark />
        </div>

        {item.status !== 'uploading' && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
              onRemove(item.id)
            }}
            className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

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
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<UploadItemData[]>([])
  const [dragging, setDragging] = useState(false)
  const dragCounter = useRef(0)

  const handleFiles = useCallback((files: FileList) => {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'))

    if (!imageFiles.length) {
      return
    }

    const newItems: UploadItemData[] = imageFiles.map(file => ({
      file,
      id: crypto.randomUUID(),
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending' as const,
    }))

    setItems(prev => [...prev, ...newItems])
  }, [])

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

  const gsapTweens = useRef<Map<string, gsap.core.Tween>>(new Map())

  const hasItems = items.length > 0
  const hasUploadable = items.some(i => i.status === 'pending' || i.status === 'error')
  const isUploading = items.some(i => i.status === 'uploading')

  const handleRemove = useCallback(
    (id: string) => {
      const item = items.find(i => i.id === id)

      if (item) {
        URL.revokeObjectURL(item.preview)
      }

      const tween = gsapTweens.current.get(id)

      if (tween) {
        tween.kill()
        gsapTweens.current.delete(id)
      }

      setItems(prev => prev.filter(i => i.id !== id))
    },
    [items]
  )

  const handleCancel = useCallback(() => {
    gsapTweens.current.forEach(t => t.kill())
    gsapTweens.current.clear()
    items.forEach(i => URL.revokeObjectURL(i.preview))
    setItems([])
  }, [items])

  const handleSubmit = useCallback(async () => {
    const supabase = createClient()

    const pendingItems = items.filter(i => i.status === 'pending' || i.status === 'error')

    if (!pendingItems.length) {
      return
    }

    setItems(prev =>
      prev.map(i =>
        i.status === 'pending' || i.status === 'error' ? {...i, progress: 0, status: 'uploading' as const} : i
      )
    )

    for (const item of pendingItems) {
      const proxy = {progress: 0}

      const tween = gsap.to(proxy, {
        duration: 2 + Math.random(),
        ease: 'power2.out',
        onUpdate: () => {
          setItems(prev => prev.map(i => (i.id === item.id ? {...i, progress: proxy.progress} : i)))
        },
        progress: 90,
      })
      gsapTweens.current.set(item.id, tween)
    }

    const results = await Promise.allSettled(
      pendingItems.map(async item => {
        const ext = item.file.name.split('.').pop()
        const path = `${item.id}.${ext}`

        const {error} = await supabase.storage.from('public-bucket').upload(path, item.file)

        if (error) {
          throw error
        }

        return item.id
      })
    )

    results.forEach((result, idx) => {
      const item = pendingItems[idx]

      const tween = gsapTweens.current.get(item.id)
      if (tween) {
        tween.kill()
        gsapTweens.current.delete(item.id)
      }

      if (result.status === 'fulfilled') {
        setItems(prev => prev.map(i => (i.id === item.id ? {...i, progress: 100, status: 'done' as const} : i)))
      } else {
        setItems(prev => prev.map(i => (i.id === item.id ? {...i, status: 'error' as const} : i)))
      }
    })

    const allSucceeded = results.every(r => r.status === 'fulfilled')

    if (allSucceeded) {
      setItems(prev => {
        prev.forEach(i => URL.revokeObjectURL(i.preview))
        return []
      })
      router.refresh()
    }
  }, [items, router])

  return (
    <div className="flex flex-col items-center gap-4 w-full mx-auto max-w-130">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*"
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
              <UploadItem key={item.id} item={item} onRemove={handleRemove} />
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
            disabled={!hasUploadable || isUploading}
            className={cn((!hasUploadable || isUploading) && 'opacity-40 pointer-events-none')}
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
