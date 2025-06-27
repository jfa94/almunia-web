import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {redirect} from "next/navigation"

export const SubmitButton = ({isLoading}) => {
    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <button type="submit" disabled={isLoading} className="btn btn-primary min-w-36">
                {isLoading ? 'Loading...' : 'Finish'}
            </button>
        </AlertDialogTrigger>
        <AlertDialogContent className={'bg-white rounded-2xl'}>
            <AlertDialogHeader>
                <AlertDialogTitle>Continue to the Culture Calibration tool?</AlertDialogTitle>
                <AlertDialogDescription>
                    The culture calibration tool is a guided process to help you understand your ideal company culture.
                    It is a guided questionnaire that will take around 15 minutes to complete. You can complete this
                    later.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className={'border-slate-500'} onClick={() => redirect('/dashboard')}>
                    Skip
                </AlertDialogCancel>
                <AlertDialogAction className={'text-white'} onClick={() => redirect('/calibration')}>
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
