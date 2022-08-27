import { redis } from "~/redis/index.server"
import { supabase } from "./supabase.server";

export const destroyWorkout = async (id: string) => {
  console.log('🚀 ~ supabase', supabase);
  console.log('🚀 ~ redis', redis);
  // await redis.hdel('timur:workouts', id)

}