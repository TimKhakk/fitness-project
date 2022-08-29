import { redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { Button } from '~/components/Button';
import { createWorkout } from '~/api/createWorkout';
import { Input } from '~/components/Input';
import { useState } from 'react';

const genId = () => Math.round(Math.random() * 10000);

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  form.append('id', genId().toString());
  form.append('createdAt', String(Date.now()));

  console.log('🚀 ~ [...form.keys()].reduce((prev, curr) => prev ?? curr.includes(exercise), false)', [...form.keys()].reduce((prev, curr) => prev ?? curr.includes('exercise'), false));
  if ([...form.keys()].reduce((prev, curr) => {
    console.log('🚀 ~ prev', prev);
    console.log('🚀 ~ curr', curr, 'includes?',curr.includes('exercise'));
    return prev ?? curr.includes('exercise')
  }, false)) {
    console.log('🚀 ~ [...form.keys()]', [...form.keys()]);
  }
  createWorkout(form);

  return redirect('/workouts');
};

export default function New() {
  const [exercises, setExercises] = useState([]);

  return (
    <>
      <h1>New</h1>
      <Form method="post" className="flex flex-col gap-4">
        <Input placeholder="Name" type="text" name="name" required />
        <Input placeholder="Picture" type="url" name="picture" required />
        {exercises.length > 0 &&
          exercises.map((ex, idx) => (
            <>
              <hr />
              <Input placeholder="Name" type="text" name={`exercise-name-${idx}`} required />
              <Input
                placeholder="Description"
                type="text"
                name={`exercise-description-${idx}`}
                required
              />
              <Input placeholder="Picture" type="url" name={`exercise-picture-${idx}`} required />
              <Button variant="primary" onClick={(e) => {
                e.preventDefault();
                setExercises((prev) => prev.filter((e) => e.createdAt !== ex.createdAt))
              }}>Remove exercise</Button>
              <hr />
            </>
          ))}
        <Button variant="primary" onClick={(e) => {
          e.preventDefault();
          setExercises((prev) => [...prev, { createdAt: String(Date.now()) }])
        }}>+ Add exercise</Button>
        <Button variant="primary" type="submit">
          Create new
        </Button>
      </Form>
    </>
  );
}
