import React from "react"

type BlockProps = {
    value: string,
    state: string,
    delay: number,
}

export const Block =  ({value, state, delay }: BlockProps) => {
    const delays = ["delay-50", "delay-100", "delay-150", "delay-200", "delay-250"]
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
        <div className={`flex border-gray-400 border-l-2 border-b-2 rounded-sm items-center justify-center w-16 h-32 text-white ${bg} ${delays[delay]} transition duration-300 ease-in-out`}>
            {value}
        </div>
    )
}