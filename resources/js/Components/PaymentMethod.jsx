import {useEffect, useState} from "react";

export default function PaymentMethod({groupedChannels,paymentPrice}){
    const [paymentPriceWithFee,setPaymentPriceWithFee] = useState("")
    const [selectedPayment,setSelectedPayment] = useState(null)
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }
    // State to manage the open state of each accordion
    const [openGroup, setOpenGroup] = useState(null);

    // Function to toggle the accordion open state
    // const handleToggle = (group) => {
    //     setOpenGroup(openGroup === group ? null : group);
    // };
    function price(paymentPrice,feeFlat,feePercent) {
        setPaymentPriceWithFee(paymentPrice + feeFlat + (paymentPrice*(feePercent/100)))
        return paymentPrice + feeFlat + (paymentPrice*(feePercent/100))
    }


    useEffect(() => {
        // Example: Automatically open the first group when groupedChannels changes
        if (groupedChannels && Object.keys(groupedChannels).length > 0) {
            setOpenGroup(Object.keys(groupedChannels)[0]);
        }
    }, [groupedChannels]);

    // Function to toggle the accordion open state
    const handleToggle = (group) => {
        setOpenGroup(openGroup === group ? null : group);
    };

    return (
        <div>
            {Object.entries(groupedChannels).map(([group, channels]) => (
                <div key={group} className="flex flex-col mx-auto w-full py-2" data-accordion="collapse" data-active-classes="bg-blue-100 dark:bg-[#919191] text-blue-600 dark:text-white">
                    <div className="w-full bg-[#919191] rounded-t-lg text-lg font-bold py-2 px-4 capitalize text-white">
                        {group}
                    </div>
                    <div className="w-full bg-[#919191] dark:bg-white rounded-b-lg">
                        <button
                            type="button"
                            className="payment-method-button flex items-center justify-end w-full p-5 font-medium hover:rounded-b-lg rtl:text-right focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-primary-dark-700 dark:text-primary-dark-400 hover:bg-blue-100 dark:hover:bg-[#919191] gap-3"
                            onClick={() => handleToggle(group)}
                            aria-expanded={openGroup === group}
                            aria-controls={`accordion-color-body-${group.replace(/ /g, "-").toLowerCase()}`}
                        >
                            {channels.map((channel) => (
                                <div key={channel.icon_url} className="w-[15%] h-full">
                                    <img className="flex" src={channel.icon_url} alt="" />
                                </div>
                            ))}
                            <svg
                                data-accordion-icon
                                className={`w-3 h-3 shrink-0 ${openGroup === group ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path stroke="primary" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5L5 1 1 5" />
                            </svg>
                            <input className="hidden" id="payment_type" value={group.replace(/ /g, "_").toLowerCase()} />
                        </button>
                        <div
                            id={`accordion-color-body-${group.replace(/ /g, "-").toLowerCase()}`}
                            className={` ${openGroup === group ? '' : 'hidden'}`}
                            aria-labelledby={`accordion-color-heading-${group.replace(/ /g, "-").toLowerCase()}`}
                        >
                            <div className="grid grid-cols-3 flex-wrap rounded-b-lg gap-4 max-lg:grid-cols-2 max-sm:grid-cols-2 p-5 border border-b-0 -mt-2 border-primary-200 dark:border-primary-dark-700 dark:bg-gray-900">
                                {channels.map((channel) => (
                                    <div key={channel.code} className="bg-white rounded-xl hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 paymentButton">
                                        <button
                                            type="button"
                                            className="payment-btn grid gap-2 p-4 hover:text-white border-2 rounded-xl w-full h-full"
                                            data-fee-flat={channel.total_fee_flat}
                                            data-fee-percent={channel.total_fee_percent}
                                            data-payment-method-name={channel.name}
                                            data-payment-method-type={channel.code}
                                        >
                                            <input className="hidden" id="payment-method-name" value={channel.name} />
                                            <input className="hidden" id="payment-method-code" value={channel.code} />
                                            <div className="w-1/2">
                                                <img src={channel.icon_url} alt={channel.name} />
                                            </div>
                                            <div>
                                                <p id="product-price" className="paymentMethod text-start">
                                                    {/*{formatRupiah(price(paymentPrice))}*/}
                                                    {paymentPrice}
                                                </p>
                                            </div>
                                            <div className="border-t-2">
                                                <h2 className="text-xs font-bold uppercase text-start">{channel.name}</h2>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
