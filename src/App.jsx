import { useRef } from "react";
import { compile } from "./compiler";

export default function App()
{
    const brainfuck_ref = useRef();
    const plaintext_ref = useRef();
    const memorylimit_ref = useRef();

    const handleRun = () => {

        const program = brainfuck_ref.current.value.trim();
        var memory_limit = memorylimit_ref.current.value.trim();

        if( memory_limit.length == 0 || isNaN( memory_limit ) ) 
            memory_limit = 30000;

        const output = compile( program , memory_limit );
        plaintext_ref.current.value = "";
        plaintext_ref.current.value = output;
    }

    const handleClear = () => {
        brainfuck_ref.current.value = "";
        plaintext_ref.current.value = "";
    }

    return (
        <main>
            <h1>Welcome to BrainfuckJS</h1>

            <section id="welcome">
                <p>A <a  target="_blank" href="https://es.wikipedia.org/wiki/Brainfuck">Brainfuck</a> interpreter</p>
            </section>

            <hr />

            <section id="interpreter">

                <div className="inputs">

                    <div className="brainfuck">
                        <p>Brainfuck Code</p>
                        <textarea ref={ brainfuck_ref } type="text" id="brainfuck" />
                    </div>

                    <div className="plaintext">
                        <p>Plain text output</p>
                        <textarea ref={ plaintext_ref } type="text" id="plaintext" />
                    </div>

                </div>

                <div className="actions">

                    <div className="memorylimit">
                        <span>Memory limit</span>
                        <input ref={ memorylimit_ref } type="text" defaultValue={30000} id="memory" />
                    </div>

                    <div className="buttons">
                        <button onClick={ handleRun } className="button" id="run">Run</button>
                        <button onClick={ handleClear } className="button" id="clear">Clear</button>
                    </div>

                </div>

            </section>

            <footer>
                <p>Check project on <a target="_blank" href="https://github.com/SaidSuyv/brainfuck-js">https://github.com/SaidSuyv/brainfuck-js</a></p>
            </footer>

        </main>
    );
}