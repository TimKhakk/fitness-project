import { useState } from 'react';
import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import { truncate } from 'lodash';
import { Switcher } from '~/components/Switcher';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/Button';
import { redis } from '~/redis/index.server';
import { destroyWorkout } from '~/api/destroyWorkout';

const PLACEHOLDER_IMG_URL =
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logistec.com%2Fwp-content%2Fuploads%2F2017%2F12%2Fplaceholder.png&f=1&nofb=1';
const LOREM_TEXT =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid provident dignissimos eos magnam beatae amet unde, accusantium, harum officiis esse voluptas quia officia, rem impedit ullam! Expedita, obcaecati quas!';
const MAX_CHAR_LENGTH = 126;

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
  const [editMode, setEditMode] = useState(true);
  const { data: workouts } = useLoaderData();

  return (
    <>
      <Switcher active={editMode} onClick={() => setEditMode(!editMode)}>
        Edit mode
      </Switcher>
      <div className="flex gap-5 flex-col lg:flex-row lg:flex-wrap">
        {workouts === null ? (
          <div>No data</div>
        ) : (
          workouts.map((w) => (
            <div
              className="flex flex-col shadow-md bg-white rounded overflow-hidden lg:w-[350px] "
              key={w.id}
            >
              <Link to={w.id || '001'} className="grid">
                <img src={w.picture} alt={w.name} className="w-full object-cover h-24" />
                <div className="font-medium text-base p-4">
                  <h5 className="h5 mb-2">{w.name}</h5>
                  <p className="common-text">{truncate(LOREM_TEXT, { length: MAX_CHAR_LENGTH })}</p>
                </div>
              </Link>
              <div className="p-2 flex">
                {editMode && (
                  <Form method="put">
                    <input type="hidden" name="_method" value="update" />
                    <Button>Edit</Button>
                  </Form>
                )}
                {editMode && (
                  <Form method="delete">
                    <input type="hidden" name="_method" value="delete" />
                    <input type="hidden" name="workoutId" value={w.id} />
                    <Button>Delete</Button>
                  </Form>
                )}
              </div>
            </div>
          ))
        )}
        {editMode && (
          <Link
            to="new"
            className="flex flex-col shadow-md bg-white rounded overflow-hidden lg:w-[350px] lg:flex-wrap"
          >
            <div className="grid">
              <img
                src={PLACEHOLDER_IMG_URL}
                alt="placeholder image"
                className="w-full object-cover h-24"
              />
              <div className="font-medium text-base p-4">
                <h5 className="h5 mb-2">Add new</h5>
                <p className="common-text">{truncate(LOREM_TEXT, { length: MAX_CHAR_LENGTH })}</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
