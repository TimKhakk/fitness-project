import { redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import Button from '~/components/Button';
import { createWorkout } from '~/api/createWorkout';

const genId = () => Math.round(Math.random() * 10000);

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  form.append('id', genId().toString())
  createWorkout(form)

  return redirect('/workouts');
};


export default function New() {
  return (
    <>
      <h1>New</h1>
      <Form method="post" className="flex flex-col gap-2">
        <label>
          <span>Name</span>
          <input type="text" name="name" />
        </label>
        <label>
          <span>picture</span>
          <input type="url" name="picture" />
        </label>
        <Button className="bg-primary" type="submit">
          Create new
        </Button>
      </Form>
    </>
  );
}
