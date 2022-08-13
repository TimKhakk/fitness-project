import { useState } from 'react';
import workouts from '../../database/workouts.json';
import Switcher from '~/components/Switcher';
import { Link } from '@remix-run/react';
import Button from '~/components/Button';

export default function Workouts() {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <Switcher active={editMode} onClick={() => setEditMode(!editMode)}>Edit mode</Switcher>
      <div className="flex gap-5 flex-col">
        {workouts.map((w) => (
          <Link to={w.id} className="flex bg-white rounded-2xl p-3 gap-3" key={w.id}>
            <img src={w.picture} alt={w.name} className="w-24 h-24" />
            <h4 className="font-medium text-base">{w.name}</h4>
            {editMode && <Button>Edit</Button>}
            {editMode && <Button>Delete</Button>}
          </Link>
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
