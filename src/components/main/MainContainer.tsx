import { useMemo } from "react"
import { Table, type ColumnDef } from "../ui"
import { useNavigate } from "react-router-dom"

interface ISubject {
    id: string
    subjectName: string
}

const sampleData: ISubject[] = [
    { id: "1", subjectName: "컴퓨터구조" },
    { id: "2", subjectName: "운영체제" },
    { id: "3", subjectName: "데이터베이스" },
    { id: "4", subjectName: "네트워크" },
    { id: "5", subjectName: "알고리즘" },
    { id: "6", subjectName: "자료구조" },
    { id: "7", subjectName: "소프트웨어공학" },
    { id: "8", subjectName: "정보보안" },
]

export const MainContainer = () => {
    const navigate = useNavigate();
    
    const handleClick = (subjectId: string) => {
        navigate(`/exam/${subjectId}/year`);
    }

    const columns = useMemo<ColumnDef<ISubject, unknown>[]>(
        () => [
            {
                accessorKey: "subjectName",
                header: "과목명",
            },
        ],
        []
    )
    return (
        <>
            {/* Hero Section */}
            <section className="flex flex-col items-center px-4 md:px-[446px] pt-24 pb-12 w-full bg-gradient-to-br from-[#EFF6FF] to-white">
                <div className="flex flex-col items-center gap-4 w-full max-w-[768px]">
                    {/* Heading */}
                    <h1 className="text-base leading-6 text-center text-[#101828]">
                        오늘도 문제 다모아와 함께
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base leading-6 text-center text-[#4A5565]">
                        틀린 문제 위주로, 필요한 것만 정확하게 복습하세요.
                    </p>
                </div>
            </section>

            {/* Main Content - Preview Section */}
            <main className="flex-1 flex flex-col items-center px-4 py-12 bg-white">
                {/* Preview Title */}
                <div className="flex flex-col items-center gap-2 mb-8">
                    <h2 className="text-2xl font-semibold text-[#101828]">
                        간편한 문제 관리
                    </h2>
                    <p className="text-base text-[#6B7280]">
                        직관적인 인터페이스로 문제를 쉽게 관리하세요
                    </p>
                </div>

                {/* Subject Table */}
                <div className="relative w-full max-w-[1100px] mx-auto">
                    <Table
                        data={sampleData}
                        columns={columns}
                        enablePagination={false}
                        onRowClick={(row) => handleClick(row.original.id)}
                    />
                </div>
            </main>
        </>
    )
}