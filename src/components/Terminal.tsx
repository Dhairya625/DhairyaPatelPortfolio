'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'

interface TerminalProps {
  onNavigate?: (path: string) => void
  onClose?: () => void
}

const Terminal = ({ onNavigate, onClose }: TerminalProps) => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output' | 'error' | 'success', content: string }>>([])
  const [currentPath, setCurrentPath] = useState('~')
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: 700, height: 450 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const commands = {
    help: () => [
      { type: 'output' as const, content: '╔════════════════════════════════════════════╗' },
      { type: 'output' as const, content: '║       PORTFOLIO NAVIGATION TERMINAL        ║' },
      { type: 'output' as const, content: '╠════════════════════════════════════════════╣' },
      { type: 'output' as const, content: '║  ls           List available pages         ║' },
      { type: 'output' as const, content: '║  cd <page>    Navigate to page             ║' },
      { type: 'output' as const, content: '║  clear        Clear terminal               ║' },
      { type: 'output' as const, content: '║  exit         Close terminal               ║' },
      { type: 'output' as const, content: '╚════════════════════════════════════════════╝' }
    ],
    ls: () => [
      { type: 'output' as const, content: '' },
      { type: 'output' as const, content: '📁 Available pages:' },
      { type: 'output' as const, content: '   ├── 🏠 home         Main page' },
      { type: 'output' as const, content: '   ├── 👤 about        About me' },
      { type: 'output' as const, content: '   ├── 🛠️  skills       Technical skills' },
      { type: 'output' as const, content: '   ├── 🚀 projects     Portfolio projects' },
      { type: 'output' as const, content: '   └── 📧 contact      Get in touch' },
      { type: 'output' as const, content: '' }
    ],
    cd: (args: string[]) => {
      const page = args[0]?.toLowerCase()
      if (!page) {
        return [{ type: 'error' as const, content: '❌ Usage: cd <page>' }]
      }
      
      const validPages = ['home', 'about', 'skills', 'projects', 'contact']
      if (!validPages.includes(page)) {
        return [{ type: 'error' as const, content: `❌ Page "${page}" not found. Type "ls" to see available pages.` }]
      }
      
      setCurrentPath(`~/${page}`)
      
      const route = page === 'home' ? '/' : `/${page}`
      setTimeout(() => {
        if (onNavigate) {
          onNavigate(route)
        } else {
          router.push(route)
        }
      }, 600)
      
      return [{ type: 'success' as const, content: `✓ Navigating to /${page}...` }]
    },
    clear: () => {
      setHistory([])
      return []
    },
    exit: () => {
      if (onClose) {
        setTimeout(() => onClose(), 400)
      }
      return [{ type: 'success' as const, content: '👋 Closing terminal... Thanks for visiting!' }]
    }
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    const [command, ...args] = trimmedCmd.split(' ')
    
    setCommandHistory(prev => [...prev, trimmedCmd])
    setHistoryIndex(-1)
    
    setHistory(prev => [...prev, { type: 'command', content: `${currentPath} $ ${trimmedCmd}` }])

    if (commands[command as keyof typeof commands]) {
      const result = commands[command as keyof typeof commands](args)
      setHistory(prev => [...prev, ...result])
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `❌ Command not found: ${command}` },
        { type: 'output', content: '💡 Type "help" for available commands' }
      ])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(input)
      setInput('')
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === dragRef.current || dragRef.current?.contains(e.target as Node)) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
          y: Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y))
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset, size])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    // Center terminal
    setPosition({
      x: (window.innerWidth - 700) / 2,
      y: 80
    })

    // Entrance animation
    gsap.from(containerRef.current, {
      scale: 0.85,
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })
    
    // Welcome message
    setTimeout(() => {
      setHistory([
        { type: 'output', content: '╔════════════════════════════════════════════════╗' },
        { type: 'success', content: '║    Welcome to Portfolio Navigation Terminal    ║' },
        { type: 'output', content: '╚════════════════════════════════════════════════╝' },
        { type: 'output', content: '' },
        { type: 'output', content: '  💡 Type "help" to see available commands' },
        { type: 'output', content: '  💡 Type "ls" to list all pages' },
        { type: 'output', content: '  💡 Type "cd <page>" to navigate' },
        { type: 'output', content: '' },
      ])
      inputRef.current?.focus()
    }, 400)
  }, [])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-cyan-400'
      case 'error':
        return 'text-red-400'
      case 'success':
        return 'text-green-400'
      default:
        return 'text-gray-300'
    }
  }

  const handleClose = () => {
    gsap.to(containerRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        if (onClose) onClose()
      }
    })
  }

  return (
    <div
      ref={containerRef}
      className="fixed z-[9999] select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {/* Main Terminal Container */}
      <div className="relative w-full h-full backdrop-blur-2xl bg-black/95 border border-white/20 rounded-xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
        {/* Glassmorphism gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        
        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Header */}
        <div
          ref={dragRef}
          className="relative flex items-center justify-between px-5 py-3 bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-b border-white/10 cursor-move group backdrop-blur-md"
          onMouseDown={handleMouseDown}
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 transition-all duration-200 shadow-lg shadow-red-500/30 hover:scale-110 active:scale-95"
            />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30" />
          </div>

          {/* Title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-xs font-mono text-white/70">portfolio-navigator</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">active</span>
            </div>
          </div>

          {/* Drag hint */}
          <div className="text-[10px] text-white/30 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            ⇅ drag to move
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="relative p-6 font-mono text-[13px] overflow-y-auto cursor-text"
          style={{
            height: `calc(100% - 52px)`,
            fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", "Consolas", monospace',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal lines */}
          {history.map((line, index) => (
            <div 
              key={index} 
              className={`${getLineColor(line.type)} leading-relaxed mb-0.5`}
              style={{
                animation: 'terminalFadeIn 0.2s ease-out both',
                animationDelay: `${index * 0.02}s`
              }}
            >
              {line.content}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center mt-2">
            <span className="text-cyan-400 font-semibold mr-2">{currentPath} $</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-cyan-400 placeholder-gray-600"
              autoComplete="off"
              spellCheck="false"
              placeholder="type a command..."
            />
            <div
              className="w-2 h-4 bg-cyan-400 ml-1 shadow-lg shadow-cyan-400/50"
              style={{ animation: 'cursorBlink 1s step-end infinite' }}
            />
          </div>
        </div>

        {/* Bottom hint bar */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-2 bg-black/50 border-t border-white/5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span>↑↓ history • Ctrl+L clear</span>
            <span>{size.width}×{size.height}</span>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes terminalFadeIn {
          from {
            opacity: 0;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }

        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  )
}

export default Terminal
