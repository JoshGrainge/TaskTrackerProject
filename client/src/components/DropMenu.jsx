import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const TEST_PROFILE_ID = "6730781e41e93b3e6abd8de9";

function DropMenu() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      // TODO make this more secure by passing it in the request header with auth
      const response = await fetch(`http://localhost:5050/tasks/${TEST_PROFILE_ID}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const tasks = await response.json();
      setTasks(tasks);
    }
    getTasks();
  }, [tasks.length]);

  {/* Create task list drop down items */}
  function taskList() {
    return tasks.map((task) => (
      <MenuItem key={task._id}>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
        >
          {task.name}
        </a>
      </MenuItem>
    ));
  }

  {/* Drop Menu */}
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {/* Menu items */}
        <div className="py-1">
          {taskList()} 
        </div>
      </MenuItems>
    </Menu>
  )
}

export default DropMenu;