import { useState } from "react"

export function AddToCart() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>Result: {count}</h1>
            {/* button add and remove */}
            <button className="border p-4 rounded bg-blue-500"
                onClick={() => setCount(count + 1)}
            >Add</button>

            <button className="border p-4 rounded bg-red-500"
                onClick={() => setCount(count <= 0 ? 0 : count - 1)}
            >Remove</button>
        </div>
    )
}