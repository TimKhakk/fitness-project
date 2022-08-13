import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import workouts from '../../database/workouts.json';

interface ILoaderData {
  data: typeof workouts[0] | null;
}

export const loader: LoaderFunction = async ({ params }) => {
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

  if (workout === null) {
    return <div>Error</div>;
  }
  return (
    <div>
      <h4 className="font-medium text-base">{workout.name}</h4>
      <img src={workout.picture} alt={workout.name} />

      <ul className='flex flex-col gap-4 py-6'>
        {workout.exercises.map((ex, idx) => (
          <li key={ex.id}>
            <h5 className="font-medium text-base">{idx + 1}: {ex.name}</h5>
            <img src={ex.picture} alt={ex.name} />
            <p>{ex.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
