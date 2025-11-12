"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import useLanguage from "@/hooks/use-language";
import { useTranslations } from "next-intl";

/**
 * Footer Component
 *
 * Comprehensive footer with:
 * - 4-column responsive layout (club info, quick links, sports, social)
 * - Newsletter subscription form
 * - Contact information
 * - Social media links with hover animations
 * - RTL support for Arabic
 * - Dark background with gold accents
 * - Proper accessibility (ARIA labels, keyboard navigation)
 * - Uses next-intl for translations
 */

export default function Footer() {
  const { lang: locale, isArabic } = useLanguage();
  const t = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate newsletter subscription
    setTimeout(() => {
      setSubmitMessage(tFooter("subscribeSuccess"));
      setEmail("");
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 3000);
    }, 1000);
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/alsuwaihliclub",
      color: "hover:bg-[#1877F2]",
      ariaLabel: tFooter("socialMedia.facebook"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/alsuwaihliclub",
      color: "hover:bg-[#1DA1F2]",
      ariaLabel: tFooter("socialMedia.twitter"),
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/alsuwaihliclub",
      color: "hover:bg-gradient-to-br hover:from-[#F58529] hover:to-[#DD2A7B]",
      ariaLabel: tFooter("socialMedia.instagram"),
    },
    {
      name: "Youtube",
      icon: Youtube,
      href: "https://youtube.com/@alsuwaihliclub",
      color: "hover:bg-[#FF0000]",
      ariaLabel: tFooter("socialMedia.youtube"),
    },
  ];

  // Quick Links - matching navigation structure
  const quickLinks = [
    { name: t("home"), href: `/${locale}` },
    { name: t("club"), href: `/${locale}/club/history` },
    { name: t("championships"), href: `/${locale}/club/championships` },
    { name: t("leagueSchedule"), href: `/${locale}/league-schedule` },
    { name: t("clubRadio"), href: `/${locale}/club-radio` },
  ];

  // Sports Links - matching navigation constants
  const sportsLinks = [
    { name: t("footballWithAgeGroups"), href: `/${locale}/sports/football` },
    { name: t("handballWithAgeGroups"), href: `/${locale}/sports/handball` },
    {
      name: t("volleyballWithAgeGroups"),
      href: `/${locale}/sports/volleyball`,
    },
    { name: t("futsal"), href: `/${locale}/sports/futsal` },
    { name: t("otherSports"), href: `/${locale}/sports/other` },
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: tFooter("phone"),
      href: "tel:+218912345678",
    },
    {
      icon: Mail,
      text: tFooter("email"),
      href: "mailto:info@alsuwaihli.ly",
    },
    {
      icon: MapPin,
      text: tFooter("location"),
      href: "https://maps.google.com/?q=Misrata,Libya",
    },
  ];

  return (
    <footer
      className="bg-[#333333] text-white relative overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255, 215, 0, 0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Column 1: Club Info & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-xl font-bold text-red-600">
              {tFooter("clubName")}
            </h3>
            <p className="text-sm leading-relaxed opacity-90 mb-4">
              {tFooter("clubDescription")}
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-red-600 mb-3">
                {tFooter("newsletter")}
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tFooter("emailPlaceholder")}
                  required
                  className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
                  disabled={isSubmitting}
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-600 text-[#333333] rounded-md font-semibold hover:bg-[#FFC700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={tFooter("subscribe")}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>
              {submitMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#4CAF50] mt-2"
                >
                  {submitMessage}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 text-xl font-bold text-red-600">
              {tFooter("quickLinks")}
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ x: isArabic ? -5 : 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm opacity-90 transition-colors hover:text-red-600 hover:opacity-100 inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Sports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-xl font-bold text-red-600">
              {t("sportsActivities")}
            </h3>
            <nav className="flex flex-col gap-2">
              {sportsLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ x: isArabic ? -5 : 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm opacity-90 transition-colors hover:text-red-600 hover:opacity-100 inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Column 4: Contact & Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-4 text-xl font-bold text-red-600">
              {tFooter("contactUs")}
            </h3>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 mb-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-3 text-sm opacity-90 hover:text-red-600 hover:opacity-100 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-[#333333] transition-colors">
                    <info.icon className="h-4 w-4" />
                  </div>
                  <span>{info.text}</span>
                </a>
              ))}
            </div>

            {/* Social Media */}
            <h4 className="text-sm font-semibold text-red-600 mb-3">
              {tFooter("followUs")}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 ${social.color} hover:text-white`}
                  aria-label={social.ariaLabel}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/20 mb-6"
        />

        {/* Bottom Section: Copyright & Additional Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-center md:text-left"
        >
          <p className="opacity-75">{tFooter("copyright")}</p>

          <div className="flex gap-4 opacity-75">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-red-600 transition-colors"
            >
              {tFooter("privacyPolicy")}
            </Link>
            <span>•</span>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-red-600 transition-colors"
            >
              {tFooter("termsConditions")}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Gold Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
    </footer>
  );
}
