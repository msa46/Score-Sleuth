import React from "react"

type BlockProps = {
    value: string,
    state: string,
}

export const Block =  ({value, state, }: BlockProps) => {
    let bg = "bg-stone-500"
    if (state === "correct") {
        bg = "bg-green-500"
    } else if (state === "present") {
        bg = "bg-orange-500"
    } else if (state === "wrong"){
        bg = "bg-stone-600"
    }
    else {
        bg = "bg-stone-500"
    }
    return (
        <div className={`flex border-gray-400 border-l-2 border-b-2 rounded-sm items-center justify-center px-4 py-8 text-white ${bg} transition duration-300 ease-in-out`}>
            {value}
        </div>
    )
}