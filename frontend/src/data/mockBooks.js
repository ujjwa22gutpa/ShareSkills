// Mock data for books
export const mockBooks = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    author: "John Smith",
    price: 89.99,
    originalPrice: 120.00,
    condition: "Like New",
    category: "Computer Science",
    subject: "Programming",
    isbn: "978-0134685991",
    description: "Comprehensive introduction to computer science fundamentals including programming, algorithms, and data structures.",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400"
    ],
    seller: {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      rating: 4.8,
      reviewCount: 23,
      university: "State University",
      lastSeen: "2 hours ago"
    },
    location: "Campus Bookstore",
    postedDate: "2024-09-15",
    views: 45,
    saves: 12,
    tags: ["Programming", "Beginner-Friendly", "Latest Edition"]
  },
  {
    id: 2,
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    price: 150.00,
    originalPrice: 280.00,
    condition: "Good",
    category: "Mathematics",
    subject: "Calculus",
    isbn: "978-1285741550",
    description: "Essential calculus textbook covering limits, derivatives, integrals, and series. Perfect for calculus I and II courses.",
    images: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400"
    ],
    seller: {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      rating: 4.9,
      reviewCount: 67,
      university: "Tech Institute",
      lastSeen: "1 day ago"
    },
    location: "Math Building",
    postedDate: "2024-09-10",
    views: 89,
    saves: 34,
    tags: ["Mathematics", "Essential", "Heavy Use"]
  },
  {
    id: 3,
    title: "Organic Chemistry",
    author: "Paula Bruice",
    price: 200.00,
    originalPrice: 350.00,
    condition: "Fair",
    category: "Chemistry", 
    subject: "Organic Chemistry",
    isbn: "978-0134042282",
    description: "Comprehensive organic chemistry textbook with detailed mechanisms and practice problems. Some highlighting and notes included.",
    images: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400"
    ],
    seller: {
      id: 3,
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      rating: 4.6,
      reviewCount: 45,
      university: "Medical College",
      lastSeen: "5 hours ago"
    },
    location: "Chemistry Lab",
    postedDate: "2024-09-12",
    views: 67,
    saves: 23,
    tags: ["Chemistry", "Pre-Med", "With Notes"]
  },
  {
    id: 4,
    title: "Psychology: The Science of Mind",
    author: "Michael Gazzaniga",
    price: 75.00,
    originalPrice: 180.00,
    condition: "Very Good",
    category: "Psychology",
    subject: "General Psychology",
    isbn: "978-0393906343",
    description: "Engaging introduction to psychological science with modern research and real-world applications.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    ],
    seller: {
      id: 4,
      name: "David Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      rating: 4.7,
      reviewCount: 34,
      university: "Liberal Arts College",
      lastSeen: "3 hours ago"
    },
    location: "Psychology Department",
    postedDate: "2024-09-14",
    views: 32,
    saves: 18,
    tags: ["Psychology", "Intro Course", "Clean Copy"]
  },
  {
    id: 5,
    title: "Fundamentals of Engineering Economics",
    author: "Chan Park",
    price: 110.00,
    originalPrice: 220.00,
    condition: "Like New",
    category: "Engineering",
    subject: "Engineering Economics",
    isbn: "978-0132775427",
    description: "Engineering economics principles with practical examples and case studies. Never used, still in original packaging.",
    images: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400"
    ],
    seller: {
      id: 5,
      name: "Emily Zhang",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      rating: 5.0,
      reviewCount: 12,
      university: "Engineering School",
      lastSeen: "30 minutes ago"
    },
    location: "Engineering Quad",
    postedDate: "2024-09-16",
    views: 28,
    saves: 15,
    tags: ["Engineering", "Brand New", "Unopened"]
  },
  {
    id: 6,
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    price: 95.00,
    originalPrice: 250.00,
    condition: "Good",
    category: "Economics",
    subject: "Microeconomics",
    isbn: "978-1305585126",
    description: "Classic economics textbook covering micro and macroeconomic principles. Light wear but all pages intact.",
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400"
    ],
    seller: {
      id: 6,
      name: "James Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      rating: 4.5,
      reviewCount: 89,
      university: "Business School",
      lastSeen: "1 hour ago"
    },
    location: "Business Library",
    postedDate: "2024-09-11",
    views: 156,
    saves: 42,
    tags: ["Economics", "Popular", "Classic"]
  }
];

export const categories = [
  "All Categories",
  "Computer Science",
  "Mathematics", 
  "Chemistry",
  "Psychology",
  "Engineering",
  "Economics",
  "Biology",
  "Physics",
  "Literature",
  "History",
  "Business"
];

export const conditions = [
  "All Conditions",
  "Like New",
  "Very Good", 
  "Good",
  "Fair"
];

export const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity }
];