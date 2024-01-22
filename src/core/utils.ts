export const solver = (answer:string, solution:string) => {
  if (answer.length !== solution.length) {
    return false
  }
  let comparison = []
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === solution[i]) {
      comparison.push("correct")
    }
    else if (solution.includes(answer[i])) {
      comparison.push("present")
    }
    else {
      comparison.push("absent")
    }
  }
  return comparison

}