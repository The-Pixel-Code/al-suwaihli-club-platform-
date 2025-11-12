"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Clock,
  Calendar,
  Share2,
  Facebook,
  Instagram,
  Link as LinkIcon,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { mockNews } from "@/data/mock-news";
import useLanguage from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ToastIcon } from "@/components/ui/toast-icon";

interface NewsDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, id } = use(params);
  const { isArabic: isRtl } = useLanguage();

  // Find the news item
  const newsItem = mockNews.find((item) => item.id === id);

  if (!newsItem) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isRtl ? "الخبر غير موجود" : "News not found"}
        </h1>
      </div>
    );
  }

  // Get related news (excluding current)
  const relatedNews = mockNews
    .filter((item) => item.id !== id && item.category === newsItem.category)
    .slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = isRtl ? newsItem.titleAr : newsItem.title;

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't have direct sharing API, opens Instagram
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Al-Suwaihli branded toast notification with custom icon
      toast.success(
        isRtl ? "تم نسخ الرابط بنجاح!" : "Link copied successfully!",
        {
          description: isRtl
            ? "يمكنك الآن مشاركة هذا الخبر مع الآخرين"
            : "You can now share this news with others",
          duration: 3000,
          icon: <ToastIcon type="success" />,
        }
      );
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error(
        isRtl ? "فشل نسخ الرابط" : "Failed to copy link",
        {
          description: isRtl
            ? "حدث خطأ أثناء نسخ الرابط. يرجى المحاولة مرة أخرى."
            : "An error occurred while copying the link. Please try again.",
          duration: 3000,
          icon: <ToastIcon type="error" />,
        }
      );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Sports Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#d51a2d]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-gradient-to-tl from-[#f2b631]/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"
        />

        {/* Sports field pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.05]">
          <defs>
            <pattern
              id="news-field-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              {/* Soccer field lines */}
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="#d51a2d"
                strokeWidth="0.5"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="#d51a2d"
                strokeWidth="0.3"
                opacity="0.5"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="#f2b631"
                strokeWidth="0.3"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#news-field-pattern)" />
        </svg>

        {/* Floating sport icons */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 text-[#d51a2d]/10 text-9xl"
        >
          ⚽
        </motion.div>
        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [0, -8, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-32 right-32 text-[#f2b631]/10 text-8xl"
        >
          🏆
        </motion.div>
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            opacity: [0.04, 0.07, 0.04],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 right-10 text-blue-500/10 text-7xl"
        >
          🏐
        </motion.div>

        {/* Diagonal animated stripes */}
        <motion.div
          animate={{
            x: [-100, 1200],
            opacity: [0, 0.03, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-96 h-full bg-gradient-to-r from-transparent via-[#d51a2d]/5 to-transparent rotate-12 blur-xl"
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#d51a2d 1px, transparent 1px), linear-gradient(90deg, #d51a2d 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href={`/${locale}`}
            className={cn(
              "inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#d51a2d] dark:hover:text-[#f2b631] transition-colors mb-6",
            )}
          >
            
            {isRtl ? (
              <ArrowRight className="w-5 h-5" />
            ) : (
              <ArrowLeft className="w-5 h-5" />
            )}
            <span className="font-medium">
              {isRtl ? "العودة للرئيسية" : "Back to Home"}
            </span>
          </Link>

          {/* Main Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
          >
            {/* Featured Image */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              <Image
                src={newsItem.image}
                alt={isRtl ? newsItem.titleAr : newsItem.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Category Badge on Image */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                <span className="inline-flex px-4 py-2 bg-[#d51a2d] text-white text-sm font-semibold rounded-full shadow-lg">
                  {isRtl ? newsItem.categoryAr : newsItem.category}
                </span>
                <span
                  className={cn(
                    "inline-flex px-4 py-2 text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-md",
                    newsItem.type === "news"
                      ? "bg-blue-500/90"
                      : "bg-orange-500/90"
                  )}
                >
                  {newsItem.type === "news"
                    ? isRtl
                      ? "خبر"
                      : "News"
                    : isRtl
                    ? "إعلان"
                    : "Ad"}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12 relative z-10">
              {/* Date & Time */}
              <div
                className={cn(
                  "flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm mb-6",
                  isRtl ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-2",
                    isRtl ? "flex-row-reverse" : ""
                  )}
                >
                  <Calendar className="w-5 h-5 text-[#d51a2d]" />
                  <span>{newsItem.date}</span>
                </div>
                <span>•</span>
                {newsItem.readTime && (
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      isRtl ? "flex-row-reverse" : ""
                    )}
                  >
                    <Clock className="w-5 h-5 text-[#f2b631]" />
                    <span>
                      {newsItem.readTime} {isRtl ? "دقائق" : "min read"}
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h1
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight",
                  isRtl ? "font-[Almarai]" : "font-[Inter]"
                )}
              >
                {isRtl ? newsItem.titleAr : newsItem.title}
              </h1>

              {/* Content */}
              <div
                className={cn(
                  "prose prose-lg dark:prose-invert max-w-none",
                  "prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white",
                  "prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4",
                  "prose-a:text-[#d51a2d] dark:prose-a:text-[#f2b631] prose-a:no-underline hover:prose-a:underline",
                  isRtl ? "text-right" : "text-left"
                )}
              >
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6">
                  {isRtl ? newsItem.descriptionAr : newsItem.description}
                </p>

                {/* Placeholder content - replace with actual content from API */}
                <p>
                  {isRtl
                    ? "هذا نص تجريبي للمحتوى. في التطبيق الفعلي، سيتم جلب المحتوى الكامل من قاعدة البيانات أو API. يمكنك إضافة المزيد من الفقرات والصور والمحتوى الغني هنا."
                    : "This is placeholder content. In the actual application, the full content will be fetched from the database or API. You can add more paragraphs, images, and rich content here."}
                </p>
                <p>
                  {isRtl
                    ? "نادي السويحلي - مصراتة يواصل تقديم أفضل المستويات الرياضية والإنجازات المميزة على جميع الأصعدة، مع التزام راسخ بتطوير المواهب الشابة وبناء مستقبل رياضي مشرق."
                    : "Al-Suwaihli Club - Misrata continues to deliver excellent sporting performance and outstanding achievements at all levels, with a firm commitment to developing young talents and building a bright sporting future."}
                </p>
              </div>

              {/* Share Section - Al-Suwaihli Branded */}
              <div className="bg-gradient-to-r from-[#d51a2d]/5 via-[#f2b631]/5 to-[#d51a2d]/5 dark:from-[#d51a2d]/10 dark:via-[#f2b631]/10 dark:to-[#d51a2d]/10 rounded-2xl p-8 mt-12 border-2 border-[#d51a2d]/20 dark:border-[#f2b631]/20">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#d51a2d] to-[#b01525] rounded-full mb-4">
                    <Share2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {isRtl ? "شارك هذا الخبر" : "Share this News"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isRtl
                      ? "ساعد في نشر أخبار نادي السويحلي"
                      : "Help spread Al-Suwaihli Club news"}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {/* Facebook */}
                  <button
                    onClick={() => handleShare("facebook")}
                    className="group bg-white dark:bg-gray-700 hover:bg-blue-600 text-blue-600 hover:text-white px-6 py-3 rounded-full border-2 border-blue-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="font-semibold">
                      {isRtl ? "فيسبوك" : "Facebook"}
                    </span>
                  </button>

                  {/* Instagram */}
                  <button
                    onClick={() => handleShare("instagram")}
                    className="group bg-white dark:bg-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-pink-600 hover:text-white px-6 py-3 rounded-full border-2 border-pink-600 hover:border-transparent transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="font-semibold">
                      {isRtl ? "إنستجرام" : "Instagram"}
                    </span>
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={() => handleShare("whatsapp")}
                    className="group bg-white dark:bg-gray-700 hover:bg-green-500 text-green-500 hover:text-white px-6 py-3 rounded-full border-2 border-green-500 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    <span className="font-semibold">
                      {isRtl ? "واتساب" : "WhatsApp"}
                    </span>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={copyLink}
                    className="group bg-white dark:bg-gray-700 hover:bg-[#d51a2d] text-[#d51a2d] hover:text-white px-6 py-3 rounded-full border-2 border-[#d51a2d] transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <LinkIcon className="w-5 h-5" />
                    <span className="font-semibold">
                      {isRtl ? "نسخ الرابط" : "Copy Link"}
                    </span>
                  </button>
                </div>

                {/* Club Branding */}
                <div className="mt-6 pt-6 border-t-2 border-[#d51a2d]/20 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                    <span className="font-bold text-[#d51a2d]">
                      {isRtl
                        ? "نادي السويحلي - مصراتة"
                        : "Al-Suwaihli Club - Misrata"}
                    </span>
                    <span>•</span>
                    <span>
                      {isRtl
                        ? "شارك الفخر والإنجاز"
                        : "Share the Pride and Achievement"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
            >
              <h2
                className={cn(
                  "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8",
                  isRtl ? "text-right" : "text-left"
                )}
              >
                {isRtl ? "أخبار ذات صلة" : "Related News"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedNews.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/${locale}/news/${item.id}`}
                    className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={isRtl ? item.titleAr : item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {item.date}
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#d51a2d] dark:group-hover:text-[#f2b631] transition-colors">
                          {isRtl ? item.titleAr : item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                          {isRtl ? item.descriptionAr : item.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
