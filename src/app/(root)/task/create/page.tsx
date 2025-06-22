"use client";

import CustomLink from "@/components/common/CustomLink";
import { useCreateTask } from "@/hooks/task/useCreateTask";
import { useGetWorkspace } from "@/hooks/workspace/useGetWorkspace";
import { ChevronDown, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

const CreateTask = () => {
  const searchParams = useSearchParams();
  const { taskData, handleData, submit, handleMentees, handleSelect, loading } = useCreateTask(
    searchParams.get("workspace")
  );

  const workspace = useGetWorkspace(searchParams.get("workspace"));

  return (
    <div className="w-full mx-auto xl:p-4">
      <h2 className="text-2xl font-bold mb-4">과제 출제</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-4">
        <input
          className="border border-border  p-2 rounded-lg bg-container outline-none text-sm xl:text-base"
          placeholder="제목"
          value={taskData.title}
          onChange={handleData}
          name="title"
        />
        <textarea
          className="border border-border  p-2 rounded-lg bg-container resize-none h-40 outline-none text-sm xl:text-base"
          placeholder="설명"
          value={taskData.description}
          onChange={handleData}
          name="description"
        />
        <div className="flex flex-col gap-2">
          <div className="w-full flex xl:gap-2 flex-col xl:flex-row xl:items-center relative">
            <p className="block mb-1 font-semibold text-lg">과제 대상 멤버</p>
            <div className="relative w-fit">
              <select className="border border-border p-2 pr-8 rounded-lg bg-container outline-none text-sm appearance-none relative text-gray-500" onChange={handleSelect}>
                <option value="placeholder">대상 멤버 선택</option>
                {workspace?.users
                  ?.filter((u) => u.id !== workspace?.admin?.id && !taskData.mentees.some((m) => m.id === u.id) && !workspace.mentors?.some((m) => m.id === u.id))
                  .map((user) => (
                    <option value={JSON.stringify(user)} key={user.id}>{user.name}</option>
                  ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <ChevronDown size={18} />
              </span>
            </div>
          </div>
          <div className="w-full flex flex-wrap items-start gap-1">
            {
              taskData.mentees.length > 0 ? taskData.mentees.map((item) => (
                <div className="px-3 pr-2 py-0.5 bg-primary rounded flex gap-1 items-center" key={item.id}>
                  <p>{item.name}</p>
                  <X size={16} className="cursor-pointer" onClick={() => handleMentees(item)} />
                </div>
              )) : <p className="text-gray-500 py-0.5">과제 대상 멤버가 없습니다.</p>
            }
          </div>
          <div className="flex flex-wrap gap-2">
            
          </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-2">
          <div className="flex flex-col">
            <label className="mb-1">시작일</label>
            <input
              type="date"
              value={taskData.startDate}
              onChange={handleData}
              name="startDate"
              className="border border-border p-2 rounded-lg bg-container outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">마감일</label>
            <input
              type="date"
              value={taskData.endDate}
              onChange={handleData}
              name="endDate"
              className="border border-border p-2 rounded-lg bg-container outline-none"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-lg font-semibold disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? "출제 중..." : "과제 출제"}
          </button>
          <CustomLink
            className="w-full text-center py-2 rounded-lg font-semibold border border-border bg-container text-red-500"
            href={`/task?workspace=${searchParams.get("workspace")}`}>
            과제 목록으로
          </CustomLink>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
