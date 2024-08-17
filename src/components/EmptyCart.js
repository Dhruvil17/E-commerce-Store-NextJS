import { useRouter } from "next/navigation";

const EmptyCart = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    };

    return (
        <div className="text-center">
            <img
                className="m-auto w-[20rem] pt-24 pb-10"
                src="https://blogzine.webestica.com/assets/images/icon/empty-cart.svg"
                alt="Empty-Cart"
            />
            <h1 className="font-bold text-2xl m-2 p-2">
                Your cart is currently empty!
            </h1>
            <p className="pb-8">Add items to it now.</p>
            <button
                type="button"
                onClick={handleClick}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                Shop now
            </button>
        </div>
    );
};

export default EmptyCart;
