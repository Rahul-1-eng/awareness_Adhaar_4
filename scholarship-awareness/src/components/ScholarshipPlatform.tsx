import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Book, Users, Calendar, Award, CheckCircle, AlertCircle, MapPin, FileText, Bell, Menu, Home, HelpCircle, Lightbulb } from 'lucide-react';

export default function ScholarshipPlatform() {
  const [activeTab, setActiveTab] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Namaste! I am Scholarship Sahayak. I can help you understand DBT-enabled Aadhaar seeding for scholarships. How can I assist you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [language, setLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = { type: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let response = '';
      const msg = inputMessage.toLowerCase();
        const [language, setLanguage] = useState<'en' | 'hi'>('en');
      if (msg.includes('difference') || msg.includes('what is') || msg.includes('explain')) {
        response = chatbotResponses.difference[language];
      } else if (msg.includes('check') || msg.includes('status') || msg.includes('verify')) {
        response = chatbotResponses.check[language];
      } else if (msg.includes('seed') || msg.includes('how') || msg.includes('process')) {
        response = chatbotResponses.seed[language];
      } else if (msg.includes('deadline') || msg.includes('date') || msg.includes('when')) {
        response = chatbotResponses.deadline[language];
      } else if (msg.includes('document') || msg.includes('papers') || msg.includes('required')) {
        response = chatbotResponses.documents[language];
      } else if (msg.includes('help')) {
        response = language === 'en' 
          ? "I can help you with:\n\n1. Difference between accounts\n2. Check DBT status\n3. Seed your Aadhaar\n4. Scholarship deadlines\n5. Required documents" 
          : "Main madad kar sakta hoon: accounts mein antar, status check, aadhaar seed karna, deadlines, documents";
      } else {
        response = language === 'en'
          ? "I can help you understand DBT-enabled Aadhaar seeding. Ask me about:\n- What is the difference?\n- How to check status?\n- How to seed Aadhaar?\n- Scholarship deadlines?\n- Required documents?"
          : "Main DBT aadhaar seeding mein madad kar sakta hoon. Poochein: antar, status, seed kaise karein, deadline, documents";
      }

      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 800);

    setInputMessage('');
  };
type Tab = {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type TabButtonProps = {
  tab: Tab;
};
  const TabButton: React.FC<TabButtonProps> = ({ tab }) => (
    <button
      onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition w-full md:w-auto ${
        activeTab === tab.id 
          ? 'bg-indigo-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <tab.icon className="w-4 h-4" />
      <span>{tab.label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">DBT Scholarship Portal</h1>
                <p className="text-xs text-gray-600">SC Student Awareness Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
              <button 
                className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex gap-2 mt-4`}>
            <TabButton tab={{ id: 'home', icon: Home, label: 'Home' }} />
            <TabButton tab={{ id: 'learn', icon: Book, label: 'Learn' }} />
            <TabButton tab={{ id: 'scholarship', icon: Award, label: 'Scholarships' }} />
            <TabButton tab={{ id: 'community', icon: Users, label: 'Community' }} />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Do not Miss Your Scholarship!</h2>
              <p className="text-lg mb-6">Ensure your Aadhaar is DBT-enabled to receive scholarships directly.</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveTab('learn')}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Start Learning
                </button>
                <button 
                  onClick={() => setChatOpen(true)}
                  className="bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-900 transition"
                >
                  Talk to Sahayak AI
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">DBT-Enabled</h3>
                </div>
                <p className="text-gray-600 text-sm">Direct scholarship transfer to your account</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Aadhaar-Linked</h3>
                </div>
                <p className="text-gray-600 text-sm">Not enough! Must be seeded for DBT</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Need Help?</h3>
                </div>
                <p className="text-gray-600 text-sm">Our AI assistant is here 24/7</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-indigo-600" />
                Quick Actions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium">Check DBT Status</span>
                </button>
                <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium">Find Nearest Bank</span>
                </button>
                <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium">Document Checklist</span>
                </button>
                <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium">Scholarship Deadlines</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Educational Learning Hub</h2>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Understanding DBT-Enabled Accounts</h3>
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg aspect-video flex items-center justify-center mb-4">
                <div className="text-center">
                  <Award className="w-16 h-16 text-indigo-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-semibold">Video Tutorial Coming Soon</p>
                </div>
              </div>
              <p className="text-gray-700">Learn the step-by-step process of seeding your Aadhaar with your bank account for Direct Benefit Transfer.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Key Differences</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-5">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Aadhaar-Linked Account
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Aadhaar registered with bank</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>NOT connected to DBT system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Cannot receive scholarships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Requires additional seeding</span>
                    </li>
                  </ul>
                </div>
                <div className="border-2 border-green-300 bg-green-50 rounded-lg p-5">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    DBT-Enabled Seeded Account
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Aadhaar registered with bank</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Connected to DBT system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Can receive scholarships directly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Ready for government benefits</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">How to Seed Your Aadhaar</h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Gather Documents', desc: 'Original Aadhaar card and bank passbook' },
                  { step: 2, title: 'Visit Bank Branch', desc: 'Go to your account holding bank branch' },
                  { step: 3, title: 'Request Seeding', desc: 'Ask for DBT Aadhaar Seeding Service' },
                  { step: 4, title: 'Verification', desc: 'Bank verifies and submits to NPCI' },
                  { step: 5, title: 'Confirm Status', desc: 'Check online after 2-3 days' }
                ].map(item => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scholarship' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Scholarship Information</h2>

            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
              <div className="flex gap-3">
                <Bell className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-800 mb-2">Important Notice</h3>
                  <p className="text-red-700">Your Aadhaar must be DBT-enabled BEFORE the scholarship application deadline.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-indigo-600">Pre-Matric Scholarship</h3>
                <p className="text-gray-700 mb-4">For SC students in Class 1 to 10</p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span><strong>Application:</strong> Aug - Oct</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span><strong>Documents:</strong> Aadhaar, Caste, Income</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4 flex-shrink-0" />
                    <span><strong>Amount:</strong> Rs 3,000 - Rs 10,000/year</span>
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-600">Post-Matric Scholarship</h3>
                <p className="text-gray-700 mb-4">For SC students in Class 11+</p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span><strong>Application:</strong> Sep - Nov</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span><strong>Documents:</strong> Aadhaar, Caste, Marks</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Award className="w-4 h-4 flex-shrink-0" />
                    <span><strong>Amount:</strong> Rs 10,000 - Rs 50,000/year</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Application Checklist</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Aadhaar Card',
                  'SC Caste Certificate',
                  'Income Certificate',
                  'Mark Sheet',
                  'School ID Card',
                  'Bank Passbook',
                  'Photographs',
                  'DBT Confirmation'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Community Zone</h2>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Success Stories</h3>
              <div className="space-y-4">
                {[
                  { name: 'Priya S.', msg: 'I received my scholarship on time after seeding my Aadhaar. Thank you!' },
                  { name: 'Rajesh K.', msg: 'The chatbot helped me understand the process. Very helpful!' },
                  { name: 'Anita M.', msg: 'This platform made everything clear. My daughter gets scholarship regularly now.' }
                ].map((story, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-600 bg-indigo-50 p-4 rounded">
                    <p className="text-gray-700 mb-2 italic">{story.msg}</p>
                    <p className="text-sm text-gray-600 font-semibold">- {story.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Discussion Forum</h3>
              <div className="space-y-3">
                {[
                  'How long does Aadhaar seeding take?',
                  'Can I seed Aadhaar online?',
                  'What if my bank is far from home?'
                ].map((question, idx) => (
                  <div key={idx} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <p className="text-gray-800 font-medium">{question}</p>
                    <p className="text-sm text-gray-500 mt-1">12 responses</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 transition z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col h-[600px] max-h-[calc(100vh-3rem)]">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-bold">Scholarship Sahayak</h3>
            </div>
            <button onClick={() => setChatOpen(false)} className="hover:bg-white hover:bg-opacity-20 rounded p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2 mb-2 flex-wrap">
              {[
                { label: 'Difference?', query: 'difference' },
                { label: 'Check Status', query: 'check' },
                { label: 'How to Seed?', query: 'seed' },
                { label: 'Documents', query: 'documents' }
              ].map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputMessage(action.query);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200"
                >
                  {action.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}