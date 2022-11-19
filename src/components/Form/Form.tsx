import { useState } from 'react';
import './Form';

type Add = (object: { title: string, complete: boolean }) => void

export default function Form({ addTodo }: { addTodo: Add }) {

    const [title, setTitle] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        addTodo({
            title,
            complete: false
        })

        setTitle('')
        

    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input type="submit" value="Add todo" />
        </form>
    )
}