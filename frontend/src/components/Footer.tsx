export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
      <div className="container-shell py-12 text-center md:text-right">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">SSP Platform</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              منصة رائدة في تقديم الحلول البرمجية والتدريب التقني المتقدم.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} جميع الحقوق محفوظة.
          </div>
        </div>
      </div>
    </footer>
  );
}
