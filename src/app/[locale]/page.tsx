"use client";

import { useTranslations } from "next-intl";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const t = useTranslations("");
  return (
    <div className="w-full min-h-screen bg-zinc-800 flex flex-col gap-4 items-center justify-center">
      <h1 className="font-almarai text-2xl text-amber-50">{t("welcome")}</h1>
      <Button
        size={"lg"}
        onClick={() =>
          toast("The project has been created successfully. 🎉🎉", {
            duration: 5000,
          })
        }
      >
        Click Me !
      </Button>
    </div>
  );
}
