// Portfolio Data Configuration for 3rd Semester CS Student - Abdullah Pervaiz
window.PORTFOLIO_DATA = {
  personal: {
    name: "Abdullah Pervaiz",
    title: "Software Engineering & CS Undergrad",
    semester: "3rd Semester Undergrad",
    status: "Exploring Systems, DSA & Full-Stack Development",
    bio: "Passionate 3rd-semester Computer Science student bridging strong low-level computing foundations in C++ and Python with modern web engineering in TypeScript, Angular, and API architectures. Actively mastering Data Structures & Algorithms, database schema optimization, and privacy-first client-side web tools.",
    location: "Available Globally / Remote",
    email: "abdullahpervaiz194@gmail.com",
    phone: "03138977582",
    github: "https://github.com/abdullahpervaiz194-del/",
    linkedin: "https://www.linkedin.com/in/abdullah-pervaiz-2b95902ab",
    leetcode: "https://leetcode.com",
    stats: [
      { label: "DSA Problems Solved", value: "250+", detail: "Arrays, Trees, Graphs, DP" },
      { label: "Semester Focus", value: "3rd Sem", detail: "CS & Systems Track" },
      { label: "Core Technologies", value: "8+", detail: "C++, Python, TS, Angular, SQL" },
      { label: "Live Deployments", value: "10+", detail: "Web, Extensions & Systems" }
    ]
  },

  skills: [
    {
      category: "Languages & Low-Level",
      icon: "Code2",
      description: "Foundational programming with memory awareness and strong type safety",
      items: [
        {
          name: "C++",
          level: "Intermediate",
          badge: "OOP & Systems",
          experience: "Pointers, Memory Mgmt, STL, Templates, OOP",
          snippet: `// C++ STL Custom Vector & MinHeap Demo
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>

template<typename T>
class MinHeap {
    std::vector<T> heap;
public:
    void insert(T val) {
        heap.push_back(val);
        std::push_heap(heap.begin(), heap.end(), std::greater<T>());
    }
    T extractMin() {
        std::pop_heap(heap.begin(), heap.end(), std::greater<T>());
        T top = heap.back();
        heap.pop_back();
        return top;
    }
};`
        },
        {
          name: "Python",
          level: "Proficient",
          badge: "AI Chatbots & Scripting",
          experience: "API Integration, Async NLP workflows, Automation, Algorithmic scripts",
          snippet: `# Python Async AI Chatbot Service with API Integration
import asyncio
import aiohttp
from typing import Dict, Any, List

class AIChatbotService:
    def __init__(self, api_key: str, endpoint: str):
        self.api_key = api_key
        self.endpoint = endpoint
        self.session_history: List[Dict[str, str]] = []

    async def send_message(self, user_prompt: str) -> Dict[str, Any]:
        self.session_history.append({"role": "user", "content": user_prompt})
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "messages": self.session_history,
            "temperature": 0.7
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(self.endpoint, json=payload, headers=headers) as resp:
                data = await resp.json()
                reply = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                self.session_history.append({"role": "assistant", "content": reply})
                return {"reply": reply, "status": resp.status}`
        },
        {
          name: "TypeScript",
          level: "Intermediate",
          badge: "Type Safety",
          experience: "Generics, Strict Typing, Interfaces, Modern ESNext features",
          snippet: `// TypeScript Generic API Client Contract
export interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: string;
  meta?: { page: number; total: number };
}

export async function fetchWithRetry<T>(
  url: string, 
  retries: number = 3
): Promise<ApiResponse<T>> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
  throw new Error("Max retries exceeded");
}`
        }
      ]
    },
    {
      category: "Frontend & Frameworks",
      icon: "Layout",
      description: "Modern component-driven web architectures and responsive interfaces",
      items: [
        {
          name: "Angular Framework",
          level: "Intermediate",
          badge: "Enterprise Web",
          experience: "Components, Dependency Injection, Services, RxJS, Directives, Routing",
          snippet: `// Angular 17+ Standalone Component with RxJS & Signals
import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-metric-feed',
  standalone: true,
  template: \`
    <div class="card" *ngIf="dataSignal() as data">
      <h3>Active Pipeline Status</h3>
      <span class="badge">{{ data.status }}</span>
    </div>
  \`
})
export class MetricFeedComponent implements OnInit {
  private http = inject(HttpClient);
  dataSignal = signal<{ status: string; uptime: number } | null>(null);

  ngOnInit() {
    this.http.get('/api/telemetry').subscribe(val => this.dataSignal.set(val));
  }
}`
        },
        {
          name: "HTML5 & Modern CSS",
          level: "Advanced",
          badge: "UI/UX & Layout",
          experience: "Flexbox, CSS Grid, Glassmorphism, Animations, Semantic HTML, Responsive Web",
          snippet: `/* Modern CSS Glassmorphism & Neon Glow */
.glass-card {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 0 25px rgba(99, 102, 241, 0.25);
}`
        },
        {
          name: "React & JavaScript",
          level: "Intermediate",
          badge: "Reactive UI",
          experience: "Hooks (useState, useEffect, useMemo), Chrome Extension APIs (Manifest V3), Firebase",
          snippet: `// Chrome Extension Manifest V3 Local Storage Handler
// Removes URL fragments (#) so page sections share the same note list
function getCleanUrlKey(url) {
  const parsed = new URL(url);
  return \`\${parsed.origin}\${parsed.pathname}\${parsed.search}\`;
}

async function savePageNote(currentUrl, noteText) {
  const key = getCleanUrlKey(currentUrl);
  const result = await chrome.storage.local.get([key]);
  const existingNotes = result[key] || [];
  const updatedNotes = [...existingNotes, { id: Date.now(), text: noteText, createdAt: new Date().toISOString() }];
  await chrome.storage.local.set({ [key]: updatedNotes });
  return updatedNotes;
}`
        }
      ]
    },
    {
      category: "CS Core, Databases & APIs",
      icon: "Binary",
      description: "Rigorous problem solving, algorithm design, cloud databases, and API integrations",
      items: [
        {
          name: "Data Structures & Algorithms",
          level: "Advanced",
          badge: "Core Mastery",
          experience: "Trees, Graphs (BFS/DFS, Dijkstra), Dynamic Programming, Heaps, Hash Maps",
          snippet: `// Graph Breadth-First Search (Shortest Path in Unweighted Graph)
function shortestPath(adjList, startNode, targetNode) {
  const queue = [[startNode, [startNode]]];
  const visited = new Set([startNode]);

  while (queue.length > 0) {
    const [current, path] = queue.shift();
    if (current === targetNode) return path;

    for (const neighbor of (adjList[current] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return null; // No path found
}`
        },
        {
          name: "SQL & Firebase Database",
          level: "Intermediate",
          badge: "Relational & NoSQL",
          experience: "Relational Design, SQL Queries/JOINs, Firebase Realtime Database & Firestore integration",
          snippet: `-- Complex Analytical SQL Query with Window Functions
WITH UserPerformance AS (
    SELECT 
        u.user_id,
        u.username,
        COUNT(s.submission_id) AS total_submissions,
        SUM(CASE WHEN s.status = 'Accepted' THEN 1 ELSE 0 END) AS accepted_count,
        RANK() OVER (ORDER BY SUM(CASE WHEN s.status = 'Accepted' THEN 1 ELSE 0 END) DESC) AS rank_tier
    FROM users u
    LEFT JOIN submissions s ON u.user_id = s.user_id
    GROUP BY u.user_id, u.username
)
SELECT username, total_submissions, accepted_count, rank_tier
FROM UserPerformance
WHERE rank_tier <= 10;`
        },
        {
          name: "API Integration & Async",
          level: "Proficient",
          badge: "REST & Webhooks",
          experience: "RESTful architecture, asynchronous streams, token handling, error resilient fetching",
          snippet: `// Resilient API Integration with Payload Sanitization
async function queryExternalService(endpoint, payload) {
  const startTime = performance.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    const latency = Math.round(performance.now() - startTime);
    const data = await response.json();
    return { ok: response.ok, status: response.status, latency, data };
  } finally {
    clearTimeout(timeoutId);
  }
}`
        }
      ]
    }
  ],

  projects: [
    {
      id: "omniconvertor",
      title: "OmniConvertor — Multi-Format Client-Side Converter",
      category: "Fullstack & Angular",
      featured: true,
      tagline: "Privacy-first in-browser converter for PDF, images, audio, and video with Firebase database",
      description: "A modern, privacy-first, client-side web application for converting images, documents, audio, and video directly inside your web browser with zero server uploads. Features PDF to IMG, IMG to PDF, and integrated Firebase database for user preferences and conversion analytics.",
      techStack: ["React", "JavaScript", "Firebase Database", "WebAssembly", "Tailwind CSS"],
      highlights: [
        "100% Client-side conversions with zero file uploads to external servers",
        "Supports bidirectional PDF to IMG and IMG to PDF conversion flows",
        "Firebase database integration for real-time history and configuration storage"
      ],
      github: "https://github.com/abdullahpervaiz194-del/",
      demo: "https://omniconvertor-lime.vercel.app/",
      badge: "Featured Converter"
    },
    {
      id: "python-ai-chatbot",
      title: "Intelligent Python AI Chatbot with API Integration",
      category: "Python & APIs",
      featured: true,
      tagline: "Context-aware automated chatbot leveraging asynchronous REST APIs and NLP",
      description: "A robust AI chatbot built with Python featuring seamless API integration. Supports multi-turn contextual conversations, streaming responses, error recovery, custom prompting, and telemetry logging.",
      techStack: ["Python", "REST APIs", "AsyncIO", "JSON", "NLP Integration"],
      highlights: [
        "Asynchronous API integration with real-time token streaming and prompt engineering",
        "Session context management and intelligent conversation memory",
        "Graceful fallback handling for rate-limiting and connection interruptions"
      ],
      github: "https://github.com/abdullahpervaiz194-del/",
      demo: "#api-sandbox",
      badge: "Python & AI"
    },
    {
      id: "website-notes-extension",
      title: "Website Notes — Manifest V3 Chrome Extension",
      category: "Fullstack & Angular",
      featured: true,
      tagline: "Contextual in-browser notes stored locally with chrome.storage.local",
      description: "Website Notes is a Manifest V3 Chrome extension that stores page-associated notes locally with chrome.storage.local. URL fragments are removed before notes are associated with a page, so different sections of the same article share one note list.",
      techStack: ["JavaScript", "Chrome Extensions API", "Manifest V3", "HTML5", "CSS3"],
      highlights: [
        "Built on modern Chrome Extension Manifest V3 architecture",
        "Smart URL fragment (#) stripping so different anchor headings share one unified note list",
        "Zero tracking: 100% private local storage via chrome.storage.local"
      ],
      github: "https://github.com/abdullahpervaiz194-del/",
      demo: "https://github.com/abdullahpervaiz194-del/",
      badge: "Chrome Extension"
    },
    {
      id: "dsa-visualizer",
      title: "Interactive Sorting & Pathfinding Algorithm Visualizer",
      category: "DSA & Algorithms",
      featured: true,
      tagline: "Live step-by-step graphical execution of classic CS algorithms",
      description: "An interactive educational tool that illustrates the internal mechanics of sorting algorithms (Bubble, Selection, Insertion, QuickSort) with real-time bar animation, comparison counters, and complexity breakdowns. Solidifies core concepts learned in 3rd semester DSA.",
      techStack: ["React", "JavaScript", "DSA", "HTML5 Canvas", "CSS3"],
      highlights: [
        "Real-time visual comparison and array permutation highlighting",
        "Configurable execution speeds and randomized custom array generators",
        "Clear time and space complexity explanations (O(N log N) vs O(N²))"
      ],
      github: "https://github.com/abdullahpervaiz194-del/",
      demo: "#visualizer",
      badge: "Featured DSA"
    },
    {
      id: "cpp-memory-cache",
      title: "High-Throughput In-Memory Key-Value Store",
      category: "C++ & Systems",
      featured: false,
      tagline: "Low-latency custom storage engine with LRU eviction and memory bounds",
      description: "A standalone in-memory database cache developed in C++ applying custom hash maps, doubly-linked lists for O(1) Least Recently Used (LRU) eviction, and binary serialization to disk for persistence.",
      techStack: ["C++17", "STL", "Data Structures", "OOP", "Systems"],
      highlights: [
        "O(1) read and write operations via custom hash table and linked list indexing",
        "Custom LRU eviction policies and memory allocation bounds",
        "File I/O snapshotting for crash recovery"
      ],
      github: "https://github.com/abdullahpervaiz194-del/",
      demo: "#",
      badge: "C++ Systems"
    },
    {
      id: "terminal-portfolio-engine",
      title: "Custom Developer Interactive Terminal CLI",
      category: "DSA & Algorithms",
      featured: false,
      tagline: "In-browser shell emulator with history, commands, and matrix animations",
      description: "A retro-modern terminal component built with pure JavaScript and React, mimicking Linux bash environments with command parsing, tab auto-complete, and dynamic execution routines.",
      techStack: ["JavaScript", "React", "CSS3 Animations"],
      highlights: [
        "Full keyboard navigation with UP/DOWN history traversal",
        "Custom commands for resume, skills breakdown, matrix rain, and contact",
        "Interactive sound effects via Web Audio API"
      ],
      github: "https://github.com/abdullahpervaiz194-del/",
      demo: "#",
      badge: "CLI Emulator"
    }
  ],

  timeline: [
    {
      semester: "Semester 1",
      period: "Foundation & Problem Solving",
      badge: "Completed",
      highlights: [
        "Mastered foundational programming principles in C++ (Loops, Conditionals, Functions)",
        "Introduction to Computer Science & Discrete Mathematics",
        "Built first console-based management apps and logic puzzles"
      ]
    },
    {
      semester: "Semester 2",
      period: "OOP & Web Foundations",
      badge: "Completed",
      highlights: [
        "Object-Oriented Programming (OOP) in C++ and Python (Inheritance, Polymorphism)",
        "Web Engineering core: HTML5 semantic layouts, responsive CSS3, and modern JavaScript",
        "Relational Database Management Systems (RDBMS) & SQL queries"
      ]
    },
    {
      semester: "Semester 3 (Current)",
      period: "DSA, Modern Frameworks & API Architectures",
      badge: "In Progress",
      highlights: [
        "Deep dive into Data Structures & Algorithms: Trees, Graphs, Sorting, Dynamic Programming",
        "Modern enterprise web with Angular Framework, React, and TypeScript",
        "Asynchronous programming, RESTful API integration, Chrome Extensions (Manifest V3), and Firebase"
      ]
    },
    {
      semester: "Future Horizons",
      period: "Operating Systems, Computer Networks & Cloud",
      badge: "Upcoming",
      highlights: [
        "Low-level OS concepts, multi-threading, concurrency, memory paging",
        "Computer Networks, socket programming, distributed systems",
        "Containerization (Docker) and Cloud deployment architectures"
      ]
    }
  ],

  terminalCommands: {
    help: "Available commands:\n  • whoami      : Display developer profile & status\n  • skills      : List core technical competencies\n  • projects    : Show selected featured projects\n  • dsa         : Display DSA progress & topics mastered\n  • contact     : Show email, phone & social links\n  • matrix      : Trigger digital cyber rain animation\n  • clear       : Clear the terminal screen\n  • sudo hire   : Request interview / collaboration",
    whoami: "Abdullah Pervaiz\nRole: 3rd Semester CS Undergrad | Software Engineering\nCore Stack: Python, C++, TypeScript, SQL, Angular, DSA, APIs, Firebase\nMission: Building high-performance, privacy-first software and robust web applications.",
    skills: "TECHNICAL STACK:\n- Languages: C++, Python, TypeScript, SQL, HTML5, CSS3\n- Frameworks: Angular Framework, React, Firebase\n- Core: Data Structures & Algorithms (Trees, Graphs, DP), OOP, REST APIs, Chrome Extensions (MV3)",
    projects: "FEATURED HIGHLIGHTS:\n1. OmniConvertor [PDF to IMG, IMG to PDF, Firebase, Client-Side]\n2. Python AI Chatbot [REST API Integration & NLP]\n3. Website Notes Chrome Extension [Manifest V3 & Local Storage]\n4. Interactive DSA Visualizer [React + Generators]\nVisit projects section for live demos and links.",
    dsa: "DSA PROGRESS TRACKER:\n- Arrays & Strings: Mastered\n- Linked Lists, Stacks, Queues: Mastered\n- Binary Trees, BSTs, Heaps: Mastered\n- Graphs (BFS, DFS, Dijkstra): In Progress\n- Dynamic Programming: In Progress (Memoization & Tabulation)",
    contact: "REACH OUT:\n- Name: Abdullah Pervaiz\n- Phone: 03138977582\n- Email: abdullahpervaiz194@gmail.com\n- GitHub: https://github.com/abdullahpervaiz194-del/\n- LinkedIn: https://www.linkedin.com/in/abdullah-pervaiz-2b95902ab",
    "sudo hire": "ACCESS GRANTED! 🎉\nCandidate status: HIGHLY MOTIVATED & FAST LEARNER.\nReady for internships and collaborative software projects. Let's build something remarkable!"
  }
};
