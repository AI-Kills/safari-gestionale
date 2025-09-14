import { validationErrorsToString } from "../../dashboard/(overview)/general-interface/helpers";
import { DBResult } from "../../lib/actions/actions";
import { SuccessToast } from "@/components/ui/success-toast";
import './style.css';


export default function Feedback<T>({ result, autoClose = true }: { result: DBResult<T>, autoClose?: boolean }) {

    return (
        <>
            {result.success ?
                <SuccessToast 
                    title="Successo!"
                    message="Operazione completata con successo"
                    duration={autoClose ? 3000 : 0}
                    onClose={() => {}}
                />
                :
                <div className="flex flex-col text-red-500 mt-10">
                    <p>Operazione fallita: </p>
                    <p>{result.errorsMessage}</p>
                    <p>{validationErrorsToString(result.errors)}</p>
                </div>
            }
        </>
    );
}

