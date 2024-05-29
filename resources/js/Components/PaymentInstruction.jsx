import DOMPurify from "dompurify";
import {useState} from "react";

export default function PaymentInstruction({paymentInstruction, transaction}) {

    const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

    // Function to replace placeholders with actual values
    const replacePlaceholders = (text, noVa) => {
        return text.replace(/{{pay_code}}/g, noVa);
    };

    // Toggle accordion open/close
    const toggleAccordion = (index) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    };
    return (
        <div className="hs-accordion-group p-3">
            {paymentInstruction.success && paymentInstruction.data.map((tutor, index) => (
                <div className="hs-accordion" id={`hs-basic-with-arrow-heading-${index}`} key={index}>
                    <button
                        className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400"
                        aria-controls={`hs-basic-with-arrow-collapse-${index}`}
                        aria-expanded={openAccordionIndex === index}
                        onClick={() => toggleAccordion(index)}
                    >
                        {
                            openAccordionIndex === index && (

                                <svg
                                    className={`size-4`}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="m18 15-6-6-6 6"></path>
                                </svg>
                            )
                        }
                        {
                            openAccordionIndex !== index && (
                                <svg
                                    className={`size-4`}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            )
                        }
                        {/*<svg*/}
                        {/*    className={`hs-accordion-active:${openAccordionIndex !== index ? 'block' : 'hidden'} size-4`}*/}
                        {/*    xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
                        {/*    viewBox="0 0 24 24"*/}
                        {/*    fill="none" stroke="red" strokeWidth="2" strokeLinecap="round"*/}
                        {/*    strokeLinejoin="round">*/}
                        {/*    <path d="m18 15-6-6-6 6"></path>*/}
                        {/*</svg>*/}
                        {/*<svg className={`hs-accordion-active:${openAccordionIndex === index ? 'hidden' : 'block'} size-4`}*/}
                        {/*     xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
                        {/*     viewBox="0 0 24 24"*/}
                        {/*     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"*/}
                        {/*     strokeLinejoin="round">*/}
                        {/*    <path d="m6 9 6 6 6-6"></path>*/}
                        {/*</svg>*/}
                        {tutor.title}
                    </button>
                    <div id={`hs-basic-with-arrow-collapse-${index}`}
                         className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${openAccordionIndex === index ? 'block' : 'hidden'}`}
                         aria-labelledby={`hs-basic-with-arrow-heading-${index}`}>
                        <ol className="list-decimal list-inside text-gray-800 dark:text-white">
                            {tutor.steps && tutor.steps.map((step, stepIndex) => (
                                <li key={stepIndex}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(replacePlaceholders(step, transaction.no_va))}}></li>
                            ))}
                        </ol>
                    </div>
                </div>
            ))}
        </div>
    )
}
