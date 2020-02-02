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
            let divId = mutation.addedNodes[0].id;
            appendToolToBattleHTML(divId);
        }
    }
};
const observer = new MutationObserver(callback);

// Listen for the creation of new child nodes (essentially new tabs)
document.addEventListener('DOMContentLoaded', observer.observe(targetNode, config))


/*
---------------------------------- HELPER FUNCTIONS ----------------------------------
*/
function createHTMLTool(){
    let categories = ["Stats", "Moves", "Item", "Calc"];

    let h2Nodes = [];
    for (let category of categories) {
        let h2Node = document.createElement("H3");
        let textNode = document.createTextNode(category);
        h2Node.appendChild(textNode);
        h2Nodes.push(h2Node);
    }

    let div = document.createElement("div");
    for (let node of h2Nodes) {
        div.appendChild(node);
    }

    div.setAttribute("style", "position: absolute; top: 500px; left: 10px");
    return div;
}


function appendToolToBattleHTML(divId) {
    // Only run for rooms that are battles
    if (!divId.includes("room-battle-")) {
        return;
    }

    let tab = document.getElementById(divId);
    var toolToAppend = createHTMLTool();
    tab.appendChild(toolToAppend);
}