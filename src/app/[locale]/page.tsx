"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { NewsAdsCarousel } from "@/components/sections/news-ads-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeagueTable, TeamStanding } from "@/components/sections/league-table";
import { UpcomingMatches, UpcomingMatch } from "@/components/sections/upcoming-matches";
import { TrophiesShowcase, Trophy } from "@/components/sections/trophies-showcase";
import { NewsItem } from "@/types/news.types";
import useLanguage from "@/hooks/use-language";

export default function HomePage() {
  const router = useRouter();
  const { lang: locale } = useLanguage();
  const tLeague = useTranslations("LeagueTable");
  const tMatches = useTranslations("UpcomingMatches");
  const tTrophies = useTranslations("Trophies");

  const handleReadMore = (item: NewsItem) => {
    // Navigate to news detail page
    router.push(`/${locale}/news/${item.id}`);
  };

  // Sample League Standings Data
  const sampleStandings: TeamStanding[] = [
    {
      position: 1,
      teamName: "السويحلي",
      played: 20,
      won: 15,
      drawn: 3,
      lost: 2,
      goalsFor: 45,
      goalsAgainst: 15,
      goalDifference: 30,
      points: 48,
      form: ["W", "W", "D", "W", "W"],
      isClubTeam: true,
    },
    {
      position: 2,
      teamName: "الأهلي طرابلس",
      played: 20,
      won: 14,
      drawn: 4,
      lost: 2,
      goalsFor: 42,
      goalsAgainst: 18,
      goalDifference: 24,
      points: 46,
      form: ["W", "D", "W", "W", "W"],
    },
    {
      position: 3,
      teamName: "الاتحاد",
      played: 20,
      won: 12,
      drawn: 5,
      lost: 3,
      goalsFor: 38,
      goalsAgainst: 20,
      goalDifference: 18,
      points: 41,
      form: ["W", "W", "D", "L", "W"],
    },
    {
      position: 4,
      teamName: "الأهلي بنغازي",
      played: 20,
      won: 11,
      drawn: 6,
      lost: 3,
      goalsFor: 35,
      goalsAgainst: 22,
      goalDifference: 13,
      points: 39,
      form: ["D", "W", "W", "D", "W"],
    },
    {
      position: 5,
      teamName: "الهلال",
      played: 20,
      won: 10,
      drawn: 6,
      lost: 4,
      goalsFor: 32,
      goalsAgainst: 25,
      goalDifference: 7,
      points: 36,
      form: ["L", "W", "D", "W", "D"],
    },
  ];

  // Sample Upcoming Matches Data
  const sampleMatches: UpcomingMatch[] = [
    {
      id: 1,
      homeTeam: "السويحلي",
      awayTeam: "الأهلي طرابلس",
      date: "2025-11-15",
      time: "18:00",
      venue: "ملعب السويحلي",
      competition: "الدوري الليبي الممتاز",
      isHomeMatch: true,
    },
    {
      id: 2,
      homeTeam: "الاتحاد",
      awayTeam: "السويحلي",
      date: "2025-11-22",
      time: "19:30",
      venue: "ملعب الاتحاد",
      competition: "الدوري الليبي الممتاز",
      isHomeMatch: false,
    },
  ];

  // Sample Trophies Data
  const sampleTrophies: Trophy[] = [
    {
      id: 1,
      name: "بطل الدوري الليبي",
      competition: "الدوري الليبي الممتاز",
      year: 2024,
      timesWon: 5,
      yearsWon: [2024, 2020, 2018, 2015, 2012],
      description: "أحرز النادي لقب الدوري الليبي للمرة الخامسة في تاريخه",
      isFeatured: true,
      category: "league",
    },
    {
      id: 2,
      name: "كأس ليبيا",
      competition: "كأس ليبيا",
      year: 2023,
      timesWon: 3,
      yearsWon: [2023, 2019, 2016],
      category: "cup",
    },
    {
      id: 3,
      name: "كأس السوبر الليبي",
      competition: "كأس السوبر",
      year: 2024,
      timesWon: 2,
      yearsWon: [2024, 2021],
      category: "cup",
    },
    {
      id: 4,
      name: "بطولة كرة اليد",
      competition: "الدوري الليبي لكرة اليد",
      year: 2023,
      category: "other",
    },
  ];
  
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      <NewsAdsCarousel
        onReadMore={handleReadMore}
        autoPlayInterval={6000}
      />

      {/* League Table Section */}
      <section className="container mx-auto px-4 py-16">
        <LeagueTable
          standings={sampleStandings}
          competitionName={tLeague("title")}
          season="2024/2025"
          lastUpdated="2025-11-10"
        />
      </section>

      {/* Upcoming Matches Section */}
      <section className="container mx-auto px-4 py-16 bg-[#F5F5F5]">
        <UpcomingMatches
          matches={sampleMatches}
          title={tMatches("title")}
          layout="grid"
        />
      </section>

      {/* Trophies Showcase Section */}
      <section className="container mx-auto px-4 py-16">
        <TrophiesShowcase
          trophies={sampleTrophies}
          title={tTrophies("title")}
          viewMode="grid"
          showCounter={true}
        />
      </section>
    </main>
  );
}
