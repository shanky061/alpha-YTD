/*
 * File : background.js
 *
 * It will run once when the extension is installed/upgraded.
 */

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
			  // Show our extension's icon in locationbar
			  // if 'urlContains' pattern matches current URL
			  pageUrl: { urlContains: 'youtube.com/watch?v=' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
