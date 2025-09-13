/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const transition = {
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  highlighted = false,
  onHighlight,
  onUnhighlight,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  highlighted?: boolean;
  onHighlight?: () => void;
  onUnhighlight?: () => void;
}) => {
  return (
    <div
      onMouseEnter={() => {
        setActive(item);
        onHighlight?.();
      }}
      className="relative"
    >
      <motion.p
        transition={{ duration: 0.2 }}
        className={`cursor-pointer hover:opacity-95 ${highlighted ? "text-white" : "text-gray-900 dark:text-gray-100"} text-[13px] font-semibold`}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", ...transition }}
        >
          {active === item && (
            <div
              className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-1"
              onMouseEnter={onHighlight}
              onMouseLeave={onUnhighlight}
            >
              {/* Hover bridge to keep highlight while moving from label to dropdown */}
              <div
                className="absolute left-0 right-0 -top-2 h-3"
                onMouseEnter={onHighlight}
                onMouseLeave={onUnhighlight}
              />
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-lg"
              >
                <motion.div layout className="w-max h-full p-3">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leaveTimer = useRef<number | null>(null);

  const measure = (index: number) => {
    const el = itemRefs.current[index];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const styles = getComputedStyle(nav);
    const paddingLeft = parseFloat(styles.paddingLeft || "0");
    const borderLeft = nav.clientLeft || 0;
    const left = Math.max(0, Math.round(elRect.left - navRect.left - paddingLeft - borderLeft));
    const width = Math.round(elRect.width);
    setIndicator({ left, width });
  };

  const handleMouseEnter = (index: number) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current as number);
      leaveTimer.current = null;
    }
    setHoveredIndex(index);
    measure(index);
  };
  const handleMouseLeave = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current as number);
    }
    leaveTimer.current = window.setTimeout(() => {
      setHoveredIndex(null);
      measure(activeIndex);
      setActive(null);
      leaveTimer.current = null;
    }, 250);
  };

  // derive active from pathname
  useEffect(() => {
    let initial = 0;
    React.Children.forEach(children, (child, idx) => {
      if (
        React.isValidElement(child) &&
        typeof (child.props as { href?: string }).href === "string"
      ) {
        const href: string = (child.props as { href: string }).href;
        if (pathname && (pathname === href || pathname.startsWith(href + "/"))) {
          initial = idx;
        }
      }
    });
    setActiveIndex(initial);
    // measure after first paint
    const id = window.requestAnimationFrame(() => measure(initial));
    return () => window.cancelAnimationFrame(id);
  }, [children, pathname]);

  useEffect(() => {
    const onResize = () => measure(hoveredIndex ?? activeIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hoveredIndex, activeIndex]);

  const highlightIndex = hoveredIndex ?? activeIndex;

  return (
    <nav
      ref={navRef}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-full border border-red-600 dark:bg-black dark:border-white/[0.2] bg-transparent shadow-input flex justify-center py-3"
    >
      {React.Children.map(children, (child, index) => {
        const isHighlighted = index === highlightIndex;

        let node = child as React.ReactElement<unknown>;
        if (React.isValidElement(child)) {
          const original =
            typeof child.props === "object" && child.props !== null && "className" in child.props
              ? (child.props.className as string || "")
              : "";
          const filtered = original
            .replace(/(^|\s)text-[^\s]+/g, "")
            .replace(/(^|\s)dark:text-[^\s]+/g, "")
            .trim();

          node = React.cloneElement(child as any, {
            className: `${filtered} text-[13px] font-semibold ${isHighlighted ? "text-white" : "text-gray-900 dark:text-gray-100"} transition-colors`,
            onClick: (e: any) => {
              (child.props as { onClick?: (e: any) => void })?.onClick?.(e);
              setActiveIndex(index);
              measure(index);
            },
          });

          if ((child.type as any) === MenuItem) {
            node = React.cloneElement(node as any, {
              highlighted: isHighlighted,
              onHighlight: () => {
                if (leaveTimer.current) {
                  clearTimeout(leaveTimer.current as number);
                  leaveTimer.current = null;
                }
                setHoveredIndex(index);
                measure(index);
              },
              onUnhighlight: () => {
                if (leaveTimer.current) {
                  clearTimeout(leaveTimer.current as number);
                }
                leaveTimer.current = window.setTimeout(() => {
                  setHoveredIndex(null);
                  measure(activeIndex);
                  leaveTimer.current = null;
                }, 250);
              },
            });
          }
        }

        return (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            className="relative z-10 px-4"
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {node}
          </div>
        );
      })}

      {indicator && (
        <motion.div
          className="pointer-events-none absolute top-[2px] bottom-1 rounded-full bg-red-600 min-h-[90%]"
          layoutId="hovered"
          initial={false}
          animate={{ left: indicator.left, width: indicator.width }}
          transition={{ type: "spring", bounce: 0.28, duration: 1 }}
        />
      )}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-lg font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black text-md"
    >
      {children}
    </Link>
  );
};

export const NavItem = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`relative z-10 px-3 text-sm font-medium transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
