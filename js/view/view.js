/*
 * Returns the document nodes (Stats, Item, Moves) that were added to the page
 */
function renderTooltip(roomId) {
    // Return null for rooms that are not battles
    if (!roomId.includes("room-battle-")) {
        return null;
    }

    let tab = document.getElementById(roomId);
    let nodes = createFourViews(roomId);

    // Create parent container div
    let div = document.createElement("div");
    for (let node of nodes) {
        div.appendChild(node);
    }

    // Set div attributes and append to battle tab
    div.setAttribute("style", "position: absolute; top: 550px; left: 10px");
    id = roomId + "-tooltip";
    div.setAttribute("id", id);
    tab.appendChild(div);

    return nodes;
}

function createFourViews(roomId){
    console.log("Creating tooltip for room: " + roomId);
    let nodes = []

    // Creating stats view 
    {
        let node = document.createElement("h3");
        node.setAttribute("id", roomId + "-stats");

        let textNode = document.createTextNode("Stats");
        node.appendChild(textNode);
        nodes.push(node);
    }

    // Creating moves view 
    {
        let node = document.createElement("h3");
        node.setAttribute("id", roomId + "-moves");

        let textNode = document.createTextNode("Moves");
        node.appendChild(textNode);
        nodes.push(node);
    }

    // Creating item view 
    {
        let node = document.createElement("h3");
        node.setAttribute("id", roomId + "-item");

        let textNode = document.createTextNode("Item");
        node.appendChild(textNode);
        nodes.push(node);
    }

    // Creating calc view 
    {
        let node = document.createElement("h3");
        node.setAttribute("id", roomId + "-calc");

        let textNode = document.createTextNode("Calc");
        node.appendChild(textNode);
        nodes.push(node);
    }

    return nodes;
}

/*
* @param {string} roomId        node id which identifies the div that the battle is contained in
* @return {string arr} team     name of pokemon in opponents team UNCLEANED
*/
function retrieveOpponentsTeam(roomId) {
    let tab = document.getElementById(roomId);
    let trainerNode = tab.querySelector("div.battle > div.innerbattle > div.rightbar > div.trainer");

    // Retrieve raw inputs from page
    let pokemonNames = [];
    for (let child of trainerNode.childNodes) {
        if (child.className === "teamicons") {
            let teamIconNode = child;
            
            for (let span of teamIconNode.childNodes) {
                let pokemonName = span.getAttribute("aria-label");
                pokemonNames.push(pokemonName);
            }
        }
    }

    return pokemonNames;
}

module.exports = {
    renderTooltip: renderTooltip,
    retrieveOpponentsTeam: retrieveOpponentsTeam
}