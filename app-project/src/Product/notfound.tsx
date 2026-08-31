import { useState } from "react";

export default function ProductForm() {
    const [size, setSize] = useState("");

    const sizes = ["xs", "s", "m", "l", "xl"];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!size) {
            alert("Please select a size");
            return;
        }

        console.log("Selected size:", size);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-4">
                    {sizes.map((item) => (
                        <label
                            key={item}
                            className="text-center"
                        >
                            <input
                                type="radio"
                                name="size"
                                value={item}
                                checked={size === item}
                                onChange={(e) => setSize(e.target.value)}
                                className="flex items-center justify-center w-6 h-6 accent-violet-600"
                            />

                            {item.toUpperCase()}
                        </label>
                    ))}
                </div>

                <a
                    href="#"
                    className="hidden ml-auto text-sm text-gray-500 underline md:block"
                >
                    Size Guide
                </a>

                <div className="flex mb-4 text-sm font-medium">
                    <button
                        type="submit"
                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
                    >
                        Buy now
                    </button>
                </div>

                <p className="text-sm text-gray-500">
                    Free shipping on all continental US orders.
                </p>
            </form>
        </div>
    );
}