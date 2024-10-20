const stack = 30000;
var memory = Array( stack ).fill(0);
var pointer = 0,
    tcommand = 0;
var tpointer = null;
var message = "";

const valid_instructions = [
    "+",
    "-",
    ",",
    ".",
    ">",
    "<",
    "[",
    "]"
];

const add = () => {
    switch( memory[pointer] )
    {
        case 255:
            memory[pointer] = 0;
            break;
        default:
            memory[pointer]++;
    }
};

const dec = () => {
    switch( memory[pointer] )
    {
        case 0:
            memory[pointer] = 255;
            break;
        default:
            memory[pointer]--;
    }
}

const nxt = () => {
    switch( pointer )
    {
        case stack - 1:
            pointer = 0;
            break;
        default:
            pointer++;
    }
}

const bck = () => {
    switch( pointer )
    {
        case 0:
            pointer = stack - 1;
            break;
        default:
            pointer--;
    }
}

const input = () => {
    const inp = prompt("Brainfuck program is asking for a character input.");
    memory[ pointer ] = inp.charCodeAt(0);
};

const output = () => message += String.fromCharCode( memory[pointer] );

const init_values = ( limit ) => {
    memory = Array( limit ).fill(0);
    pointer = 0,
    tcommand = 0;
    tpointer = null;
    message = "";
}

export const compile = ( program , limit ) => {

    init_values( limit );

    for (let i = 0; i < program.length; i++) {

        if (!valid_instructions.includes(program[i])) continue;

        switch (program[i]) {
            case "+":
                add();
                break;
            case "-":
                dec();
                break;
            case ",":
                input();
                break;
            case ".":
                output();
                break;
            case ">":
                nxt();
                break;
            case "<":
                bck();
                break;
            case "[":
                tpointer = pointer;
                tcommand = i;
                break;
            case "]":
                if (memory[tpointer] == 0) {
                    tpointer = null;
                    tcommand = i;
                } else {
                    i = tcommand;
                }
                break;
        }
    }

    return message;
};

export const get_memory = () => alert( JSON.stringify( memory ) );

// module.exports = {
//     read: ( program ) => compile( program ),
//     get_memory: () => console.log(memory)
// };