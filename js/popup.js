document.addEventListener('DOMContentLoaded', init)

function init() {
    // Initialize radio button functionality
    radioButtons = document.querySelectorAll("input[name = 'battletype']")
    radioButtons.forEach(function(item, index) {
        item.addEventListener('change', function() {
            chrome.storage.local.set({"battletype": item.value});
            console.log("Setting battle type to: " + item.value);
        })
    })
}