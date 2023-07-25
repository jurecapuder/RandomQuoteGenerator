// Function to fetch a random quote from the API
async function getRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return {
            text: data.content,
            author: data.author,
        };
    } catch (error) {
        console.error('Error fetching the quote:', error.message);
        return null;
    }
}

// Function to display the quote on the page
async function displayQuote() {
    const quoteContainer = document.getElementById('quoteContainer');
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    
    // Disable the "New Quote" button while fetching a quote
    newQuoteBtn.disabled = true;

    const quote = await getRandomQuote();
    if (quote) {
        quoteText.textContent = `"   ${quote.text}   "`;
        quoteAuthor.textContent = `- ${quote.author}`;
    } else {
        // Display a message if there was an error fetching the quote
        quoteText.textContent = 'Failed to fetch a quote. Please try again later.';
        quoteAuthor.textContent = '';
    }

    // Re-enable the "New Quote" button after displaying the quote
    newQuoteBtn.disabled = false;
}

// Add event listener to the "New Quote" button
document.getElementById('newQuoteBtn').addEventListener('click', displayQuote);

// Display a random quote when the page loads
displayQuote();
