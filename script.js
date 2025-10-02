// State management
let currentTab = 'home';
let currentLanguage = 'en';
let chatMessages = [];

// Chatbot responses database
const chatbotResponses = {
    difference: {
        en: "Great question!\n\nAadhaar-Linked Account: Your Aadhaar number is just registered with the bank, but not connected to the Direct Benefit Transfer system.\n\nDBT-Enabled Aadhaar-Seeded Account: Your Aadhaar is registered AND activated in the DBT system, allowing government scholarships to be directly transferred.\n\nKey Point: Just linking Aadhaar is not enough - you must SEED it for DBT to receive scholarships!",
        hi: "Aadhaar-Linked Account: Aapka aadhaar kewal bank mein registered hai, lekin DBT system se nahi juda hai.\n\nDBT-Enabled Account: Aapka aadhaar registered hai aur DBT system mein active hai."
    },
    check: {
        en: "To check if your account is DBT-enabled:\n\n1. Visit: https://npci.org.in/aadhaar-mapper\n2. Enter your Aadhaar number and bank details\n3. Check if status shows Seeded\n\nOR visit your bank branch and ask for DBT Aadhaar Seeding Status.\n\nIf seeded: You are ready!\nIf not: Visit your bank immediately.",
        hi: "Apne account ki DBT status check karne ke liye npci.org.in/aadhaar-mapper par jayein ya bank branch mein puchein."
    },
    seed: {
        en: "How to seed your Aadhaar:\n\nStep 1: Visit bank with Original Aadhaar card and Bank passbook\n\nStep 2: Tell officer: I want to SEED my Aadhaar for DBT\n\nStep 3: Bank verifies and submits to NPCI\n\nStep 4: Wait 2-3 days and verify status online\n\nImportant: This is FREE!",
        hi: "Apne aadhaar ko seed karne ke liye bank jayein, original aadhaar card aur passbook le jayein."
    },
    deadline: {
        en: "Scholarship Deadlines:\n\nPre-Matric (Class 1-10):\n- Application: August - October\n- Disbursement: December - January\n\nPost-Matric (Class 11+):\n- Application: September - November\n- Disbursement: January - February\n\nYour Aadhaar must be DBT-seeded BEFORE applying!",
        hi: "Pre-Matric: August-October apply karein\nPost-Matric: September-November apply karein"
    },
    documents: {
        en: "Required Documents:\n\nFor Aadhaar Seeding:\n- Original Aadhaar Card\n- Bank Passbook\n\nFor Scholarship:\n- Aadhaar Card\n- Caste Certificate\n- Income Certificate\n- Mark Sheet\n- School ID\n- Bank Details\n- Photos",
        hi: "Documents: Aadhaar card, Caste certificate, Income certificate, Mark sheet, School ID, Bank passbook"
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize chat with welcome message
    chatMessages = [{
        type: 'bot',
        text: 'Namaste! I am Scholarship Sahayak. I can help you understand DBT-enabled Aadhaar seeding for scholarships. How can I assist you today?'
    }];
    renderChatMessages();

    // Setup event listeners
    setupEventListeners();

    // Show home tab by default
    switchTab('home');
}

function setupEventListeners() {
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('open');
    });

    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
    });

    // Chat controls
    const chatBtn = document.getElementById('chatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');

    chatBtn.addEventListener('click', openChat);
    closeChatBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Quick action buttons in chat
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const query = this.getAttribute('data-query');
            document.getElementById('chatInput').value = query;
            sendMessage();
        });
    });
}

function switchTab(tabName) {
    currentTab = tabName;

    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    const activeTab = document.getElementById(tabName + 'Tab');
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Close mobile menu after selection
    const mainNav = document.getElementById('mainNav');
    mainNav.classList.remove('open');
}

function openChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatBtn = document.getElementById('chatBtn');
    chatWindow.classList.add('open');
    chatBtn.classList.add('hidden');
    
    // Scroll to bottom of chat
    setTimeout(() => {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

function closeChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatBtn = document.getElementById('chatBtn');
    chatWindow.classList.remove('open');
    chatBtn.classList.remove('hidden');
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message
    chatMessages.push({
        type: 'user',
        text: message
    });

    // Clear input
    chatInput.value = '';

    // Render messages
    renderChatMessages();

    // Process bot response after a short delay
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        chatMessages.push({
            type: 'bot',
            text: botResponse
        });
        renderChatMessages();
    }, 800);
}

function generateBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    if (msg.includes('difference') || msg.includes('what is') || msg.includes('explain')) {
        return chatbotResponses.difference[currentLanguage];
    } else if (msg.includes('check') || msg.includes('status') || msg.includes('verify')) {
        return chatbotResponses.check[currentLanguage];
    } else if (msg.includes('seed') || msg.includes('how') || msg.includes('process')) {
        return chatbotResponses.seed[currentLanguage];
    } else if (msg.includes('deadline') || msg.includes('date') || msg.includes('when')) {
        return chatbotResponses.deadline[currentLanguage];
    } else if (msg.includes('document') || msg.includes('papers') || msg.includes('required')) {
        return chatbotResponses.documents[currentLanguage];
    } else if (msg.includes('help')) {
        return currentLanguage === 'en' 
            ? "I can help you with:\n\n1. Difference between accounts\n2. Check DBT status\n3. Seed your Aadhaar\n4. Scholarship deadlines\n5. Required documents" 
            : "Main madad kar sakta hoon: accounts mein antar, status check, aadhaar seed karna, deadlines, documents";
    } else {
        return currentLanguage === 'en'
            ? "I can help you understand DBT-enabled Aadhaar seeding. Ask me about:\n- What is the difference?\n- How to check status?\n- How to seed Aadhaar?\n- Scholarship deadlines?\n- Required documents?"
            : "Main DBT aadhaar seeding mein madad kar sakta hoon. Poochein: antar, status, seed kaise karein, deadline, documents";
    }
}

function renderChatMessages() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    chatMessagesContainer.innerHTML = '';

    chatMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        messageDiv.textContent = msg.text;
        chatMessagesContainer.appendChild(messageDiv);
    });

    // Scroll to bottom
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// Export functions for inline use
window.switchTab = switchTab;
window.openChat = openChat;
window.closeChat = closeChat;
window.sendMessage = sendMessage;