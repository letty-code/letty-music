
function getDocStats(fileContent) {
  const docLength = document.getElementById("docLength");
  const wordCount = document.getElementById("wordCount");
  const charCount = document.getElementById("charCount");

  const text = fileContent.toLowerCase().replace(/<br\s*\/?>/gi, " ");
  const wordArray = text.match(/\b\S+\b/g) || [];
  const wordDictionary = {};

  const uncommonWords = filterStopWords(wordArray);

  for (const word of uncommonWords) {
    wordDictionary[word] = (wordDictionary[word] || 0) + 1;
  }

  const wordList = sortProperties(wordDictionary);
  const top5Words = wordList.slice(0, 5);
  const least5Words = wordList.slice(-5);

  ULTemplate(top5Words, document.getElementById("mostUsed"));
  ULTemplate(least5Words, document.getElementById("leastUsed"));

  docLength.innerText = "Document Length: " + text.length;
  wordCount.innerText = "Word Count: " + wordArray.length;
  charCount.innerText = "Character Count: " + text.replace(/<br>/g, '').length;
}

function ULTemplate(items, element) {
  const rowTemplate = document.getElementById("template-ul-items");
  const templateHTML = rowTemplate.innerHTML;
  let resultsHTML = "";

  for (let i = 0; i < items.length; i++) {
    resultsHTML += templateHTML.replace("{{val}}", `${items[i][0]} : ${items[i][1]} time(s)`);
  }

  element.innerHTML = resultsHTML;
}

function sortProperties(obj) {
  const rtnArray = Object.entries(obj);
  rtnArray.sort((a, b) => b[1] - a[1]);
  return rtnArray;
}

function filterStopWords(wordArray) {
  const commonWords = getStopWords();
  const commonSet = new Set(commonWords);
  return wordArray.filter(word => !commonSet.has(word.trim().toLowerCase()));
}

function getStopWords() {
  return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"];
}

function performMark() {
  const keyword = document.getElementById("keyword").value.trim();
  const display = document.getElementById("fileContent");

  if (!keyword) return;

  document.querySelectorAll('mark').forEach(span => {
    span.outerHTML = span.innerHTML;
  });

  const re = new RegExp(keyword, "gi");
  const replaceText = "<mark id='markme'>$&</mark>";
  const bookContent = display.innerHTML;
  const newContent = bookContent.replace(re, replaceText);

  display.innerHTML = newContent;

  const count = document.querySelectorAll('mark').length;
  document.getElementById("searchstat").innerText = `found ${count} matches`;

  if (count > 0) {
    document.getElementById("markme").scrollIntoView();
  }
}
