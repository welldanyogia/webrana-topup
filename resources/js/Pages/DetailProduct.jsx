import {Head} from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {useEffect, useState} from "react";
import TextFieldUser from "@/Components/TextFieldUser.jsx";
import NumberFieldUser from "@/Components/NumberFieldUser.jsx";
import SelectFieldUser from "@/Components/SelectFieldUser.jsx";
import OrderConfirmationModal from "@/Components/OrderConfirmationModal.jsx";

export default function DetailProduct({ auth,brand,types,formInputs,sortedGroupedChannels }) {
    const [activeGroup, setActiveGroup] = useState(null);
    const [activeTab, setActiveTab] = useState(brand.products[0].type_id);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductName, setSelectedProductName] = useState(null);
    const [selectedProductBrand, setSelectedProductBrand] = useState(brand.brand_name);
    const [selectedProductCode, setSelectedProductCode] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [selectedPaymentCode, setSelectedPaymentCode] = useState(null);
    const [paymentPrice, setPaymentPrice] = useState(null);
    const [paymentPriceWithFee, setPaymentPriceWithFee] = useState(null);
    const [fee,setFee] = useState(null)
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const isAuthenticated = !!auth;
    const [values,setValues] = useState({})
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")

    const Layout = isAuthenticated ? Authenticated : GuestLayout;


    useEffect(() => {
        const initialValues = formInputs.reduce((acc, formInput) => {
            acc[formInput.name] = ''; // or any default value you want
            return acc;
        }, {});
        setValues(initialValues);
    }, [formInputs]);
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(number);
    }

    function handleConfirm(e) {
        e.preventDefault()
        console.log("bismillah")
    }

    function price(paymentPrice,feeFlat,feePercent) {
        // setPaymentPriceWithFee(paymentPrice + feeFlat + (paymentPrice*(feePercent/100)))
        return parseFloat(paymentPrice) + parseFloat(feeFlat) + parseFloat((paymentPrice*(feePercent/100)))
    }
    const handleToggle = (group) => {
        // e.preventDefault()
        setActiveGroup(activeGroup === group ? null : group);
    };

    function handleTextInputChange(e,form){
        e.preventDefault()
        setValues({ ...values, [form.name]: e.target.value })
    }
    function handleNumberInputChange(e,form){
        e.preventDefault()
        setValues({ ...values, [form.name]: e.target.value })
    }
    function handleSelectInputChange(e,form){
        setValues({ ...values, [form.name]: e.target.value })
    }

    function handleEmail(e) {
        e.preventDefault()
        setEmail(e.target.value)
    }

    function handleProductButton(e,product) {
        let gamecode = brand.brand_name.toLowerCase().replace(/\s+/g, '')
        let concatenatedValues = Object.values(values).join('');

        if (gamecode === 'mobilelegends'){
            gamecode = 'mobilelegend'
        }
        e.preventDefault()
        if (gamecode === 'mobilelegend' || gamecode === 'freefire') {
            setLoading(true); // Set loading menjadi true sebelum pemanggilan API
            axios.post('/api/checkusername', {
                brand_name: gamecode,
                user_id: concatenatedValues
            }).then(response => {
                // Tangani respons yang diterima dari API
                const data = response.data;
                // if (data.status === 1 && data.message === 'Data Found'){
                //     setLoading(false)
                //     setUsername(data.data.username)
                // }
                if (data.status === 1 && data.message === 'Data Not Found') {
                    setLoading(false)
                    // setUsername(data.message)
                    alert('Data tidak ditemukan'); // Tampilkan alert jika data tidak ditemukan
                }
                setUsername(data.data.username)
            }).catch(error => {
                // Tangani error jika terjadi kesalahan dalam permintaan API
                console.error('Error:', error);
            }).finally(() => {
                setLoading(false); // Set loading kembali menjadi false setelah pemanggilan API selesai
            });
        }
        setSelectedProduct(product.id)
        setSelectedProductName(product.product_name)
        setSelectedProductCode(product.buyer_sku_code)
        setPaymentPrice(product.selling_price)
    }
    function handlePaymentButton(e,channel) {
        e.preventDefault()
        setSelectedPayment(channel.id)
        setSelectedPaymentMethod(channel.name)
        selectedPaymentCode(channel.code)
    }

    function handlePhone(e) {
        e.preventDefault()
        setPhone(e.target.value)
    }

    const renderProductTabs = (products) => {
        const uniqueTypes = {};
        return products
            .filter(product => product && !uniqueTypes[product.type_id] && (uniqueTypes[product.type_id] = true))
            .map(productType => (
                <div id={`pills-with-brand-color-${productType.type_id}`} className={`${activeTab === productType.type_id ? '' : 'hidden'} grid grid-cols-3 max-sm:grid-cols-2 gap-6`} role="tabpanel" aria-labelledby={`pills-with-brand-color-item-${productType.type_id}`} key={productType.type_id}>
                    {products
                        .filter(product => product.type_id === productType.type_id)
                        .map(product => (
                            <button
                                className={`relative flex p-3 w-full rounded-lg hover:bg-lime-400 dark:hover:bg-lime-600 ${selectedProduct === product.id ? 'bg-lime-400 dark:bg-lime-400 border-4 border-[#72057D]' : 'dark:bg-lime-500 bg-lime-500'}`}
                                key={product.id}
                                onClick={(e) => handleProductButton(e,product)}
                            >
                                <div className='flex flex-col max-sm:text-xs text-start'>
                                    <div className='font-semibold'>{product.product_name}</div>
                                    <div className='font-bold'>{formatRupiah(product.selling_price)}</div>
                                </div>
                                {selectedProduct === product.id ? <span
                                    className="absolute top-0 end-0 inline-flex items-center rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-[#72057D] text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                    </span> : ''}

                            </button>
                        ))
                    }
                </div>
            ));
    };

    const renderUniqueTypeButtons = (products) => {
        const uniqueTypes = {};
        return products
            .filter(product => product && !uniqueTypes[product.type_id] && (uniqueTypes[product.type_id] = true))
            .map(product => (
                <button
                    type="button"
                    key={product.type_id}
                    className={`hs-tab-active:bg-lime-600 hs-tab-active:text-white hs-tab-active:hover:text-white hs-tab-active:dark:text-white border-2 border-lime-400 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-lime-600 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-neutral-300 ${activeTab === product.type_id ? 'active' : ''}`}
                    id={`pills-with-brand-color-item-${product.type_id}`}
                    data-hs-tab={`#pills-with-brand-color-${product.type_id}`}
                    aria-controls={`pills-with-brand-color-${product.type_id}`}
                    onClick={() => setActiveTab(product.type_id)}
                    role="tab"
                >
                    {product.type_name}
                </button>
            ));
    };

    return (
        <Layout
            user={auth?.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Product Detail</h2>}
        >
            <Head title={brand.brand_name}/>
            <div className="py-2">
            {/*<LoadingAnimation loading={loading}/>*/}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 grid grid-cols-6  text-gray-900 dark:text-gray-100 gap-6">
                            <div className='hidden  col-span-6 bg-gray-200 shadow-md rounded-md dark:shadow dark:shadow-lime-400 dark:bg-gray-800 h-40'>01</div>
                            <div className='col-span-2 max-md:col-span-6'>
                                <div
                                    className="col-span-2 w-full h-fit flex flex-col px-7 py-7 gap-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md shadow-lime-400">
                                    <div className="flex flex-row gap-6 md:grid sm:grid">
                                        <div
                                            className="w-28 h-28 bg-cover bg-no-repeat bg-[url('https://s3-alpha-sig.figma.com/img/5f72/2ccf/9a6497f5e6f67e69c32a91a96938a460?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C4BiYETOcRLeA9mN-p7X96hy3weDIX4YYmKQGIfZmdlrggxjlfPnT2Z4ouKpcoJcnJutSEBANvI8fmW48YGs5nHnYeMIpjlwTFvUV9zA2bqo-nsrsNlsELtGMx39QfFLPhXvqTttaO8fV6aGYYVaiX2B32z7jwnB9JGqIXj1O1U1I38RE2w4Y1woJxa4SWESpfr5sifmvte0LQzxEzHSCSchwKUDconljz7Ce9YHh-b~v2GffnSnsXLb6Aj~OltyCgKjxzs3QgZTC4MZcYVi1ydxWc0K70XGD2cSqkyZnl9ffctnIIjRlrK6AUffFWhC~37arp7w9OhPxBA8F3~RBA__')] rounded-lg">
                                        </div>
                                        <div className="text-xl dark:text-white font-bold items-center h-auto">
                                            <h1>{brand.brand_name}</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b-2 border-lime-400 py-2">
                                        <div className="flex flex-row items-center gap-1">
                                            <div className='hidden dark:block'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16"
                                                     viewBox="0 0 15 16" fill="none">
                                                    <g clipPath="url(#clip0_1_2988)">
                                                        <path
                                                            d="M5.00438 1.99063C4.11149 2.2367 3.22467 2.50428 2.34469 2.79313C2.26434 2.81915 2.19291 2.86723 2.13855 2.93187C2.08418 2.99651 2.04906 3.07512 2.03719 3.15875C1.51782 7.05594 2.71782 9.89937 4.14938 11.7725C4.75549 12.5735 5.4782 13.2791 6.29344 13.8659C6.61782 14.0947 6.90469 14.2597 7.13063 14.3656C7.24313 14.4191 7.33501 14.4547 7.40532 14.4762C7.43607 14.487 7.46777 14.4949 7.5 14.4997C7.53186 14.4945 7.56322 14.4867 7.59376 14.4762C7.66501 14.4547 7.75688 14.4191 7.86938 14.3656C8.09438 14.2597 8.38219 14.0938 8.70657 13.8659C9.5218 13.2791 10.2445 12.5735 10.8506 11.7725C12.2822 9.90031 13.4822 7.05594 12.9628 3.15875C12.9511 3.07508 12.916 2.99642 12.8616 2.93176C12.8072 2.8671 12.7357 2.81906 12.6553 2.79313C12.045 2.59344 11.0147 2.26812 9.99563 1.99156C8.955 1.70937 7.99782 1.50031 7.5 1.50031C7.00313 1.50031 6.045 1.70844 5.00438 1.99063ZM4.755 1.025C5.77219 0.748438 6.85313 0.5 7.5 0.5C8.14688 0.5 9.22782 0.748438 10.245 1.025C11.2856 1.30625 12.3347 1.63906 12.9516 1.84062C13.2095 1.9258 13.4381 2.082 13.6113 2.29128C13.7844 2.50057 13.895 2.75444 13.9303 3.02375C14.4891 7.22094 13.1925 10.3316 11.6194 12.3894C10.9523 13.2697 10.1569 14.0449 9.25969 14.6891C8.94946 14.912 8.62077 15.108 8.27719 15.275C8.01469 15.3988 7.7325 15.5 7.5 15.5C7.2675 15.5 6.98625 15.3988 6.72282 15.275C6.37924 15.108 6.05054 14.912 5.74032 14.6891C4.84316 14.0448 4.04774 13.2697 3.38063 12.3894C1.8075 10.3316 0.510943 7.22094 1.06969 3.02375C1.10502 2.75444 1.21561 2.50057 1.38874 2.29128C1.56187 2.082 1.79053 1.9258 2.04844 1.84062C2.94393 1.54701 3.84639 1.27505 4.755 1.025Z"
                                                            fill="white"/>
                                                        <path
                                                            d="M10.1756 5.32436C10.2193 5.3679 10.2539 5.41963 10.2775 5.47658C10.3012 5.53353 10.3133 5.59458 10.3133 5.65623C10.3133 5.71789 10.3012 5.77894 10.2775 5.83589C10.2539 5.89284 10.2193 5.94457 10.1756 5.98811L7.36311 8.80061C7.31956 8.84426 7.26784 8.8789 7.21089 8.90253C7.15394 8.92616 7.09289 8.93832 7.03123 8.93832C6.96957 8.93832 6.90852 8.92616 6.85158 8.90253C6.79463 8.8789 6.7429 8.84426 6.69936 8.80061L5.29311 7.39436C5.24952 7.35078 5.21495 7.29904 5.19137 7.24209C5.16778 7.18515 5.15564 7.12412 5.15564 7.06248C5.15564 7.00085 5.16778 6.93982 5.19137 6.88287C5.21495 6.82593 5.24952 6.77419 5.29311 6.73061C5.33669 6.68703 5.38843 6.65245 5.44537 6.62887C5.50232 6.60528 5.56335 6.59314 5.62498 6.59314C5.68662 6.59314 5.74765 6.60528 5.80459 6.62887C5.86153 6.65245 5.91327 6.68703 5.95686 6.73061L7.03123 7.80592L9.51186 5.32436C9.5554 5.28071 9.60713 5.24607 9.66408 5.22244C9.72102 5.19881 9.78207 5.18665 9.84373 5.18665C9.90539 5.18665 9.96644 5.19881 10.0234 5.22244C10.0803 5.24607 10.1321 5.28071 10.1756 5.32436Z"
                                                            fill="white"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1_2988">
                                                            <rect width="15" height="15" fill="white"
                                                                  transform="translate(0 0.5)"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className='dark:hidden'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16"
                                                     viewBox="0 0 15 16" fill="none">
                                                    <g clipPath="url(#clip0_1_2988)">
                                                        <path
                                                            d="M5.00438 1.99063C4.11149 2.2367 3.22467 2.50428 2.34469 2.79313C2.26434 2.81915 2.19291 2.86723 2.13855 2.93187C2.08418 2.99651 2.04906 3.07512 2.03719 3.15875C1.51782 7.05594 2.71782 9.89937 4.14938 11.7725C4.75549 12.5735 5.4782 13.2791 6.29344 13.8659C6.61782 14.0947 6.90469 14.2597 7.13063 14.3656C7.24313 14.4191 7.33501 14.4547 7.40532 14.4762C7.43607 14.487 7.46777 14.4949 7.5 14.4997C7.53186 14.4945 7.56322 14.4867 7.59376 14.4762C7.66501 14.4547 7.75688 14.4191 7.86938 14.3656C8.09438 14.2597 8.38219 14.0938 8.70657 13.8659C9.5218 13.2791 10.2445 12.5735 10.8506 11.7725C12.2822 9.90031 13.4822 7.05594 12.9628 3.15875C12.9511 3.07508 12.916 2.99642 12.8616 2.93176C12.8072 2.8671 12.7357 2.81906 12.6553 2.79313C12.045 2.59344 11.0147 2.26812 9.99563 1.99156C8.955 1.70937 7.99782 1.50031 7.5 1.50031C7.00313 1.50031 6.045 1.70844 5.00438 1.99063ZM4.755 1.025C5.77219 0.748438 6.85313 0.5 7.5 0.5C8.14688 0.5 9.22782 0.748438 10.245 1.025C11.2856 1.30625 12.3347 1.63906 12.9516 1.84062C13.2095 1.9258 13.4381 2.082 13.6113 2.29128C13.7844 2.50057 13.895 2.75444 13.9303 3.02375C14.4891 7.22094 13.1925 10.3316 11.6194 12.3894C10.9523 13.2697 10.1569 14.0449 9.25969 14.6891C8.94946 14.912 8.62077 15.108 8.27719 15.275C8.01469 15.3988 7.7325 15.5 7.5 15.5C7.2675 15.5 6.98625 15.3988 6.72282 15.275C6.37924 15.108 6.05054 14.912 5.74032 14.6891C4.84316 14.0448 4.04774 13.2697 3.38063 12.3894C1.8075 10.3316 0.510943 7.22094 1.06969 3.02375C1.10502 2.75444 1.21561 2.50057 1.38874 2.29128C1.56187 2.082 1.79053 1.9258 2.04844 1.84062C2.94393 1.54701 3.84639 1.27505 4.755 1.025Z"
                                                            fill="black"/>
                                                        <path
                                                            d="M10.1756 5.32436C10.2193 5.3679 10.2539 5.41963 10.2775 5.47658C10.3012 5.53353 10.3133 5.59458 10.3133 5.65623C10.3133 5.71789 10.3012 5.77894 10.2775 5.83589C10.2539 5.89284 10.2193 5.94457 10.1756 5.98811L7.36311 8.80061C7.31956 8.84426 7.26784 8.8789 7.21089 8.90253C7.15394 8.92616 7.09289 8.93832 7.03123 8.93832C6.96957 8.93832 6.90852 8.92616 6.85158 8.90253C6.79463 8.8789 6.7429 8.84426 6.69936 8.80061L5.29311 7.39436C5.24952 7.35078 5.21495 7.29904 5.19137 7.24209C5.16778 7.18515 5.15564 7.12412 5.15564 7.06248C5.15564 7.00085 5.16778 6.93982 5.19137 6.88287C5.21495 6.82593 5.24952 6.77419 5.29311 6.73061C5.33669 6.68703 5.38843 6.65245 5.44537 6.62887C5.50232 6.60528 5.56335 6.59314 5.62498 6.59314C5.68662 6.59314 5.74765 6.60528 5.80459 6.62887C5.86153 6.65245 5.91327 6.68703 5.95686 6.73061L7.03123 7.80592L9.51186 5.32436C9.5554 5.28071 9.60713 5.24607 9.66408 5.22244C9.72102 5.19881 9.78207 5.18665 9.84373 5.18665C9.90539 5.18665 9.96644 5.19881 10.0234 5.22244C10.0803 5.24607 10.1321 5.28071 10.1756 5.32436Z"
                                                            fill="black"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1_2988">
                                                            <rect width="15" height="15" fill="black"
                                                                  transform="translate(0 0.5)"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <h2 className="text-xs font-normal dark:text-white">Jaminan Layanan</h2>
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            <div className='hidden dark:block'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17"
                                                     viewBox="0 0 13 17" fill="none">
                                                    <path
                                                        d="M6.5 1.56667C5.06341 1.56667 3.68566 2.12857 2.66984 3.12876C1.65402 4.12896 1.08333 5.48551 1.08333 6.9V7.96667H2.16667C2.45398 7.96667 2.72953 8.07905 2.9327 8.27909C3.13586 8.47913 3.25 8.75044 3.25 9.03333V12.2333C3.25 12.5162 3.13586 12.7875 2.9327 12.9876C2.72953 13.1876 2.45398 13.3 2.16667 13.3H1.08333C0.796016 13.3 0.520465 13.1876 0.317301 12.9876C0.114137 12.7875 0 12.5162 0 12.2333V6.9C-1.27195e-08 6.05954 0.168127 5.22731 0.494783 4.45083C0.821439 3.67434 1.30023 2.96881 1.90381 2.37452C2.50739 1.78022 3.22394 1.3088 4.01256 0.987171C4.80117 0.665541 5.64641 0.5 6.5 0.5C7.35359 0.5 8.19883 0.665541 8.98744 0.987171C9.77606 1.3088 10.4926 1.78022 11.0962 2.37452C11.6998 2.96881 12.1786 3.67434 12.5052 4.45083C12.8319 5.22731 13 6.05954 13 6.9V13.3C13 14.0072 12.7147 14.6855 12.2067 15.1856C11.6988 15.6857 11.01 15.9667 10.2917 15.9667H7.97983C7.88475 16.1288 7.748 16.2635 7.58332 16.3571C7.41864 16.4507 7.23183 16.5 7.04167 16.5H5.95833C5.67102 16.5 5.39547 16.3876 5.1923 16.1876C4.98914 15.9875 4.875 15.7162 4.875 15.4333C4.875 15.1504 4.98914 14.8791 5.1923 14.6791C5.39547 14.479 5.67102 14.3667 5.95833 14.3667H7.04167C7.23183 14.3667 7.41864 14.416 7.58332 14.5096C7.748 14.6032 7.88475 14.7379 7.97983 14.9H10.2917C10.7226 14.9 11.136 14.7314 11.4407 14.4314C11.7455 14.1313 11.9167 13.7243 11.9167 13.3H10.8333C10.546 13.3 10.2705 13.1876 10.0673 12.9876C9.86414 12.7875 9.75 12.5162 9.75 12.2333V9.03333C9.75 8.75044 9.86414 8.47913 10.0673 8.27909C10.2705 8.07905 10.546 7.96667 10.8333 7.96667H11.9167V6.9C11.9167 6.19962 11.7766 5.50609 11.5043 4.85902C11.2321 4.21195 10.8331 3.62401 10.3302 3.12876C9.82718 2.63352 9.23005 2.24067 8.57287 1.97264C7.91569 1.70462 7.21133 1.56667 6.5 1.56667Z"
                                                        fill="white"/>
                                                </svg>
                                            </div>
                                            <div className='dark:hidden'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17"
                                                     viewBox="0 0 13 17" fill="none">
                                                    <path
                                                        d="M6.5 1.56667C5.06341 1.56667 3.68566 2.12857 2.66984 3.12876C1.65402 4.12896 1.08333 5.48551 1.08333 6.9V7.96667H2.16667C2.45398 7.96667 2.72953 8.07905 2.9327 8.27909C3.13586 8.47913 3.25 8.75044 3.25 9.03333V12.2333C3.25 12.5162 3.13586 12.7875 2.9327 12.9876C2.72953 13.1876 2.45398 13.3 2.16667 13.3H1.08333C0.796016 13.3 0.520465 13.1876 0.317301 12.9876C0.114137 12.7875 0 12.5162 0 12.2333V6.9C-1.27195e-08 6.05954 0.168127 5.22731 0.494783 4.45083C0.821439 3.67434 1.30023 2.96881 1.90381 2.37452C2.50739 1.78022 3.22394 1.3088 4.01256 0.987171C4.80117 0.665541 5.64641 0.5 6.5 0.5C7.35359 0.5 8.19883 0.665541 8.98744 0.987171C9.77606 1.3088 10.4926 1.78022 11.0962 2.37452C11.6998 2.96881 12.1786 3.67434 12.5052 4.45083C12.8319 5.22731 13 6.05954 13 6.9V13.3C13 14.0072 12.7147 14.6855 12.2067 15.1856C11.6988 15.6857 11.01 15.9667 10.2917 15.9667H7.97983C7.88475 16.1288 7.748 16.2635 7.58332 16.3571C7.41864 16.4507 7.23183 16.5 7.04167 16.5H5.95833C5.67102 16.5 5.39547 16.3876 5.1923 16.1876C4.98914 15.9875 4.875 15.7162 4.875 15.4333C4.875 15.1504 4.98914 14.8791 5.1923 14.6791C5.39547 14.479 5.67102 14.3667 5.95833 14.3667H7.04167C7.23183 14.3667 7.41864 14.416 7.58332 14.5096C7.748 14.6032 7.88475 14.7379 7.97983 14.9H10.2917C10.7226 14.9 11.136 14.7314 11.4407 14.4314C11.7455 14.1313 11.9167 13.7243 11.9167 13.3H10.8333C10.546 13.3 10.2705 13.1876 10.0673 12.9876C9.86414 12.7875 9.75 12.5162 9.75 12.2333V9.03333C9.75 8.75044 9.86414 8.47913 10.0673 8.27909C10.2705 8.07905 10.546 7.96667 10.8333 7.96667H11.9167V6.9C11.9167 6.19962 11.7766 5.50609 11.5043 4.85902C11.2321 4.21195 10.8331 3.62401 10.3302 3.12876C9.82718 2.63352 9.23005 2.24067 8.57287 1.97264C7.91569 1.70462 7.21133 1.56667 6.5 1.56667Z"
                                                        fill="black"/>
                                                </svg>
                                            </div>
                                            <h2 className="text-xs font-normal dark:text-white">Layanan Pelanggan
                                                24Jam</h2>
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            <div className='hidden dark:block'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16"
                                                     viewBox="0 0 15 16" fill="none">
                                                    <g clipPath="url(#clip0_1_2998)">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M10.3125 14.5625C11.3071 14.5625 12.2609 14.1674 12.9642 13.4642C13.6674 12.7609 14.0625 11.8071 14.0625 10.8125C14.0625 9.81794 13.6674 8.86411 12.9642 8.16085C12.2609 7.45759 11.3071 7.0625 10.3125 7.0625C9.31794 7.0625 8.36411 7.45759 7.66085 8.16085C6.95759 8.86411 6.5625 9.81794 6.5625 10.8125C6.5625 11.8071 6.95759 12.7609 7.66085 13.4642C8.36411 14.1674 9.31794 14.5625 10.3125 14.5625ZM15 10.8125C15 12.0557 14.5061 13.248 13.6271 14.1271C12.748 15.0061 11.5557 15.5 10.3125 15.5C9.0693 15.5 7.87701 15.0061 6.99794 14.1271C6.11886 13.248 5.625 12.0557 5.625 10.8125C5.625 9.5693 6.11886 8.37701 6.99794 7.49794C7.87701 6.61886 9.0693 6.125 10.3125 6.125C11.5557 6.125 12.748 6.61886 13.6271 7.49794C14.5061 8.37701 15 9.5693 15 10.8125Z"
                                                              fill="white"/>
                                                        <path
                                                            d="M8.84817 11.6975C8.89223 12.2563 9.33379 12.6913 10.126 12.7438V13.1562H10.4775V12.7409C11.2979 12.6838 11.7769 12.245 11.7769 11.6094C11.7769 11.03 11.4113 10.7319 10.755 10.5781L10.4775 10.5125V9.3875C10.83 9.42781 11.0532 9.62 11.1066 9.88625H11.7235C11.6794 9.34719 11.2172 8.92625 10.4775 8.88031V8.46875H10.126V8.89062C9.42567 8.95906 8.94942 9.38 8.94942 9.97625C8.94942 10.5031 9.30379 10.8387 9.89348 10.9756L10.126 11.0328V12.2253C9.76598 12.1709 9.52692 11.9722 9.47348 11.6975H8.84817ZM10.1232 10.4281C9.77723 10.3484 9.58973 10.1844 9.58973 9.93875C9.58973 9.66312 9.79223 9.45687 10.126 9.39687V10.4281H10.1232ZM10.5282 11.1275C10.9491 11.225 11.1422 11.3825 11.1422 11.6609C11.1422 11.9787 10.9013 12.1962 10.4775 12.2366V11.1163L10.5282 11.1275Z"
                                                            fill="white"/>
                                                        <path
                                                            d="M0.9375 0.5C0.68886 0.5 0.450403 0.598772 0.274587 0.774587C0.0987721 0.950403 0 1.18886 0 1.4375L0 8.9375C0 9.18614 0.0987721 9.4246 0.274587 9.60041C0.450403 9.77623 0.68886 9.875 0.9375 9.875H4.76531C4.81969 9.5525 4.90125 9.23938 5.00719 8.9375H2.8125C2.8125 8.44022 2.61496 7.96331 2.26333 7.61167C1.91169 7.26004 1.43478 7.0625 0.9375 7.0625V3.3125C1.43478 3.3125 1.91169 3.11496 2.26333 2.76333C2.61496 2.41169 2.8125 1.93478 2.8125 1.4375H12.1875C12.1875 1.93478 12.385 2.41169 12.7367 2.76333C13.0883 3.11496 13.5652 3.3125 14.0625 3.3125V6.62C14.4187 6.93875 14.7347 7.3025 15 7.70188V1.4375C15 1.18886 14.9012 0.950403 14.7254 0.774587C14.5496 0.598772 14.3111 0.5 14.0625 0.5H0.9375Z"
                                                            fill="white"/>
                                                        <path
                                                            d="M9.37313 5.2653L9.375 5.18748C9.37481 4.8646 9.29124 4.54724 9.13239 4.26613C8.97353 3.98503 8.74478 3.74971 8.46829 3.58297C8.19179 3.41623 7.87692 3.32371 7.55417 3.31438C7.23142 3.30505 6.91174 3.37923 6.62607 3.52972C6.34041 3.68022 6.09844 3.90193 5.92362 4.17339C5.7488 4.44485 5.64704 4.75685 5.6282 5.07919C5.60935 5.40152 5.67407 5.72325 5.81608 6.01323C5.95808 6.30321 6.17256 6.55161 6.43875 6.73436C7.24852 5.96305 8.2704 5.45146 9.37313 5.2653Z"
                                                            fill="white"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1_2998">
                                                            <rect width="15" height="15" fill="white"
                                                                  transform="translate(0 0.5)"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className='dark:hidden'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16"
                                                     viewBox="0 0 15 16" fill="none">
                                                    <g clipPath="url(#clip0_1_2998)">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M10.3125 14.5625C11.3071 14.5625 12.2609 14.1674 12.9642 13.4642C13.6674 12.7609 14.0625 11.8071 14.0625 10.8125C14.0625 9.81794 13.6674 8.86411 12.9642 8.16085C12.2609 7.45759 11.3071 7.0625 10.3125 7.0625C9.31794 7.0625 8.36411 7.45759 7.66085 8.16085C6.95759 8.86411 6.5625 9.81794 6.5625 10.8125C6.5625 11.8071 6.95759 12.7609 7.66085 13.4642C8.36411 14.1674 9.31794 14.5625 10.3125 14.5625ZM15 10.8125C15 12.0557 14.5061 13.248 13.6271 14.1271C12.748 15.0061 11.5557 15.5 10.3125 15.5C9.0693 15.5 7.87701 15.0061 6.99794 14.1271C6.11886 13.248 5.625 12.0557 5.625 10.8125C5.625 9.5693 6.11886 8.37701 6.99794 7.49794C7.87701 6.61886 9.0693 6.125 10.3125 6.125C11.5557 6.125 12.748 6.61886 13.6271 7.49794C14.5061 8.37701 15 9.5693 15 10.8125Z"
                                                              fill="black"/>
                                                        <path
                                                            d="M8.84817 11.6975C8.89223 12.2563 9.33379 12.6913 10.126 12.7438V13.1562H10.4775V12.7409C11.2979 12.6838 11.7769 12.245 11.7769 11.6094C11.7769 11.03 11.4113 10.7319 10.755 10.5781L10.4775 10.5125V9.3875C10.83 9.42781 11.0532 9.62 11.1066 9.88625H11.7235C11.6794 9.34719 11.2172 8.92625 10.4775 8.88031V8.46875H10.126V8.89062C9.42567 8.95906 8.94942 9.38 8.94942 9.97625C8.94942 10.5031 9.30379 10.8387 9.89348 10.9756L10.126 11.0328V12.2253C9.76598 12.1709 9.52692 11.9722 9.47348 11.6975H8.84817ZM10.1232 10.4281C9.77723 10.3484 9.58973 10.1844 9.58973 9.93875C9.58973 9.66312 9.79223 9.45687 10.126 9.39687V10.4281H10.1232ZM10.5282 11.1275C10.9491 11.225 11.1422 11.3825 11.1422 11.6609C11.1422 11.9787 10.9013 12.1962 10.4775 12.2366V11.1163L10.5282 11.1275Z"
                                                            fill="black"/>
                                                        <path
                                                            d="M0.9375 0.5C0.68886 0.5 0.450403 0.598772 0.274587 0.774587C0.0987721 0.950403 0 1.18886 0 1.4375L0 8.9375C0 9.18614 0.0987721 9.4246 0.274587 9.60041C0.450403 9.77623 0.68886 9.875 0.9375 9.875H4.76531C4.81969 9.5525 4.90125 9.23938 5.00719 8.9375H2.8125C2.8125 8.44022 2.61496 7.96331 2.26333 7.61167C1.91169 7.26004 1.43478 7.0625 0.9375 7.0625V3.3125C1.43478 3.3125 1.91169 3.11496 2.26333 2.76333C2.61496 2.41169 2.8125 1.93478 2.8125 1.4375H12.1875C12.1875 1.93478 12.385 2.41169 12.7367 2.76333C13.0883 3.11496 13.5652 3.3125 14.0625 3.3125V6.62C14.4187 6.93875 14.7347 7.3025 15 7.70188V1.4375C15 1.18886 14.9012 0.950403 14.7254 0.774587C14.5496 0.598772 14.3111 0.5 14.0625 0.5H0.9375Z"
                                                            fill="black"/>
                                                        <path
                                                            d="M9.37313 5.2653L9.375 5.18748C9.37481 4.8646 9.29124 4.54724 9.13239 4.26613C8.97353 3.98503 8.74478 3.74971 8.46829 3.58297C8.19179 3.41623 7.87692 3.32371 7.55417 3.31438C7.23142 3.30505 6.91174 3.37923 6.62607 3.52972C6.34041 3.68022 6.09844 3.90193 5.92362 4.17339C5.7488 4.44485 5.64704 4.75685 5.6282 5.07919C5.60935 5.40152 5.67407 5.72325 5.81608 6.01323C5.95808 6.30321 6.17256 6.55161 6.43875 6.73436C7.24852 5.96305 8.2704 5.45146 9.37313 5.2653Z"
                                                            fill="black"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1_2998">
                                                            <rect width="15" height="15" fill="white"
                                                                  transform="translate(0 0.5)"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>


                                            <h2 className="text-xs font-normal dark:text-white">Pembayaran Aman</h2>
                                        </div>
                                    </div>
                                    <div className="text-sm dark:text-white space-y-2">
                                        <h4 className="text-sm font-bold">Top Up Diamond Mobile Legends Hanya Dalam
                                            Hitungan Detik!</h4>
                                        <ul className="list-decimal list-inside">
                                            <li>
                                                Cukup Masukan User ID dan Zone ID MLBB Anda.
                                            </li>
                                            <li>
                                                Pilih Jumlah Diamond Yang Anda inginkan.
                                            </li>
                                            <li>
                                                Pilih Pembayaran Yang Anda Gunakan Dan Selesaikan Pembayaran.
                                            </li>
                                            <li>
                                                Dan Diamond Akan Secara Langsung Ditambahkan Ke Akun Mobile Legends
                                                Anda.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-4 gap-6 flex flex-col max-md:col-span-6'>
                                <div
                                    className='bg-gray-200 shadow-md p-6 rounded-md dark:shadow dark:shadow-lime-400 dark:bg-gray-800'>
                                    <div className="flex mx-auto w-full border-b-2 border-lime-500 py-2 gap-4">
                                        <div
                                            className="rounded-full font-bold border-neutral-800 dark:border-white border-2 px-2 py-0.5 text-sm dark:text-white">1
                                        </div>
                                        <div className="dark:text-white font-bold text-center text-sm">Masukkan UserID
                                        </div>
                                    </div>
                                    <div className="text-xs text-start my-4 dark:text-white mx-auto">
                                        Silahkan Masukkan User ID & Server Anda Dan Pastikan Benar.
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {
                                            formInputs && formInputs.map((form) => {
                                                if (form.type === 'text') {
                                                    return (
                                                        <div key={form.id}>
                                                            <TextFieldUser form={form}
                                                                           handleChange={(e) => handleTextInputChange(e, form)}/>
                                                        </div>
                                                    )
                                                } else if (form.type === 'number') {
                                                    return (
                                                        <div key={form.id}>
                                                            <NumberFieldUser form={form}
                                                                             handleChange={(e) => handleNumberInputChange(e, form)}/>
                                                        </div>
                                                    )
                                                } else if (form.type === 'select') {
                                                    return (
                                                        <div key={form.id}>
                                                            <SelectFieldUser form={form}
                                                                             handleChange={(e) => handleSelectInputChange(e, form)}
                                                                             options={form.options}/>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div
                                    className='bg-gray-200 shadow-md rounded-md dark:shadow dark:shadow-lime-400 space-y-2 dark:bg-gray-800 p-4'>
                                    <div className="flex mx-auto w-full border-b-2 border-lime-500 py-2 gap-4">
                                        <div
                                            className="rounded-full font-bold border-neutral-800 dark:border-white border-2 px-1.5 text-sm dark:text-white">2
                                        </div>
                                        <div className="dark:text-white font-bold text-center text-sm">Pilih Nominal
                                        </div>
                                    </div>
                                    <div>
                                        <nav className="flex space-x-1" aria-label="Tabs" role="tablist">
                                            {brand.products && renderUniqueTypeButtons(brand.products)}
                                        </nav>

                                        <div className="mt-3 sm:grid-cols-3 gap-2 p-2">
                                            {brand.products && renderProductTabs(brand.products)}
                                        </div>
                                    </div>

                                </div>
                                <div
                                    className='bg-gray-200 shadow-md p-6 rounded-md dark:shadow dark:shadow-lime-400 dark:bg-gray-800'>
                                    <div className="flex mx-auto w-full border-b-2 border-lime-500 py-2 gap-4">
                                        <div
                                            className="rounded-full font-bold border-neutral-800 dark:border-white border-2 px-2 py-0.5 text-sm dark:text-white">3
                                        </div>
                                        <div className="dark:text-white font-bold text-center text-sm">Metode Pembayaran
                                        </div>

                                    </div>
                                    {/*<PaymentMethod paymentPrice={paymentPrice} groupedChannels={sortedGroupedChannels}/>*/}
                                    <div className='grid'>
                                        {Object.entries(sortedGroupedChannels).map(([group, channels]) => (
                                            <div className="flex flex-col mx-auto w-full py-2" key={group}>
                                                <div
                                                    className="w-full bg-lime-500 rounded-t-lg text-lg font-bold py-2 px-4 capitalize text-white">
                                                    {group}
                                                </div>
                                                <div className="w-full bg-lime-400 dark:bg-white rounded-b-lg">
                                                    <button
                                                        type="button"
                                                        className="payment-method-button flex items-center justify-end w-full p-5 font-medium hover:rounded-b-lg rtl:text-right focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-800 dark:border-gray-700 dark:text-gray-400 hover:bg-lime-100 dark:hover:bg-lime-500 gap-3"
                                                        onClick={() => handleToggle(group)}
                                                        aria-expanded={activeGroup === group}
                                                        disabled={selectedProduct === null}
                                                        aria-controls={`accordion-color-body-${group.replace(/\s+/g, '-').toLowerCase()}`}
                                                    >
                                                        {channels.map((channel) => (
                                                            <div className="w-[15%] h-full" key={channel.id}>
                                                                <img className="flex" src={channel.icon_url}
                                                                     alt={channel.name}/>
                                                            </div>
                                                        ))}
                                                        <svg
                                                            data-accordion-icon
                                                            className={`w-3 h-3 shrink-0 ${activeGroup === group ? 'rotate-180' : ''}`}
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 10 6"
                                                        >
                                                            <path stroke="gray" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="2"
                                                                  d="M9 5 5 1 1 5"/>
                                                        </svg>
                                                        <input className="hidden" id="payment_type"
                                                               value={group.replace(/\s+/g, '_').toLowerCase()}
                                                               readOnly/>
                                                    </button>
                                                    {activeGroup === group && (
                                                        <div
                                                            id={`accordion-color-body-${group.replace(/\s+/g, '-').toLowerCase()}`}
                                                            className="grid grid-cols-3 flex-wrap rounded-b-lg gap-4 max-lg:grid-cols-2 max-sm:grid-cols-2 p-5 border border-b-0 -mt-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                                                            aria-labelledby={`accordion-color-heading-${group.replace(/\s+/g, '-').toLowerCase()}`}
                                                        >
                                                            {channels.map((channel) => (
                                                                <div
                                                                    key={channel.id}
                                                                    className={`${selectedPayment === channel.id ? 'bg-white border-4 border-[#72057D]' : 'dark:bg-white bg-white'} rounded-xl col-span-1 hover:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-lime-500 duration-300 paymentButton`}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="payment-btn text-neutral-800 relative grid gap-2 p-4 hover:text-white border-2 rounded-xl w-full h-full"
                                                                        // data-fee-flat={channel.total_fee_flat}
                                                                        // data-fee-percent={channel.total_fee_percent}
                                                                        // data-payment-method-name={channel.name}
                                                                        // data-payment-method-type={channel.code}
                                                                        onClick={(e) => {
                                                                            e.preventDefault()
                                                                            setSelectedPayment(channel.id)
                                                                            setSelectedPaymentMethod(channel.name)
                                                                            setSelectedPaymentCode(channel.code)
                                                                            setFee(price(paymentPrice, channel.total_fee_flat, channel.total_fee_percent))
                                                                        }}
                                                                    >
                                                                        {/*<input className="hidden" id="payment-method-name" value={channel.name} readOnly />*/}
                                                                        {/*<input className="hidden" id="payment-method-code" value={channel.code} readOnly />*/}
                                                                        <div className="w-1/2">
                                                                            <img src={channel.icon_url}
                                                                                 alt={channel.name}/>
                                                                        </div>
                                                                        <div>
                                                                            <p id="product-price"
                                                                               className="paymentMethod text-start max-sm:text-xs">
                                                                                {formatRupiah(price(paymentPrice, channel.total_fee_flat, channel.total_fee_percent))}
                                                                            </p>
                                                                        </div>
                                                                        <div className="border-t-2">
                                                                            <h2 className="text-xs font-bold uppercase text-start">{channel.name}</h2>
                                                                        </div>
                                                                        {selectedPayment === channel.id ? <span
                                                                            className="absolute top-0 end-0 inline-flex items-center rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-[#72057D] text-white"><svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 24 24"
                                                                            fill="currentColor" className="size-6">
                                                                              <path fillRule="evenodd"
                                                                                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                                                                    clipRule="evenodd"/>
                                                                            </svg>
                                                                            </span> : ''}
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className='bg-gray-200 shadow-md p-6 space-y-4 rounded-md dark:shadow dark:shadow-lime-400 dark:bg-gray-800'>
                                    <div className="flex mx-auto w-full border-b-2 border-lime-500 py-2 gap-4">
                                        <div
                                            className="rounded-full font-bold border-neutral-800 dark:border-white border-2 px-2 py-0.5 text-sm dark:text-white">4
                                        </div>
                                        <div className="dark:text-white font-bold text-center text-sm">Konfirmasi
                                            Pesanan
                                        </div>
                                    </div>
                                    <div className='grid gap-4'>
                                        <div className='grid-cols-2 gap-4 max-sm flex-col-reverse'>
                                            <div className="max-w-sm">
                                            <label htmlFor="input-wa"
                                                   className="block text-sm font-medium mb-2 dark:text-white">Nomor
                                                Whatsapp</label>
                                            <input type="number" id="input-wa" onChange={handlePhone}
                                                   className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none peer py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                   placeholder="+628xxxxxxx" aria-describedby="hs-input-helper-text"/>
                                            <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500"
                                               id="hs-input-helper-text">Invoice akan kami kirimkan ke nomor
                                                whatsapp.</p>
                                        </div>
                                            <div className="max-w-sm">
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="with-corner-hint"
                                                       className="block text-sm font-medium mb-2 dark:text-white">Email</label>
                                                <span
                                                    className="block mb-2 text-sm text-gray-500 dark:text-neutral-500">Optional</span>
                                            </div>
                                            <input type="email" id="with-corner-hint" onChange={handleEmail}
                                                   className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                   placeholder="email@example.com"/>
                                        </div>
                                        </div>
                                        <button type="button" onClick={handleConfirm}
                                                data-hs-overlay={`#hs-vertically-centered-modal-order-confirmation`}
                                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-lime-600 text-white hover:bg-lime-700 disabled:opacity-50 disabled:pointer-events-none">
                                            Konfirmasi Pesanan
                                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <OrderConfirmationModal formInputs={formInputs} values={values}
                                                        product={selectedProductName}
                                                        price={paymentPrice} email={email}
                                                        paymentMethod={selectedPaymentMethod}
                                                        phoneNumber={phone} productCode={selectedProductCode}
                                                        paymentMethodCode={selectedPaymentCode}
                                                        priceWithFee={paymentPriceWithFee} brand={selectedProductBrand}
                                                        fee={fee} username={username}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
