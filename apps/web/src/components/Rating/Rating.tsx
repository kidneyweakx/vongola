import { useState } from "react";
import { useParams } from "react-router-dom";
import { rateSomeone } from "../../services/api";
import { useAccount } from "wagmi";


type Question = {
    id: number;
    text: string;
    statement1: string;
    statement2: string;
    answer: true | false | null;
  };
  
  const questions: Question[] = [
    { id: 1, text: "Choose the statement you agree with for Mind", statement1: "Extraverted", statement2: "Introverted", answer: null },
    { id: 2, text: "Choose the statement you agree with for Energy", statement1: "Intuitive", statement2: "Observant", answer: null },
    { id: 3, text: "Choose the statement you agree with for Nature", statement1: "Thinking", statement2: "Feeling", answer: null },
    { id: 4, text: "Choose the statement you agree with for Tactics", statement1: "Judging", statement2: "Prospecting", answer: null },
    { id: 5, text: "Choose the statement you agree with for Identity", statement1: "Assertive", statement2: "Turbluent", answer: null },
  ];

function Rating() {

    const address = useAccount()
    const { userAddr } = useParams();
    console.log(userAddr)
    
    const [answers, setAnswers] = useState<Question[]>(questions);

    const handleChange = (id: number, value: true | false) => {
      setAnswers(prevAnswers =>
        prevAnswers.map(q => q.id === id ? { ...q, answer: value } : q)
      );
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
            
        event.preventDefault();
        console.log("Submitted Answers:", answers);
        const rating: number[] = answers.map(a => {
            return a.answer ? 1 : 0
        })

        if(address.isConnected) {
            const res = await rateSomeone(address.address as string, userAddr as string, rating)
            if(res) {
                alert("Good Good")
            } else {
                alert("Something went wrong!")
            }
        } else {
            alert("You have to connect your wallet!")
        }
    };

    return (
        <div className="text-black">
            <form onSubmit={handleSubmit}>
            {answers.map(question => (
                <div key={question.id} style={{ marginBottom: '1.5rem' }}>
                <label>{question.text}</label>
                <div style={{ marginTop: '0.5rem' }}>
                    <label>
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="Statement 1"
                        checked={question.answer === true}
                        onChange={() => handleChange(question.id, true)}
                    />
                    {question.statement1}
                    </label>
                    <label style={{ marginLeft: '1rem' }}>
                    <input
                        type="radio"
                        name={`question-${question.id}`}
                        value="Statement 2"
                        checked={question.answer === false}
                        onChange={() => handleChange(question.id, false)}
                    />
                    {question.statement2}
                    </label>
                </div>
                </div>
            ))}
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Rating