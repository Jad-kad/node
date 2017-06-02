let fs = require('fs'),
    options = process.argv.slice(2),
    command = options[0];


if (options.length === 0) {

    console.log('please enter a valid command ');
    help();

} else {

    switch (command) {
        case 'help':
            help();
            break;
        case 'list':
            showList();
            break;
        case 'add':
            addItem();
            break;
        case 'remove':
            removeTask();
            break;
        case 'reset':
            reset();
            break;
        default:
            help();
    }
}


// the help list
function help() {

    let helpList =
        `This is the help page for CLI ToDo app

Instructions:

To display this set of instructions:
node index.js help


To add an item to your todo's:
e.g.
node index.js add I need to brush my teeth


To list all your todo's
e.g.
node index.js list


To remove an item from your todo's 
First list, and find the location (index, 0 based) of your todo
To remove all items from your todo list
node index.js reset

e.g.
node index.js remove 0
`;
    return console.log(helpList);
}



// function show list 
function showList() {

    fs.readFile('index.txt', 'utf-8', function (error, data) {

        if (error == null) {

            if (data === "" || null) {

                console.log('You have no tasks to do!!');
            } else {

                let items = data.split(/\n/);

                for (var i = 0; i < items.length - 1; i++) {

                    console.log((i + 1) + `-${items[i]}`);
                }
            }
        } else {

            switch (error.code) {
                case 'ENOENT':
                    console.error(`Error file not found`)
                    break;
                case 'EACCES':
                    console.log(`Permission denied`);
                    break;
                default:
                    console.error('Unknown error encountered');
                    throw (error);
            }
        }
    })
};



// the add function 

function newData() {
    let toDosItem = options.slice(1).join(' ').trim();
    return toDosItem + '\n';
}

function addItem() {
    let toDosItem = options.slice(1).join(' ').trim();


    fs.appendFile('index.txt', toDosItem + '\n', function (error) {
        if (error) {
            console.log(error);
            return;
        }
    });
}


// remove function 


function removeTask() {

    fs.readFile('index.txt', 'utf-8', function (error, data) {

        if (error) {

            console.log(error);
        }
        let n = parseInt(options[1]);

        let commandArray = data.split('\n');

        commandArray.splice(n - 1, 1);

        if (n < commandArray.length +1 ) {

            let listAfterRemove = commandArray.join('\n');

            fs.writeFile('index.txt', listAfterRemove);

        } else {

            console.error('please enter the number of an exsisting task in the list to remove');

        }
    });
}



// reset function 

function reset() {

    fs.truncate('index.txt', 0, function () {
        console.log('the to do list has been reset');
    });
};
