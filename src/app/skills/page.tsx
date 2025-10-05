'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeadingAnimation } from '@/hooks/useHeadingAnimation'

gsap.registerPlugin(ScrollTrigger)

const SkillsPage = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const animatedHeadingRef = useHeadingAnimation({
    animationType: 'varied',
    duration: 2.0,
    ease: 'elastic.out(1, 0.3)',
    hoverColor: '#4472ca',
    addGlow: true,
    adjacentStagger: 0.12,
  })

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Skills categories animation
      gsap.from('.skill-category', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
      })

      // Skills items animation
      gsap.from('.skill-item', {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.6,
      })

      // Progress bars animation
      gsap.from('.progress-bar', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const skillCategories = [
    {
      title: 'Frontend Development',
      description: 'Creating engaging user interfaces with modern web technologies',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'JavaScript', level: 88 },
        { name: 'HTML/CSS', level: 95 },
      ]
    },
    {
      title: 'Backend Development',
      description: 'Building robust server-side applications and APIs',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'MongoDB', level: 78 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'REST APIs', level: 88 },
        { name: 'GraphQL', level: 70 },
      ]
    },
    {
      title: 'Tools & Technologies',
      description: 'Development tools and technologies that enhance productivity',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'VS Code', level: 90 },
        { name: 'Figma', level: 75 },
        { name: 'Linux', level: 80 },
      ]
    },
    {
      title: 'AI & Machine Learning',
      description: 'Exploring the intersection of AI and web development',
      skills: [
        { name: 'Python', level: 75 },
        { name: 'TensorFlow', level: 60 },
        { name: 'OpenAI API', level: 70 },
        { name: 'Pandas', level: 68 },
        { name: 'NumPy', level: 65 },
        { name: 'Scikit-learn', level: 60 },
      ]
    },
    {
      title: 'Graphic Design',
      description: 'Creating visual content and multimedia experiences',
      skills: [
        { name: 'Adobe Photoshop', level: 85 },
        { name: 'Adobe Premiere Pro', level: 80 },
        { name: 'Adobe After Effects', level: 75 },
        { name: 'Figma', level: 90 },
        { name: 'Canva', level: 95 },
        { name: 'Video Editing', level: 78 },
      ]
    }
  ]

  const experience = [
    {
      period: '2023 - Present',
      role: 'Full-Stack Developer',
      company: 'Freelance',
      description: 'Developing web applications using MERN stack, working with various clients on diverse projects.',
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript']
    },
    {
      period: '2022 - 2023',
      role: 'Frontend Developer',
      company: 'Personal Projects',
      description: 'Built multiple portfolio websites and web applications to showcase technical skills.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript']
    },
    {
      period: '2021 - 2022',
      role: 'Student Developer',
      company: 'University Projects',
      description: 'Developed academic projects including AI/ML applications and web-based systems.',
      technologies: ['Python', 'JavaScript', 'HTML/CSS', 'MySQL']
    }
  ]

  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.015] z-0">
        <div
          style={{
            backgroundImage: `url("image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
          className="w-full h-full"
        />
      </div>

      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/5 via-transparent to-transparent blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-teal-600/5 via-transparent to-transparent blur-3xl z-0" />

      <div className="relative max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 z-10">
        {/* Header */}
        <div ref={headingRef} className="mb-24">
          <div className="flex items-center gap-4 mb-6 opacity-60">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white" />
            <span className="text-xs tracking-[0.3em] uppercase text-gray-500 font-light">Technical Expertise</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h1 
                ref={animatedHeadingRef}
                className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter text-white leading-[0.9] mb-8"
              >
                Skills & Expertise
              </h1>

              <div className="flex items-center gap-4">
                <div className="w-16 h-[2px] bg-gradient-to-r from-blue-500 to-teal-500" />
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500" />
              </div>
            </div>

            <div className="lg:pt-8">
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                A comprehensive overview of my technical skills, tools, and technologies I work with to build modern, 
                scalable web applications and innovative solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Categories */}
        <div className="space-y-16 mb-24">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="skill-category">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-400 font-light">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-item group">
                    <div className="border border-white/10 p-6 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white font-light">{skill.name}</span>
                        <span className="text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full bg-white/5 rounded-full h-1 mb-2">
                        <div 
                          className="progress-bar bg-gradient-to-r from-blue-500 to-teal-500 h-1 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            <h2 className="text-sm tracking-widest uppercase text-gray-600 font-light">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="skill-item group border-l-2 border-white/10 pl-8 pb-8 last:pb-0 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <p className="text-xs tracking-widest uppercase text-gray-600 mb-2">{exp.period}</p>
                    <h3 className="text-lg text-white font-bold mb-1">{exp.role}</h3>
                    <p className="text-sm text-gray-400">{exp.company}</p>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <p className="text-gray-300 font-light leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-xs bg-white/[0.05] border border-white/10 text-gray-400 hover:text-white transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Learning */}
        <div className="border border-white/10 p-8 bg-white/[0.01]">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            <h2 className="text-sm tracking-widest uppercase text-gray-600 font-light">
              Continuous Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Currently Learning</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 font-light">• Advanced TypeScript patterns</li>
                <li className="text-gray-400 font-light">• Microservices architecture</li>
                <li className="text-gray-400 font-light">• Machine Learning integration</li>
                <li className="text-gray-400 font-light">• Cloud deployment strategies</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Areas of Interest</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 font-light">• AI-powered web applications</li>
                <li className="text-gray-400 font-light">• Performance optimization</li>
                <li className="text-gray-400 font-light">• Accessibility best practices</li>
                <li className="text-gray-400 font-light">• Modern development workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .char-reveal {
          display: inline-block;
        }
      `}</style>
    </section>
  )
}

export default SkillsPage
