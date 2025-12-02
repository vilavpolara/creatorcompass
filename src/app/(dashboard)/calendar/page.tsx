"use client";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import GradientHeader from "@/components/GradientHeader";

type CalendarTask = {
  id: string;
  item: string;
  day: number;
};

function Task({
  id,
  title,
  onDelete,
  onEdit,
}: {
  id: string;
  title: string;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-3 bg-blue-600 text-white rounded-lg shadow cursor-grab flex justify-between items-center"
    >
      <span>{title}</span>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-xs bg-yellow-400 text-black px-2 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-xs bg-red-500 px-2 py-1 rounded"
        >
          X
        </button>
      </div>
    </div>
  );
}

function Day({
  day,
  tasks,
  onDelete,
  onEdit,
}: {
  day: number;
  tasks: any[];
  onDelete: (id: string) => void;
  onEdit: (id: string, oldText: string) => void;
}) {
  const { setNodeRef } = useDroppable({ id: `day-${day}` });

  return (
    <div
      ref={setNodeRef}
      className="p-4 bg-white dark:bg-gray-800 rounded-xl h-48 shadow"
    >
      <h3 className="font-bold mb-2">Day {day}</h3>

      <div className="space-y-2">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.item}
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task.id, task.item)}
          />
        ))}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [tasks, setTasks] = useState<CalendarTask[]>([]);

  async function loadTasks() {
    const res = await fetch("/api/calendar");
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleDragEnd(event: any) {
    if (!event.over) return;

    const id = event.active.id;
    const day = Number(event.over.id.replace("day-", ""));

    await fetch("/api/calendar", {
      method: "PUT",
      body: JSON.stringify({ id, day }),
    });

    loadTasks();
  }

  async function addTask() {
    const item = prompt("Enter a new content idea:");
    if (!item) return;

    await fetch("/api/calendar", {
      method: "POST",
      body: JSON.stringify({ item, day: 1 }),
    });

    loadTasks();
  }

  async function deleteTask(id: string) {
    await fetch("/api/calendar", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    loadTasks();
  }

  async function editTask(id: string, oldText: string) {
    const newTitle = prompt("Edit task:", oldText);
    if (!newTitle) return;

    await fetch("/api/calendar", {
      method: "PUT",
      body: JSON.stringify({ id, item: newTitle }),
    });

    loadTasks();
  }

  async function generateIdeas() {
    const res = await fetch("/api/calendar", { method: "PATCH" });
    const ideas = await res.json();

    for (const idea of ideas) {
      await fetch("/api/calendar", {
        method: "POST",
        body: JSON.stringify({ item: idea, day: 1 }),
      });
    }

    loadTasks();
  }

  return (
    <div>
      <GradientHeader title="Content Calendar" />

      <div className="flex gap-4 mb-6">
        <button
          onClick={addTask}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:opacity-80 transition"
        >
          Add Task
        </button>

        <button
          onClick={generateIdeas}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:opacity-80 transition"
        >
          ✨ Generate Ideas (AI)
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-7 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <Day
              key={day}
              day={day}
              tasks={tasks.filter((t) => t.day === day)}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
