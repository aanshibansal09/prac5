function transformTextNodes(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent;
    const correctedText = text.replace(/\b(there|their|they're)\b/gi, (match) => {
      switch (match.toLowerCase()) {
        case 'there': return 'their';
        case 'their': return 'there';
        case 'they\'re': return 'there';
      }
    });

    if (text !== correctedText) {
      node.textContent = correctedText;
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    node.childNodes.forEach(transformTextNodes);
  }
}

// Observe changes in the DOM and apply the transformation
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach(transformTextNodes);
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

console.log('Evil extension loaded!'); 