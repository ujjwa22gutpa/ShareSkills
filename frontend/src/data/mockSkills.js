// Mock data for skills marketplace
export const mockSkills = [
  {
    id: 1,
    title: "Advanced Calculus Tutoring",
    tutor: {
      name: "Sarah Johnson",
      rating: 4.9,
      totalReviews: 47,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    category: "Mathematics",
    subject: "Calculus",
    hourlyRate: 25,
    availability: "Mon-Fri 6-9 PM",
    contact: "sarah.johnson@college.edu",
    description: "Experienced math tutor with 3 years of teaching calculus. Specializing in limits, derivatives, and integrals. Patient teaching style with proven results.",
    skills: ["Calculus I", "Calculus II", "Limits", "Derivatives", "Integrals"],
    location: "Online",
    responseTime: "Usually responds within 2 hours",
    verified: true,
    type: "offer", // offer or request
    postedDate: "2024-01-15",
    tags: ["Math", "STEM", "Online"]
  },
  {
    id: 2,
    title: "Looking for Spanish Conversation Partner",
    student: {
      name: "Mike Chen",
      rating: 4.7,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    category: "Languages",
    subject: "Spanish",
    hourlyRate: 15,
    availability: "Weekends",
    contact: "+1-555-234-5678",
    description: "Intermediate Spanish student looking for native or advanced speaker for conversation practice. Willing to help with English in exchange.",
    skills: ["Conversation", "Pronunciation", "Grammar"],
    location: "Campus/Online",
    type: "request",
    postedDate: "2024-01-18",
    tags: ["Language", "Exchange", "Flexible"]
  },
  {
    id: 3,
    title: "Computer Science & Programming",
    tutor: {
      name: "Alex Rodriguez",
      rating: 4.8,
      totalReviews: 32,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    category: "Computer Science",
    subject: "Programming",
    hourlyRate: 30,
    availability: "Flexible",
    contact: "alex.rodriguez@cs.college.edu",
    description: "CS major offering help with Java, Python, C++, and algorithm design. Perfect for CS101, CS102, and data structures courses.",
    skills: ["Java", "Python", "C++", "Algorithms", "Data Structures"],
    location: "Library/Online",
    responseTime: "Usually responds within 1 hour",
    verified: true,
    type: "offer",
    postedDate: "2024-01-12",
    tags: ["Programming", "STEM", "Popular"]
  },
  {
    id: 4,
    title: "Organic Chemistry Help Needed",
    student: {
      name: "Emma Wilson",
      rating: 4.6,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    category: "Chemistry",
    subject: "Organic Chemistry",
    hourlyRate: 20,
    availability: "Evenings",
    contact: "emma.wilson@premed.college.edu",
    description: "Pre-med student struggling with organic chemistry reactions and mechanisms. Looking for patient tutor with strong OChem background.",
    skills: ["Reactions", "Mechanisms", "Stereochemistry", "Synthesis"],
    location: "Campus preferred",
    type: "request",
    postedDate: "2024-01-20",
    tags: ["Chemistry", "Pre-med", "Urgent"]
  },
  {
    id: 5,
    title: "Statistics & Data Analysis",
    tutor: {
      name: "David Park",
      rating: 4.9,
      totalReviews: 28,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    category: "Mathematics",
    subject: "Statistics",
    hourlyRate: 28,
    availability: "Mon-Wed-Fri",
    contact: "+1-555-789-0123",
    description: "Statistics PhD student offering help with descriptive statistics, probability, hypothesis testing, and R programming.",
    skills: ["Statistics", "Probability", "R Programming", "SPSS", "Data Analysis"],
    location: "Online preferred",
    responseTime: "Usually responds within 3 hours",
    verified: true,
    type: "offer",
    postedDate: "2024-01-10",
    tags: ["Math", "Data Science", "Research"]
  },
  {
    id: 6,
    title: "French Language Exchange",
    tutor: {
      name: "Marie Dubois",
      rating: 4.7,
      totalReviews: 15,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
    },
    category: "Languages",
    subject: "French",
    hourlyRate: 18,
    availability: "Afternoons",
    contact: "marie.dubois@french.college.edu",
    description: "Native French speaker from Paris. Offering conversational practice, grammar help, and cultural insights for all levels.",
    skills: ["Conversation", "Grammar", "Pronunciation", "Culture", "Literature"],
    location: "Coffee shops/Online",
    responseTime: "Usually responds within 4 hours",
    verified: true,
    type: "offer",
    postedDate: "2024-01-14",
    tags: ["Language", "Native", "Cultural"]
  }
];

export const skillCategories = [
  "All Categories",
  "Mathematics",
  "Computer Science",
  "Languages",
  "Chemistry",
  "Physics",
  "Biology",
  "History",
  "Literature",
  "Economics",
  "Psychology",
  "Art & Design"
];

export const skillTypes = [
  { value: "all", label: "All" },
  { value: "offer", label: "Tutoring Offers" },
  { value: "request", label: "Looking for Help" }
];

export const hourlyRateRanges = [
  { label: "All Rates", min: 0, max: 1000 },
  { label: "$10-20/hr", min: 10, max: 20 },
  { label: "$20-30/hr", min: 20, max: 30 },
  { label: "$30+/hr", min: 30, max: 1000 }
];

export const availabilityOptions = [
  "All Times",
  "Mornings",
  "Afternoons", 
  "Evenings",
  "Weekends",
  "Flexible"
];

// Mock reviews data
export const mockReviews = {
  1: [
    {
      id: 1,
      studentName: "Jessica M.",
      rating: 5,
      date: "2024-01-10",
      comment: "Sarah is an amazing tutor! She helped me understand calculus concepts that I struggled with for weeks. Very patient and explains things clearly.",
      subject: "Calculus I"
    },
    {
      id: 2,
      studentName: "Michael K.",
      rating: 5,
      date: "2024-01-05",
      comment: "Excellent teaching style. Sarah made derivatives and integrals much easier to understand. Highly recommend!",
      subject: "Calculus II"
    },
    {
      id: 3,
      studentName: "Anna R.",
      rating: 4,
      date: "2023-12-20",
      comment: "Great tutor, very knowledgeable. Sometimes goes a bit fast but overall very helpful.",
      subject: "Calculus I"
    }
  ],
  3: [
    {
      id: 4,
      studentName: "Tom W.",
      rating: 5,
      date: "2024-01-08",
      comment: "Alex knows programming inside and out. Helped me with Java assignments and taught me best practices. Definitely booking again!",
      subject: "Java Programming"
    },
    {
      id: 5,
      studentName: "Lisa H.",
      rating: 5,
      date: "2024-01-03",
      comment: "Amazing help with data structures. Alex explained complex algorithms in a way that finally made sense to me.",
      subject: "Data Structures"
    }
  ],
  5: [
    {
      id: 6,
      studentName: "Rachel S.",
      rating: 5,
      date: "2024-01-12",
      comment: "David is incredibly knowledgeable about statistics. Helped me with my research project and R programming. Excellent tutor!",
      subject: "Statistics"
    }
  ],
  6: [
    {
      id: 7,
      studentName: "James L.",
      rating: 4,
      date: "2024-01-07",
      comment: "Marie is a great French tutor. Very patient with pronunciation and grammar. Cultural insights are a nice bonus!",
      subject: "French"
    }
  ]
};