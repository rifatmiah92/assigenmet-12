
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Contest, Submission, UserRole, ContestStatus, ContestCategory } from './types';

// --- MOCK DATA SEED ---
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@arena.com', password: '123', role: UserRole.ADMIN, photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 'u2', name: 'John Creator', email: 'creator@arena.com', password: '123', role: UserRole.CREATOR, photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', bio: 'Senior Designer & Contest Host' },
  { id: 'u3', name: 'Alice Gamer', email: 'alice@arena.com', password: '123', role: UserRole.USER, photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', bio: 'Pro Gamer', address: 'NY, USA' },
  { id: 'u4', name: 'Bob Designer', email: 'bob@arena.com', password: '123', role: UserRole.USER, photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', bio: 'Freelance Illustrator' },
  { id: 'u5', name: 'Charlie Dev', email: 'charlie@arena.com', password: '123', role: UserRole.USER, photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', bio: 'Full Stack Developer' },
  { id: 'u6', name: 'Diana Writer', email: 'diana@arena.com', password: '123', role: UserRole.USER, photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', bio: 'Content Strategist' },
];

const MOCK_CONTESTS: Contest[] = [
  {
    id: 'c1',
    title: 'Minimalist AI Startup Logo',
    description: 'Create a clean, modern logo for a tech startup focusing on AI. The brand represents future, speed, and intelligence. We need something iconic that stands out in the app store.',
    instruction: 'Submit a PNG and SVG version of your logo. Must use blue and white color palette.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.DESIGN,
    price: 15,
    prizeMoney: 1500,
    deadline: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
    creatorId: 'u2',
    participantsCount: 124,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c2',
    title: 'Future of Gaming Article',
    description: 'Write a 1000-word article on how VR will change gaming in 2030. Focus on immersive storytelling and hardware evolution. The tone should be excited yet analytical.',
    instruction: 'Submit a Google Doc link. Citations required.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.WRITING,
    price: 5,
    prizeMoney: 300,
    deadline: new Date(Date.now() - 86400000).toISOString(), // Ended
    creatorId: 'u2',
    participantsCount: 45,
    status: ContestStatus.CONFIRMED,
    winnerId: 'u3'
  },
  {
    id: 'c3',
    title: 'Eco-Friendly Business Plan',
    description: 'Draft a business model for a sustainable local business that reduces plastic waste. We are looking for innovative supply chain solutions and marketing strategies.',
    instruction: 'PDF upload required. Include financial projections.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.BUSINESS,
    price: 25,
    prizeMoney: 2500,
    deadline: new Date(Date.now() + 86400000 * 10).toISOString(),
    creatorId: 'u2',
    participantsCount: 8,
    status: ContestStatus.PENDING, // Pending approval
    winnerId: null
  },
  {
    id: 'c4',
    title: 'React SaaS Dashboard',
    description: 'Build a responsive analytics dashboard using React and Tailwind CSS. Must include dark mode toggle, charts using Recharts, and a clean sidebar navigation.',
    instruction: 'Submit GitHub repository link and live demo URL.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.CODING,
    price: 10,
    prizeMoney: 1000,
    deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
    creatorId: 'u2',
    participantsCount: 56,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c5',
    title: 'Elden Ring DLC Review',
    description: 'Write a comprehensive review of the latest Elden Ring DLC. Focus on boss mechanics, new weapons, and lore implications. Spoilers allowed but must be marked.',
    instruction: 'Submit a link to your blog or a PDF.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.GAMING,
    price: 2,
    prizeMoney: 150,
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    creatorId: 'u2',
    participantsCount: 230,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c6',
    title: 'Cyberpunk City Illustration',
    description: 'Create a cyberpunk style illustration of a futuristic city. Focus on neon lighting, rain effects, and verticality. 4K resolution required.',
    instruction: 'High-res JPG required.',
    image: 'https://images.unsplash.com/photo-1535868463750-c78d9543614f?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.DESIGN,
    price: 20,
    prizeMoney: 800,
    deadline: new Date(Date.now() + 86400000 * 14).toISOString(),
    creatorId: 'u2',
    participantsCount: 15,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c7',
    title: 'Sustainable Architecture',
    description: 'Design a concept for a self-sustaining home in a desert environment. Must include water recycling systems and solar power integration.',
    instruction: 'Submit blueprints and 3D renders.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.DESIGN,
    price: 50,
    prizeMoney: 5000,
    deadline: new Date(Date.now() + 86400000 * 30).toISOString(),
    creatorId: 'u2',
    participantsCount: 4,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c8',
    title: 'Mobile App UI Kit',
    description: 'Design a complete UI kit for a fitness tracking application. Include 15+ screens, component library, and interactive prototype.',
    instruction: 'Figma file link required.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.DESIGN,
    price: 30,
    prizeMoney: 2000,
    deadline: new Date(Date.now() + 86400000 * 12).toISOString(),
    creatorId: 'u2',
    participantsCount: 89,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c9',
    title: 'Street Photography: Neon Nights',
    description: 'Capture the essence of city nightlife. We are looking for high-contrast, vibrant street photography that tells a story of the urban environment after dark.',
    instruction: 'Submit high-res JPEG/RAW. No heavy manipulation allowed.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.DESIGN,
    price: 10,
    prizeMoney: 500,
    deadline: new Date(Date.now() + 86400000 * 8).toISOString(),
    creatorId: 'u2',
    participantsCount: 342,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c10',
    title: 'Indie Game Sound Design',
    description: 'Create a sound effect pack for a retro 8-bit platformer. Includes jump, coin collect, damage, and game over sounds.',
    instruction: 'Submit a ZIP file with WAV/MP3.',
    image: 'https://images.unsplash.com/photo-1593108603685-6bbd688c2323?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.GAMING,
    price: 5,
    prizeMoney: 250,
    deadline: new Date(Date.now() + 86400000 * 15).toISOString(),
    creatorId: 'u2',
    participantsCount: 56,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c11',
    title: 'Climate Change Data Viz',
    description: 'Visualize global temperature anomalies from 1880 to 2023 using Python or D3.js. The goal is clarity and impact.',
    instruction: 'Submit GitHub link and hosted demo.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.CODING,
    price: 0,
    prizeMoney: 1000,
    deadline: new Date(Date.now() + 86400000 * 20).toISOString(),
    creatorId: 'u2',
    participantsCount: 88,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c12',
    title: 'Short Film: "Silence"',
    description: 'Create a 2-minute short film interpreting the theme "Silence". Any genre accepted (Horror, Drama, Experimental).',
    instruction: 'YouTube/Vimeo link.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.DESIGN,
    price: 25,
    prizeMoney: 5000,
    deadline: new Date(Date.now() + 86400000 * 45).toISOString(),
    creatorId: 'u2',
    participantsCount: 12,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c13',
    title: 'Fintech App Case Study',
    description: 'Write a UX case study for a banking app for teenagers. Focus on financial literacy gamification.',
    instruction: 'Medium article link or PDF.',
    image: 'https://images.unsplash.com/photo-1565514020176-dbf2277e3c60?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.BUSINESS,
    price: 15,
    prizeMoney: 1200,
    deadline: new Date(Date.now() + 86400000 * 10).toISOString(),
    creatorId: 'u2',
    participantsCount: 45,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c14',
    title: 'Rust CLI Tool',
    description: 'Build a fast, efficient CLI tool in Rust that compresses images. Must benchmark against ImageMagick.',
    instruction: 'GitHub Repo.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.CODING,
    price: 20,
    prizeMoney: 3000,
    deadline: new Date(Date.now() + 86400000 * 30).toISOString(),
    creatorId: 'u2',
    participantsCount: 92,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c15',
    title: 'AI Model Training Competition',
    description: 'Optimize a transformer model to generate creative poetry. The model with the lowest perplexity and highest creativity score wins.',
    instruction: 'Submit Colab notebook and weights.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.CODING,
    price: 50,
    prizeMoney: 8000,
    deadline: new Date(Date.now() + 86400000 * 25).toISOString(),
    creatorId: 'u2',
    participantsCount: 200,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c16',
    title: 'Sci-Fi Screenplay: "Mars 2050"',
    description: 'Write the opening scene for a movie set on the first Mars colony. Focus on dialogue and atmospheric world-building.',
    instruction: 'PDF format, industry standard script format.',
    image: 'https://images.unsplash.com/photo-1614728853913-1e221a6572e0?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.WRITING,
    price: 10,
    prizeMoney: 1500,
    deadline: new Date(Date.now() + 86400000 * 18).toISOString(),
    creatorId: 'u2',
    participantsCount: 67,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c17',
    title: 'Viral TikTok Campaign',
    description: 'Design a viral marketing campaign for a new energy drink. Include storyboard, hashtag strategy, and influencer list.',
    instruction: 'Presentation deck (PDF/PPT).',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.BUSINESS,
    price: 5,
    prizeMoney: 500,
    deadline: new Date(Date.now() + 86400000 * 6).toISOString(),
    creatorId: 'u2',
    participantsCount: 150,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c18',
    title: 'Jazz Album Cover Art',
    description: 'Create an abstract, soulful album cover for a modern jazz quartet. Think Blue Note Records meets digital art.',
    instruction: '3000x3000px JPG/PNG.',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.DESIGN,
    price: 12,
    prizeMoney: 600,
    deadline: new Date(Date.now() + 86400000 * 9).toISOString(),
    creatorId: 'u2',
    participantsCount: 85,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c19',
    title: 'Unity 2D Platformer',
    description: 'Create a single-level 2D platformer with unique gravity mechanics. Assets can be premade, code must be original.',
    instruction: 'Itch.io link or executable build.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.GAMING,
    price: 15,
    prizeMoney: 2000,
    deadline: new Date(Date.now() + 86400000 * 40).toISOString(),
    creatorId: 'u2',
    participantsCount: 110,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  },
  {
    id: 'c20',
    title: 'Wildlife Photography: Birds',
    description: 'Capture the beauty of avian life in motion. Sharp focus, natural lighting, and zero AI generation allowed.',
    instruction: 'RAW file + Edited JPEG.',
    image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&q=80&w=1200',
    category: ContestCategory.DESIGN,
    price: 8,
    prizeMoney: 750,
    deadline: new Date(Date.now() + 86400000 * 11).toISOString(),
    creatorId: 'u2',
    participantsCount: 42,
    status: ContestStatus.CONFIRMED,
    winnerId: null
  }
];

const MOCK_SUBMISSIONS: Submission[] = [
  { id: 's1', contestId: 'c2', userId: 'u3', taskUrl: 'http://docs.google.com/sample', submittedAt: new Date().toISOString(), paymentStatus: 'paid' },
  { id: 's2', contestId: 'c1', userId: 'u4', taskUrl: 'http://dribbble.com/sample', submittedAt: new Date().toISOString(), paymentStatus: 'paid' },
  { id: 's3', contestId: 'c5', userId: 'u3', taskUrl: 'http://blog.com/review', submittedAt: new Date().toISOString(), paymentStatus: 'paid' },
];

// --- CONTEXT DEFINITIONS ---

interface AppContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Auth
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (user: Omit<User, 'id' | 'role'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  
  // Data
  users: User[];
  updateUserRole: (userId: string, role: UserRole) => void;
  
  contests: Contest[];
  addContest: (contest: Omit<Contest, 'id' | 'participantsCount' | 'status' | 'winnerId'>) => void;
  updateContest: (id: string, data: Partial<Contest>) => void;
  deleteContest: (id: string) => void;
  confirmContest: (id: string) => void;
  rejectContest: (id: string) => void;
  
  submissions: Submission[];
  joinContest: (contestId: string, paymentDetails: any) => Promise<void>;
  submitTask: (contestId: string, taskUrl: string) => Promise<void>;
  declareWinner: (contestId: string, winnerUserId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- STATE ---
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [contests, setContests] = useState<Contest[]>(MOCK_CONTESTS);
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);

  // --- EFFECTS ---
  
  // Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  // --- AUTH ACTIONS ---
  
  const login = async (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = async (data: Omit<User, 'id' | 'role'>) => {
    const newUser: User = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      role: UserRole.USER // Default role
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => setCurrentUser(null);

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  // --- DATA ACTIONS ---

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role } : u));
  };

  const addContest = (data: Omit<Contest, 'id' | 'participantsCount' | 'status' | 'winnerId'>) => {
    const newContest: Contest = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      participantsCount: 0,
      status: ContestStatus.PENDING,
      winnerId: null
    };
    setContests([...contests, newContest]);
  };

  const updateContest = (id: string, data: Partial<Contest>) => {
    setContests(contests.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteContest = (id: string) => {
    setContests(contests.filter(c => c.id !== id));
  };

  const confirmContest = (id: string) => {
    updateContest(id, { status: ContestStatus.CONFIRMED });
  };
  
  const rejectContest = (id: string) => {
    updateContest(id, { status: ContestStatus.REJECTED });
  };

  const joinContest = async (contestId: string, paymentDetails: any) => {
    if (!currentUser) throw new Error("Must be logged in");
    // Simulate payment processing...
    
    // Check if already joined
    if (submissions.some(s => s.contestId === contestId && s.userId === currentUser.id)) return;

    // Increment count on contest
    const contest = contests.find(c => c.id === contestId);
    if(contest) {
       updateContest(contestId, { participantsCount: contest.participantsCount + 1 });
    }
    
    // Create a placeholder submission record
    const newSub: Submission = {
        id: Math.random().toString(36).substr(2, 9),
        contestId,
        userId: currentUser.id,
        taskUrl: '',
        submittedAt: '',
        paymentStatus: 'paid'
    }
    setSubmissions([...submissions, newSub]);
  };

  const submitTask = async (contestId: string, taskUrl: string) => {
    if (!currentUser) return;
    setSubmissions(submissions.map(s => 
        (s.contestId === contestId && s.userId === currentUser.id) 
        ? { ...s, taskUrl, submittedAt: new Date().toISOString() } 
        : s
    ));
  };

  const declareWinner = (contestId: string, winnerUserId: string) => {
    updateContest(contestId, { winnerId: winnerUserId });
  };

  const value = {
    theme, toggleTheme,
    currentUser, login, register, logout, updateProfile,
    users, updateUserRole,
    contests, addContest, updateContest, deleteContest, confirmContest, rejectContest,
    submissions, joinContest, submitTask, declareWinner
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
