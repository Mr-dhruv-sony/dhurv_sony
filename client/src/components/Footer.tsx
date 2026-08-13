export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0e27] border-t border-[#1f2937] py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2.5 mb-4 md:mb-0">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #00d9ff, #7c3aed)' }}
            >
              DS
            </div>
            <span className="text-[#00d9ff] font-bold">Dhruv Sony</span>
          </div>

          {/* Center Section */}
          <p className="text-[#6b7280] text-sm text-center mb-4 md:mb-0">
            Crafted with <span className="text-[#00d9ff]">intelligence</span> &{' '}
            <span className="text-[#7c3aed]">innovation</span>
          </p>

          {/* Right Section */}
          <p className="text-[#6b7280] text-sm">
            &copy; {currentYear} Dhruv Kumar Soni. All rights reserved.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1f2937] mt-6 pt-6 text-center">
          <p className="text-[#6b7280] text-xs">
            Built with React 19, Tailwind CSS, and Gemini AI.
          </p>
        </div>
      </div>
    </footer>
  );
}


