import CustomLink from "@/components/common/CustomLink";
import { getMe } from "@/services/getMe"
import { SquareArrowOutUpRight } from "lucide-react";

const ChooseClub = async () => {
  const user = await getMe();

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-120 h-100 bg-container border border-border rounded-xl flex flex-col items-center px-4">
        <p className="w-full py-3 border-b border-border text-center">워크스페이스 선택</p>
        <div className="w-full flex-1 overflow-y-scroll">
          <div className="w-full flex flex-col gap-2 py-2">
            <CustomLink href={`/?workspace=${1}`} className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
              <div className="flex-1 flex flex-col gap-1 ">
                <p className="font-anton tracking-[1.6] text-xl">ALT</p>
                <p className="text-xs text-gray-500">참가 인원: 13</p>
              </div>
              <SquareArrowOutUpRight size={20} />
            </CustomLink>
            <CustomLink href={`/?workspace=${1}`} className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
              <div className="flex-1 flex flex-col gap-1 ">
                <p className="font-anton tracking-[1.6] text-xl">ALT</p>
                <p className="text-xs text-gray-500">참가 인원: 13</p>
              </div>
              <SquareArrowOutUpRight size={20} />
            </CustomLink>
            <CustomLink href={`/?workspace=${1}`} className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
              <div className="flex-1 flex flex-col gap-1 ">
                <p className="font-anton tracking-[1.6] text-xl">ALT</p>
                <p className="text-xs text-gray-500">참가 인원: 13</p>
              </div>
              <SquareArrowOutUpRight size={20} />
            </CustomLink>
            <CustomLink href={`/?workspace=${1}`} className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
              <div className="flex-1 flex flex-col gap-1 ">
                <p className="font-anton tracking-[1.6] text-xl">ALT</p>
                <p className="text-xs text-gray-500">참가 인원: 13</p>
              </div>
              <SquareArrowOutUpRight size={20} />
            </CustomLink>
            <CustomLink href={`/?workspace=${1}`} className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
              <div className="flex-1 flex flex-col gap-1 ">
                <p className="font-anton tracking-[1.6] text-xl">ALT</p>
                <p className="text-xs text-gray-500">참가 인원: 13</p>
              </div>
              <SquareArrowOutUpRight size={20} />
            </CustomLink>
            <CustomLink href={`/?workspace=${1}`} className="w-full flex items-center bg-container p-2 rounded-lg border border-border">
              <div className="flex-1 flex flex-col gap-1 ">
                <p className="font-anton tracking-[1.6] text-xl">ALT</p>
                <p className="text-xs text-gray-500">참가 인원: 13</p>
              </div>
              <SquareArrowOutUpRight size={20} />
            </CustomLink>
          </div>
        </div>
        <CustomLink href="/make-workspace" className="w-full py-2 text-sm bg-primary rounded-lg text-center mb-4">워크스페이스 생성</CustomLink>
      </div>
    </div>
  )
}
export default ChooseClub