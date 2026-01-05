import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] to-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 텍스트 */}
        <h1 className="text-8xl md:text-9xl font-bold text-[#155DFC] mb-4">
          404
        </h1>

        {/* 제목 */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#101828] mb-2">
          페이지를 찾을 수 없습니다
        </h2>

        {/* 설명 */}
        <p className="text-sm md:text-base text-[#6B7280] mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          <br />
          URL을 확인해 주세요.
        </p>

        {/* 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전 페이지
          </Button>
          <Button onClick={() => navigate("/")} className="cursor-pointer">
            <Home className="w-4 h-4 mr-2" />
            홈으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
};
