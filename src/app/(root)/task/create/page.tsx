"use client";

import { useCreateTask } from "@/hooks/task/useCreateTask";
import { useGetWorkspace } from "@/hooks/workspace/useGetWorkspace";
import { useSearchParams } from "next/navigation";

const CreateTask = () => {
  const searchParams = useSearchParams();
  const { taskData, handleData, submit, handleMentees } = useCreateTask(searchParams.get("workspace"));

  const workspace = useGetWorkspace(searchParams.get("workspace"));

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">과제 출제</h2>
      <form onSubmit={(e) => {e.preventDefault(); submit();}} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="제목"
          value={taskData.title}
          onChange={handleData}
          name="title"
        />
        <textarea
          className="border p-2 rounded"
          placeholder="설명"
          value={taskData.description}
          onChange={handleData}
          name="description"
        />
        <div>
          <label className="block mb-1 font-semibold">과제 대상 멤버</label>
          <div className="flex flex-wrap gap-2">
            {workspace?.users?.filter(u => u.id !== workspace?.admin?.id).map(user => (
              <label key={user.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!taskData.mentees.some((u) => u.id === user.id)}
                  value={user.id}
                  onChange={() => handleMentees(user)}
                />
                <span>{user.name}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <label className="mb-1">시작일</label>
            <input type="date" value={taskData.startDate} onChange={handleData} name="startDate" className="border p-2 rounded" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">마감일</label>
            <input type="date" value={taskData.endDate} onChange={handleData} name="endDate" className="border p-2 rounded" />
          </div>
        </div>
        <button type="submit" className="bg-primary text-white py-2 rounded font-semibold">과제 출제</button>
      </form>
    </div>
  );
};

export default CreateTask;
