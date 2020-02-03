/*
----------------------------CREATE LISTENER FOR NEW TABS-------------------------------
*/

// Observe 'body' element for mutations
const targetNode = document.querySelector("body");

// Only need to observe actions on children
const config = {childList: true};

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {

        // Only trigger when a room is added
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            let roomId = mutation.addedNodes[0].id;
            renderTool(roomId);
        }
    }
};
const observer = new MutationObserver(callback);

// Listen for the creation of new child nodes (essentially new tabs)
document.addEventListener('DOMContentLoaded', observer.observe(targetNode, config))


/*
---------------------------------- HELPER FUNCTIONS ----------------------------------
*/
function createTool(roomId){
    console.log("Creating tooltip for romm: " + roomId);
    let nodes = []

    // Creating stats tooltip
    {
        let node = document.createElement("h3");
        node.setAttribute("id", roomId + "-stats");

        node.addEventListener("mouseover", function(event) {
            displayStats(roomId);
        }, true);
        node.addEventListener("mouseout", function(event) {
            removeStats(roomId);
        }, true);

        let textNode = document.createTextNode("Stats");
        node.appendChild(textNode);
        nodes.push(node);
    }

    // Creating moves tooltip
    {
        let node = document.createElement("h3");
        node.setAttribute("id", roomId + "-moves");

        let textNode = document.createTextNode("Moves");
        node.appendChild(textNode);
        nodes.push(node);
    }

    // Creating item tooltip
    {
        let node = document.createElement("h3");
        node.setAttribute("id", roomId + "-item");

        let textNode = document.createTextNode("Item");
        node.appendChild(textNode);
        nodes.push(node);
    }

    // Creating calc tooltip
    {
        let node = document.createElement("h3");
        node.setAttribute("id", roomId + "-calc");

        let textNode = document.createTextNode("Calc");
        node.appendChild(textNode);
        nodes.push(node);
    }

    // Create parent container div
    let div = document.createElement("div");
    for (let node of nodes) {
        div.appendChild(node);
    }

    // Set div attributes
    div.setAttribute("style", "position: absolute; top: 550px; left: 10px");
    id = roomId + "-tooltip";
    div.setAttribute("id", id);
    
    return div;
}


function renderTool(roomId) {
    // Only run for rooms that are battles
    if (!roomId.includes("room-battle-")) {
        return;
    }

    let tab = document.getElementById(roomId);
    var toolToAppend = createTool(roomId);
    tab.appendChild(toolToAppend);
}

/*
----------------------------------FOUR MAJOR FUNCTIONS----------------------------------------
*/

function displayStats(roomId) {
    console.log("Stats" + roomId);
}

function removeStats(roomId) {
    console.log("Remove Stats" + roomId);
}