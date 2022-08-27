import { useState } from 'react';
import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import Switcher from '~/components/Switcher';
import { Form, Link, useLoaderData } from '@remix-run/react';
import Button from '~/components/Button';
import { redis } from '~/redis/index.server';
import { destroyWorkout } from '~/api/destroyWorkout';

export const loader: LoaderFunction = async () => {
  const data = await redis.hvals('timur:workouts');

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
  const form = await request.formData();
  const workoutId = form.get('workoutId');
  if (workoutId === null) {
    return json({ error: 'invalid id' }, { status: 400 });
  }
  destroyWorkout(workoutId as string);

  return json({}, { status: 200, statusText: 'ok' });
};

export default function Workouts() {
  const [editMode, setEditMode] = useState(false);
  const { data: workouts } = useLoaderData();

  return (
    <>
      <Switcher active={editMode} onClick={() => setEditMode(!editMode)}>
        Edit mode
      </Switcher>
      <div className="flex gap-5 flex-col">
        {workouts === null ? (
          <div>No data</div>
        ) : (
          workouts.map((w) => (
            <div className="flex bg-white rounded-2xl p-3 gap-3" key={w.id}>
              <img src={w.picture} alt={w.name} className="w-24 h-24" />
              <Link to={w.id || '001'} className="font-medium text-base">
                {w.name}
              </Link>
              {editMode && <Button>Edit</Button>}
              {editMode && (
                <Form method="delete">
                  <input type="hidden" name="_method" value="delete" />
                  <input type="hidden" name="workoutId" value={w.id} />
                  <Button>Delete</Button>
                </Form>
              )}
            </div>
          ))
        )}
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
