const Shimmer = () => {
    const numOfCards = 20;

    const shimmerCards = Array.from({ length: numOfCards }, (v, i) => (
        <div
            key={i}
            className="h-[28rem] w-[17rem] bg-gray-300 mx-6 my-4 p-4 border border-double rounded-xl cursor-pointer"></div>
    ));

    return (
        <div className="flex flex-col items-center justify-center py-[4%] px-[4%] xl:px-[8%]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-2">
                {shimmerCards}
            </div>
        </div>
    );
};

export default Shimmer;
