// node myFile.js   (Note, this is pseudocode)

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function  shouldContinue() {
    // Check one: Any pending setTimeout, setInterval, setImmediate? 
    // Check two: Any pending OS tasks?  (Like server listening to port)
    // Check three: Any pending long running operations? (Like fs module)
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Entire body executes in one 'tick'
while(shouldContinue()) {
    // Node looks at: 
    // 1) pendingTimers and sees if any functions are ready to be called 

    // 2) pendingOSTasks and pendingOperations and calls relevant callbacks 

    // 3) Pause execution. Continue when ...
        // - a new pendingOSTask is done 
        // - a new pendingOperation is done 
        // - a timer is about to complete 

    // 4) Look at pendingTimers. Call any setImmediate 
    
    // 5) Handle any 'close' events (clean up code)
}


// exit back to terminal 