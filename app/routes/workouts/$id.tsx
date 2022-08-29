import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { redis } from '~/redis/index.server';

interface IWorkout  {
  id: string;
  name: string;
  picture: string;
  exercises?: {
      id: string;
      name: string;
      description: string;
      approaches?: string;
      picture: string;
      reps?: string;
  }[];
}

interface ILoaderData {
  data: IWorkout | null;
}
export const loader: LoaderFunction = async ({ params }) => {
  const workouts = await redis.hvals('timur:workouts') as IWorkout[];
  const workout = workouts.find((w) => w.id === params.id);

  if (workout === undefined) {
    return {
      data: null,
    } as ILoaderData;
  }

  return {
    data: workout,
  } as ILoaderData;
};

export default function Workout() {
  const { data: workout } = useLoaderData<ILoaderData>();
  console.log('🚀 ~ workout', workout);

  if (workout === null) {
    return <div>Error</div>;
  }
  return (
    <div>
      <h1 className="h1 mb-2">{workout.name}</h1>
      <img src={workout.picture} alt={workout.name} />

      <ul className="flex flex-col gap-4 py-6">
        {/* {workout.exercises.map((ex, idx) => (
          <li key={ex.id}>
            <h5 className="font-medium text-base">
              {idx + 1}: {ex.name}
            </h5>
            <img src={ex.picture} alt={ex.name} />
            <p>{ex.description}</p>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
