export function Footer() {
  const links = {
    Product: ['Vision Agent', 'Planning Agent', 'Supply Chain', 'Document AI', 'Robot Orchestrator', 'Pricing'],
    Solutions: ['General Contractors', 'Infrastructure', 'Developers', 'Project Owners'],
    Resources: ['Blog', 'Documentation', 'API Reference', 'Case Studies', 'ROI Calculator'],
    Company: ['About', 'Careers', 'Investors', 'Contact', 'Legal'],
  };

  return (
    <footer className="border-t border-white/[0.06] bg-surface-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="/" className="text-xl font-black tracking-tight">
              <span className="text-brand-400">Build</span>OS
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              The AI operating system for the world&apos;s largest industry.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/50 transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-sm text-white/30 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} BuildOS Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
