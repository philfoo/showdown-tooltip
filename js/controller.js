const stats = require("./model/stats.js");
const moves = require("./model/moves.js");

const view = require("./view/view.js");

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
            initializeTooltip(roomId);
        }
    }
};
const observer = new MutationObserver(callback);

// Listen for the creation of new child nodes (essentially new tabs)
document.addEventListener('DOMContentLoaded', observer.observe(targetNode, config))


function initializeTooltip(roomId) {
    nodes = view.renderTooltip(roomId);

    // Don't do anything if nodes list is null
    if (nodes === null) {
        console.log("Not a battle, not rendering tooltip");
        return;
    }

    // Stats
    nodes[0].addEventListener("mouseover", function(event) {
        getAndDisplayStats(roomId);
    }, true);
    nodes[0].addEventListener("mouseout", function(event) {
        removeStats(roomId);
    }, true);

    // Moves 
    nodes[1].addEventListener("mouseover", function(event) {
        getAndDisplayMoves(roomId);
    }, true);
    nodes[1].addEventListener("mouseout", function(event) {
        removeMoves(roomId);
    }, true);

    // TOOD: Insert functionality for other categories here
}

/*
---------------------------------- HELPER FUNCTIONS ----------------------------------
*/

function getAndDisplayStats(roomId) {
    stats.displayStats(roomId);
}

function removeStats(roomId) {
    stats.removeStats(roomId);
}

function getAndDisplayMoves(roomId) {
    oppPokemon = view.retrieveOpponentsTeam(roomId);
    pokemonMoves = moves.getPokemonMoves(oppPokemon);

    console.log(pokemonMoves);
}

function removeMoves(roomId) {
}