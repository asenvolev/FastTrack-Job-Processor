
import { useRef, useState } from 'react'
import './App.css'
import JobBoard from './components/JobBoard'
import { sendHalucinatedJob, sendJob } from './api';

function App() {
  const [error,setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendPromptToBackend = async () => {
    const prompt = inputRef.current?.value;
    if(!prompt) {
      setError('send valid prompt please');
      return;
    }
    setError('');
    try {
      await sendJob(prompt)
    } catch (error) {
      setError((error as Error)?.message ?? String(error))
    }
  }

   const sendHalucinatedPrompt = async () => {
    const prompt = inputRef.current?.value;
    if(!prompt) {
      setError('send valid prompt please');
      return;
    }
    setError('');
    try {
      await sendHalucinatedJob(prompt)
    } catch (error) {
      setError(`handled hallucinated response: ${(error as Error)?.message ?? String(error)}`)
    }
  }

  return (
    <>
      <JobBoard/>
      <div className="card">
        {error && <div style={{color:'red'}}>{error}</div>}
        <input type='text' placeholder='enter your prompt here' ref={inputRef} />
        <button onClick={sendPromptToBackend}> send </button>
        <button onClick={sendHalucinatedPrompt}> send Hallucinated</button>
        
      </div>
      
    </>
  )
}

export default App
