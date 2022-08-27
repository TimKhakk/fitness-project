import { redis } from "~/redis/index.server"
import { supabase } from "./supabase.server"

export const createWorkout = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries())
  console.log('🚀 ~ supabase', supabase);
  await redis.hset('timur:workouts', { [String(data.id)]: JSON.stringify(data) })

}