import { useEffect, useState } from 'react';

function Home(){
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count+1);
    }

    // no array added means it will trigger every render
    // if empty array added it will trigger only once on first render: []
    // if we want it to trigger only when specific variable change then it should be added inside the array: [count]
    useEffect(() => {
        console.log('Triggered');
    }, [count]);

    return(
        <div>
            <h1>Home</h1>
            <p>
                {count}
            </p>
            <button onClick={incrementCount}>
                Click
            </button>
        </div>
    )
}

export default Home;