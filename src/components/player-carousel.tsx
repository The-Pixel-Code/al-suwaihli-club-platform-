"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion } from "framer-motion"

interface Player {
  id: number | string
  name: string
  position: string
  number: number
  age: number
  nationality: string
  image: string
}

interface PlayerCarouselProps {
  players: Player[]
}

export function PlayerCarousel({ players }: PlayerCarouselProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {players.map((player, index) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          whileHover={{ y: -10 }}
        >
          <Card className="overflow-hidden border-2 border-[#D32F2F]/20 transition-shadow hover:shadow-xl">
            <div className="relative h-80 w-full overflow-hidden bg-gradient-to-b from-[#F5F5F5] to-white">
              <Image
                src={player.image}
                alt={player.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-[#D32F2F] text-white text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center">
                  {player.number}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4 bg-white">
              <h3 className="text-lg font-bold text-[#333333] mb-1 truncate">{player.name}</h3>
              <p className="text-sm text-[#D32F2F] font-semibold mb-2">{player.position}</p>
              <div className="flex items-center justify-between text-xs text-[#666666]">
                <span>{player.nationality}</span>
                <span>{player.age} سنة</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
