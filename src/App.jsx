import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Menu, X, ArrowUp, Github, Linkedin, Mail, 
  ExternalLink, Star, MapPin, Send, Terminal, Code2, 
  ShieldAlert, Smartphone, Lock, Award, Loader2, Phone, Shield
} from 'lucide-react';

// --- CUSTOM HOOKS ---

const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};

// --- COMPONENTS & SECTIONS ---

const Navbar = ({ darkMode, toggleTheme, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Soham.Gore
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                activeSection === item.toLowerCase() ? 'text-cyan-500' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {item}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition">
            {darkMode ? <Sun size={20} className="text-cyan-400" /> : <Moon size={20} className="text-purple-600" />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme}>
            {darkMode ? <Sun size={20} className="text-cyan-400" /> : <Moon size={20} className="text-purple-600" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-slate-200">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-400"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const roles = ["Cyber Security Specialist", "Software Developer", "Penetration Tester", "App Developer"];
  const typewrittenText = useTypewriter(roles);

  // Resume Download Handler
  const handleDownloadResume = (e) => {
    e.preventDefault();
    
    // NOTE FOR PRODUCTION: 
    // In a real deployed React app, you would simply use an anchor tag like:
    // <a href="/Resume_Soham_Gore.pdf" download>Download Resume</a>
    // and place the PDF in your /public folder. 
    // 
    // For this live preview environment, we generate a text blob based on your uploaded resume:
    const resumeText = `SOHAM GORE
Cyber Security Specialist & Software Developer
Email: goresoham07@gmail.com | Mobile: 9819883022
Location: Dombivli (W), Maharashtra, India
LinkedIn: https://www.linkedin.com/in/soham-gore-24001534a

PROFILE SUMMARY
A B.Tech Computer Engineering graduate seeking challenging roles in software development and cybersecurity to utilize technical skills and contribute to meaningful projects. Strong foundation in programming and cybersecurity. Experienced in penetration testing and network analysis. Skilled in ethical hacking and secure code practices.

EDUCATION
• B.Tech Computer Engineering (Honours In Cyber Security And Forensics) - Expected 2026
  KJ Somaiya School of Engineering | CGPA: 8.8
• Diploma in Computer Engineering - Completed 2023
  S.H Jondhale Polytechnic | 85.54%
• 10th Class - Completed 2020
  Vidya Niketan School | 86.20%

TECHNICAL SKILLS
• Cybersecurity Tools: Bettercap, Nmap, Wireshark, Metasploit, Burp Suite, Nessus
• Core Concept: Ethical hacking, reconnaissance, secure coding, VAPT, bug hunting
• Languages & Tech: Java, Python, SQL, OpenCV, NumPy, Pillow, Android Dev

INTERNSHIPS
• EcoTech Services | Cybersecurity Intern (Sep 2025 - Oct 2025)
  Gained expertise in network reconnaissance and VAPT. Performed system exploitation, password security audits, and web app testing (SQLi, XSS, CSRF).
• Edunet Foundation | App Dev & Security Intern (Jan 2025 - Feb 2025)
  Developed a secure steganography project implementing LSB-based image hiding combined with encryption using Python and Android frameworks.
• Corizo | Penetration Testing Intern (Sep 2024 - Nov 2024)
  Performed penetration testing on ColdBox framework. Identified vulnerabilities like SQL Injection and XSS.
• Acmegrade | Network Security Intern (May 2024 - Jul 2024)
  Worked on network security, simulated MITM attacks, and performed vulnerability analysis using Bettercap, Nmap, and Wireshark.

PROJECTS
• Family Financial Manager App: Real-time syncing, trip budgeting, location-based cash payment notifications.
• NeuroAI Mental Health App: AI chatbot with multimodal distress detection.
• Blood Donation (Life Drop) App: Manages donor data and alerts.
• Secure Image Steganography: LSB-based data hiding.
• Renewit: E-waste Management platform.`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Soham_Gore_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0 bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-400/20 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-slate-900 dark:text-white">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">Soham Gore</span>
          </h1>
        </motion.div>
        
        <div className="text-2xl md:text-4xl font-semibold mb-6 h-12 text-slate-700 dark:text-slate-300">
          I am a <span className="text-cyan-600 dark:text-cyan-400">{typewrittenText}</span>
          <span className="animate-pulse">|</span>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Building secure, intelligent systems at the intersection of Software Development and Cybersecurity.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#projects" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:-translate-y-1 text-center">
            View My Work
          </a>
          <button onClick={handleDownloadResume} className="px-8 py-3 border-2 border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-400 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-semibold rounded-lg transition-all hover:-translate-y-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            Download Resume
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      <div className="relative group mx-auto md:mx-0 max-w-sm w-full">
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>
        <div className="relative aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-300 dark:border-slate-700">
           <div className="text-center p-6">
             <Shield size={64} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
             <span className="text-slate-500 dark:text-slate-400 font-medium">Profile Photo</span>
           </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
          About Me <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-4 leading-relaxed">
          I am a passionate <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Computer Engineering graduate (B.Tech Honours in Cyber Security & Forensics)</span> from KJ Somaiya School of Engineering. My core mission is to merge secure coding practices with intelligent application development.
        </p>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
          With hands-on experience in vulnerability assessments, penetration testing, network analysis, and full-stack app development, I am equipped to build robust, hardened environments and versatile software solutions ranging from mental health AI chatbots to secure steganography applications.
        </p>
        
        <div className="mb-8 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-900/50 w-fit px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
          <MapPin size={20} className="text-cyan-500" />
          <span>Dombivli (W), Maharashtra, India</span>
        </div>

        <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/20 dark:to-cyan-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-sm font-bold tracking-wide text-purple-700 dark:text-purple-300 uppercase whitespace-nowrap">
              Currently Building
            </span>
          </div>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200 sm:border-l sm:border-slate-300 dark:sm:border-slate-700 sm:pl-3">
            Deep Family-Centric Financial App w/ Trip Budgeting & Location-Based Automations
          </span>
        </div>
      </div>
    </motion.div>
  </section>
);

const Skills = () => {
  const skillCategories = [
    { title: "Languages & Core", icon: <Code2 />, skills: ["Java", "Python", "SQL", "Software Dev Principles"] },
    { title: "Cybersecurity", icon: <ShieldAlert />, skills: ["Penetration Testing", "Vulnerability Assessment (VAPT)", "Ethical Hacking", "Network Analysis"] },
    { title: "Security Tools", icon: <Terminal />, skills: ["Nmap", "Wireshark", "Metasploit", "Burp Suite", "Nessus", "Bettercap"] },
    { title: "Vulnerabilities", icon: <Lock />, skills: ["SQL Injection", "XSS", "CSRF", "MITM Attacks", "Auth Flaws"] },
    { title: "App Dev & Frameworks", icon: <Smartphone />, skills: ["Android Development", "OpenCV", "NumPy", "Pillow"] },
    { title: "Certifications", icon: <Award />, skills: ["Google Cybersecurity", "Ethical Hacking", "IT Fundamentals"] },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Technical Arsenal</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Tools and methodologies I use to discover vulnerabilities, secure networks, and build resilient applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="text-sm font-medium px-3 py-1.5 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-800 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/20 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Family Financial Manager",
      desc: "Deep family-centric collaborative tool featuring culturally relevant categorization, trip budgeting, and comparative analytics. Engineered advanced Android automations to notify users of cash payments upon detecting location changes.",
      tags: ["Android", "App Development", "Location Automations", "Analytics"],
      featured: true,
      github: "#", demo: "#"
    },
    {
      title: "NeuroAI Mental Health App",
      desc: "An intelligent chatbot application integrating sentiment analysis and multimodal (text/speech) distress detection to provide continuous, empathetic mood tracking and support.",
      tags: ["AI Chatbot", "Sentiment Analysis", "Python"],
      featured: true,
      github: "#", demo: "#"
    },
    {
      title: "Secure Image Steganography",
      desc: "Developed a robust LSB-based image steganography project leveraging encryption to hide data securely. Demonstrated end-to-end encoding/decoding with minimal image distortion.",
      tags: ["Python", "OpenCV", "NumPy", "Pillow", "Java"],
      featured: false,
      github: "#", demo: "#"
    },
    {
      title: "Life Drop: Blood Donation",
      desc: "An application designed to seamlessly manage blood donor data, schedule appointments, and dispatch critical alerts connecting donors to recipients efficiently.",
      tags: ["App Development", "Java", "SQL"],
      featured: false,
      github: "#", demo: "#"
    },
    {
      title: "Renewit: E-waste Management",
      desc: "A dedicated platform aimed at promoting environmental sustainability by helping users securely, safely, and responsibly dispose of electronic waste.",
      tags: ["Software Development", "Sustainability"],
      featured: false,
      github: "#", demo: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
          <Code2 size={32} className="text-purple-500" /> Featured Work
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">A selection of my recent applications and cybersecurity projects.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className={`relative bg-white dark:bg-slate-950 p-7 rounded-2xl border ${project.featured ? 'border-purple-300 dark:border-purple-800/50' : 'border-slate-200 dark:border-slate-800'} hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all flex flex-col h-full z-10`}
          >
            {project.featured && (
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-purple-500/30">
                <Star size={14} className="fill-white" /> Featured
              </span>
            )}
            
            <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow text-sm leading-relaxed">{project.desc}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-900 text-cyan-700 dark:text-cyan-400 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-6 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
              <a href={project.github} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                <Github size={18} /> Code
              </a>
              <a href={project.demo} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                <ExternalLink size={18} /> Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Timeline = () => {
  const experiences = [
    {
      type: "internship",
      role: "Cybersecurity Intern",
      company: "EcoTech Services",
      date: "Sep 2025 - Oct 2025",
      points: [
        "Delivered a comprehensive penetration testing project with professional reporting, and remediation recommendations.",
        "Performed system exploitation, password audits, and web application testing (SQLi, XSS, CSRF).",
        "Gained expertise in reconnaissance and scanning using Nmap, Wireshark, Nessus, Burp Suite, and Metasploit."
      ]
    },
    {
      type: "internship",
      role: "App Dev & Security Intern",
      company: "Edunet Foundation",
      date: "Jan 2025 - Feb 2025",
      points: [
        "Independently developed a secure LSB-based image steganography project with encryption for secure data hiding.",
        "Created Python and Android applications using OpenCV, NumPy, Pillow, and Java.",
        "Demonstrated end-to-end message encoding and decoding with minimal image distortion."
      ]
    },
    {
      type: "internship",
      role: "Penetration Testing Intern",
      company: "Corizo",
      date: "Sep 2024 - Nov 2024",
      points: [
        "Performed thorough penetration testing on the ColdBox framework.",
        "Successfully identified vulnerabilities including SQL Injection and Cross-Site Scripting (XSS).",
        "Engaged in proactive bug hunting on public bounty platforms."
      ]
    },
    {
      type: "internship",
      role: "Network Security Intern",
      company: "Acmegrade",
      date: "May 2024 - Jul 2024",
      points: [
        "Executed network security and reconnaissance operations utilizing Bettercap, Nmap, and Wireshark.",
        "Simulated Man-In-The-Middle (MITM) attacks and performed deep vulnerability analysis."
      ]
    },
    {
      type: "education",
      role: "B.Tech Computer Engineering (Honours: Cyber Security)",
      company: "KJ Somaiya School of Engineering",
      date: "Expected 2026",
      points: [
        "CGPA: 8.8",
        "Honours in Cyber Security and Forensics",
        "Actively building foundational expertise in ethical hacking, network analysis, and secure coding practices."
      ]
    },
    {
      type: "education",
      role: "Diploma in Computer Engineering",
      company: "S.H Jondhale Polytechnic",
      date: "Completed 2023",
      points: [
        "Score: 85.54%",
        "Developed a strong foundation in programming, software principles, and algorithms."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Experience & Education</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">My professional journey in cybersecurity, software development, and academic background.</p>
        </div>
        
        <div className="relative border-l-2 border-cyan-200 dark:border-cyan-900 md:mx-auto md:border-l-0">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent -translate-x-1/2"></div>

          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative mb-12 md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-14 md:ml-0 md:text-right' : 'md:pl-14 md:ml-auto'}`}
            >
              <div className={`absolute top-1.5 w-4 h-4 rounded-full ${exp.type === 'education' ? 'bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'} -left-[9px] ${i % 2 === 0 ? 'md:-right-[9px] md:left-auto' : 'md:-left-[9px]'} border-4 border-white dark:border-slate-950 z-10`}></div>
              
              <div className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group">
                <span className={`text-sm font-bold ${exp.type === 'education' ? 'text-purple-600 dark:text-purple-400' : 'text-cyan-600 dark:text-cyan-400'} mb-2 block tracking-wider uppercase`}>{exp.date}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{exp.role}</h3>
                <h4 className="text-base sm:text-lg font-medium text-slate-500 dark:text-slate-400 mb-5">{exp.company}</h4>
                <ul className={`text-slate-600 dark:text-slate-400 space-y-3 text-sm sm:text-base ${i % 2 === 0 ? 'md:text-right md:flex md:flex-col md:items-end' : ''}`}>
                  {exp.points.map((point, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <span className={`${exp.type === 'education' ? 'text-purple-500' : 'text-cyan-500'} mt-1 md:hidden`}>▹</span>
                      <span className={`hidden md:inline ${exp.type === 'education' ? 'text-purple-500' : 'text-cyan-500'} mt-1 ${i % 2 === 0 ? 'ml-3' : 'mr-3'}`}>▹</span>
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Have a project in mind or want to discuss Software & Security? Let's connect.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Info</h3>
             <div className="space-y-4">
               <a href="mailto:goresoham07@gmail.com" className="flex items-center gap-4 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition">
                 <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700"><Mail size={18} /></div>
                 <span className="break-all">goresoham07@gmail.com</span>
               </a>
               <a href="tel:+919819883022" className="flex items-center gap-4 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition">
                 <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700"><Phone size={18} /></div>
                 +91 9819883022
               </a>
               <a href="https://www.linkedin.com/in/soham-gore-24001534a" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition">
                 <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700"><Linkedin size={18} /></div>
                 LinkedIn Profile
               </a>
               <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 pt-2">
                 <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 text-cyan-500"><MapPin size={18} /></div>
                 Dombivli (W), Maharashtra, India
               </div>
             </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white transition" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Email</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white transition" placeholder="john@example.com" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
              <input required type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white transition" placeholder="Project Inquiry" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
              <textarea required rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white transition resize-none" placeholder="Hello, I'd like to talk about..."></textarea>
            </div>
            
            <button disabled={isSubmitting} type="submit" className="w-full py-3.5 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <><Send size={20} /> Send Message</>}
            </button>

            <AnimatePresence>
              {submitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-center font-medium">
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
};


// --- MAIN APP ASSEMBLY ---

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);
  
  const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    document.title = "Soham Gore | Cybersecurity & Software Developer";
    const metaDesc = document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Portfolio of Soham Gore, B.Tech graduate specializing in Cybersecurity, Penetration Testing, and Application Development.";
    document.head.appendChild(metaDesc);

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={`min-h-screen font-sans bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-50 transition-colors duration-300 overflow-x-hidden selection:bg-cyan-500/30`}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} activeSection={activeSection} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <footer className="py-8 text-center border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-[#020617]">
        <p>© {new Date().getFullYear()} Soham Gore. Built with React & Tailwind CSS.</p>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-lg shadow-cyan-500/30 z-50 transition-colors border border-cyan-400"
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}