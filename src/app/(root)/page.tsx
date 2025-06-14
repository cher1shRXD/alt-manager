"use client"


const Home = () => {
  return (
    <div className="w-full grid grid-cols-16 grid-rows-[repeat(10,40px)] gap-4">
      <div className="col-[1/7] row-[1/6] bg-container border border-border rounded-lg">
        새로운 과제
      </div>
      <div className="col-[7/12] row-[1/6] bg-container border border-border rounded-lg">
        성과 보고 마감일
      </div>
      <div className="col-[12/-1] row-[1/7] bg-container border border-border rounded-lg">
        로그인 정보
      </div>
      <div className="col-[1/12] row-[6/9] bg-container border border-border rounded-lg">
        총 과제 진척도
      </div>
    </div>
  )
}
export default Home