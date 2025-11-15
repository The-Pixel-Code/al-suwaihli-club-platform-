"use client";

import { motion } from "motion/react";
import { MapPin, Heart, Landmark, Users } from "lucide-react";
import useLanguage from "@/hooks/use-language";
import { GridSmallBackground } from "@/components/ui/grid-background";
import Image from "next/image";

export default function CityOfMisrataPage() {
  const { isArabic: isRtl } = useLanguage();

  return (
    <div className="min-h-screen relative" dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <GridSmallBackground>
          <div />
        </GridSmallBackground>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="w-12 h-12 text-[var(--color-primary,#d51a2d)]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              {isRtl ? "مدينة مصراتة" : "City of Misrata"}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {isRtl
                ? "مدينة التاريخ العريق والحاضر المشرق"
                : "A City of Rich History and Bright Future"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {isRtl ? "عن مصراتة" : "About Misrata"}
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {isRtl
                  ? "مصراتة هي ثالث أكبر مدينة في ليبيا وواحدة من أهم المراكز التجارية والثقافية في البلاد. تقع المدينة على ساحل البحر الأبيض المتوسط، وتتمتع بموقع استراتيجي مهم جعلها عبر التاريخ محطة رئيسية للتجارة والثقافة."
                  : "Misrata is the third-largest city in Libya and one of the most important commercial and cultural centers in the country. Located on the Mediterranean coast, the city enjoys an important strategic position that has made it a major hub for trade and culture throughout history."}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {isRtl
                  ? "تشتهر مصراتة بتاريخها العريق وتراثها الثقافي الغني، وتعتبر موطناً لنادي السويحلي الرياضي، أحد أعرق الأندية الرياضية في ليبيا. المدينة معروفة بحيويتها وروحها الرياضية القوية، حيث تحتضن العديد من الأنشطة الرياضية والثقافية على مدار العام."
                  : "Misrata is renowned for its rich history and cultural heritage and is home to Al-Suwaihli Sports Club, one of the most prestigious sports clubs in Libya. The city is known for its vitality and strong sporting spirit, hosting numerous sports and cultural activities throughout the year."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary,#d51a2d)] to-red-700 rounded-xl flex items-center justify-center mb-4">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {isRtl ? "التاريخ والتراث" : "History & Heritage"}
              </h3>
              <p className="text-gray-600">
                {isRtl
                  ? "مدينة غنية بالتاريخ والمعالم الأثرية التي تعود لعصور مختلفة"
                  : "A city rich in history with archaeological landmarks from various eras"}
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary,#d51a2d)] to-red-700 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {isRtl ? "الحياة الثقافية" : "Cultural Life"}
              </h3>
              <p className="text-gray-600">
                {isRtl
                  ? "مركز ثقافي نابض بالحياة مع فعاليات ومهرجانات على مدار العام"
                  : "A vibrant cultural center with events and festivals year-round"}
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary,#d51a2d)] to-red-700 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {isRtl ? "المجتمع" : "Community"}
              </h3>
              <p className="text-gray-600">
                {isRtl
                  ? "مجتمع حيوي ومترابط يفخر بتقاليده وينظر نحو المستقبل"
                  : "A vibrant, connected community proud of its traditions and looking to the future"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Placeholder Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {isRtl ? "صورة مدينة مصراتة" : "Misrata City Photo Placeholder"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}