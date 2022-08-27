import { useState } from 'react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import Switcher from '~/components/Switcher';
import { Link, useLoaderData } from '@remix-run/react';
import Button from '~/components/Button';
import { redis } from '~/redis/index.server';
import { destroyWorkout } from '~/api/destroyWorkout';

export const loader: LoaderFunction = async () => {
  const data = await redis.hvals('timur:workouts');
  console.log('🚀 ~ data', data);

  if (data === undefined) {
    return {
      data: null,
    };
  }

  return {
    data,
  };
};

export const action: ActionFunction = async ({ request }) => {
  // createWorkout(form)

  // return redirect('/workouts');
};


export default function Workouts() {
  const [editMode, setEditMode] = useState(false);
  const { data: workouts } = useLoaderData();

  return (
    <>
      <Switcher active={editMode} onClick={() => setEditMode(!editMode)}>Edit mode</Switcher>
      <div className="flex gap-5 flex-col">
        {workouts === null ? (
          <div>No data</div>
        ) : workouts.map((w) => (
          <div className="flex bg-white rounded-2xl p-3 gap-3" key={w.id}>
            <img src={w.picture} alt={w.name} className="w-24 h-24" />
            <Link to={w.id || '001'} className="font-medium text-base">{w.name}</Link>
            {editMode && <Button>Edit</Button>}
            {editMode && <Button>Delete</Button>}
          </div>
        ))}
        {editMode && (
          <Link to="new" className="flex bg-white rounded-2xl p-3 gap-3">
            <p className="w-24 h-24">+</p>
            <h4 className="font-medium text-base">Add new</h4>
          </Link>
        )}
      </div>
    </>
  );
}
