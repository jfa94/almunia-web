"use client";

import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form"
import {LikertScale} from "@/components/LikertScale"
import {Button} from "@/components/ui/button"
import questions from "../questions.json"
import {Separator} from "@/components/ui/separator"
import {useState, useEffect} from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const formSchema = z.object(
    questions.reduce((acc, {id}) => {
        acc[id] = z.number({required_error: "Required"})
        return acc
    }, {})
)

// Define questions per page
const QUESTIONS_PER_PAGE = 5

export default function CalibrationForm() {
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesWithErrors, setPagesWithErrors] = useState([])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: questions.reduce((acc, {id}) => {
            acc[id] = undefined;
            return acc
        }, {})
    })

    const {formState} = form
    const {errors, isSubmitted} = formState

    // Update pages with errors whenever errors or isSubmitted changes
    useEffect(() => {
        if (isSubmitted) {
            const errorPages = new Set()

            // Check which pages have errors
            Object.keys(errors).forEach(fieldId => {
                const questionIndex = questions.findIndex(q => q.id === fieldId)
                if (questionIndex !== -1) {
                    const errorPage = Math.floor(questionIndex / QUESTIONS_PER_PAGE) + 1;
                    errorPages.add(errorPage);
                }
            })

            setPagesWithErrors(Array.from(errorPages))

            // Navigate to the first page with errors if there are any
            // if (errorPages.size > 0 && !errorPages.has(currentPage)) {
            //     setCurrentPage(Math.min(...errorPages))
            // }
        }
    }, [errors, isSubmitted, currentPage])

    const onSubmit = (data) => {
        console.log('submitted')
        console.log(data)
    }

    // Calculate pagination values
    const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)
    const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE
    const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length)
    const currentQuestions = questions.slice(startIndex, endIndex)

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return <main>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="container mx-auto flex flex-col sm:gap-4 gap-3 sm:px-0 px-2"
            >
                {currentQuestions.map(({id, calibration, inverse}) => (
                    <div key={id}>
                        <Separator className="sm:mb-4 mb-3 bg-black/5"/>
                        <FormField name={id}
                                   control={form.control}
                                   render={({field}) => (
                                       <FormItem>
                                           <FormControl>
                                               <div
                                                   className="grid md:grid-cols-5 sm:grid-cols-6 grid-cols-1 sm:gap-4 gap-2">
                                                   <div className="my-auto sm:col-span-3">
                                                       <FormMessage className="text-red-700"/>
                                                       <p>{calibration}</p>
                                                   </div>
                                                   <div className="my-auto md:col-span-2 sm:col-span-3">
                                                       <LikertScale id={id} inverse={inverse} {...field} />
                                                   </div>
                                               </div>
                                           </FormControl>
                                       </FormItem>
                                   )}
                        />
                    </div>
                ))}
                <Separator className="bg-black/5 mb-4"/>

                {/* Pagination */}
                <Pagination className="mb-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {/* Page numbers */}
                        {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => {
                            // Show all pages if 5 or fewer, otherwise show current, first, last and immediate neighbors
                            if (totalPages <= 5 ||
                                page === 1 ||
                                page === totalPages ||
                                page === currentPage ||
                                page === currentPage - 1 ||
                                page === currentPage + 1) {
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            isActive={currentPage === page}
                                            onClick={() => handlePageChange(page)}
                                            className={`cursor-pointer ${pagesWithErrors.includes(page) ? "text-red-600 font-bold" : ""}`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            }
                            // Show ellipsis where pages are skipped
                            if ((page === 2 && currentPage > 3) ||
                                (page === totalPages - 1 && currentPage < totalPages - 2)) {
                                return <PaginationItem key={`ellipsis-${page}`}><PaginationEllipsis/></PaginationItem>
                            }
                            return null
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                {/* Show submit button on the last page, or a "Next" button on other pages */}
                {currentPage === totalPages && <Button className="text-white" type="submit">Submit</Button>}

                {/* Show error summary when validation fails */}
                {isSubmitted && pagesWithErrors.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
                        <p>Please complete all required questions. Pages with missing
                            answers: {pagesWithErrors.join(", ")}</p>
                    </div>
                )}
            </form>
        </Form>
    </main>
}