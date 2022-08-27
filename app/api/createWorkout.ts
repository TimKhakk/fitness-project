import { redis } from "~/redis/index.server"

export const createWorkout = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries())
  console.log('🚀 ~ redis', redis);
  // await redis.hset('timur:workouts', { [String(data.id)]: JSON.stringify(data) })
}