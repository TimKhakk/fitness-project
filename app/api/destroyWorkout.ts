import { redis } from "~/redis/index.server"

export const destroyWorkout = async (id: string) => {
  await redis.hdel('timur:workouts', id)
}