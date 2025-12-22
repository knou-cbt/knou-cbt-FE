import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button, Table, type ColumnDef } from "@/components/ui"

import type { IExamYear } from "./interface"

// 샘플 데이터 (추후 API 연동 시 제거)
const sampleYearData: IExamYear[] = [
    { id: "1", year: 2024, subjectId: "1" },
    { id: "2", year: 2023, subjectId: "1" },
    { id: "3", year: 2022, subjectId: "1" },
    { id: "4", year: 2021, subjectId: "1" },
    { id: "5", year: 2020, subjectId: "1" },
]

export const ExamYearPage = () => {
    const { subjectId } = useParams<{ subjectId: string }>()
    const navigate = useNavigate()

    const handleMemorizeClick = (year: number) => {
        navigate(`/exam/${subjectId}/${year}/memorize-mode`)
    }

    const handleTestClick = (year: number) => {
        navigate(`/exam/${subjectId}/${year}/test-mode`)
    }

    const columns = useMemo<ColumnDef<IExamYear, unknown>[]>(
        () => [
            {
                accessorKey: "year",
                header: "시험 년도",
                cell: ({ getValue }) => `${getValue()}년`,
            },
            {
                accessorKey: "action",
                header: "기타",
                cell: ({ row }) => {
                    const year = row.original.year
                    return (
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMemorizeClick(year)}
                            >
                                암기모드
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => handleTestClick(year)}
                            >
                                시험모드
                            </Button>
                        </div>
                    )
                },
            },
        ],
        [subjectId]
    )

    return (
        <>
            {/* Hero Section */}
            <section className="flex flex-col items-center px-4 md:px-[446px] pt-24 pb-12 w-full bg-gradient-to-br from-[#EFF6FF] to-white">
                <div className="flex flex-col items-center gap-4 w-full max-w-[768px]">
                    <h1 className="text-base leading-6 text-center text-[#101828]">
                        시험 년도 선택
                    </h1>
                    <p className="text-base leading-6 text-center text-[#4A5565]">
                        풀고 싶은 시험 년도를 선택하세요.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center px-4 py-12 bg-white">
                <div className="flex flex-col items-center gap-2 mb-8">
                    <h2 className="text-2xl font-semibold text-[#101828]">
                        년도별 시험 문제
                    </h2>
                </div>

                {/* Year Table */}
                <div className="relative w-full max-w-[1100px] mx-auto">
                    <Table
                        data={sampleYearData}
                        columns={columns}
                        enablePagination={false}
                    />
                </div>
            </main>
        </>
    )
}

