import React, { useEffect, useState } from 'react'
import { Block } from '@/components/ui/block'
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
  const [valuse, setValues] = useState({})

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
    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys = "abcdefghijklmnopqrstuvwxyz".split("")
      console.log(e.key);
      if (validKeys.includes(e.key)) {
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
          setBlocks((prevState) => {
            const newState = [...prevState]
            newState[attempt][index].value = ""
            return newState
          })
          if(index !== -1){
            setIndex(index - 1)
          }
      } 
      else if (e.key === "Enter") {
        if (index === solutionLength) {
          let answer = blocks[attempt].map((block) => block.value).join("")
          axios.post('/api/game', {answer})
        }

    }

    document.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [index]); 
  if (!solutionLength) return <p>Loading...</p>

  return (
  <div className='flex flex-col h-full bg-stone-800'>
    <div className="flex flex-col items-center mt-4 min-h-screen">
      {blocks && blocks.map((currentAttempt, i) => 
        (<div key={i} className="flex flex-row flex-wrap gap-2 justify-center">
        {currentAttempt.map((currentBlock) => (
        <Block key={i}  value={currentBlock.value} state={currentBlock.state} />))}
        </div>)
        )}
    </div>
  </div>
  )
}
