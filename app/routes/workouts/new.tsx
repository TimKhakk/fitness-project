import { json, redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import Button from '~/components/Button';
import { useState } from 'react';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  // const email = form.get('email');
  // const password = form.get('password');
  const errors = {};

  // // validate the fields
  // if (typeof email !== 'string' || !email.includes('@')) {
  //   errors.email = "That doesn't look like an email address";
  // }

  // if (typeof password !== 'string' || picture.length < 6) {
  //   errors.picture = 'Password must be > 6 characters';
  // }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return json(errors, { status: 422 });
  }

  console.log('🚀 ~ form', form);
  // otherwise create the user and redirect
  // await createUser(form);
  return redirect('/workouts');
};

const genId = () => Math.round(Math.random() * 10000);

export default function New() {
  const [exercises, setExercises] = useState<number[]>([]);
  const errors = useActionData();

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setExercises((prev) => [...prev, genId()]);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.preventDefault();
    setExercises((prev) => prev.filter((i) => i !== id));
  };

  return (
    <>
      <h1>New</h1>
      <Form method="post" className="flex flex-col gap-2">
        <label>
          <span>Name</span>
          <input type="text" name="email" />
        </label>
        <label>
          <span>picture</span>
          <input type="url" name="password" />
        </label>
        {exercises.map((id) => (
          <div key={id} className="flex flex-col gap-2 p-1 border border-dark">
            <label>
              <span>Name</span>
              <input type="text" name={`${id}_name`} />
            </label>
            <label>
              <span>Picture</span>
              <input type="url" name={`${id}_picture`} />
            </label>
            <label>
              <span>Description</span>
              <input type="text" name={`${id}_description`} />
            </label>
            <label>
              <span>Approaches</span>
              <input type="text" name={`${id}_approaches`} />
            </label>
            <label>
              <span>Reps</span>
              <input type="text" name={`${id}_reps`} />
            </label>
            <Button className="bg-primary" onClick={(e) => handleRemove(e, id)}>
              Remove
            </Button>
          </div>
        ))}
        <Button className="bg-primary" onClick={handleAdd}>
          Add exercise +
        </Button>
        <Button className="bg-primary" type="submit">
          Create new
        </Button>
      </Form>
    </>
  );
}
