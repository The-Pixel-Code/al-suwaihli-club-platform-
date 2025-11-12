import type { NewsItem } from "@/types/news.types"

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Club Victory",
    titleAr: "نصر النادي",
    description: "The club achieved a great victory",
    descriptionAr: "حقق النادي نصراً عظيماً",
    image: "/sports-victory.jpg",
    date: "2025-11-12",
    type: "news",
    category: "Sports",
    categoryAr: "رياضة",
    readTime: 5,
    priority: "high",
  },
  {
    id: "2",
    title: "Tournament Announcement",
    titleAr: "إعلان البطولة",
    description: "New tournament registration is now open",
    descriptionAr: "التسجيل في البطولة الجديدة مفتوح الآن",
    image: "/tournament-sports.jpg",
    date: "2025-11-11",
    type: "news",
    category: "Events",
    categoryAr: "فعاليات",
    readTime: 3,
    priority: "medium",
  },
]
