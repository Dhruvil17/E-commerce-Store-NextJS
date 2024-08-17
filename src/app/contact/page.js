const Contact = () => {
    return (
        <div>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 md:mx-[10%] text-4xl tracking-tight font-bold text-center text-gray-900">
                    Contact Us
                </h2>
                <p className="md:mx-[10%] mt-10 lg:mb-16 font-light text-center sm:text-xl">
                    Have any questions for us ? Fill out the form and we'll
                    respond as soon as possible.
                </p>
                <form
                    action="https://formspree.io/f/xjkbogvn"
                    method="POST"
                    className="space-y-8">
                    <div className="md:mx-[10%]">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Full Name
                        </label>
                        <input
                            type="name"
                            name="Full Name:"
                            id="name"
                            className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="md:mx-[10%]">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Email ID
                        </label>
                        <input
                            type="email"
                            name="Email ID:"
                            id="email"
                            className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="md:mx-[10%]">
                        <label
                            htmlFor="subject"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Subject
                        </label>
                        <input
                            type="text"
                            name="Subject:"
                            id="subject"
                            className="block p-3 w-full text-sm text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            required
                        />
                    </div>
                    <div className="sm:col-span-2 md:mx-[10%]">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Your message
                        </label>
                        <textarea
                            id="message"
                            name="Message:"
                            rows={6}
                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            defaultValue={""}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 md:mx-[10%] font-medium rounded-lg text-sm px-5 py-3 focus:outline-none">
                        Send message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
