import { Ear, Eye, Footprints, Pill, Timer, Utensils, type LucideIcon } from "lucide-react";
import type { NeedIcon } from "../data/types";

export const NEED_ICONS: Record<NeedIcon, LucideIcon> = {
  walking: Footprints,
  medication: Pill,
  hearing: Ear,
  diet: Utensils,
  pace: Timer,
  sight: Eye,
};
