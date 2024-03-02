import React, { useEffect, useState } from 'react'
import { Block } from '@/components/ui/block'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

import axios from 'axios'
type block = {
   state: string,
   value: string
}

export default function Home() {
  const [solutionLength, setSolutionLength] = useState(0)
  const [index, setIndex] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [blocks, setBlocks] = useState<block[][]>([])
  const [victory, setVictory] = useState(false)
  const { toast } = useToast()


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/game')
      const { message } = await res.json()
      const tempStates= []
      for(let i = 0; i < message.length; i++) {
        tempStates.push({state: "empty", value: ""})
      }
      setSolutionLength(message.length)
      setBlocks([tempStates])
    }
    fetchData()
  }, [])

    useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      const validKeys = "abcdefghijklmnopqrstuvwxyz".split("")
      console.log(e.key);
      if (validKeys.includes(e.key) && !victory) {
        if (index !== solutionLength){
          setBlocks((prevState) => {
            const newState = [...prevState]
            newState[attempt][index].value = e.key
            return newState
          })
          setIndex(index + 1)
        }
      }
      else if (e.key === "Backspace") {
          if(index !== -1){
            setBlocks((prevState) => {
            const newState = [...prevState]
            newState[attempt][index].value = ""
            return newState
            })
            setIndex(index => index - 1)
            if(index === -1){
              setIndex(index => index + 1)
            }
          }
      } 
      else if (e.key === "Enter") {
        if (index === solutionLength) {
          const answer = blocks[attempt].map((block) => block.value).join("")
          const response = await axios.post('/api/game', {answer})
          setBlocks(prevBlocks => {
            const newBlocks = [...prevBlocks]
            for(let tempIndex = 0; tempIndex < response.data.message.length; tempIndex ++){
              newBlocks[attempt][tempIndex].state = response.data.message[tempIndex]
            }
            newBlocks.push([])
            for(let i = 0; i < response.data.message.length; i++) {
            newBlocks[attempt + 1].push({state: "empty", value: ""})
            }
            return newBlocks
          })
          setAttempt(attempt + 1)
          setIndex(0)
          if (response.data.message.every((block: string) => block === "correct")) {
            toast({
                title: "Victory!",
                description: "You have guessed the solution!",
            })
            console.log("in toast")
          }
          console.log(response.data)
        }

    }
  }

    document.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [index, blocks, attempt]); 
  if (!solutionLength) return <p>Loading...</p>

  return (
  <div className='flex flex-col h-full bg-stone-800'>
    <div className="flex flex-col items-center mt-4 min-h-screen">
      <Toaster />
      {blocks && blocks.map((currentAttempt, i) => 
        (<div key={i} className="flex flex-row flex-wrap gap-4 mt-2 justify-enter">
        {currentAttempt.map((currentBlock) => (
        <Block key={i}  value={currentBlock.value} state={currentBlock.state} delay={i} />))}
        </div>)
        )}
    </div>
  </div>
  )
}
