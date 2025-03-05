export default function TermsAndConditions() {
    return (
      <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        
        <p className="mb-4">
          Welcome to our platform. By using our services, you agree to comply with and be bound by the following terms and conditions.
        </p>
        
        <h2 className="text-xl font-semibold mt-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing or using our services, you acknowledge that you have read, understood, and agree to these terms.</p>
        
        <h2 className="text-xl font-semibold mt-4">2. User Responsibilities</h2>
        <p className="mb-4">You agree not to misuse our services and to comply with all applicable laws and regulations.</p>
        
        <h2 className="text-xl font-semibold mt-4">3. Privacy Policy</h2>
        <p className="mb-4">Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your data.</p>
        
        <h2 className="text-xl font-semibold mt-4">4. Limitations of Liability</h2>
        <p className="mb-4">We are not responsible for any damages or losses resulting from the use of our services.</p>
        
        <h2 className="text-xl font-semibold mt-4">5. Changes to Terms</h2>
        <p className="mb-4">We reserve the right to modify these terms at any time. Your continued use of the services constitutes acceptance of the changes.</p>
        
        <h2 className="text-xl font-semibold mt-4">6. Contact Information</h2>
        <p>If you have any questions about these terms, please <a href="/contact" className="text-blue-500 underline">contact Us</a> or send a mail <a href="mailto:support@example.com" className="text-blue-500 underline">support@example.com</a>.</p>
        
        <div className="mt-6">
          <a href="/player/:id" className="text-blue-500 underline">Back to File Upload</a>
        </div>
      </div>
    );
  }
  