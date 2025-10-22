import type { NewsItem } from '@/types/news.types';

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Al-Suwaihli Wins Championship Title',
    titleAr: 'السويحلي يحرز لقب البطولة',
    description: 'Our football team achieved a historic victory in the national championship, bringing pride to our club and members.',
    descriptionAr: 'حقق فريق كرة القدم انتصاراً تاريخياً في البطولة الوطنية، مما جلب الفخر لناديونا وأعضائنا.',
    image: 'https://picsum.photos/200/300',
    date: '2024-01-15',
    type: 'news',
    category: 'Sports',
    categoryAr: 'رياضة',
    readTime: 3,
    priority: 'high'
  },
  {
    id: '2',
    title: 'New Membership Program Launch',
    titleAr: 'إطلاق برنامج العضوية الجديد',
    description: 'Join our exclusive new membership program with premium benefits and access to all club facilities.',
    descriptionAr: 'انضم إلى برنامج العضوية الجديد الحصري مع المزايا المميزة والوصول إلى جميع مرافق النادي.',
    image: 'https://picsum.photos/300/300',
    date: '2024-01-12',
    type: 'advertisement',
    category: 'Membership',
    categoryAr: 'العضوية',
    readTime: 2,
    priority: 'high'
  },
  {
    id: '3',
    title: 'Cultural Festival Next Month',
    titleAr: 'المهرجان الثقافي الشهر القادم',
    description: 'Experience the rich cultural heritage of Libya at our annual cultural festival.',
    descriptionAr: 'اختبر التراث الثقافي الغني لليبيا في مهرجاننا الثقافي السنوي.',
    image: 'https://picsum.photos/800/300',
    date: '2024-01-10',
    type: 'news',
    category: 'Culture',
    categoryAr: 'ثقافة',
    readTime: 4,
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Summer Training Camps',
    titleAr: 'معسكرات التدريب الصيفية',
    description: 'Register now for our intensive summer training programs for all age groups.',
    descriptionAr: 'سجل الآن في برامج التدريب الصيفي المكثفة لجميع الفئات العمرية.',
    image: 'https://picsum.photos/700/500',
    date: '2024-01-08',
    type: 'advertisement',
    category: 'Training',
    categoryAr: 'تدريب',
    readTime: 2,
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Youth Team Success',
    titleAr: 'نجاح فريق الشباب',
    description: 'Our youth team continues to excel in regional competitions, showing great promise.',
    descriptionAr: 'يواصل فريق الشباب التفوق في المسابقات الإقليمية، مظهراً وعداً كبيراً.',
    image: 'https://picsum.photos/600/600',
    date: '2024-01-05',
    type: 'news',
    category: 'Sports',
    categoryAr: 'رياضة',
    readTime: 3,
    priority: 'low'
  },
  {
    id: '6',
    title: 'New Facility Opening',
    titleAr: 'افتتاح مرفق جديد',
    description: 'Modern fitness center with state-of-the-art equipment now available for members.',
    descriptionAr: 'مركز لياقة بدنية حديث مع أحدث المعدات متاح الآن للأعضاء.',
    image: 'https://picsum.photos/600/800',
    date: '2024-01-03',
    type: 'advertisement',
    category: 'Facilities',
    categoryAr: 'مرافق',
    readTime: 2,
    priority: 'medium'
  }
];